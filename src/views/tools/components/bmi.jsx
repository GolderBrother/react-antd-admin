import React from 'react';
import { Input, Row, Col, message, Button, Form, Card, Icon } from 'antd';
// const FormItem = Form.Item;
class BmiBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title:'Bmi',
            bmi:'',
            level:''
        }
    };
    onSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err,values)=>{
            err && (message.error('error!'));
        });
        const w = this.props.form.getFieldsValue().weight;
        const h = this.props.form.getFieldsValue().height;
        // 四舍五入，转化成指定小数位
        const bmi = (w/((h/100)**2)).toFixed(1);
        let level = 0;
        if( bmi<18.5 ){
            level = 1;
        }else if( bmi >= 18.5 && bmi <= 24.9 ){
            level = 2;
        }else if( bmi == '25' ){
            level = 3;            
        }else if( bmi > '25' && bmi < 29 ){
            level = 4;  
        }else{
            level = 5;  
        };
        console.log(level)
        this.setState({
            bmi:bmi,
            level:level
        });
    };
    handleReset = (e) => {
        e.preventDefault();
        this.props.form.resetFields();
        this.setState({
            bmi:'',
            level:''
        });
    }
    render(){
        let i = this.state.level;
        const {getFieldDecorator} = this.props.form;
        return(
            <div className="bmibox" style={{marginTop:'80px'}}>
                <Form onSubmit={this.onSubmit}>
                    {/* <Row type="flex" justify="center" span={10}>
                        <Col>
                            <Input type="number" addonBefore="您的体重：" addonAfter="kg" />
                        </Col>
                    </Row>  */}
                    <Row type="flex" justify="center">
                        <Col span={10}>
                            {/* weight 声明变量可获取值 */}
                            {getFieldDecorator('weight', {
                                rules: [{ required: true, message: 'Please input your weight!' }],
                            })(
                            <Input prefix={<Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />} addonBefore="您的体重：" addonAfter="kg" />
                            )}
                        </Col>
                    </Row> 
                    {/* <Row type="flex" justify="center" span={10}>
                        <Col>
                            <Input type="number" addonBefore="您的身高：" addonAfter="cm"  />
                        </Col>
                    </Row>   */}
                    <Row type="flex" justify="center">
                        <Col span={10}>
                            {getFieldDecorator('height', {
                                rules: [{ required: true, message: 'Please input your height!' }],
                            })(
                            <Input prefix={<Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />} addonBefore="您的身高：" addonAfter="cm" />
                            )}
                        </Col>
                    </Row> 
                    <Row type="flex" justify="center">
                        <Col span={10}>
                            {/* 设置 button 原生的 type 值 */}
                            <Button style={{width:"50%"}} type="primary" htmlType="submit">计算</Button>
                            <Button style={{width:"50%"}} type="primary" onClick={(e)=>this.handleReset(e)}>重置</Button>
                        </Col>    
                        {/* <Col span={8}>
                            <Button type="primary" onClick={(e)=>this.handleReset(e)}>重置</Button>
                        </Col> */}
                    </Row> 
                    <Row type="flex" justify="center">
                        <Col span={10}>
                            <Card id="cardWrap">
                                <p className={i == 1 ? 'activeP' : ''}>偏瘦{'<18.5'}</p>
                                <p className={i == 2 ? 'activeP' : ''}>正常{'18.5-24.9'}</p>
                                <p className={i == 3 ? 'activeP' : ''}>超重{'18.5-24.9'}</p>
                                <p className={i == 4 ? 'activeP' : ''}>偏胖{'25.0-29.0'}</p>
                                <p className={i == 5 ? 'activeP' : ''}>肥胖{'18.5-24.9'}</p>
                            </Card>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
};
const Bmi = Form.create()(BmiBox);
export default Bmi;

