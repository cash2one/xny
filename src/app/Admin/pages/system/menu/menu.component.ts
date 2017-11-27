import {
	Component,
	OnInit,
	OnDestroy,
	DoCheck,
	ElementRef,
	ViewChild,
	ViewContainerRef
} from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';
import { environment } from '../../../../../environments/environment'

declare var require: any

import { MenuData } from './menu.menu'
import { BreadCrumbData } from '../../../../Public/riccio-breadcrumb/riccio-breadcrumb.data'

import { GrMenuListService } from 'app/Admin/services'
import { GrAppcenterService } from '../../../services/grAppcenter/grAppcenter.service'
import { AppService } from '../../../../app.service'
import { PersonalService } from '../../../../Public/Personal/personal.service'
import { AddToService } from './add-to/add-to.service'
import { SystemService } from '../system.service'
import { RiccioPboxService } from '../../../../Public/riccio-pbox/riccio-pbox.service'
import { RiccioLoadingService } from '../../../../Public/riccio-loading/riccio-loading.service'
import { RiccioNotificationsService } from '../../../../Public/riccio-notifications/riccio-notifications.service'
import { RiccioModalService } from '../../../../Public/riccio-modal/riccio-modal.service'
import { ShowDetailService } from '../../../show-detail/show-detail.service'
import { Conf } from '../../../show-detail/show-detail.data'

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: [
		'../../../Admin.component.scss',
		// './menu.component.scss',
		'../../page.common.scss',
		'./menu.component.new.scss'
	]
})
export class MenuComponent implements OnInit, OnDestroy {
	@ViewChild('clickTb', { read: ViewContainerRef }) clickTb: ViewContainerRef;
	public MenuData: MenuData;
	public affiliatedTeam: any;
	public MenuEditData: any;
	public MenuAddShow: Array<any>;
	public titleList: Array<string>;
	public ShowConfirm: any;
	public btnModel: Array<any>;
	public ActiveModel: string;
	public MenuDataOnly: any;
	public MenuRight: Array<any>;
	//父级菜单的id
	public parentID: string | number;
	//loading
	public loading: any;
	public isSort: number | string;

	//model和cid
	public routerModel: string;
	public routerCid: string;
	public routerStatus: string;

	//最后一节面包屑
	public menuBread: string
	public addTitle: string = '添加菜单'; //添加文字


	//显示详情配置
	public showDetailConf: Conf
	//详情模版
	public showDetailData: Array<any>

	//tab聚焦
	public goModelType: string

	public pboxObj: any
	public modalObj: any

	//刷新按钮刷新动画
	public refresh: boolean

	//icon图标路径
	public windowUrl: any

	//图标模块标示
	public iconGroup: string

	//modal类型
	public showType: string

	//面包屑数据
	public breadData: BreadCrumbData[]
	public modalNames:any

	constructor(
		public activatedRoute: ActivatedRoute,
		public router: Router,
		public grMenuListService: GrMenuListService,
		public grAppcenterService: GrAppcenterService,
		public appService: AppService,
		public addToService: AddToService,
		public systemService: SystemService,
		public personalService: PersonalService,
		public showDetailService: ShowDetailService,
		public riccioPboxService: RiccioPboxService,
		public riccioLoadingService: RiccioLoadingService,
		public riccioNotificationsService: RiccioNotificationsService,
		private riccioModalService: RiccioModalService
	) {
		this.MenuRight = [];
		this.ActiveModel = "Admin";
		this.MenuData = new MenuData();
		this.MenuEditData = new MenuData().editData;
		this.MenuAddShow = new MenuData().addShow;
		this.affiliatedTeam = new MenuData().affiliatedTeam;
		this.titleList = new MenuData().titleList
		this.isSort = -1;
		this.showDetailData = new MenuData().showDetailData
		this.modalNames = new MenuData().modelNames
		this.goModelType = 'menu'

		this.MenuDataOnly = {
			title: '',
			data: {}
		};

		this.ShowConfirm = {
			isShow: false,
			menu_id: '',
			position: {
				left: 0,
				top: 0
			}
		};

		this.loading = {
			bool: true,
			text: ''
		}

		this.routerModel = '';
		this.routerCid = '';
		this.routerStatus = '';

		this.addToService.getSubject()
			.subscribe(res => {
				this.showType = ''
				this.riccioModalService.setSubject({})
				this.FnGetMenuEdit(this.routerModel, this.routerCid, this.routerStatus)
			})

	}

