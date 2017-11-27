import { Component, OnInit, ViewChild, ElementRef, OnChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { MenuItems } from './Admin.menu';

import { GrMenuListService } from './services'
import { AppService } from '../app.service'
import { AdminService } from './Admin.service'
import { LoginService } from '../Public/Login/Login.service'
import { PersonalService } from '../Public/Personal/personal.service'
import { RiccioSelectMembersService } from '../Public/riccio-select-members/riccio-select-members.service'
import { RiccioNotificationsService }    from '../Public/riccio-notifications/riccio-notifications.service'

import { animations } from 'app/Public/Animations'
import { environment } from '../../environments/environment'

@Component({
	selector: 'app-admin',
	templateUrl: './Admin.component.html',
	styleUrls: [
		'./Admin.component.scss',
		'./Admin.component.new.scss'
	],
	animations: [
		animations.accordion
	]
})

export class AdminComponent implements OnInit, OnDestroy {

	@ViewChild('mainBodySide') mainBodySide: any;
	@ViewChild('mainBody') mainBody: ElementRef;

	public navbar: boolean;
	//二级菜单监听
	public subMenuObj: any
	public menulist: MenuItems;
	public menuListChildren: MenuItems;
	public menuTitleRoute: string;
	public menuTitle: string;
	public showElastic: any;
	public MenuSymbol: number | string;  //用户标示当前选中的是哪一个一级菜单
	public menuRightBtn: Array<any>;  //根据最左边选中的菜单来固定显示某一个页面的右上角的固定按钮
	public isShowChildrenMenu: boolean;

	public isShowRiccioSelect: boolean;

	public windowUrl: any

	openBox: boolean

	constructor(
		public grMenuListService: GrMenuListService,
		public personalService: PersonalService,
		public activatedRoute: ActivatedRoute,
		public appService: AppService,
		private adminService: AdminService,
		private loginService:LoginService,
		public riccioSelectMembersService: RiccioSelectMembersService,
		public router: Router
	) {
		// this.windowUrl = this.appService.safeUrl(`${environment.iconUrl}iconfont/admin/iconfont.css?v=${window['statics_version']}`)
		this.windowUrl = this.appService.iconUrls.admin
		this.isShowRiccioSelect = false;
		this.isShowChildrenMenu = true;
		this.navbar = true;
		this.menulist = new MenuItems();
		this.menuListChildren = new MenuItems();
		this.MenuSymbol = 1;

		this.riccioSelectMembersService.getShowView().subscribe(bool => {
			this.isShowRiccioSelect = bool
		})

	}

	ngOnInit() {
		this.activatedRoute.data.subscribe(e => {
			let res = e.Menu.json();
			// 将得到的所有菜单数据存储在服务的变量里面
			this.grMenuListService.AllMenuListData = res;
			this.menulist.data = res.data;
			// this.GetMenuList(this.MenuSymbol);

		})

		/**
		 * 刷新页面二级菜单显示与否
		 * @author GR-03
		 * @check GR-05
		 */
		this.activatedRoute.firstChild.url.subscribe(res => {
			// this.GetMenuList(this.MenuSymbol);
			if (res[0]['path'] === 'task' || res[0]['path'] === 'menu' || res[0]['path'] === 'role' || res[0]['path'] === 'adminuser' || res[0]['path'] === 'members') {
				this.isShowChildrenMenu = false;
			}
			else if (res[0]['path'] === 'config') {
				this.GetMenuList(1)
			}
			else if (res[0]['path'] === 'company') {
				//企业与用户
				this.GetMenuList(this.grMenuListService.AllMenuListData.data[1].id)
				this.isShowChildrenMenu = true
			}else if (res[0]['path'] === 'setting'){
			  this.isShowChildrenMenu = false;
      }
			else {
				this.grMenuListService.AllMenuListData.data.forEach(e => {
					if (e['url'] == res[0]['path']) {
						if (e['chilren'] == 0) {
							this.isShowChildrenMenu = false
						}
						else {
							this.isShowChildrenMenu = true
						}
						return this.GetMenuList(e['id']);
					}
				})
			}
		})

		/**
		 * 监听路由变化  二级菜单显示与否
		 * @author GR-05
		 * @check GR-03
		 */
		this.activatedRoute.url.subscribe(res => {
			let childUrl = this.activatedRoute.firstChild.url['value'][0].path
			if (childUrl === 'adminuser') {
				this.isShowChildrenMenu = false
			} else if (childUrl === 'company') {
				this.isShowChildrenMenu = true
			} else if (childUrl === 'user') {
				this.GetMenuList(this.grMenuListService.AllMenuListData.data[1].id)
				this.isShowChildrenMenu = true
			} else if (childUrl === 'assist') {
				this.isShowChildrenMenu = false
			}
		})

		this.subMenuObj = this.adminService.subMenuObj.subscribe(res => {
			this.isShowChildrenMenu = res
		})

		this.showElastic = this.personalService.ViewData;

		//保存loading的布尔字段在session临时保存用以取消loading效果
		/*
		*
		*警告！首组件必须写这句
		*
		*不要问为什么！写就是了
		*
		*sessionStorage.setItem('loading','false')
		*
		*/
		sessionStorage.setItem('loading', 'false')

	}

	ngOnChanges() {
		this.showElastic = this.personalService.ViewData
	}

	ngOnDestroy() {
		this.subMenuObj ? this.subMenuObj.unsubscribe() : {}
	}

	//获取二级导航栏列表
	public GetMenuList(id: number | string): void {
		Array.from(this.menulist.data).map((e, i) => {
			if (e['id'] == id && e['chilren'].length != 0) {
				this.menuTitle = e['name']
				return this.menuListChildren.data = e['chilren']
			}
		})



		//用来判断是否需要下拉
		this.menuListChildren.data.forEach((e, i) => {
			if (e['chilren'].filter(el => el['is_left'] != 2).length > 0) {
				return e['is_down'] = true;
			}
			else {
				return e['is_down'] = false;
			}
		})

	}

	//选中的菜单方法跳转到路由
	public FnSelectMenu(list: any): void {
		if (this.isShowChildrenMenu === false && list.chilren.length !== 0) {
			this.isShowChildrenMenu = true
		}
		this.MenuSymbol = list.id;
		this.GetMenuList(list.id);
		let _path = list['chilren'].length > 0 ? (() => {

			let isChilren = list.chilren[0]['is_down'];
			if (isChilren === true) {
				let path = list.chilren[0]['chilren'].filter(e => e['is_left'] != 2);
				return path[0].url;
			}
			return list.chilren[0].url
		})()
			: (() => {
				this.isShowChildrenMenu = false;
				return list['url']
			})();

		if (list.id === 16 && list.url === 'appcenter') {
			_path = 'appcenter/list'
		}
		// if(list.id===21&&list.url==='addoncenter'){
		//   _path = 'addoncenter'
		// }

		console.log(_path)


		this.router.navigateByUrl("Admin/" + _path);

		//点击一次请求获取最新的菜单信息
		this.grMenuListService.getAdminMenu()
			.subscribe(res => {
				this.menulist.data = res.data;
			})

	}


	//弹出帐号资料修改组件视图
	public showModify(): void {

		this.router.navigate(['Members', 'setting'])

	}


	//退出登录事件
	public FnLoginOut(): void {

		//退出登录
		this.loginService.getLogout().subscribe(res=>{
			if(res.status===1){
				this.router.navigate(['login'])
			}
		},error=>{
			throw new Error(error)
		})

	}

	//点击菜单栏伸缩按钮展开和伸缩二级导航视图
	public FnNavber(): void {
		this.navbar = !this.navbar;
		let Side = this.mainBodySide.nativeElement;
		let SideMody = this.mainBody.nativeElement;
		Side.style.width = this.navbar === true ? '230px' : '0';
		SideMody.style.width = this.navbar === true ? '230px' : '0';
	}
}
