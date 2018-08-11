import React from 'react';
import * as _ from 'diana';
import './index.scss';

export default class Follow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            col:'#666'
        }
    };
    // 获取随机颜色
    getRandomColor = () => {
        this.setState({
            col: _.rdColor()
        })
    }
    // 组件挂载后，定时器，没500ms获取一次组件颜色
    componentDidMount(){
        this.colorTimer = setInterval(this.getRandomColor,500)
    }
    // 组件销毁后，清除定时器
    componentWillMount(){
        clearInterval(this.colorTimer)
    }
    render(){
        const { col } = this.state;
        return(
            <div className="animated flip ani-box">
                <div><a href="https://github.com/GolderBrother/react-antd-admin" className="welcome animated flip text" style={{color:col}}>项目地址</a></div>
                <img src={require('../../style/imgs/face.png')}/>
                <div className="animated swing discribe">本项目中，会把平时工作、学习中</div>
                <div className="animated swing discribe">遇到的事抽象成demo给展现出来。欢迎 <a href="https://github.com/GolderBrother/react-antd-admin">Star</a></div>
            </div>
        )
    }
}