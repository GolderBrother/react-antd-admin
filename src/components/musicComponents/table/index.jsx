import React from 'react';
import PropTypes from 'prop-types';
import {
  Table as AntTable,  
  Menu,
  Dropdown,
  Icon,
  Tooltip
} from 'antd';
import styles from './index.scss';

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.mountProps(props);
  }

 //当props发生变化时执行
  componentWillReceiveProps(props) {
    this.mountProps(props);
  }
  //挂载props
  mountProps(props) {
    const {
      header, //头部
      action,  //操作
      headerWidth,  //头部宽度
      currentPage,  //当前页数
      data,
      } = props;
    this.state = {
      currentPage
    }
    
    this.makeColumns(header, action, headerWidth, data);
  }

  //设置列
  makeColumns(headers, action, headerWidth, data) {
    this.columns = this.props.noIndex ? [] : [{
      dataIndex: 'rowIndex',
      title: '序号',
      width: 100,
      fixed: this.props.rowIndexFixed,
    }];

    for (const header of headers) {
      this.columns.push({
        ...header,
      });
    }
    if (action) {
      this.columns.push({
        key: 'x',
        title: '操作',
        width: 200,
        //fixed: this.props.fixed,
        render: (row) => {
          const actions = action(row);
          if (!actions) {
            return <div />;
          }
          const buttons = actions.map(({ color, name, key, icon, hidden, children }) => {
            if (children) {
              return this.getActionItem({ color, name, key }, children, row)
            }
            return (<Tooltip title={ name }><a
              key={key}
              onClick={(e) => {
                e.preventDefault();
                if ('onClick' in this.props) {
                  this.props.onClick(key, row);
                }
              }}
              style={{
                color,
                marginRight: 12,
                display: hidden ? 'none' : 'inline-block',
                fontSize: 14,
              }}
            ><Icon type={ icon } /></a></Tooltip>)
          });
          return (<div>
            {buttons}
          </div>);
        },
      });
    }
  }

  /** 操作详情下拉选项 */
  getActionItem = (parent, children, row) => {
    const menu = (
      <Menu>
        {
        children.map(({ color, name, key, hidden }, i) => (
          hidden ? null : <Menu.Item key={i}>
            <a key={key}
              onClick={(e) => {
                e.preventDefault();
                if ('onCtrlClick' in this.props) {
                  this.props.onCtrlClick(key, row);
                }
              }}
            >{name}</a>
          </Menu.Item>
        ))
      }
      </Menu>
    )
    return (<Dropdown overlay={menu}>
      <a className="ant-dropdown-link">
        <span
          key={parent.key}
          onClick={(e) => {
            e.preventDefault();
            if ('onCtrlClick' in this.props) {
              this.props.onCtrlClick(parent.key, row);
            }
          }}
          style={{
            color: parent.color,
            marginRight: 8,
            display: parent.hidden ? 'none' : 'inline-block',
          }}
        >{parent.name}</span>
        <Icon type="down" />
      </a>
    </Dropdown>)
  }

  onPageChangeHandler = (currentPage) => {
    this.setState({
      currentPage,
    });
  }

  render() {
    return (
      <div className="myy-table">
        <AntTable
          dataSource={this.props.data.map((row, i) => ({ ...row, rowIndex: i + 1, key: i + 1 }))}
          columns={this.columns}
          
          loading={this.props.loading}
          pagination={this.props.pagination !== false ? {
            total: this.props.total,
            pageSize: this.props.pageSize,
            current: this.state.currentPage,
            onChange: this.onPageChangeHandler,
            showTotal(total, range) {
              return <span className={styles.pageTotal}>共<span className={styles.count}>{total}</span>条</span>;
            },
          } : false}
          footer={this.props.footer}
        />
      </div>
    );
  }
}
Table.PropTypes = {
  scroll: PropTypes.object,
  fixed: PropTypes.string,
  pageSize: PropTypes.number,
  getRowClassName: PropTypes.func
}
Table.defaultProps = {
  pageSize: 20,
}
