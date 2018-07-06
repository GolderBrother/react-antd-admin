/**
 * Created by james.zhang on 2018/4/16.
 */
import React from 'react';
import { Form, Icon, Input, Button, Checkbox, notification, message } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchData, receiveData } from '@/action';
import * as $http from '../../axios/tools';
import axios from 'axios';

const FormItem = Form.Item;

class Login extends React.Component {
    componentWillMount() {
        const { receiveData } = this.props;
        receiveData(null, 'auth');
    }
    componentWillReceiveProps(nextProps) {
        // 接收父组件传递来的属性
        const { auth: nextAuth = {} } = nextProps;
        const { history } = this.props;
        if (nextAuth.data && nextAuth.data.uid) {   // 判断是否登陆
            localStorage.setItem('user', JSON.stringify(nextAuth.data));
            history.push('/');
        }
    }
    handleSubmit = (e) => {
        let Timer = null,_this = this;;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const { fetchData } = this.props;
                const data = {
                    username : values.userName,
                    password : values.password
                }
                axios.post('/login',data).then((res) => {
                    console.log(res.data);
                    if(res.data.status == -1){
                        message.error('用户名不存在');
                    }else if(res.data.status == -2){
                        message.error('密码不正确');
                    }else{
                        fetchData({funcName: 'admin', stateName: 'auth'});
                        _this.openNotificationWithIcon('info',data.username,'登陆成功','欢迎回来');
                        // localStorage.getItem('user').userName = data.username;
                        // let userInfo = JSON.parse(localStorage.getItem('user'));
                        // 初始化用户权限信息
                        let userAuth = {
                            "uid":    1,
                            "permissions":["auth","auth/testPage","auth/authPage","auth/authPage/edit","auth/authPage/visit"],
                            "role":"系统管理员",
                            "roleType":1,
                            "userName":"系统管理员"
                        }
                        userAuth.userName = data.username;
                        localStorage.setItem('user',JSON.stringify(userAuth));
                        sessionStorage.setItem('user',JSON.stringify(userAuth));
                        Timer = setInterval(function(){
                            _this.props.history.push('/app/dashboard/index'); ;
                            clearInterval(Timer);
                        },1000)
                    };
                },(err => {
                    console.log(err);
                })).catch(err => {
                    console.log(err)
                })
                if (values.userName === 'guest' && values.password === 'guest') {
                    fetchData({funcName: 'guest', stateName: 'auth'})
                };
            }
        });
    };
    // 提醒框,弹出登陆成功信息框
    openNotificationWithIcon = (type,user,msg,des) => {
        return notification[type]({
            message:msg,  
            description:`${des}：${user}!`,
            icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
            duration:5
        })
    };
    gitHub = () => {
        window.location.href = 'https://github.com/login/oauth/authorize?client_id=792cdcd244e98dcd2dee&redirect_uri=http://localhost:3006/&scope=user&state=reactAdmin';
    };
    register = ()=> {
        this.props.history.push('/register');
    };
    changePwd = () => {
        this.props.history.push('/changePwd');
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <div className="login-form">
                    <div className="login-logo">
                        <span>React Admin</span>
                    </div>
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                // <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="管理员输入admin, 游客输入guest" />
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="管理员输入james" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="管理员输入james123" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住我</Checkbox>
                            )}
                            <a className="login-form-forgot" onClick={this.changePwd} style={{float: 'right'}}>忘记密码</a>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                                登录
                            </Button>
                            <p style={{display: 'flex', justifyContent: 'space-between'}}>
                                <a onClick={this.register}>或 现在就去注册!</a>
                                <a onClick={this.gitHub} ><Icon type="github" />(第三方登录)</a>
                            </p>
                        </FormItem>
                    </Form>
                </div>
            </div>

        );
    }
}

const mapStateToPorps = state => {
    const { auth } = state.httpData;
    return { auth };
};
const mapDispatchToProps = dispatch => ({
    fetchData: bindActionCreators(fetchData, dispatch),
    receiveData: bindActionCreators(receiveData, dispatch)
});


export default connect(mapStateToPorps, mapDispatchToProps)(Form.create()(Login));