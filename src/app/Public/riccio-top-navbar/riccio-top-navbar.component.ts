import {
	Component,
	OnInit,
	Input,
	ElementRef,
	Output,
	EventEmitter,
	OnChanges,
	OnDestroy,
	SimpleChanges,
	ViewChild
} from '@angular/core'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router'
import { $WebSocket, WebSocketSendMode } from 'angular2-websocket/angular2-websocket'
import { Subscription }  from 'rxjs/Subscription'

import { menu } from './menu'

import { GrMembersService } from '@gr-api-service/grMembers/grMembers.service'
import { RiccioPboxService } from '@gr-public/riccio-pbox/riccio-pbox.service'
import { LoginService }		from '@gr-public/Login/Login.service'
import { RiccioTopNavbarService }		from './riccio-top-navbar.service'

@Component({
	selector: 'app-riccio-top-navbar',
	templateUrl: './riccio-top-navbar.component.html',
	styleUrls: ['./riccio-top-navbar.component.scss']
})

export class RiccioTopNavbarComponent implements OnInit, OnDestroy {
	@ViewChild('charge') charge: ElementRef
	@ViewChild('userInfoEle') userInfoEle: ElementRef
	@ViewChild('comMenuEle') comMenuEle: ElementRef

	@Input() logoSrc: string                  // 企业logo
	@Input() navName: string               // 标题名称
	@Input() navMenu: Array<menu>[] = []   // 菜单列表数组，需包含name,routerlink,icon 
	@Input() userName: string              // 用户名
	@Input() notifyCount: number        //消息数量
    @Input() companyName: string 		//公司名称
    @Input() companyMenu:any[]

	public noLogo: boolean
	public pboxObs: any

	public navbarRX$:Subscription

	// public ws = new $WebSocket('ws://localhost:4200')


		
	constructor(
		private router: Router,
		private activatedRoute:ActivatedRoute,
		private titleService:Title,
		private riccioPboxService: RiccioPboxService,
		private grMembersService: GrMembersService,
		private loginService:LoginService,
		private riccioTopNavbarService:RiccioTopNavbarService
	) {
		this.navName = ''
		this.userName = ''
		this.navMenu = this.handleMenu(this.navMenu)
		this.logoSrc = ''
		this.companyName = ''
		this.notifyCount ? this.notifyCount = 0 : {}


		// this.ws.onMessage(
		//     (msg: MessageEvent)=> {
		//         console.log("onMessage ", msg.data);
		//     },
		//     {autoApply: false}
		// );

		// this.ws.getDataStream().subscribe(
		//     (msg)=> {
		//         console.log("next", msg.data);
		//         this.ws.close(false);
		//     },
		//     (msg)=> {
		//         console.log("error", msg);
		//     },
		//     ()=> {
		//         console.log("complete");
		//     }
		// );

		this.navbarRX$ = this.riccioTopNavbarService.getSubject().subscribe(res=>{
			console.log(res)	
        })


	}

	ngOnInit() {
		this.pboxObs = this.riccioPboxService.getEmit().subscribe(res => {
			this.resolvePbox(res)
		})

	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['navMenu']) {
			this.navMenu = this.handleMenu(this.navMenu)
		}
		if(changes['navName']) {
			if(this.companyName == ''){
				this.titleService.setTitle(`${this.navName} - ${window['setting']['sitename']}`)
			}else{
				this.titleService.setTitle(this.navName?`${this.navName} - ${this.companyName} - ${window['setting']['sitename']}`:`加载中 - ${this.companyName} - ${window['setting']['sitename']}`)
			}
		}
		// if(changes['notifyCount']){
		// 	if(changes['notifyCount'].currentValue == 0){
		// 		this.titleService.setTitle(`${this.navName} - ${window['sitename']}`)
		// 	}else{
		// 		this.titleService.setTitle(`(${changes['notifyCount'].currentValue} 条消息) ${this.navName} - ${window['sitename']}`)
		// 	}
			
