/**
 * Created by james.zhang on 2018/4/13.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, notification } from 'antd';
import BreadcrumbCustom from '@/components/breadcrumbCustom';
import * as $http from '@/axios/tools';
import axios from 'axios';
const FormItem = Form.Item;
const Option = Select.Option;

const residences = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
            value: 'xihu',
            label: 'West Lake',
        }],
    }],
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
        }],
    }],
}];


class BasicForms extends Component {
    state = {
        confirmDirty: false,
    };
    handleSubmit = (e) => {
        let Timer = null, _this = this;
        e.preventDefault();
        _this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                try {
                    console.log(values);
                    let data = {
                        username: values.nickname,
                        telephone: values.phone
                    };
                    console.log(data)
                    let res = await axios.post('/regVerify', data);
                    console.log(res);
                    if (res.status === 200 && res.data.status === 1) {
                        data.password = values.password;
                        data.telephone = values.phone;
                        console.log(data);
                        let regRes = await axios.post('/register', data);
                        console.log(regRes);
                        if (regRes.data.status === 1) {
                            _this.openNotificationWithIcon('info', data.username);
                            Timer = setTimeout(function () {
                                _this.props.history.push('/login');
                                clearTimeout(Timer);
                            }, 3000);
                        };
                    } else {
                        console.log('data error')
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        });
    };
    // 提醒框,弹出注册成功信息框
    openNotificationWithIcon = (type, user) => {
        return notification[type]({
            message: '注册成功',
            description: `立即去登录：${user}!`,
            icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
            duration: 3
        })
    };
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 8,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select className="icp-selector" style={{ width: '60px' }}>
                <Option value="86">+86</Option>
            </Select>
        );
        return (
            <div className="gutter-example">
                <Row gutter={16} type="flex" justify="center">
                    <Col className="gutter-row" md={12} style={{ margin: '30px auto' }}>
                        <div className="gutter-box" >
                            <Card title="用户注册" style={{ textAlign: 'center' }} bordered={false}>
                                <Form onSubmit={this.handleSubmit}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="邮箱"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('email', {
                                            rules: [{
                                                type: 'email', message: '请输入合理的邮箱地址!',
                                            }, {
                                                required: true, message: '请输入邮箱地址!',
                                            }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label={(
                                            <span>
                                                昵称&nbsp;
                                            <Tooltip title="别人怎么称呼你?">
                                                    <Icon type="question-circle-o" />
                                                </Tooltip>
                                            </span>
                                        )}
                                        hasFeedback
                                    >
                                        {getFieldDecorator('nickname', {
                                            rules: [{ required: true, message: '请输入昵称!', whitespace: true }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="密码"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('password', {
                                            rules: [{
                                                required: true, message: '请输入密码!',
                                            }, {
                                                validator: this.validateToNextPassword,
                                            }],
                                        })(
                                            <Input type="password" />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="确认密码"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('confirm', {
                                            rules: [{
                                                required: true, message: '请确认你的密码!',
                                            }, {
                                                validator: this.compareToFirstPassword,
                                            }],
                                        })(
                                            <Input type="password" onBlur={this.handleConfirmBlur} />
                                        )}
                                    </FormItem>
                                    {/* <FormItem
                                    {...formItemLayout}
                                    label="常住地址"
                                >
                                    {getFieldDecorator('residence', {
                                        initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                                        rules: [{ type: 'array', required: true, message: '请选择你的常住地址!' }],
                                    })(
                                        <Cascader options={residences} />
                                    )}
                                </FormItem> */}
                                    <FormItem
                                        {...formItemLayout}
                                        label="电话号码"
                                    >
                                        {getFieldDecorator('phone', {
                                            rules: [{ required: true, message: '请输入你的电话号码!' }],
                                        })(
                                            <Input addonBefore={prefixSelector} />

                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="验证码"
                                        extra="我们必须确认你不是机器人."
                                    >
                                        <Row gutter={8}>
                                            <Col span={12}>
                                                {getFieldDecorator('captcha', {
                                                    rules: [{ required: true, message: '请输入你获取的验证码!' }],
                                                })(
                                                    <Input size="large" />
                                                )}
                                            </Col>
                                            <Col span={12}>
                                                <Button size="large">获取验证码</Button>
                                            </Col>
                                        </Row>
                                    </FormItem>
                                    <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
                                        {getFieldDecorator('agreement', {
                                            rules: [{ required: true, message: '请勾选用户协议！' }],
                                            valuePropName: 'checked',
                                        })(
                                            <Checkbox>我已经阅读过 <a href="">协议</a></Checkbox>
                                        )}
                                    </FormItem>
                                    <FormItem {...tailFormItemLayout}>
                                        <Button type="primary" htmlType="submit" size="large">注册</Button>
                                    </FormItem>
                                </Form>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

const BasicForm = Form.create()(BasicForms);

export default BasicForm;