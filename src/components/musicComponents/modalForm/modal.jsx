import React from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
} from 'antd'

import Form from './form' 

export default class FormModal extends React.Component {

  render() {
    const {
      modalKey,
      visible,
      title,
      fields,
      onCancel,
      onOk,
      okText,
    } = this.props
    return (
      <Modal
        wrapClassName="form"   //对话框外层容器的类名
        key={modalKey}       //键名
        visible={visible}    //对话框是否可见
        title={title}      //标题
        onCancel={onCancel}  //取消
        footer={null}       //底部
      >
        <Form
          fields={fields}  //所有的数据
          onOk={onOk}      //OK
          onCancel={onCancel}  //取消
          showCancel          //是否显示取消
          okText={okText}    //内容
        />
      </Modal>
    )
  }
}

FormModal.propTypes = {
  modalKey: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(Object).isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  okText: PropTypes.string,
}
