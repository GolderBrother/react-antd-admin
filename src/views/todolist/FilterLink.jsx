/**
 * Created by james.zhang on 2018/5/19.
 */
import React from 'react'
import { connect } from 'react-redux'
import { setVisibility } from '@/action/todoList'
import './index.scss'

/*在vscode中使用es7的新语法decorator会报错,要在项目根目录下创建一个jsconfig.json文件
{
    "compilerOptions": {
        "experimentalDecorators": true
    }
}*/
@connect(
    (state) => ({
        setVisibility: state.setVisibility,
    })
)

export default class FilterLink extends React.Component {
  onClick = () => {
    var a = setVisibility({filter: this.props.filter});
    this.props.dispatch(a)
  }

  render() {
    const { name,filter } = this.props
    const active = this.props.setVisibility.filter === filter
    return (
      <div className="todo-tab_item">
        <a style={{ color: active? '#f01414' : '#4d555d' }} onClick={this.onClick}>{name}</a>
      </div>
    )
  }
}

