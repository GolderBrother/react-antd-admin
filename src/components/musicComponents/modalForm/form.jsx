import React from 'react'
import ReactDOM from 'react-dom'
import {
  Button,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Form,
  Radio,
  Switch,
} from 'antd'

import './index.scss'

const FormItem = Form.Item
const RadioGroup = Radio.Group

class ModForm extends React.Component {
  componentDidMount() {
    // for (const component of this.needToEmptyStyleComponents) {
    //   const dom = ReactDOM.findDOMNode(component);
    //   dom.setAttribute('style', '');
    // }
  }
  //提交
  handleSubmit = (e) => {
    e && e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {   //进行校验
      if (!err) {
        const { onOk } = this.props
        onOk && onOk(values)
        //console.log(this.props.form.getFieldsValue());  //获取对应的值
        this.props.form.resetFields();//重置
      }
    })
  }
  //取消
  doCancel = () => {
    const { onCancel } = this.props
    onCancel && onCancel()
    this.props.form.resetFields()
  }

  generateFormItem = ({ formItemLayout, label, hasFeedBack, name, options, component }) => {
    const { getFieldDecorator } = this.props.form
    return (<FormItem
      {...formItemLayout}
      key={name}
      label={label}
      hasFeedBack={hasFeedBack}
    >
      {getFieldDecorator(name, options)(component)}
    </FormItem>)
  }

  getTextField = field => <span className="ant-form-text">{field.options && field.options.initialValue}</span>
  //input
  getInputField = field => (<Input />)
  //inputNumber
  getInputNumberField = field => <InputNumber
    step={field.options.step}
    formatter={field.options.formatter}
    style={{ width: '100%' }}
  />
  //textArea
  getTextAreaField = field => (<Input type="textarea" rows={field.options.rows || 4} disabled={field.options.disabled} />)
  //下拉
  getSelectField = field => (<Select
    placeholder="请选择"
    style={{
      width: '100%',
    }}
    disabled={field.disabled}
    multiple={field.multiple}
  >
    {field.items().map(({ key, value }) =>
      <Select.Option key={key.toString()} value={key.toString()}>{value}</Select.Option>)}
  </Select>)
  //radio
  getRadioGroupField = field => <RadioGroup>
    {field.items().map(({ key, value }) =>
      <Radio key={key.toString()} value={key.toString()}>{value}</Radio>
    )}
  </RadioGroup>
  //date
  getDateField = field => (<DatePicker
    showToday={false}
    placeholder="请选择日期"
  />)
  //time
  getDateTimeField = field =>
    (<DatePicker
      showTime
      format="YYYY-MM-DD"
      placeholder="请选择时间"
      showToday={false}
      ref={item => this.needToEmptyStyleComponents.push(item)}
    />)

  //switch
  getSwitchField = field => <Switch
    checkedChildren={'开'}
    unCheckedChildren={'关'}
    disabled={field.options.disabled}
    defaultChecked={field.options.initialValue}
  />
  //upload
  getUploadField = field =>
    <input
      type="file"
      ref={field.options.ref}
      disabled={field.options.disabled}
      name="patchFile"
    />

  //表单数据
  generateFormFields(fields) {
    const formItemLayout = this.props.formItemLayout || {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    }
    const components = [];
    this.needToEmptyStyleComponents = [];
    for (const field of fields) {
      let component = null;
      switch (field.type) {
      case 'input':
        component = this.getInputField(field);
        break;
      case 'inputNumber':
        component = this.getInputNumberField(field)
        break;
      case 'select':
        component = this.getSelectField(field)
        break;
      case 'radioGroup':
        component = this.getRadioGroupField(field)
        break;
      case 'date':
        component = this.getDateField(field)
        break;
      case 'datetime':
        component = this.getDateTimeField(field)
        break;
      case 'switch':
        component = this.getSwitchField(field)
        break;
      case 'upload':
        component = this.getUploadField(field)
        break;
      case 'textarea':
        component = this.getTextAreaField(field)
        break;
      default:
        component = this.getTextField(field)
        break
      }
      component = this.generateFormItem({
        formItemLayout,
        component,
        label: field.label,
        name: field.name,
        options: field.options,
        hasFeedBack: field.type === 'input',
      })
      components.push(component);
    }
    const buttons = (<FormItem
      key="control-buttons"
      wrapperCol={{
        span: 14,
        offset: 6,
      }}
    >
      <div className="buttons">
        {this.props.showCancel && <Button onClick={this.doCancel} >取消</Button>}
        {!this.props.noBtn && <Button type="primary" htmlType="submit">{this.props.okText || '确定'}</Button>}
      </div>

    </FormItem>)
    components.push(buttons)
    return components;
  }

  render() {
    const {
      fields,
    } = this.props
    return (
      <div className="formWrapper">
        <Form onSubmit={this.handleSubmit} ref={(c) => { this.form = c; }}>
          {this.generateFormFields(fields)}
        </Form>
      </div>
    )
  }
}

const ModalForm = Form.create()(ModForm)

export default ModalForm
