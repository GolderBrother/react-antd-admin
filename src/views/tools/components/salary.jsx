import React from 'react';
import { Row,Col,Input,message } from 'antd';
let handleOnce = true;
class Salary extends React.Component{
    constructor(){
        super();
        this.state = {
            title:'salary',
			old:'',   //养老保险
  			medical:'',  //医疗保险
  			offwork:'',  //失业保险
  			house:'',   //住房公积
  			pretax:'',  //税前工资
  			tax:'',  //个人税收
  			output:''   //税后工资
        }
    };
    handleChange = (e) => {
        let value = e.target.value;
        if( value>10000 && handleOnce ){
            handleOnce = false;
            message.success('哎呦不错哦！工资上万了！')
        };
        const old = value*8/100;
  		const medical = value*2/100 + (value > 0 ? 3 : 0);
  		const offwork = value*2/1000;
  		const house = value*12/100;
  		const pretax = (value-old-medical-offwork-house);
        const taxBase = pretax-3500;
        const diffAll = old + medical + offwork + house + pretax + taxBase;
        const output =  value -  diffAll;
        this.setState({
            old:old,   //养老保险
  			medical:medical,  //医疗保险
  			offwork:offwork,  //失业保险
  			house:house,   //住房公积
  			pretax:pretax,  //税前工资
  			tax:taxBase,  //个人税收
  			output:output   //税后工资
        });
    }
    render(){
        return (
            <div className="salarybox">
                <Row type="flex" justify="center" className="rowItem">
                    <Col>
                        <h2>{this.state.title}</h2>
                    </Col>
                </Row>
                <Row type="flex" justify="center" className="rowItem">
                    <Col span={10}>
                        <Input addonBefore="养老保险" addonAfter="元" defaultValue="100" onChange={(e)=>{this.handleChange(e)}} className="rowInput" />
                    </Col>
                </Row>
                <Row type="flex" justify="center" className="rowItem">
                    <Col span={10}>
                        <Input addonBefore="养老保险" addonAfter="元" defaultValue="100" value={this.state.old} />
                    </Col>
                </Row>
                <Row type="flex" justify="center" className="rowItem">
                    <Col span={10}>
                        <Input addonBefore="医疗保险" addonAfter="元" defaultValue="100" value={this.state.medical} />
                    </Col>
                </Row>
                <Row type="flex" justify="center" className="rowItem">
                    <Col span={10}>
                        <Input addonBefore="失业保险" addonAfter="元" defaultValue="100" value={this.state.offwork} />
                    </Col>
                </Row>
                <Row type="flex" justify="center" className="rowItem">
                    <Col span={10}>
                        <Input addonBefore="住房公积" addonAfter="元" defaultValue="100" value={this.state.house} />
                    </Col>
                </Row>
                <Row type="flex" justify="center" className="rowItem">
                    <Col span={10}>
                        <Input addonBefore="税前工资" addonAfter="元" defaultValue="100" value={this.state.pretax} />
                    </Col>
                </Row>
                <Row type="flex" justify="center" className="rowItem">
                    <Col span={10}>
                        <Input addonBefore="个人税收" addonAfter="元" defaultValue="100" value={this.state.tax} />
                    </Col>
                </Row>
                <Row type="flex" justify="center" className="rowItem">
                    <Col span={10}>
                        <Input addonBefore="税后工资" addonAfter="元" defaultValue="100" value={this.state.output} />
                    </Col>
                </Row>
            </div>
        )
    }
};
export default Salary;