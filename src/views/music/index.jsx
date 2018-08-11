/**
 * Created by james.zhang on 2018/5/16.
 */
import React from 'react'
// Modal对话框,message提示框
import { Button, message, Modal } from 'antd'
// Moment.js 是一个 JavaScript 日期处理类库,用于解析、检验、操作、以及显示日期  --save
import moment from 'moment'
// 基于ES6下的Promise设计实现，可以在某些情况下替代$.ajax实现数据的跨域访问,此方法只支持GET方法 
// 先安装fetch，后安装fetch-jsonp  npm install whatwg-fetch --save  npm i fetch-jsonp
import fetchJsonp from 'fetch-jsonp'
// lodash是一个一致性、模块化、高性能的 JavaScript 实用工具库。  --save
import * as _ from 'lodash';
import SearchBar from '@/components/musicComponents/searchbar'
import Table from '@/components/musicComponents/table'
// 由于有多个对象，因此到处要加大括号指定
import { FormModal } from '@/components/musicComponents/modalForm'
import './index.scss'

import {
    musicKindList,
    languageKindList,
    publishCountry
} from '@/utils/config'    //搜索下拉框数据

// 如果你的浏览器版本太低，不支持Promise，那你还需要安装
require('es6-promise').polyfill();  //加载了Polyfill类库，能在还不支持Promise的环境中，运行本文中的各种示例代码

const confirm = Modal.confirm

