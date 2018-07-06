import React from 'react';
import { BackTop } from 'antd';
class BackToTop extends React.Component{
    render() {
        return (
            <BackTop>
                <div className="ant-back-top-inner">UP</div>
            </BackTop>
        )
    }
}
export default BackToTop;