		// }
	}

	ngOnDestroy() {
		this.pboxObs ? this.pboxObs.unsubscribe() : {}
		this.navbarRX$.unsubscribe()
	}

	/**
	 * @author GR-03
	 * @copyright [copyright]
	 * @param     [param]
	 * @return    [return]
	 */
	public handleMenu(list: Array<menu>[]): Array<menu>[] {

		let arr = []

		for (let i = 0; i < list.length; i++) {
			arr.push(new menu(list[i]))
		}

		return arr

	}

	/**
	 * 处理pbox
	 * @param res 
	 * @author GR-05 
	 */
	public resolvePbox(res: any) {
		switch (res.type) {
			case 'commonCharge':
				this.resolveCharge(res.data.id)
				break
			case 'commonUserInfo':
				this.resolveUserInfo(res.data.id)
                break
            case 'comMenu':
                this.resolveComMenu(res.data.url)
                break
		}
	}

	/**
	 * 显示用户选项
	 * @param dataEl 
	 * @author GR-03
	 */
	public fnShowUserPbox(dataEl: any) {
		let position = this.userInfoEle.nativeElement.getBoundingClientRect()
		this.riccioPboxService.setSubject({
			'genre': 'option',
			'hover': true,    // 是否启动mouseout事件
			'el': dataEl,
			'type': 'commonUserInfo',
			'position': {
				left: position.left - (200 - position.width),
				top: position.top + 52,
				width: 200
			},
			'data': [
				{
					id: 0,
					name: '账户设置'
				},
				{
					id: 1,
					name: '切换企业'
				},
				{
					id: 2,
					name: '退出登陆'
				}
			]
		})
	}

	/**
	 * 处理用户选项卡事件
	 * @param res  
	 * @author GR-05
	 */
	public resolveUserInfo(type:number){
		switch (type) {
			case 0:
				//账户设置
				this.router.navigate(['Member', 'setting'])
				break
			case 1:
				//切换企业
				this.router.navigate(['Member', 'companies'])
				break
			case 2:
				//退出登录
				this.loginService.getLogout().subscribe(res=>{
					if(res.status===1){
						this.router.navigate(['login'])
					}
				},error=>{
					throw new Error(error)
				})
				break
		}
	}

	/**
	 * 加载logo失败事件
	 * @author GR-05
	 */
	public noImg() {
		this.noLogo = true
	}

	/**
	 * 通用消息跳转
	 * @author GR-05
	 */
	public fnGoToMessage() {
		this.router.navigate(['Console/message'])
	}

	/**
	 * 显示费用选项
	 * @author GR-05
	 */
	public fnShowCharge(el: any) {
		let position = this.charge.nativeElement.getBoundingClientRect()
		this.riccioPboxService.setSubject({
			'genre': 'option',
			'el': el,
			'hover':true,
			'type': 'commonCharge',
			'position': {
				left: position.left - (150 - position.width),
				top: position.top + 52,
				width: 150
			},
			'data': [
				{
					id: 0,
					name: '充值'
				},
				{
					id: 1,
					name: '收支'
				}
			]
		})
	}

	/**
	 * 处理费用选项点击
	 * @param type 
	 * @author GR-05
	 */
	public resolveCharge(type: number) {
		switch (type) {
			case 0:
				//前往充值
				this.router.navigate(['Console/account/recharge'])
				break
			case 1:
				//前往收支明细
				this.router.navigate(['Console/account/incomeExpense'])
				break
		}
    }
    
    /**
     * 显示企业下拉菜单
     * @author GR-05
     */
    public fnShowComMenu(el:any){
        let position = this.comMenuEle.nativeElement.getBoundingClientRect()
		this.riccioPboxService.setSubject({
			'genre': 'option',
			'el': el,
			'hover':true,
			'type': 'comMenu',
			'position': {
				left: position.left,
				top: position.top + 52,
				width: position.width
			},
			'data': this.companyMenu
        })
    }

    /**
	 * 处理企业下拉菜单选项点击
	 * @param type 
	 * @author GR-05
	 */
	public resolveComMenu(url: string) {
		this.router.navigate([`Console/${url}`])
    }

	/**
	 * @author GR-03
	 * @copyright 点击logo跳到首页
	 * @param     [param]
	 * @return    [return]
	 */
	public goHome():void{
		this.router.navigate(['Console/account/home'])
	}
}
