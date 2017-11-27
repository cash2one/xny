import { Component, OnInit, ElementRef, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';

import { PersonalService } from '../../../../Public/Personal/personal.service'
import { GrMenuListService } from '../../../services'

import { GrUserService } from '../../../services'
import { UserData } from './UserData'

import { animations } from '../../../../Public/Animations/index'
import { BreadCrumbData } from '../../../../Public/riccio-breadcrumb/riccio-breadcrumb.data'

import { ShowDetailService } from '../../../show-detail/show-detail.service'
import { Conf } from '../../../show-detail/show-detail.data'
import { RiccioLoadingService } from '../../../../Public/riccio-loading/riccio-loading.service'
import { RiccioNotificationsService } from '../../../../Public/riccio-notifications/riccio-notifications.service'
import { RiccioPboxService } from '../../../../Public/riccio-pbox/riccio-pbox.service'
import { RiccioPaginationsService } from '../../../../Public/riccio-paginations/riccio-paginations.service'
import { AdminService } from '../../../Admin.service'
import { UserOpService } from '../user-op/user-op.service'

@Component({
	selector: 'app-user-main',
	templateUrl: './user-main.component.html',
	styleUrls: [
		'../../../Admin.component.scss',
		'../../page.common.scss',
		// './user-main.component.scss',
		'./user-main.component.new.scss'
	],
	animations: [
		animations.flyTop
	]
})
export class UserMainComponent implements OnInit, OnDestroy {
	@ViewChild('clickTb', { read: ViewContainerRef }) clickTb: ViewContainerRef;
	@ViewChild('rangeBtn', { read: ElementRef }) rangeBtn: ElementRef;

	public UserData: UserData;
	public userTitle: Array<string>;
	public UserSearchName: string;
	public FlyLeftData: any;
	public allCheck: boolean;
	public menuDataOnly: any;

	//界面类型
	public userType: string
	//面包屑
	public menuTitle: string
	public rangeVal: string
	//搜索用户参数
	public userSearchParams: {
		range: number | string;
		other: string;
	}
	public searchNameTemp: string
	//详情数据
	public showDetailData: any
	public isLoading: boolean
	public pboxObj: any
	public pageObj: any
	public userAddObj: any
	//分页组件参数
	public pageParam: any
	//分页请求参数
	public pageRequestParam: any

	//选择成员组件数据
	public selectMemberData: any
	//显示添加后台 （总控制中心） 成员标示
	public addAdminUser: {
		isShow: boolean
	}
	public breadData: BreadCrumbData[]

	constructor(
		public grUserService: GrUserService,
		public grMenuListService: GrMenuListService,
		public router: Router,
		public activatedRoute: ActivatedRoute,
		public el: ElementRef,
		public personalService: PersonalService,
		public showDetailService: ShowDetailService,
		public riccioLoadingService: RiccioLoadingService,
		public riccioNotificationsService: RiccioNotificationsService,
		public riccioPboxService: RiccioPboxService,
		public adminService: AdminService,
		public riccioPaginationsService: RiccioPaginationsService,
		public userOpService: UserOpService
	) {
		this.UserData = new UserData();
		this.userTitle = this.UserData.titleData
		this.allCheck = false;
		this.showDetailData = this.UserData.showDetailData
		this.userSearchParams = {
			range: 1,
			other: ''
		}
		this.addAdminUser = {
			isShow: false
		}
		this.rangeVal = '正常'
		this.searchNameTemp = this.userSearchParams.other
		this.FlyLeftData = {
			showText: [
				{
					name: '启用',
					type: '1'
				},
				{
					name: '禁用',
					type: '2'
				}
			],
			ids: [],
			status: 0,
			isShow: false,
			number: 0
		};
		this.menuDataOnly = {
			title: '',
			subTitle: '',
			data: {}
		}
		this.pageParam = {
			pboxData: [20, 50, 100]
		}
		this.pageRequestParam = {
			rows: this.pageParam.pboxData[0],
			page: 1,
			name: this.userSearchParams.other,
			status: this.userSearchParams.range
		}
		this.selectMemberData = {}
	}

	ngOnInit() {
		let url = this.router.url.split('/').slice(2, this.router.url.split('/').length).join('/');
		this.userType = this.router.url.split('/')[2]
		let RouteMenu = this.grMenuListService.FnActiveRouterMenu(url);
		Object.assign(this.menuDataOnly, {
			title: RouteMenu.name,
			data: RouteMenu
		})
		this.resolveType()
		this.getUserList()
		this.resolveBread()

		//监听选项
		this.pboxObj = this.riccioPboxService.getEmit().subscribe(v => {
			if (v.type === 'userCheck') {
				//多选
				this.opStatusBatch(v.data.ids, v.data.status)
			} else if (v.type === 'userRange') {
				//范围点击·
				this.rangeVal = v.data.name
				v.data.value === 0 ? this.userSearchParams.range = '' : this.userSearchParams.range = v.data.value
				this.pageRequestParam.status = this.userSearchParams.range
				this.searchUser()
			} else if (v.type === 'userStatus') {
				//切换状态 
				this.fnChangeStatu(v.data)
			}
		})

		//订阅添加员工
		this.userAddObj = this.userOpService.uaEmitObs.subscribe(v => {
			if (v) {
				// 添加成员成功
				this.getUserList()
			}
		})
	}

	ngOnDestroy() {
		this.pboxObj.unsubscribe()
		this.userAddObj.unsubscribe()
	}

	public resolveBread(){
		if(this.userType == 'adminuser'){
			this.breadData = [
				{name:'应用管理',routerLink:'/Admin/appcenter/list'},
				{name:'总控制中心',routerLink:'/Admin/appcenter/Admin'},
				{name:this.menuDataOnly.title}
			]
		}else{
			this.breadData = [
				{name:this.menuDataOnly.title}
			]
		}
		
	}

	/**
	 * 处理分页数据
	 * @param e 组件传回数据
	 */
	public fnPagination(e: any) {
		this.pageRequestParam.page = e.page
		this.pageRequestParam.rows = e.rows
		this.getUserList()
	}

	/**
	 * 处理不同类型的显示
	 */
	public resolveType() {
		if (this.userType === 'adminuser') {
			this.menuTitle = '应用管理 ／ 总控制中心 ／ '
			this.menuDataOnly.title = '成员管理'
			this.menuDataOnly.subTitle = '成员列表'
		} else if (this.userType === 'user') {
			this.menuTitle = ''
			this.menuDataOnly.title = '员工管理'
			this.menuDataOnly.subTitle = '员工列表'
		}
	}

	/**
	 * 获取全部用户
	 */
	public getUserList() {
		this.isLoading = true
		if (this.userType === 'adminuser') {
			//后台
			this.grUserService.getAdminUserList(this.pageRequestParam).subscribe(res => {
				this.isLoading = false
				this.UserData.data = res.data.data
				this.UserData.data.map(e => {
					e['isCheck'] = false
				})
				this.pageParam['total'] = res.data.total
			})
		} else if (this.userType === 'user') {
			//企业与员工
			this.grUserService.getUserIndex(this.pageRequestParam).subscribe(res => {
				this.isLoading = false
				this.UserData.data = res.data.data
				this.UserData.data.map(e => {
					e['isCheck'] = false
				})
				this.pageParam['total'] = res.data.total
			})
		}
	}

	/**
	 * 显示人员数据
	 * @param list 人员数据
	 */
	public fnShowDetail(list: any) {
		this.showDetailData.forEach((v, i, arr) => {
			if (v['flag'] === "sex") {
				arr[i].value = (list[arr[i].flag] == 1 ? '男' : '女')
			} else if (v['flag'] === "status") {
				arr[i].value = (list[arr[i].flag] == 1 ? '启用' : '禁用')
			} else if (v['flag'] === "real_name") {
				this.userType == 'user' ? v['flag'] = 'real_name' : {}
				arr[i].value = list[arr[i].flag]
			} else if (v['flag'] === 'thumb') {
				arr[i].img = true
				arr[i].icoType = 'user'
				arr[i].value = list[arr[i].flag]
			} else {
				arr[i].value = list[arr[i].flag]
			}

		})
		let editConf: Conf = {
			title: this.userType == 'adminuser' ? list['real_name'] : list['name'],
			showList: this.showDetailData,
			top: 56,
			expectClick: this.clickTb,
			headBtn: false
		}
		this.showDetailService.SetDetailConfSbj(editConf)
	}

	/**
	 * 显示禁用小弹窗
	 * @param list 用户数据 
	 * @param el 点击元素
	 */
	public fnShowChangeStatus(list: any, el: any, e: MouseEvent) {
		e.stopPropagation()
		let word = list.status === 1 ? '禁用' : '启用'
		this.riccioPboxService.setSubject({
			genre: 'delete',
			el: el,
			position: {
				left: e.clientX,
				top: e.clientY,
				width: 250
			},
			type: 'userStatus',
			data: {
				title: `确定${word}此用户？`,
				button: word,
				delID: list
			}
		})
	}

	/**
	 * 切换状态
	 * @param list 用户数据
	 */
	public fnChangeStatu(list: any) {
		this.riccioLoadingService.setLoading({
			message: '切换状态'
		})
		let obj = {}
		if (list.status === 1) {
			obj = {
				id: list.id,
				status: 2,
				type: this.userType
			}
		} else {
			obj = {
				id: list.id,
				status: 1,
				type: this.userType
			}
		}
		this.grUserService.postAdminUserStatu(obj).subscribe(res => {
			this.riccioLoadingService.closeLoading()
			if (res.status === 1) {
				this.riccioNotificationsService.setSubject({
					status: 'success',
					text: '切换成功'
				})
				list.status = obj['status']
			}
		})
	}

	/**
	 *  操作选中的列表项
	 * @author GR-05
	 * @check GR-03
	 */
	public fnChangeCheck(type: string, el: ElementRef, e: MouseEvent) {
		type === '1' ? this.FlyLeftData.status = 1 : this.FlyLeftData.status = 2
		this.riccioPboxService.setSubject({
			genre: 'delete',
			el: el,
			position: {
				left: e.clientX,
				top: e.clientY,
				width: 250
			},
			type: 'userCheck',
			data: {
				title: type === '1' ? '确定启用所选成员？' : '确定禁用所选成员',
				button: type === '1' ? '启用？' : '禁用',
				delID: this.FlyLeftData
			}
		})
	}

	/**
	 * 批量禁用启用成员
	 * @param ids 成员列表id数组
	 * @author GR-05
	 * @check GR-03
	 */
	public opStatusBatch(ids: Array<any>, status: number) {
		let statusBatch = []
		for (let item in ids) {
			statusBatch.push(this.grUserService.postAdminUserStatu({
				id: ids[item],
				status: status,
				type: this.userType
			}))
		}
		this.adminService.opListBatch(
			statusBatch,
			'批量操作中',
			'批量操作完成',
			() => {
				this.allCheck = false
				this.FlyLeftData.isShow = false
				this.getUserList()
			}
		)
	}

	/**
	 * 显示筛选范围
	 * @param e 点击事件
	 * @param el 点击元素
	 */
	public fnRange(e: MouseEvent, el: any) {
		let position = this.adminService.getElPosition(this.rangeBtn)
		this.riccioPboxService.setSubject({
			genre: 'option',
			el: el,
			position: {
				top: position.top + this.rangeBtn.nativeElement.offsetHeight + 5,
				left: position.left,
				width: this.rangeBtn.nativeElement.offsetWidth
			},
			type: 'userRange',
			data: [
				{ name: '全部', value: 0 },
				{ name: '正常', value: 1 },
				{ name: '禁用', value: 2 }
			]
		})
	}

	/**
	 * 搜索成员
	 */
	public fnSearchUser(e: KeyboardEvent) {
		if (e.keyCode === 13) {
			this.searchUser()
		}
	}

	/**
	 * 按键搜索用户
	 */
	public fnKeySearchUser(e: KeyboardEvent) {
		this.searchUserCheck(e)
	}

	/**
	 * 失焦搜索用户
	 */
	public fnBlurSearchUser() {
		this.searchUserCheck()
	}


	/**
	 * 搜索用户判断
	 */
	public searchUserCheck(e?: KeyboardEvent) {
		if (this.searchNameTemp == this.userSearchParams.other) {
			this.isLoading = false
		}
		else {
			if ((e && e.keyCode === 13) || !e) {
				this.pageRequestParam.name = this.userSearchParams.other
				this.searchUser()
			}
		}
	}

	/**
	 * 搜索用户主体函数
	 */
	public searchUser() {
		this.isLoading = true
		if (this.userType === 'adminuser') {
			this.grUserService.getAdminUserList(
				this.pageRequestParam
			).subscribe(res => {
				this.isLoading = false
				if (this.userSearchParams.other !== this.searchNameTemp) {
					this.searchNameTemp = this.userSearchParams.other
				}
				if (res.status === 1) {
					this.resolveSearch(res.data)
				}
			})
		} else if (this.userType === 'user') {
			this.grUserService.getUserIndex(
				this.pageRequestParam
			).subscribe(res => {
				this.isLoading = false
				if (this.userSearchParams.other !== this.searchNameTemp) {
					this.searchNameTemp = this.userSearchParams.other
				}
				if (res.status === 1) {
					this.resolveSearch(res.data)
				}
			})
		}
	}


	/**
	 * 搜索成员后的数据处理
	 * @param res 响应
	 * @author GR-05
	 * @check GR-03
	 */
	public resolveSearch(res: any) {
		let result = res
		this.UserData.data = result.data
		this.pageParam.total = result.total
		this.UserData.data.map(e => {
			e['isCheck'] = false
		})
	}

	/**
	 * 加载logo失败事件
	 * @param list 企业数据 
	 */
	public noImg(list: any) {
		list['noImg'] = true
	}

	/**
	 * 添加用户
	 */
	public fnShowAddUser() {
		this.userOpService.setUserOp({
			type: 'add'
		})
	}

	/**
	 * 编辑用户
	 * @param user 用户数据 
	 * @param e 点击事件
	 */
	public fnEditUser(user: any, e: MouseEvent) {
		e ? e.stopPropagation() : {}
		this.userOpService.setUserOp({
			type: 'edit',
			data: user
		})
	}

	/**
	 * 显示添加总控制中心成员
	 * @author GR-05
	 */
	public fnShowAddAdminUser() {
		this.addAdminUser.isShow = true
	}

	/**
	 * 处理添加成员组件回传数据
	 * @author GR-05
	 * @param data 
	 */
	public receiveUserAdd(data: any) {
		this.addAdminUser.isShow = data.isShow
		if (data.type === 'success') {
			this.getUserList()
		}
	}



	//根据名称进行搜索
	public FnSearchUser(name: string): void {
		this.grUserService.getUserIndex(name)
			.subscribe(res => {
				this.UserData.data = res.data.data;
				this.UserData.data.map(e => { return e['isCheck'] = false, e['isSwitch'] = true })
			})
	}

	//点击全选时的事件
	public fnCheckAll(bool: boolean): void {
		this.allCheck = bool;
		this.FlyLeftData.ids = []
		this.UserData.data.map(e => e['isCheck'] = this.allCheck);
		this.FlyLeftData.isShow = this.SwitchCheck(this.UserData.data) === true ? true : false;

	}

	//选中的当前用户信息
	public fnCheckUser(list: any, e: MouseEvent): void {
		e ? e.stopPropagation() : {}
		this.FlyLeftData.ids = []
		list.isCheck = !list.isCheck;
		this.FlyLeftData.isShow = this.SwitchCheck(this.UserData.data) === true ? true : false;
	}

	//判断当前的列表是否有被选中的某一条，有则显示滑块
	public SwitchCheck(list: any): boolean {
		let bool = false;
		list.forEach(e => {
			if (e.isCheck === true) {
				this.FlyLeftData.ids.push(e['id'])
				this.FlyLeftData.number = list.filter(el => el['isCheck'] === true).length
				return bool = true;
			}
		})
		return bool
	}


	//弹出所选中的用户详情
	public FnShowDetails(list: any): void {
	}

	//切换当前的用户是禁用还是启用
	public FnSwitch(list: any): void {
		list.isSwitch = !list.isSwitch;
		let status = list.isSwitch === true ? 1 : 2;
		this.grUserService.postUserStatus({ 'id': list.id, 'status': status })
			.subscribe(res => {
				status === 1
					? this.personalService.showPromptSmall('启用成功', 'success')
					: this.personalService.showPromptSmall('禁用成功', 'success')
				console.log(res)
			}, error => {
				console.log(error)
			})
	}

}
