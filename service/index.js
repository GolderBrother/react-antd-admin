const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const mysql = require('mysql');
const server = express();

// 解析body请求参数
server.use(bodyParser.urlencoded({ extended:false }));
// const request header
server.all('*',function(req,res,next) {
    //解决跨域问题 
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods','PUT,GET,POST,DELETE,OPTIONS');
    if(req.method == 'OPTIONS'){
        res.send(200);
    }else{
        // 继续执行后面的方法 
        next();
    };
})
server.listen(8000,() => {
    console.log('This node server is linten on:8000');
});

// deal cookieParser cookieSession
(() => {
    // cookie-parser是将cookie的值由字符串解析成对象的中间件
    server.use(cookieParser());
    server.get('/',(req,res) => {
        console.log('cookie:'+req.cookies);
    });
    // 设置cookieSession
    let keyArr = [];
    for(let i = 0;i<100000;i++){
        keyArr[i] = 'xsa_' + Math.random() * 100 + i;
    };
    server.use(cookieSession({
        name:'sessionDemo',
        keys:keyArr,
        maxAge:30*30*60
    }));
})();

// deal router
server.use('/', require('./route/index.js')());
