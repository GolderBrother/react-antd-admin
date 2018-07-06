import React from 'react';
import {Row,Col,Card,Input} from 'antd';
class House extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title:'house',
            rent:'',
            year:'',
            rentAll:'',
            buyAll:'',
            moneyDiff:'',
            suggest:''
        }
    };
    // 改变数据是异步的，因此会先执行后面的方法，可以把要执行的方法放在回掉函数中执行
    handleRent = (e) => {
        const rentVal = e.target.value;
        this.setState({rent:rentVal},()=>this.handleRentAll());
    };
    handleYear = (e) => {
        const yearAll = e.target.value;
        this.setState({year:yearAll},()=>this.handleRentAll());
    };
    handleRentAll = () => {
        const rentAllVal = this.state.rent * '10' * this.state.year/10000;
        this.setState({rentAll:rentAllVal});
    };
    handleBuy = (e) => {
        const buyAll = e.target.value;
        this.setState({buyAll:buyAll});
        const moneyDiff = this.state.buyAll - this.state.rentAll
        this.setState({moneyDiff:moneyDiff});
        if(moneyDiff>0){
            this.setState({suggest:'租房更划算哦！'});
        }else if( moneyDiff ===0 ){
            this.setState({suggest:'大兄弟，还是洗洗睡吧！'});            
        }else{
            this.setState({suggest:'可以，还是买房吧！'});                        
        }
    };
    render(){
        return(
            <div style={{marginTop:'80px'}}>
                <Row type="flex" justify="center" className="rowItem">
                    <Col>
                        <h2>{this.state.title}</h2>
                    </Col>
                </Row>
                <Row type="flex" justify="center" className="rowItem">
                    <Col span={10}>
                        <Input type="number" addonBefore="预计租金：" addonAfter="元/月" onChange={(e)=>{this.handleRent(e)}} />
                    </Col>
                </Row>
                <Row type="flex" justify="center" className="rowItem">
                    <Col span={10}>
                        <Input type="number" addonBefore="预计年数：" addonAfter="年" onChange={(e)=>{this.handleYear(e)}} />
                    </Col>
                </Row>
                <Row type="flex" justify="center" className="rowItem">
                    <Col span={10}>
                        <Input disabled addonBefore="租房合计：" addonAfter="万" value={this.state.rentAll} />
                    </Col>
                </Row>
                <Row type="flex" justify="center" className="rowItem">
                    <Col span={10}>
                        <Input addonBefore="买房合计：" addonAfter="万" onChange={(e) => this.handleBuy(e)} value={this.state.buyAll} />
                    </Col>
                </Row>
                <Row type="flex" justify="center" className="rowItem">
                    <Col span={10}>
                        <Input addonBefore="买房 - 租房" addonAfter="万" value={this.state.moneyDiff} />
                    </Col>
                </Row>
                <Row type="flex" justify="center" className="rowItem">
                    <Col span={10}>
                        <Card bodyStyle={{padding:'20px',fontSize:'14px'}}>
                            <p>砖家建议：{this.state.suggest}</p>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
};
export default House;