	ngOnInit() {
		this.activatedRoute.params.subscribe(res => {
			this.routerModel = res.model;
			this.routerCid = res.cid;
			this.routerStatus = res.status;
			this.addTitle = res.status == 1 ? '添加菜单' : '添加选项卡';

			this.getAppInfo()

			//选项卡
			if (res.status == 2) {
				let listObj = {
					'model': this.routerModel,
					'cid': this.routerCid
				}
				this.goModelType = 'tab'
				this.loading.bool = true
				this.grMenuListService.postMenuTabList(listObj)
					.subscribe(res => {
						this.loading.bool = false
						if (res.data.length > 0) {
							this.loading.bool = false
						}
						else if (res.data.length == 0) {
							this.loading.text = 'null'
						}
						this.MenuEditData = res.data
						for (let i = 2; i <= 10; i++) {
							let levelData = this.MenuEditData.filter(e => e['level'] === i)
							if (levelData.length > 0) levelData[levelData.length - 1]['isEnd'] = true;
						}
					})
			} else {
				this.FnGetMenuEdit(this.routerModel, this.routerCid, this.routerStatus)
			}

			this.addToService.cid = this.routerCid;
			this.addToService.modelName = this.routerModel;
			this.addToService.menuType = this.routerStatus;

			this.resolveBread()

		})

		//监听弹窗
		this.pboxObj = this.riccioPboxService.getEmit().subscribe(v => {
			if (v.type === 'delMenu') {
				//删除
				this.delMenu(v.data)
			}
		})

		//监听模态关闭
		this.modalObj = this.riccioModalService.getEmit().subscribe(v => {
			if (v.type === 'close') {
				this.showType = ''
			}
		})
	}

	ngOnDestroy() {
		this.pboxObj.unsubscribe()
		this.modalObj ? this.modalObj.unsubscribe() : {}
	}

	/**
	 * 处理面包屑数据
	 */
	public resolveBread() {
		this.breadData = [
			{ name: '应用管理', routerLink: '/Admin/appcenter/list' },
			{ name: this.modalNames[this.routerModel], routerLink: `/Admin/appcenter/${this.routerModel}` },
			{ name: '菜单管理' }
		]
	}

	/**
	 * 获取model对应应用的信息
	 */
	public getAppInfo() {
		this.grAppcenterService.postAppInfo({
			model: this.routerModel
		}).subscribe(res => {
			if (res.status === 1) {
				if (res.data.group !== 'admin') {
					// this.windowUrl = this.appService.safeUrl(`${environment.iconUrl}iconfont/${res.data.group}/iconfont.css?v=${window['statics_version']}`)
					this.windowUrl = this.appService.iconUrls[res.data.group]
				}
				this.iconGroup = res.data.group
			}
		})
	}


	public fnSortClick(list: any, e: MouseEvent) {
		e ? e.stopPropagation() : {}
		this.isSort = list.id
	}

	/**
	 * 点击显示详情
	 * @param list 单个菜单数据
	 * @author GR-05
	 * @check GR-03
	 */
	public fnShowDetail(list: any) {
		this.showDetailData.forEach((v, i, src) => {
			switch (v['flag']) {
				case 'is_left':
					src[i].value = (list.is_left == 1 ? '左侧菜单' : list.is_left == 2 ? '主内容右上切换菜单' : list.is_left == 3 ? '企业控制台应用配置选项卡' : '')
					break
				case 'fonticon':
					src[i].class = true
					src[i].value = list['fonticon']
					break
				case 'status':
					src[i].value = (list.status == 1 ? '显示' : '隐藏')
					break
				case 'type':
					src[i].value = (list.type == 1 ? '权限' : '菜单')
					break
				default:
					src[i].value = list[src[i].flag]
			}
		})
		this.showDetailConf = {
			top: 60,
			showList: this.showDetailData,
			title: list.name,
			expectClick: this.clickTb,
			headBtn: false
		}
		this.showDetailService.SetDetailConfSbj(this.showDetailConf)
	}

	/**
	 * 弹出删除
	 * @param e 点击事件
	 * @param el 点击元素
	 * @param list 菜单数据
	 */
	public fnShowDel(e: MouseEvent, el: any, list: any): void {
		e ? e.stopPropagation() : {}
		this.riccioPboxService.setSubject({
			genre: 'delete',
			el: el,
			position: {
				left: e.clientX,
				top: e.clientY,
				width: 240
			},
			type: 'delMenu',
			data: {
				title: '确定删除所选菜单？',
				button: '删除',
				delID: list.id
			}
		})
	}

	/**
	 * 删除菜单动作
	 * @param id 菜单id
	 */
	public delMenu(id: number) {
		this.riccioLoadingService.setLoading({
			message: '删除中'
		})
		this.grMenuListService.postDelMenu({
			'menu_id': id
		}).subscribe(res => {
			this.riccioLoadingService.closeLoading()
			if (res.status === 1) {
				this.riccioNotificationsService.setSubject({
					status: 'success',
					text: '删除成功'
				})
				this.FnGetMenuEdit(this.routerModel, this.routerCid, this.routerStatus)
			} else if (res.status === 0) {
				this.riccioNotificationsService.setSubject({
					status: 'danger',
					text: res.message
				})
			}
		})
	}

