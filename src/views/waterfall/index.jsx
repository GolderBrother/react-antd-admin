import React from 'react';
import { imgUrlList } from './imgUrlList.js';
let waterfall = null;
export default class Waterfall extends React.Component {
    constructor(){
        super();
        this.state = {
            
        }
    }
    // 组件加载后，预加载图片
    componentDidMount() {
        this.loadImage(imgUrlList, this.wf)
    };
    // 组件销毁后，清空瀑布流对象
    componentWillMount() {
        waterfall = null;
    };
    // 图片预加载后的回调
    wf = () => {
        // 创建一个Waterfall 对象
        waterfall = new window.waterfall({
            number: 20,
            fixWidth: 1000,
            scrollElem: 'content'
        });
        // 监听加载事件，延时1000毫秒创建图片元素
        waterfall.on('load', () => {
            const $waterfall = document.getElementById('waterfall');
            imgUrlList.forEach((item, index) => {
                const $img = document.createElement('img');
                $img.setAttribute('src', item);
                $img.setAttribute('class', 'waterfall-box');
                $waterfall.appendChild($img)
            });
            waterfall.done()
        }, 1000)
    }
    /* 
    小解一下:img的complete跟onload的区别
    complete：无论img对象的src是否有值，成功与否，只要获取到image，就可以执行，
    而onload需要图片的加载完全(需要有图片的src值)，没有图片也就没有onload
    */
    // 实现图片的预加载
    loadImage = (urlList, callback) => {
        let count = 0;      // Image对象创建成功(图片必须有src)
        let completeCount = 0;// Image对象创建成功(不管图片有无src)
        urlList.forEach((item, index) => {
            const img = new Image();//创建一个Image对象，实现图片的预下载
            img.src = item;
            if (img.complete) {
                completeCount++
            } else {
                img.onload = () => {
                    count++;
                    if (count == urlList.length) {
                        callback()
                    }
                }
            };
        })
        if (completeCount == urlList.length) {
            callback()
        }

    }

    render() {
        return (
            <div id='waterfall'>
                {
                    imgUrlList.map((item, index) => (
                        <img key={index} src={item} className="waterfall-box" alt="waterfall" />
                    ))
                }
            </div>
        )
    }
}