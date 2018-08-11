/**
 * Created by james.zhang on 2018/6/16.
 */
import React from 'react';
import { Form, Icon, Input, Button, Checkbox, notification, message } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchData, receiveData } from '@/action';
import axios from 'axios';

const FormItem = Form.Item;
class ChangePwd extends React.Component {
    state = {
        confirmDirty:false,
        form:this.props.form
    }
    componentWillMount(){
        const { receiveData } = this.props;
        receiveData(null, 'auth');
    }
    componentWillReceiveProps(nextProps) {
        const { auth: nextAuth = {} } = nextProps;
        const { history } = this.props;
        if (nextAuth.data && nextAuth.data.uid) {   // 判断是否登陆
            localStorage.setItem('user', JSON.stringify(nextAuth.data));
            history.push('/');
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err,values) => {
            let Timer = null,
                _this = this;
            if(!err){
                const {fetchData} = this.props;
                console.log(values);
                const userData = {
                    username:values.userName,
                    telephone:values.telephone,
                    newpassword:values.password
                };
                try{
                    let res = await axios.post('/changePwd',userData);
                    console.log(res,res.data.status);
                    let status = res.status,
                    dataStatus = res.data.status;
                    if(status === 200){
                      if(dataStatus === -2){
                          // 服务器出错
                          message.error(res.data.msg);
                      }else if(dataStatus === -1){
                          // 该用户不存在
                          console.log(res.data.msg);
                          message.error(res.data.msg);
                      }else if(dataStatus === 1){
                          console.log(res.data.msg);
                          this.openNotificationWithIcon('info',userData.username,'更改成功','前往重新登录');
                          Timer = setTimeout(function(){
                              _this.props.history.push('/login');
                              clearInterval(Timer);
                          },3000)
                      }else{
                          message.error('System error');
                      }
                  }
                }catch(error){
                    console.log(error)
                }
            }
        })
    }
    // 提醒框,弹出登陆成功信息框
    openNotificationWithIcon = (type,user,msg,des) => {
        return notification[type]({
            message:msg,  
            description:`${des}：${user}!`,
            icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
            duration:5
        })
    };
    compareToFirstPassword(rule,value,callback){
        const form = this.props.form;
        console.log(value,form,form.getFieldValue('password'));
        if( value && value != form.getFieldValue('password') ){
            callback('Two passwords that you enter is inconsistent!');
        }else{
            callback();
        }
    }
    validateToNextPassword(rule,value,callback){
        const form = this.props.form;
        if( value && this.state.confirmDirty){
            form.validateFields(['confirm'],{force:true});
        };
        callback();
    };
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        console.log(value);
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
    
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <div className="login-form" style={{height: 'auto'}}>
                    <div className="login-logo">
                        <span>忘记密码</span>
                    </div>
                    <Form onSubmit={this.handleSubmit} style={{maxWidth:'300px'}}>
                        <FormItem>
                            {getFieldDecorator('userName',{
                                rules:[{ required:'true',message:'请输入用户名' }]
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize:'13px' }} />} placeholder="请输入用户名" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('telephone',{
                                rules:[{ required:true,message:'请输入手机号' }]
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize:'13px' }}/>} type="text" placeholder='请输入手机号' />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password',{
                                rules:[{ required:true,message:'请输入新密码' }]
                            },{
                                validator:this.validateToNextPassword,
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize:'13px' }}/>} type="password" placeholder='请输入新密码' />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('confirm',{
                                rules:[{ required:true,message:'请再次输入新密码' }]
                            },{
                                validator:this.compareToFirstPassword,
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize:'13px' }}/>} type="password" onBlur={this.handleConfirmBlur} placeholder='请再次输入新密码' />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" style={{ width:'100%' }}>
                                确定
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        )
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


export default connect(mapStateToPorps, mapDispatchToProps)(Form.create()(ChangePwd));