export default class Music extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tData: [],   //数据
            item: {},    //当前某条数据
            noIndex: false,  //是否无序
            loading: true,  //加载中
            modalShow: false,   //弹层显示
            modalShowEdit: false, //编辑弹层显示
            rowIndexFixed: true   //列是否固定
        }
        this.add = this.add.bind(this)
        this.onOk = this.onOk.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.onOkEdit = this.onOkEdit.bind(this)
        this.onCancelEdit = this.onCancelEdit.bind(this)
    }

    // 获取表格数据
    fetchTableData = (typeId, searchFields) => {
        //百度音乐免费API接口
        fetchJsonp(`http://tingapi.ting.baidu.com/v1/restserver/ting?xml&calback=&from=webapp_music&method=baidu.ting.billboard.billList&type=${typeId}&size=100&offset=0`, {
            method: 'GET'
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                // 获取数据之后的操作
                //console.log(JSON.stringify(data))
                const songArray = []
                let songList = data.song_list
                // 添加判断条件过滤，分类音乐
                if (searchFields && searchFields.country && searchFields.country.toString() !== '0') { // 发行国家搜索
                    // eslint-disable-next-line
                    songList = songList.filter(ele => ele.country === publishCountry.find(t => t.value === parseInt(searchFields.country), 10).mean)
                }
                if (searchFields && searchFields.language && searchFields.language.toString() !== '0') { // 歌曲语种搜索
                    // eslint-disable-next-line
                    songList = songList.filter(ele => ele.language === languageKindList.find(t => t.value === parseInt(searchFields.language), 10).mean)
                }
                if (searchFields && searchFields.start) { // 发行时间段收索
                    songList = songList.filter(ele => moment(ele.publishtime) >= moment(searchFields.start) && moment(ele.publishtime) <= moment(searchFields.end))
                }

                for (let i = 0; i < songList.length; i++) {
                    songArray.push({
                        title: songList[i].title,
                        author: songList[i].author,
                        country: songList[i].country,
                        language: songList[i].language,
                        publishtime: songList[i].publishtime,
                    })
                    console.log(`INSERT INTO \`t_song\` VALUES ('${i + 223}', '${songList[i].title}', '${songList[i].author}', '${songList[i].country}', '${songList[i].language}', '${songList[i].publishtime}', '16');`)
                }
                //console.log(JSON.stringify(songArray))
                // 将数组传入状态中，然后停止加载动画
                this.setState({
                    tData: songArray,
                    loading: false
                });
                // this.setState({
                //     loading: false
                // });
            })
            // 数据请求失败的处理
            .catch((e) => {
                console.log(e.message);
            });
    }
    //生命周期  加载完成
    componentDidMount() {
        this.fetchTableData('2') // 默认是热歌版
    }
    //搜索
    onSearch = (searchFields) => {
        const typeId = searchFields.type ? searchFields.type : 2
        this.fetchTableData(typeId, searchFields)
    }
    // 搜索范围数据
    searchFields = () => {
        return [{
            title: '类型(单独搜索)',
            key: 'type',
            type: 'select',
            defaultValue: 2,
            onChange: (value) => this.fetchTableData(value),
            items: () => musicKindList.map(ele => ({
                value: ele.value,
                mean: ele.mean
            })),
        }, {
            title: '发行国家',
            key: 'country',
            type: 'select',
            defaultValue: '全部',
            items: () => publishCountry.map(ele => ({
                value: ele.value,
                mean: ele.mean
            })),
        }, {
            title: '歌曲语种',
            key: 'language',
            type: 'select',
            defaultValue: '全部',
            items: () => languageKindList.map(ele => ({
                value: ele.value,
                mean: ele.mean
            })),
        }, {
            title: '发行时间段',
            key: ['start', 'end'],
            type: 'rangePicker',
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 16, offset: 8 },
            }
        }]
    }

    //表头信息
    tableHeader = () => {
        return [{
            dataIndex: 'title',
            title: '歌曲名',
            width: 200,
        }, {
            dataIndex: 'author',
            title: '歌手',
            width: 200,
        }, {
            dataIndex: 'country',
            title: '发行国家',
            width: 200,
        }, {
            dataIndex: 'language',
            title: '语种',
            width: 200,
        }, {
            dataIndex: 'publishtime',
            title: '发行时间',
            width: 200,
        },]
    }
    //添加
    add() {
        this.setState({
            modalShow: true
        })
    }
    //OK
    onOk(param) {
        // 接受添加的表单数据
        // console.log(params);
        // message.success('编辑成功');
        // 这边可以将发送请求，数据转换格式后传递给后台
        // 添加成功后关掉弹层
        console.log(param);
        message.success('添加成功')
        this.onCancel()
    }
    //取消
    onCancel() {
        this.setState({
            modalShow: false
        })
    }
    //编辑OK
    onOkEdit(param) {
        this.setState({
            modalShowEdit: false
        })
        message.success('编辑成功')
    }
    //编辑取消
    onCancelEdit() {
        this.setState({
            modalShowEdit: false
        })
    }
    //操作选项动作
    tableAction = (actionKey, item) => {
        if (actionKey === 'edit') {
            this.setState({
                item: item,
                modalShowEdit: true
            })
        } else if (actionKey === 'delete') {
            confirm({
                title: '提示',
                content: '确定删除吗',
                onOk: () => {
                    message.success('删除成功')
                },
                onCancel() { }
            })
        }
    }
    // 弹层表单
    fields = () => {
        return [{
            label: '歌曲名',
            type: 'input',
            name: 'title',
            options: {
                rules: [{
                    required: true,
                    message: '歌曲名必输!',
                }]
            }
        }, {
            label: '歌手名',
            type: 'input',
            name: 'author',
            options: {
                rules: [{
                    required: true,
                    message: '歌手必输!',
                }]
            }
        }, {
            label: '发行国家',
            type: 'select',
            name: 'country',
            items: () => publishCountry.map(ele => ({
                key: ele.value,
                value: ele.mean
            })),
            options: {
                rules: [{
                    required: true,
                    message: '发行国家必输!',
                }]
            }
        }, {
            label: '歌曲语种',
            type: 'select',
            name: 'language',
            items: () => languageKindList.map(ele => ({
                key: ele.value,
                value: ele.mean
            })),
            options: {
                rules: [{
                    required: true,
                    message: '语种必输!',
                }]
            }
        }, {
            label: '发行时间',
            type: 'datetime',
            name: 'publishTime',
            options: {
                rules: [{
                    required: true,
                    message: '发行时间必输!',
                }]
            }
        }]
    }
    // 弹层表单编辑
    fieldsEdit = () => {
        const item = this.state.item
        return [{
            label: '歌曲名',
            type: 'input',
            name: 'title',
            items: item.title,
            options: {
                initialValue: item.title,
                rules: [{
                    required: true,
                    message: '歌曲名必输!',
                }]
            }
        }, {
            label: '歌手名',
            type: 'input',
            name: 'author',
            options: {
                initialValue: item.author,
                rules: [{
                    required: true,
                    message: '歌手必输!',
                }]
            }
        }, {
            label: '发行国家',
            type: 'select',
            name: 'country',
            items: () => publishCountry.map(ele => ({
                key: ele.value,
                value: ele.mean
            })),
            options: {
                initialValue: item.country,
                rules: [{
                    required: true,
                    message: '发行国家必输!',
                }]
            }
        }, {
            label: '歌曲语种',
            type: 'select',
            name: 'language',
            items: () => languageKindList.map(ele => ({
                key: ele.value,
                value: ele.mean
            })),
            options: {
                initialValue: item.language,
                rules: [{
                    required: true,
                    message: '语种必输!',
                }]
            }
        }, {
            label: '发行时间',
            type: 'datetime',
            name: 'publishTime',
            options: {
                initialValue: moment(item.publishtime),
                rules: [{
                    required: true,
                    message: '发行时间必输!',
                }]
            }
        }]
    }
    // 视图渲染
    render() {
        return (
            <div id="wrap">
                <SearchBar
                    onSubmit={this.onSearch}
                    fields={this.searchFields()}
                />
                <div className="tableBox">
                    <Button onClick={this.add} className="addButton">添加</Button>
                    <div style={{ paddingTop: 43 }}>
                        <Table
                            onClick={this.tableAction}
                            noIndex={this.state.noIndex}
                            rowIndexFixed={this.state.rowIndexFixed} //列是否固定
                            pagination={true}     //是否需要分页
                            pageSize={30}           //一页10条
                            currentPage={2}        //当前页数
                            header={this.tableHeader()}   //表头
                            data={this.state.tData}   //数据
                            loading={this.state.loading}   //加载
                            action={row => [{                  //动作
                                key: 'edit',
                                name: '修改',
                                color: 'blue',
                                icon: 'edit',
                            }, {
                                key: 'delete',
                                name: '删除',
                                color: 'red',
                                icon: 'delete'
                            }]}
                            scroll={{ y: 385 }}
                        />
                    </div>
                </div>
                <FormModal
                    modalKey="add"    //模块名称
                    visible={this.state.modalShow}    //是否显示
                    title="添加音乐"       //标题
                    fields={this.fields()}
                    onOk={this.onOk}     //添加
                    onCancel={this.onCancel}  //取消
                    okText="保存"    //文字
                />
                <FormModal
                    modalKey="Edit"
                    visible={this.state.modalShowEdit}
                    title="修改音乐"
                    fields={this.fieldsEdit()}
                    onOk={this.onOkEdit}
                    onCancel={this.onCancelEdit}
                    okText="保存"
                />
            </div>
        )
    }
}

