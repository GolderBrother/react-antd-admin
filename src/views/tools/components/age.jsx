import React from 'react';
import { Input,DatePicker, Row, Col} from 'antd';
class Age extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title:'What\'s your age?',
            year:''
        }
    };
    // 从DatePicker接收一个date值
    handleChange = (date) => {
        const nowTime = (new Date()).toDateString();  //返回日期 年月日 星期
        // 获取dataPicker的时间 date._d
        const diffTime = new Date(nowTime) - new Date(date._d.toDateString()).getTime();//当前时间毫秒数-出生时间的毫秒数
        const diffYear = (diffTime/1000/60/60/24/365).toFixed(2);
        this.setState({
            year:diffYear
        })
    };
    render(){
        return(
            <div className="agebox">
                <Row type="flex" justify="center" span={10}>
                    <Col>
                        <h2>{this.state.title}</h2>
                    </Col>
                </Row>
                <Row type="flex" justify="center" >
                    <Col span={10}>
                        <label style={{fontSize:'14px'}}>您的年龄是：</label>
                        <DatePicker onChange={this.handleChange}/>
                    </Col>
                </Row>
                <Row type="flex" justify="center" >
                    <Col span={10}>
                        <Input addonBefore="您已在地球上生活了" addonAfter="年" value={this.state.year} />
                    </Col>
                </Row>
            </div>
        )
    }
};
export default Age;