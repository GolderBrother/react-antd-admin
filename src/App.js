import React, { Component } from 'react';
import { Layout, notification, Icon, BackTop } from 'antd';
import '@/style/index.less';
import SiderCustom from '@/components/siderCustom/SiderCustom';
import HeaderCustom from '@/components/headerCustom/HeaderCustom';
import BackToTop from '@/components/backToTop';
import { receiveData } from '@/action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Routes from '@/routes';
const { Content, Footer } = Layout;

class App extends Component {
    state = {
        collapsed: false,
    };
    componentWillMount() {
        const { receiveData } = this.props;
        const user = JSON.parse(sessionStorage.getItem('user'));
        user && receiveData(user, 'auth');
        // receiveData({a: 213}, 'auth');
        // fetchData({funcName: 'admin', stateName: 'auth'});
        this.getClientWidth();
        window.onresize = () => {
            console.log('屏幕变化了');
            this.getClientWidth();
            // console.log(document.body.clientWidth);
        }
    }
    componentDidMount() {
        const openNotification = () => {
            notification.open({
              message: '博主-GordenBrother',
              description: (
                  <div>
                      <p>
                          GitHub地址： <a href="https://github.com/GorderBrother" target="_blank" rel="noopener noreferrer">https://github.com/GorderBrother</a>
                      </p>
                      <p>
                          博客地址： <a href="https://zhangyaohuang.com/" target="_blank" rel="noopener noreferrer">https://zhangyaohuang.com/</a>
                      </p>
                  </div>
              ),
              icon: <Icon type="smile-circle" style={{ color: 'red' }} />,
              duration: 0,
            });
            localStorage.setItem('isFirst', JSON.stringify(true));
        };
        // 首次弹出博主网站信息地址，后面登录不弹出
        const isFirst = JSON.parse(localStorage.getItem('isFirst'));
        !isFirst && openNotification();
    }
    getClientWidth = () => {    // 获取当前浏览器宽度并设置responsive管理响应式
        const { receiveData } = this.props;
        const clientWidth = document.body.clientWidth;
        console.log(clientWidth);
        receiveData({isMobile: clientWidth <= 992}, 'responsive');
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        // console.log(this.props.auth);
        // console.log(this.props.responsive);
        const { auth, responsive } = this.props;
        return (
            <Layout>
                {!responsive.data.isMobile && <SiderCustom collapsed={this.state.collapsed} />}
                <Layout style={{flexDirection: 'column'}}>
                    <HeaderCustom toggle={this.toggle} collapsed={this.state.collapsed} user={auth.data || {}} />
                    <Content style={{ margin: '0 16px', overflow: 'initial' }}>
                        <Routes auth={auth} />
                    </Content>
                    <BackTop>
                        <div className="ant-back-top-inner">UP</div>
                    </BackTop>
                    <Footer style={{ textAlign: 'center' }}>
                    React-Admin ©2018 Created by 1204788939@qq.com
                    </Footer>
                </Layout>
                
                {
                    responsive.data.isMobile && (   // 手机端对滚动很慢的处理
                        <style>
                        {`
                            #root{
                                height: auto;
                            }
                        `}
                        </style>
                    )
                }
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    const { auth = {data: {}}, responsive = {data: {}} } = state.httpData;
    return {auth, responsive};
};
const mapDispatchToProps = dispatch => ({
    receiveData: bindActionCreators(receiveData, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
