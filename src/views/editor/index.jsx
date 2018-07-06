/**
 * Created by james.zhang on 2018/5/26.
 */
import React, { Component } from 'react';
import { Row, Col, Card } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';    //转换为HTML 
import draftToMarkdown from 'draftjs-to-markdown';  //标记语言
import './index.scss'

export default class wysiwyg extends Component {
    state = {
        editorContent: undefined,   //编辑内容
        contentState: '',
        editorState: '',
    };

    onEditorChange = (editorContent) => {
        this.setState({
            editorContent,
        });
    };

    clearContent = () => {
        this.setState({
            contentState: '',
        });
    };

    onContentStateChange = (contentState) => {
        console.log('contentState', contentState);
    };

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    imageUploadCallBack = file => new Promise(
        (resolve, reject) => {
            const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
            xhr.open('POST', 'https://api.imgur.com/3/image');
            xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
            const data = new FormData(); // eslint-disable-line no-undef
            data.append('image', file);
            xhr.send(data);
            xhr.addEventListener('load', () => {
                const response = JSON.parse(xhr.responseText);
                resolve(response);
            });
            xhr.addEventListener('error', () => {
                const error = JSON.parse(xhr.responseText);
                reject(error);
            });
        }
    );

    render() {
        const { editorContent, editorState } = this.state;
        return (
            <div>
                <Row>
                    <Col span={24}>
                        <div className="cloud-box">
                            <Card title="富文本编辑器" bordered={true} >
                                <Editor
                                    editorState={editorState}
                                    toolbarClassName="home-toolbar"
                                    wrapperClassName="home-wrapper"
                                    editorClassName="home-editor"
                                    onEditorStateChange={this.onEditorStateChange}
                                    toolbar={{
                                        history: { inDropdown: true },
                                        list: { inDropdown: true },
                                        textAlign: { inDropdown: true },
                                        image: { uploadCallback: this.imageUploadCallBack },
                                    }}
                                    onContentStateChange={this.onEditorChange}
                                    placeholder="请输入文字"
                                    onFocus={() => {console.log('focus')}}
                                    onBlur={() => {console.log('blur')}}
                                    onTab={() => {console.log('tab'); return true;}}
                                    //localization={{ locale: 'zh', translations: {'generic.add': 'Add'} }}
                                    
                                />
                            </Card>
                        </div>
                    </Col>
                    <Col span={8}>
                        <Card title="同步转换HTML" bordered={true}>
                            <pre>{draftToHtml(editorContent)}</pre>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="同步转换MarkDown" bordered={true}>
                            <pre style={{whiteSpace: 'pre-wrap'}}>{draftToMarkdown(editorContent)}</pre>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="同步转换JSON" bordered={true}>
                            <pre style={{whiteSpace: 'normal'}}>{JSON.stringify(editorContent)}</pre>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}