	public fnGoModel(type: string): void {
		this.goModelType = type
		switch (type) {
			case "menu":
				this.addTitle = '添加菜单';
				this.router.navigate(['/Admin/menu/list', 'model', this.routerModel, 'cid', this.routerCid, 'status', '1'])
				break;

			case "tab":
				this.addTitle = '添加选项卡';
				this.router.navigate(['/Admin/menu/list', 'model', this.routerModel, 'cid', this.routerCid, 'status', '2'])
				break;

			default: break;
		}
	}

	//获取菜单总列表的方法
	public FnGetMenuEdit(model: string = 'Admin', cid: string | number = '0', status: string | number = '1'): void {
		this.loading.bool = true
		let data = {
			model: this.routerModel != '' ? this.routerModel : 'Admin',
			cid: this.routerCid != '' ? this.routerCid : '0',
			type: this.routerStatus != '' ? this.routerStatus : '1'
		}
		this.grMenuListService.getMenuList(data).subscribe(res => {
			this.loading.bool = false
			if (res.data.length == 0) {
				this.loading.text = 'null'
			}
			this.MenuEditData = res.data
      console.log(this.MenuEditData)
			this.MenuEditData.map(res => {
				res['orderTemp'] = res.sort
			})

			for (let i = 2; i <= 10; i++) {
				let levelData = this.MenuEditData.filter(e => e['level'] === i)
				if (levelData.length > 0) levelData[levelData.length - 1]['isEnd'] = true;
			}
		})
	}


	//显示是否删除的弹出窗口
	public fnShowConfirm(list: any, e: MouseEvent): void {
		e ? e.stopPropagation() : {}
		this.ShowConfirm.isShow = !this.ShowConfirm.isShow;
		this.ShowConfirm.menu_id = list.id
		this.ShowConfirm.position = {
			left: e.clientX,
			top: e.clientY
		}
	}

	//点击编辑按钮弹出视图组件
	public fnShowEdit(list: any, e: MouseEvent): void {
		e ? e.stopPropagation() : {}
		this.addToService.symbol = 'edit';
		this.addToService.editData = list;
		this.showType = 'add-to'
		this.riccioLoadingService.setLoading({
			message:'获取菜单详情中'
		})
		this.grMenuListService.getMenuInfo(list.id).subscribe(res=>{
			this.riccioLoadingService.closeLoading()
			if(res.status === 1){
				this.riccioModalService.setSubject({
					data: res.data,
					header: '编辑菜单',
					size: 600,
					type: 'editMenu',
					noBtn: true
				})
			}
		})
		// this.personalService.showViewData('add-to', true)
	}

	//点击添加菜单的事件，从企业进入 选择菜单添加 从控制台进入直接添加
	public fnAddSystem(): void {
		this.addToService.symbol = 'add'
		this.showType = 'add-to'
		this.riccioModalService.setSubject({
			header: '添加菜单',
			size: 600,
			type: 'addMenu',
			noBtn: true
		})
		// this.personalService.showViewData('add-to', true)
	}

	//弹出添加菜单界面
	public FnAddMenu(): void {
		this.addToService.symbol = 'add'
		this.showType = 'add-to'
		this.riccioModalService.setSubject({
			header: '添加菜单',
			size: 600,
			type: 'addMenu',
			noBtn: true
		})
		// this.personalService.showViewData('add-to', true)
	}

	//点击列表的数据显示添加菜单组件在该菜单的子集里面
	//添加子菜单
	public fnAddChilrenMenu(list: any, e: MouseEvent): void {
		e ? e.stopPropagation() : {}
		this.addToService.symbol = 'addChilren'
		this.addToService.editData = list;
		this.showType = 'add-to'
		this.riccioModalService.setSubject({
			data: list,
			header: '添加菜单',
			size: 600,
			type: 'editChildren',
			noBtn: true
		})
		// this.personalService.showViewData('add-to', true)
	}

	//失去焦点时进行排序操作
	public fnSortMenu(list: any): void {
		if (list.sort !== list.orderTemp) {
			this.riccioLoadingService.setLoading({
				message: '排序中'
			})
			list['cid'] = this.routerCid;
			this.grMenuListService.postMenuSort({
				id: list.id,
				sort: list.sort
			})
				.subscribe(res => {
					this.riccioLoadingService.closeLoading()
					this.refresh = true
					setTimeout(() => {
						this.refresh = false
					}, 2000)
				})
		}
	}
}
