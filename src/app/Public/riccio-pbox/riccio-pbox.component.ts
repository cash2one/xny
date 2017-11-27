import {
	Component,
	OnInit,
	ViewChild,
	ElementRef, 
	HostListener,
	OnDestroy,
	Renderer,
	Input,
	Output,
	EventEmitter,
	OnChanges,
	SimpleChanges
} from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

import { RiccioPboxService } from './riccio-pbox.service'
import { RiccioPboxData } from './riccio-pboxData'

@Component({
	selector: 'app-riccio-pbox',
	templateUrl: './riccio-pbox.component.html',
	styleUrls: ['../../Console/Console.component.scss', './riccio-pbox.component.scss'],
	animations: [
		trigger('accordion', [
			state('in', style({ height: '*' })),
			state('*', style({ height: 0 })),
			transition('in => *', [
				style({ height: '*' }),
				animate(100, style({ height: 0 }))
			]),
			transition('* => in', [
				style({ height: 0 }),
				animate(100, style({ height: "*" }))
			])
		])
	]
}) 
export class RiccioPboxComponent implements OnInit {

	@Input() public openSearch:boolean   // 是否打开搜索功能
	@Input() public inputData:Array<any> = []  // 传入需要遍历的data字段，建议打开openSearch之后再传入该值
	@Output() public emitSearch:EventEmitter<string>
	@ViewChild('Select') Select: any

	public genre: string   //重要！ 用来判断pbox组件显示什么弹窗提示内容
	public isShow: boolean;

	public position: any;
	public data: Array<any>;
	public type: string;
	public dataEl: any;

	public deleteData: any;

	public RXSubject: any;

	public timeOut:any

	/*
	是否开始鼠标移入关闭字段
	 */
	public hoverClose:boolean

	constructor(
		public riccioPboxService: RiccioPboxService,
		public el: ElementRef,
		private renderer: Renderer
	) {
		this.deleteData = new RiccioPboxData().deleteData;
		this.genre = 'option';
		this.dataEl = this.el.nativeElement;
		this.isShow = false;
		this.data = [];
		this.position = new RiccioPboxData().position;
		this.emitSearch = new EventEmitter<string>()
		this.openSearch = false
		this.hoverClose = false

		this.RXSubject = this.riccioPboxService.getSubject().subscribe((res) => {

			this.isShow = Object.keys(res).length === 0 ? false : (() => {

				this.genre = res['genre'] ? res['genre'] : 'option';

				this.dataEl = res['el'] ? res['el'] : this.el;
				this.position = res['position'] ? res['position'] : new RiccioPboxData().position;
				this.type = res['type'] ? res['type'] : "";
				this.hoverClose = res['hover'] ? res['hover']: false

				switch (this.genre) {
					case "option":
						(() => {
							this.data = res['data'] ? [...res['data']] : [];
						})()
						break;

					case "delete":
						(() => {
							this.deleteData = res['data'] ? res['data'] : new RiccioPboxData().deleteData;
						})()
						break;

					default: break;

				}

				let WindowWidth = document.body.offsetWidth;
				let WindowHeight = document.body.offsetHeight;

				setTimeout(() => {
					if (this.Select) {
						let selectWidth = this.Select.nativeElement.offsetWidth;
						let selectHeight = this.Select.nativeElement.offsetHeight;

						if (res['position'].left > (WindowWidth - selectWidth)) {
							this.position.left = WindowWidth - selectWidth;
						};

						if (res['position'].top > (WindowHeight - selectHeight)) {
							this.position.top = WindowHeight - selectHeight;
						};
					}
				}, 200)
				

				/*
				若openSearch为true
				则默认显示该组件的时候就返回空值
				 */
				this.emitSearch.emit('')

				return true
			})();
		})

	}

	ngOnInit() {
	}

	ngOnChanges( changes:SimpleChanges ) {
		if( this.inputData && this.inputData.length>0 ) {
			this.data = [...this.inputData]
		}

	}

	ngOnDestroy() { this.RXSubject.unsubscribe(); }

	@HostListener('document:click', ['$event'])
	OnClick(event): void {
		if (this.isShow === true) {

			let bools = false;
			//兼容safari
			let path = event.path || (event.composedPath && event.composedPath())

			// path.map(e => {
			// 	console.log('yici')
			// 	if (e['outerHTML'] === this.Select.nativeElement['outerHTML'] || e['outerHTML'] === this.dataEl['outerHTML']) {
			// 		return bools = true;
			// 	}
			// });

			//减少循环次数
			for (let i = 0; i < path.length; i++) {
				if (path[i]['outerHTML'] === this.Select.nativeElement['outerHTML'] || path[i]['outerHTML'] === this.dataEl['outerHTML']) {
					bools = true
					break
				}
			}

			if (bools === false) {
				setTimeout(() => {
					this.Close()
				})
			}

		}
	}

	@HostListener('document:mousemove', ['$event'])
	OnMove(event): void {
		if (this.isShow === true && this.hoverClose === true) {

			let bools = false;
			//兼容safari
			let path = event.path || (event.composedPath && event.composedPath())

			//减少循环次数
			for (let i = 0; i < path.length; i++) {
				if (path[i]['outerHTML'] === this.Select.nativeElement['outerHTML'] || path[i]['outerHTML'] === this.dataEl['outerHTML']) {
					bools = true
					break
				}
			}

			if (bools === false) {
				setTimeout(() => {
					this.Close()
				})
			}

		}
	}

	//弹出数据
	public FnEmitData(list: any): void {
		this.riccioPboxService.setEmit({ type: this.type, data: list })
		this.riccioPboxService.setSubject({})
	}

	//点击取消或者关闭按钮
	public Close(): void {
		this.riccioPboxService.setSubject({})
		this.riccioPboxService.setEmit({ type: 'close' })
	}

	/**
	 * @author GR-03
	 * @copyright 获取元素离屏幕浏览器的偏移量
	 * @param     [param]
	 * @return    [return]
	 * @return    {any}       [description]
	 */
	getClient(el: any): any {
		return el.getBoundingClientRect()
	}

	/**
	 * @author GR-03
	 * @copyright 搜索延迟返回数据
	 * @param     [param]
	 * @return    [return]
	 * @param     {string}    value [description]
	 */
	public fnEmitSearchTimeout(value:string):void{
		if(this.timeOut) clearTimeout(this.timeOut)

		this.timeOut = setTimeout(()=>{
			this.emitSearch.emit(value)
		},700)

	}

	/**
	 * @author GR-03
	 * @copyright 鼠标移出关闭pbox组件
	 * @param     [param]
	 * @return    [return]
	 */
	public fnHidePboxHover():void{
		if(this.hoverClose == true){
			this.Close()
		}
	}

}
