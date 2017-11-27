import { Component, OnInit, Input, OnChanges, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Subscription } from 'rxjs/Subscription'

import { RiccioBrowseService } from './riccio-browse.service'

let animations = {
	scale: trigger('scale', [
		state('void', style({
			transform:'scale(0)'
		})),
		state('*', style({
			transform:'scale(1)'
		})),
		transition('void <=> *', animate('200ms ease-out'))
	])
}

@Component({
	selector: 'app-riccio-browse',
	templateUrl: './riccio-browse.component.html',
	styleUrls: ['./riccio-browse.component.scss'],
	animations: [animations.scale]
})
export class RiccioBrowseComponent implements OnInit {

	@ViewChild('browse') public browse: ElementRef

	/*
	是否显示
	 */
	public isShow: boolean

	/**
	 * 需要显示图片地址字段
	 * @type {string}
	 */
	public src: string

	/**
	 * 可订阅的browse对象
	 * @type {Subscription}
	 */
	public browseRX$: Subscription

	/**
	 * 图片的最大宽度
	 * @type {string}
	 */
	public maxWidth: string | number

	//动画标示 
	scaleStatu: string

	constructor(
		public riccioBrowseService: RiccioBrowseService
	) {
		this.browseRX$ = this.riccioBrowseService.getSubject().subscribe(res => {

			this.isShow = Object.keys(res).length > 0 ? (() => {

				this.src = res['src'] ? res['src'] : ''

				this.maxWidth = document.body.offsetWidth * 0.8 < 1150 ? 1150 : document.body.offsetWidth * 0.8

				return true

			})() : false

		})
		this.scaleStatu = 'default'
	}

	ngOnInit() {
		this.scaleStatu = 'active'
	}

	ngOnDestroy() {
		this.browseRX$.unsubscribe()
	}


	/**
	 * @author GR-03
	 * @copyright 关闭视图
	 * @param     [param]
	 * @return    [return]
	 * @check     GR-05       GR-03
	 */
	public closeView(): void {
		this.src = ''
		this.isShow = false
		this.riccioBrowseService.setEmit({ type: 'close' })
	}

	/**
	 * @author GR-03
	 * @copyright 点击图片之外的地方关闭视图
	 * @param     [param]
	 * @return    [return]
	 * @check     GR-05       GR-03
	 */
	public fnClose(event: any): void {
		event.stopPropagation()
		let bool = true
		event.path.map(e => {
			if (e.nodeName === 'IMG' && e.id === 'browseImg') {
				return bool = false
			}
		})

		if (bool === true) {
			this.closeView()
		}

    }
    
    /**
     * 直接前往图片资源地址
     * @author GR-05
     */
    public toSrc(){
        window.open(this.src,'_blank')
    }

}
