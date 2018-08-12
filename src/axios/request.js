/**
 * Created by james on 2018/6/30.
 * http通用工具函数
 */
import axios from 'axios';
import {
    message
} from 'antd';
import qs from 'qs';
import 'es6-promise';


axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

/**
 * 公用get请求
 * @param url       接口地址
 * @param msg       接口异常提示
 * @param headers   接口所需header配置(可选)
 * @return Promise
 */
export const get = ({
    url,
    params,
    msg = '接口异常',
    headers = {}
}) => {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }, headers).then(res => resolve(res.data)).catch(err => {
            console.log(err);
            message.warn(msg);
            reject(err);
        });
    })

}


/**
 * 公用post请求
 * @param url       接口地址
 * @param data      接口参数
 * @param msg       接口异常提示
 * @param headers   接口所需header配置(可选)
 * @return Promise
 */
export const post = ({url, data, msg = '接口异常', headers = {}}) => {
    return new Promise((resolve, reject) => {
        axios.post(url, data,headers).then(res => resolve(res)).catch(err => {
            console.log(err);
            message.warn(msg);
            reject(err);
        });
    })
}

// 拦截请求
let hasLoading = false;
axios.interceptors.request.use(function (config) {
    message.loading('Action in progress..', 0);
    return config;
})

// 拦截响应
axios.interceptors.response.use(function (config) {
    // 销毁组件
    message.destroy();
    return config;
})