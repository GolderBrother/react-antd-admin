// 引入express和mysql
const express = require('express');
const mysql = require('mysql');
const common = require('../libs/common');
// 连接mysql数据库
const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'root',
    database:'react_cms_db'
});
module.exports = () => {
    const route = express.Router();
    //注册接口
    route.post('/register',(req,res) => {
        let userObj = {};
        for(let obj in req.body){
            userObj = JSON.parse(obj)
        };
        let username = userObj.username;
        let password = userObj.password;
        let telephone = userObj.telephone;
        console.log(username,password,telephone);
        password = common.md5(password + common.MD5_SUFFXIE);
        if(username && password && telephone){
            const regSql = `insert into c_user(username,password,telephone) values('${username}','${password}','${telephone}')`;
            console.log(regSql);
            db.query(regSql,(err,data) => {
                if(err){
                    console.error(err);
                    res.status(500).send({'msg':'register failed' , status:'-1'}).end();
                }else {
                    console.log(data);
                    res.send({'msg':'register success' , status:'1'}).end();
                }
            })
        };
    });
    //注册前的账号验证接口
    route.post('/regVerify',(req,res) => {
        let userObj = {};
        for(let obj in req.body){
            userObj = JSON.parse(obj)
        };
        let username = userObj.username;
        const userVerifySql = `select count(*) as count from c_user where username = '${username}';`;
        db.query(userVerifySql,(err,data) => {
            console.log(userVerifySql,data);
            if(err){
                res.send({'msg':'database error','status':'-1'}).end();
            }else {
                if(data[0].count>0){
                    res.send({'msg':'this user is registered','status':'0'}).end();
                }else{
                    // telVerify
                    let telephone = userObj.telephone;
                    const telVerifySql = `select count(*) as count from c_user where telephone = '${telephone}';`;
                    db.query(telVerifySql,(err,data) => {
                        console.log("err:"+err,"data:"+data);
                        if(err){
                            res.send({'msg':'database error','status':'-1'}).end();
                        }else{
                            if(data[0].count>0){
                                res.send({'msg':'this telphone is regiStered','status':'0'}).end();
                            }else{
                                console.log('can register')
                                res.send({'msg':'can register','status':'1'}).end();
                            }
                        }
                    })
                }; 
            }
        })
    });
    //登陆接口
    route.post('/login',(req,res) => {
        let userObj = {};
        for(let obj in req.body){
            userObj = JSON.parse(obj);
        };
        console.log(userObj);
        let username = userObj.username;
        let password = userObj.password;
        const userSql = `select count(*) as count from c_user where username = '${username}'`;
        db.query(userSql,(err,data) => {
            if(err){
                console.log('database error!');
                res.status(500).send({'msg':'database error!','status':'-1'}).end();
            }else {
                // 查找用户名是否存在
                console.log(data);
                if(data[0].count == 0){
                    res.send({'msg':'this user does not exist','status':'-1'}).end();
                }else{
                    password = common.md5(password + common.MD5_SUFFXIE);
                    const userVerifySql = `select count(*) as count2 from c_user where username = '${username}' and password = '${password}'`;
                    console.log(userVerifySql);
                    db.query(userVerifySql,(err,data) => {
                        if(err){
                            res.status(500).send({'msg':'database error!','status':'-1'}).end();
                        }else{
                            console.log(data);
                            //查看密码是否正确
                            if(data[0].count2>0){
                                res.send({'msg':'login success','status':'1'}).end();  
                            }else{
                                res.send({'msg':'this password is incorrect','status':'-2'}).end();
                            }
                        }
                    })
                };
            }
        })
    });
    //更改密码接口
    route.post('/changePwd',(req,res) => {
        let userObj = {};
        for(let obj in req.body){
            userObj = JSON.parse(obj);
        };
        console.log(userObj);
        let username = userObj.username;
        let telephone = userObj.telephone;
        let newPassword = userObj.newpassword;
        // password = common.md5(password + common.MD5_SUFFXIE);
        const userVefifySql = `select count(*) as count from c_user where username = '${username}' and telephone = '${telephone}'`
        db.query(userVefifySql,(err,data) => {
            console.log(userVefifySql,data);
            if(err){
                return res.send({'msg':'internal service error','status':'-2'}).end();
            }else{
                if(data[0].count>0){
                    console.log('user verify success');
                    newPassword = common.md5(newPassword + common.MD5_SUFFXIE);
                    const changePwdSql = `update c_user set password = '${newPassword}' where username = '${username}'`;
                    console.log(changePwdSql);
                    db.query(changePwdSql,(err,data) => {
                        if(err){
                            return res.send({'msg':'internal service error','status':'-2'});
                        }else{
                            console.log(data);
                            return res.send({'msg':'change password success','status':'1'});
                        }
                    })
                }else{
                    return res.send({'msg':'This user is not exist','status':'-1'}).end();
                }
            }
        })
    })
    return route;
};
