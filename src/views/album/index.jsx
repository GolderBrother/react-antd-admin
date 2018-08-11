/**
 * Created by james.zhang on 2018/6/16.
 */
import React, { Component } from 'react';
import { Row, Col, Card, BackTop } from 'antd';
import BackToTop from '@/components/backToTop';
import PhotoSwipe from 'photoSwipe'
import PhotoswipeUIDefault from 'photoswipe/dist/photoswipe-ui-default'
import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';
import { imgData } from '@/utils/albumImgData.js';
// JavaScript gallery, no dependencies. 展示图片、全屏、放大缩小、相册用的。

export default class Gallery extends React.Component {
	constructor(){
		super();
		this.state = {
			gallery:null
		}
	}
	// 组件销毁后，关闭画册功能
	componentWillMount = () => {
		this.closeGallery();
	}
	// 开启画册功能 PhotoSwipe
	openGallery = (item) => {
		console.log(this.$refs)
		// build items array
		const items = [
			{
				src: item,
				w: 0,
				h: 0
			}
		];
		const pswpElement = this.pswpElement;
		const options = { index: 0 };
		this.gallery = new PhotoSwipe(pswpElement, PhotoswipeUIDefault, items, options);
		this.gallery.listen('gettingData', (index, item) => {
			const _this = this;
			if (item.w < 1 || item.height < 1) {
				let img = new Image();
				img.onLoad = () => {
					item.w = this.w;
					item.h = this.h;
					_this.gallery.invalidateCurrItems()
					_this.gallery.updateSize(true) //update gallery size
				}
				img.src = item.src;
			}
		})
		this.gallery.init()
	};
	// 关闭画册功能
	closeGallery = () => {
		if (!this.gallery) return;
		this.gallery.close()
	};
	render() {
		const imgs = imgData;
		const imgItems = imgs.map((item1, index1) => (
			item1.map((item2, index2) => (
				<div key={index1 * index2} className="cloud-box">
					<Card key={index1 * index2} bordered={true} bodyStyle={{ padding: 0 }}>
						<div>
							<img onClick={() => this.openGallery(item2)} alt="example" width="100%" src={item2} />
						</div>
						<div className="pa-m">
							<h3>React Admin</h3>
							<small><a href="https://github.com/GolderBrother/" target="_blank" rel='noopener noreferrer'>>https://github.com/GolderBrother</a></small>
						</div>
					</Card>
				</div>
			))
		));
		return (
			<div className="gallery-box">
				{/* gutter间距 */}
				<Row gutter={10}>
					<Col xs={8} sm={8} md={8} lg={5}>
						{imgItems[0]}
					</Col>
					<Col xs={8} sm={8} md={8} lg={5}>
						{imgItems[1]}
					</Col>
					<Col xs={8} sm={8} md={8} lg={5}>
						{imgItems[2]}
					</Col>
					<Col xs={8} sm={8} md={8} lg={5}>
						{imgItems[3]}
					</Col>
					<Col xs={8} sm={8} md={8} lg={5}>
						{imgItems[4]}
					</Col>
				</Row>
				<BackToTop />
				{/* Open PhotoSwipe */}
				<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true" ref={div => this.pswpElement = div}>

					<div class="pswp__bg" />

					<div class="pswp__scroll-wrap">

						{/* Container that holds slides. PhotoSwipe keeps only 3 slides in DOM to save memory. */}
						<div class="pswp__container">
							{/* don't modify these 3 pswp__item elements, data is added later on */}
							<div class="pswp__item"></div>
							<div class="pswp__item"></div>
							<div class="pswp__item"></div>
						</div>

						{/* Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. */}
						<div class="pswp__ui pswp__ui--hidden">

							<div class="pswp__top-bar">

								{/* Controls are self-explanatory. Order can be changed. */}

								<div class="pswp__counter"></div>

								<button class="pswp__button pswp__button--close" title="Close (Esc)"></button>

								<button class="pswp__button pswp__button--share" title="Share"></button>

								<button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>

								<button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

								{/* Preloader demo https://codepen.io/dimsemenov/pen/yyBWoR */}
								{/* element will get class pswp__preloader--active when preloader is running */}
								<div class="pswp__preloader">
									<div class="pswp__preloader__icn">
										<div class="pswp__preloader__cut">
											<div class="pswp__preloader__donut"></div>
										</div>
									</div>
								</div>
							</div>

							<div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
								<div class="pswp__share-tooltip"></div>
							</div>

							<button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
							</button>

							<button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
							</button>

							<div class="pswp__caption">
								<div class="pswp__caption__center"></div>
							</div>

						</div>

					</div>

				</div>
			</div >
		)
	}
}