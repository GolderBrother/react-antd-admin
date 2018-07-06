import React from 'react';
import './index.scss';

export default class Note extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            col:'#666'
        }
    };
    render(){
        const { col } = this.state;
        return(
            <div className="animated flip ani-box">
                {/* https://github.com/MuYunyun/react-antd-demo */}
                <div><a href="javascript:;" className="welcome animated flip text" style={{color:col}}>项目地址</a></div>
                <img src={require('@/style/imgs/face.png')} width="20%"/>
                <div className="animated swing discribe">本项目中，会把平时工作、学习中</div>
                <div className="animated swing discribe">遇到的事抽象成demo给展现出来。欢迎 <a href="https://github.com/GolderBrother/react-antd-admin">Star</a></div>
            </div>
        )
    }
}