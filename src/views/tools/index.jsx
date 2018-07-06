/**
 * Created by james.zhang on 2018/5/20.
 */
import React from 'react';
import { Tabs,Icon } from 'antd';
import Age from './components/age';
import Bmi from './components/bmi';
import House from './components/house';
import Salary from './components/salary';
import './index.scss';
const TabPane = Tabs.TabPane;
class Tools extends React.Component{
    constructor(props){
        super(props);
    };
    render(){
        return (
            <div className="Toolsbox">
                <Tabs defaultActiveKey="2">
                    <TabPane tab={<span><Icon type="apple" />age</span>} key="1">
                        <Age />
                    </TabPane>
                    <TabPane tab={<span><Icon type="android"/>Bmi</span>} key="2">
                        <Bmi />
                    </TabPane>
                    <TabPane tab={<span><Icon type="apple" />House</span>} key="3">
                        <House />
                    </TabPane>
                    <TabPane tab={<span><Icon type="android"/>Salary</span>} key="4">
                        <Salary />
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default Tools;

