import React, { Component } from 'react';
import './index.scss';

export default class Todo extends Component {
    render() {
        return (
            <div className='animated swing todo'>
                <div>计划在本项目中，把平时工作、学习中遇到的事抽象成demo给展现出来。其实这套界面风格不仅仅可以作为后台管理系统，也可以修改成一个美观的博客。</div>
                <div>欢迎 <a href="https://github.com/GolderBrother/react-antd-admin">Star</a>,更多模块正在开发中...</div>
            </div>
        )
    }
}