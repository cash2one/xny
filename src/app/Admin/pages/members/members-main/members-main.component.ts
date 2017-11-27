import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';

import { RiccioPboxService } from '../../../../Public/riccio-pbox/riccio-pbox.service'
import { RiccioPopUpRightService } from '../../../../Public/riccio-pop-up-right/riccio-pop-up-right.service'
import { RiccioLoadingService } from '../../../../Public/riccio-loading/riccio-loading.service'
import { RiccioNotificationsService } from '../../../../Public/riccio-notifications/riccio-notifications.service'
import { RiccioModalService } from '../../../../Public/riccio-modal/riccio-modal.service'

import { GrMembersService } from '../../../services'
import { AdminService } from '../../../Admin.service'
import { MembersOpService } from '../membersOp.service'
import { MembersSetAdminService } from '../members-set-admin/members-set-admin.service'
import { MembersSetDepartmentMainService } from '../members-set-department-main/members-set-department-main.service'

import { RiccioSelectMembersService } from '../../../../Public/riccio-select-members/riccio-select-members.service'
import { RiccioTreeDepartmentService } from '../../../../Public/riccio-tree-department/riccio-tree-department.service'

import { MembersData, PopUpRightPrompt } from './membersData'
import { MembersService } from '../members.service'

@Component({
	selector: 'app-admin-members-main',
	templateUrl: './members-main.component.html',
	styleUrls: [
		'../../role/role.common.scss',
		'./members-main.component.scss'
	]
})
export class MembersMainComponent implements OnInit, OnDestroy {
	@ViewChild('FnAllElement') FnAllElement: any;
	@ViewChild('Search') Search: any;
	@ViewChild('rangeBtn', { read: ElementRef }) rangeBtn: ElementRef;

	public routerInfo: {
		model: string;
		cid: number | string;
	}

	public membersDetailsData: any;
	public DeparmentListData: any;    //所有部门的列表
	public TableTitle: any;
	public deparmentUserListData: any;//所有员工列表
	public pboxOptions: any[];    // 部门列表选择下拉框时的列表选项；
	public noAdminList: any[];
	public noDepartment: any[];
	public addMembers: any;       //添加成员的数据

	public loading: boolean;      // 是否显示loading效果的字段
	public postSearchUserData: any;  // 搜索企业成员列表的字段

	//范围筛选显示
	public rangeName: string
	public pboxObj: any
	public modalObj: any

	public popUpRightData: any[] // PopUpRight组件显示的内容数据
	//顶部弹出选项数据
	public popUpRightPrompt: PopUpRightPrompt
	//某个部门数据 供编辑或其他操作
	public departmentInfo: any
	// 该字段来判断pbox为other的时候该显示设置负责人还是设置主属部门的字段
	public adminOrDepartment: string
	//选择成员数据
	public selectMemberData: {
		isShow: boolean;
		leftData: any;
		rightData: any;
		nextPage: string;
		name: string;
		page: number;
		tempLeft: any;
	}
	//中转数据  全部用户
	public tempAllUser: any
	//用于判断 setadmin组件的入口
	public setAdminType: string
	//当前单个要设置负责人的部门id
	public setAdminDepId: number
	public setDepUserId: number

	//为设置负责人部门数量
	public noAdminTotal: number
	//未设置部门成员数量
	public noDepartmentTotal: number
	// 是否显示全选按钮
	public allCheckIs: boolean

	//设置主属部门或附属部门的辨别字段
	public constDepartmentSymbol: string

	//分页参数
	public pageParam: {
		page: number,
		rows: number
	}
	//搜索字段
	public searchName: string
	public searchNameTemp:string


	constructor(
		public activatedRoute: ActivatedRoute,
		public adminService: AdminService,
		public membersOpService: MembersOpService,
		private membersService:MembersService,
		public router: Router,
		public riccioPboxService: RiccioPboxService,
		public riccioLoadingService: RiccioLoadingService,
		public riccioNotificationsService: RiccioNotificationsService,
		public riccioModalService: RiccioModalService,
		public riccioPopUpRightService: RiccioPopUpRightService,
		public riccioSelectMembersService: RiccioSelectMembersService,
		public riccioTreeDepartmentService: RiccioTreeDepartmentService,
		public grMembersService: GrMembersService,
		public membersSetAdminService: MembersSetAdminService,
		public membersSetDepartmentMainService: MembersSetDepartmentMainService
	) {

		this.loading = true
		this.TableTitle = new MembersData().TableTitle
		this.pboxOptions = new MembersData().pboxOptions
		this.DeparmentListData = new MembersData().DeparmentListData
		this.membersDetailsData = new MembersData().membersDetailsData
		this.noAdminList = new MembersData().NoAdminList
		this.noDepartment = new MembersData().NoDepartment
		this.postSearchUserData = new MembersData().postSearchUserData
		this.addMembers = new MembersData().AddMembers
		this.deparmentUserListData = []
		this.departmentInfo = { data: {}, symbol: 'create' }
		this.allCheckIs = false
		this.searchName = ''
		this.searchNameTemp = ''

		this.rangeName = '全部员工'
		this.popUpRightPrompt = new PopUpRightPrompt()
		this.popUpRightData = new MembersData().popUpRightData
		this.adminOrDepartment = 'admin'
		this.selectMemberData = {
			name: '',
			isShow: false,
			leftData: [],
			rightData: [],
			tempLeft: [],
			page: 1,
			nextPage: 'loading'
		}

		this.resetPageParam()
		this.activatedRoute.params.subscribe(res => {
			this.routerInfo = {
				model: res.model,
				cid: res.cid
			}
			this.membersService.setRouterInfo(this.routerInfo)
		})

	}

	ngOnInit() {
		this.FnAllElement.nativeElement.addEventListener('click', (e) => {
			let bool = false;
			e['path'].map(el => {
				if (el['tagName'] == 'TD' && el['className'] == 'customer-content') {
					bool = true;
				}
			});

			if (bool == false) {
				this.membersDetailsData.isShow = false;
			}
		}, true)

		//处理 pbox组件 数据回调
		this.pboxObj = this.riccioPboxService.getEmit().subscribe((v) => {
			this.resolvePbox(v)
		})
		//处理 modal组件 数据回调
		this.modalObj = this.riccioModalService.getEmit().subscribe((v) => {
			this.resolveModal(v)
		})
		//处理 membersSetAdmin组件 数据回调
		this.membersSetAdminService.getSubject().subscribe(v => {
			if (this.setAdminType == 'setAdmin') {
				this.resolveSetAdmin(v)
			}
		})
		//处理 membersSetDepartment组件 数据回调
		this.membersSetDepartmentMainService.getSubject().subscribe(v => {
			if (this.setAdminType == 'setDepartment') {
				this.resolveSetDepart(v)
			}
		})
		//处理 PopUpRight组件 数据回调
		this.riccioPopUpRightService.getEmit().subscribe(v => {
			this.resolvePopRightEmit(v)
		})


		//获取部门列表
		this.fnGetDeparment()

		//获取该企业所有部门成员
		this.getDepartmentUser()

		//获取没有负责任的部门方法
		this.fnGetNoAdmin()

		//获取未设置部门的员工方法
		this.fnGetNoDepartment()
	}

	ngOnDestroy() {
		this.pboxObj.unsubscribe()
		this.modalObj.unsubscribe()
	}

	/**
	 * 筛选范围
	 * @param e 点击事件
	 * @param el 点击元素
	 * @author GR-05
	 */
	public fnRange(e: MouseEvent, el: any) {
		let position = this.adminService.getElPosition(this.rangeBtn)
		this.riccioPboxService.setSubject({
			el: el,
			type: 'memberRange',
			position: {
				left: position.left,
				top: position.top,
				width: this.rangeBtn.nativeElement.offsetWidth
			},
			data: [
				{ 'name': '全部员工', value: 0 },
				{ 'name': '正常员工', value: 2 },
				{ 'name': '禁用员工', value: 3 },
				{ 'name': '部门管理员', value: 1 },
				{ 'name': '部门负责人', value: 4 }
			]
		})
	}

	/**
	 * 获取部门列表
	 * @author  GR-05
	 */
	public fnGetDeparment(): void {
		this.grMembersService.getMembersDepartment({
			cid: this.routerInfo.cid
		}).subscribe(res => {
			if (res.status == 1) {
				this.DeparmentListData = [{ name: '全公司', chilren: [...res['data']], id: '' }]
				// this.postSearchUserData.data['department_id']
			}
		})
	}

	/**
	 * 显示移除部门成员弹窗
	 * @param userId 成员id
	 * @param el 点击元素
	 */
	public fnRemoveUser(userId: number | string, el: any, e: MouseEvent) {
		e.stopPropagation()
		this.riccioPboxService.setSubject({
			genre: 'delete',
			el: el,
			position: {
				left: e.clientX,
				top: e.clientY,
				width: 240
			},
			type: 'memberDel',
			data: {
				title: '确定移除所选成员？',
				button: '移除',
				delID: userId
			}
		})
	}

	/**
	 * 移除成员主体
	 * @param userId 成员id
	 */
	public removeMember(userId: any[]) {
		this.riccioLoadingService.setLoading({
			message: '移除中'
		})
		this.grMembersService.postMemberRemove({
			department_id: this.postSearchUserData['data']['department_id'],
			user_id: userId,
			cid: this.routerInfo.cid
		}).subscribe(res => {
			this.riccioLoadingService.closeLoading()
			if (res.status == 1) {
				this.riccioNotificationsService.setSubject({
					status: 'success',
					text: '移除成功'
				})
				this.getDepartmentUser()
			}
		})
	}

	/**
	 * 显示禁用部门成员弹窗
	 * @param userId 成员id
	 * @param el 点击元素
	 */
	public fnDisableUser(userId: number | string, el: any, e: MouseEvent) {
		e.stopPropagation()
		this.riccioPboxService.setSubject({
			genre: 'delete',
			el: el,
			position: {
				left: e.clientX,
				top: e.clientY,
				width: 240
			},
			type: 'memberDisable',
			data: {
				title: '确定禁用所选成员？',
				button: '禁用',
				delID: [userId]
			}
		})
	}

	/**
	 * 修改成员状态主体
	 * @param userId 成员id数组
	 * @param status 状态码
	 */
	public changeMemberStatus(userArr: any[], status: number) {
		this.riccioLoadingService.setLoading({
			message: status == 1 ? '启用中' : '禁用中'
		})
		this.grMembersService.postUserStatus({
			department_id: this.postSearchUserData['data']['department_id'],
			user_arr: userArr,
			status: status,
			cid: this.routerInfo.cid
		}).subscribe(res => {
			this.riccioLoadingService.closeLoading()
			if (res.status == 1) {
				this.riccioNotificationsService.setSubject({
					status: 'success',
					text: status == 1 ? '启用成功' : '禁用成功'
				})
				this.getDepartmentUser()
			}
		})
	}

	/**
	 * 处理pbox动作
	 * @param v pbox回传数据 
	 */
	public resolvePbox(v: any) {
		switch (v.type) {
			case 'memberRange':
				this.rangeName = v.data.name;
				this.postSearchUserData.data['type'] = v.data.value
				this.getDepartmentUser()
				break
			case 'memberDel':
				//移除成员
				this.removeMember(v.data)
				break
			case 'memberDisable':
				//禁用
				this.changeMemberStatus(v.data, 2)
				break
			case 'tree':
				(() => {
					switch (v.data.id) {
						case 0:
							//添加子部门
							this.popUpRightPrompt.showModalText = 'createEdit'
							this.departmentInfo.symbol = 'create'
							this.setAdminType = 'addEdit'
							this.riccioModalService.setSubject({
								data: this.departmentInfo,
								size: 600,
								header: '添加子部门',
								type: 'createDepartment',
								noBtn: true
							})
							break
						case 1:
							//编辑部门
							this.popUpRightPrompt.showModalText = 'createEdit'
							this.departmentInfo.symbol = 'edit'
							this.setAdminType = 'addEdit'
							this.riccioModalService.setSubject({
								data: this.departmentInfo,
								size: 600,
								header: '编辑部门',
								type: 'editDepartment',
								noBtn: true
							})
							break
						case 2:
							//禁用部门
							this.popUpRightPrompt.showModalText = 'disableDepartment'
							this.riccioModalService.setSubject({
								data: this.departmentInfo,
								size: 600,
								header: '提示',
								type: 'disableDepartment',
								btn: {
									name: '确认',
									status: 'danger'
								}
							})
							break
						case 3:
							//选择成员
							this.fnAddDepartmentUser()
							break
						case 4:
							//删除部门
							this.popUpRightPrompt.showModalText = 'delDepartment'
							this.riccioModalService.setSubject({
								data: this.departmentInfo,
								size: 600,
								header: '提示',
								type: 'delDepartment',
								btn: {
									name: '确认',
									status: 'danger'
								}
							})
							break
					}
				})()
				break
		}
	}

	/**
	 * 处理modal监听动作
	 * @param res modal 回传数据
	 */
	public resolveModal(res: any) {
		if (res['type'] == 'disableDepartment') {
			//禁用 启用部门
			let data = res['data']['data']
			let obj = {
				'id': data['id'],
				'cid': this.routerInfo.cid,
				'status': data['status'] == 1 ? 0 : 1
			}
			this.riccioLoadingService.setLoading({
				message: '切换状态'
			})
			this.grMembersService.postDepartmentStatus(obj).subscribe(res => {
				this.riccioLoadingService.closeLoading()
				if (res.status == 1) {
					this.riccioNotificationsService.setSubject({ text: '操作成功' })
					this.fnGetDeparment()
					this.CallTreeData({ name: '全公司', id: '' })
				}
			}, error => {
				throw new Error(error)
			})
		}
		else if (res['type'] == 'delDepartment') {
			//删除部门
			this.riccioLoadingService.setLoading({
				message: '删除部门中'
			})
			let data = res['data']['data']
			this.grMembersService.postDepartmentDel({
				cid: this.routerInfo.cid,
				id: data.id
			}).subscribe(res => {
				this.riccioLoadingService.closeLoading()
				if (res.status == 1) {
					this.riccioNotificationsService.setSubject({ text: '已删除' })
					this.fnGetDeparment()
					this.CallTreeData({ name: '全公司', id: '' })
				}
			})
		}
		else if (res['type'] == 'PopUpRight') {
			switch (res['data']['type']['id']) {
				case 1:
					//设置部门负责人
					(() => {
						let user_arr = []
						res['data']['data'].forEach(item => {
							user_arr.push(item['id'])
						})
						this.riccioLoadingService.setLoading({
							message: '设置负责人中'
						})
						this.membersOpService.setDepartment(
							3,
							user_arr,
							[this.setAdminDepId],
							this.routerInfo.cid,
							this.fnGetNoAdmin.bind(this)
						)
					})()
					break
				case 4:
					//启用成员
					(() => {
						let user_arr = []
						res['data']['data'].forEach(item => {
							user_arr.push(item['id'])
						})
						this.changeMemberStatus(user_arr, 1)
					})()
					break
				case 5:
					//禁用成员
					(() => {
						let user_arr = []
						res['data']['data'].forEach(item => {
							user_arr.push(item['id'])
						})
						this.changeMemberStatus(user_arr, 2)
					})()
					break
				case 7:
					//移除成员
					(() => {
						let user_arr = []
						res['data']['data'].forEach(item => {
							user_arr.push(item['id'])
						})
						this.removeMember(user_arr)
					})()
					break
			}
		}
	}

	/**
	 * @author GR-03
	 * @copyright 监听members－create发送回来的数据
	 * @param     [param]
	 * @return    [return]
	 * @check     GR-05       GR-03
	 * @param     {any}
	 */
	public fnDepartmentCreateEdit(value: any): void {
		if (value.symbol == true && value.type == '') {
			this.fnGetDeparment()
			if (Object.keys(value['data']).length > 0) {
				this.CallTreeData(value['data'])
			}
		}
		this.adminOrDepartment = value.type
	}

	/**
   * @author GR-05
   * @copyright 选择成员的方法
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
	public fnAddDepartmentUser(): void {
		this.selectMemberData.isShow = true
		this.selectMemberData.name = ''
		this.selectMemberData.page = 1
		this.selectMemberData.leftData = []
		this.selectMemberData.rightData = JSON.parse(JSON.stringify(this.deparmentUserListData))
		this.getRoleUsers()
	}

	/**
   * 选择成员 请求全部用户
   * @author GR-05
   */
	public getRoleUsers(name:string = '') {
		this.selectMemberData.nextPage = 'loading'
		this.grMembersService.postUserNoDepartment({
			department_id: this.postSearchUserData.data['department_id'],
			cid: this.routerInfo.cid,
			rows: 20,
			page: this.selectMemberData.page,
			name:name
		}).subscribe(res => {
			let data = res['data']['data']
			let total = res['data']['total']
			if (res.status == 1 && data.length > 0) {
				this.selectMemberData.leftData = this.selectMemberData.leftData.concat(data)
				if(total > this.selectMemberData.leftData.length){
					this.selectMemberData.nextPage = 'normal'
				}else{
					this.selectMemberData.nextPage = 'hide'
				}
				// let cutLength = this.resolveMemberLeft()
				// this.selectMemberData.tempLeft = this.selectMemberData.leftData
				// if (total - this.selectMemberData.leftData.length - cutLength > 0) {
				// 	this.selectMemberData.nextPage = 'normal'
				// } else {
				// 	this.selectMemberData.nextPage = 'hide'
				// }
			} else {
				this.selectMemberData.nextPage = 'hide'
			}
		})
	}

	/**
   * 选择成员组件关闭事件
   */
	public fnSelectMemberClose() {
		this.selectMemberData.isShow = false
		this.selectMemberData.rightData = []
	}

	/**
   * 
   * 添加权限人点击加载更多
   * @author GR-05
   */
	public fnMoreRoleUser(flag: boolean) {
		if (flag) {
			this.selectMemberData.page += this.selectMemberData.page
			this.getRoleUsers()
		}
	}

	/**
   * 选择成员组件搜索功能 仅名称
   * @author GR-05
   * @param value 名称
   */
	public fnSearchRoleUser(value: string) {
		this.getRoleUsers(value)
		// if (value && value.trim().length !== 0) {
		// 	this.selectMemberData.leftData = this.selectMemberData.leftData.filter(item => {
		// 		if (item['real_name']) {
		// 			return item['real_name'].indexOf(value) != -1
		// 		}
		// 	})
		// } else if (value == '') {
		// 	this.selectMemberData.leftData = this.selectMemberData.tempLeft
		// }
	}

	/**
   * 处理添加成员左边数据
   * @author GR-05
   * @return 过滤数据量
   */
	public resolveMemberLeft(): number {
		let result = 0
		this.selectMemberData.rightData.forEach(right => {
			this.selectMemberData.leftData = this.selectMemberData.leftData.filter(left => {
				left['id'] == right['id'] ? result += 1 : {}
				return left['id'] != right['id']
			})
		})
		return result
	}

	/**
	 * 添加部门成员动作
	 */
	public addRoleUser(data: any) {
		let ids = []
		data.forEach(item => {
			ids.push(item['id'])
		})
		this.riccioLoadingService.setLoading({
			message: '添加成员中'
		})
		this.grMembersService.postDepartmentUserAdd({
			user_id: ids,
			department_id: this.postSearchUserData.data['department_id'],
			cid: this.routerInfo.cid
		}).subscribe(res => {
			this.riccioLoadingService.closeLoading()
			if (res.status == 1) {
				this.riccioNotificationsService.setSubject({
					status: 'success',
					text: '添加成功'
				})
				this.getDepartmentUser()
			}
		})
	}

	/**
	 * 获取企业成员  
	 * @author GR-05
	 */
	public getDepartmentUser() {
		this.loading = true;
		this.postSearchUserData.data.cid = this.routerInfo.cid;
		this.grMembersService.postUserList({
			...this.pageParam,
			...this.postSearchUserData.data,
			name:this.searchName
		}).subscribe(res => {
			this.loading = false;
			if (res.status == 1) {
				this.postSearchUserData.length = res['data']['total'];
				this.deparmentUserListData = [...res['data']['data']];
				this.deparmentUserListData.map(item => {
					item['isCheck'] = false
				})
				this.searchNameTemp = this.searchName
			}
		})
	}

	/**
	 * 显示设置负责人组件
	 * @param el 点击元素
	 * @param e 点击事件
	 */
	public fnShowSetAdmin(list: any, el: any, e: MouseEvent) {
		let obj = {
			genre: 'other',
			el: el,
			type: 'setAdmin',
			position: {
				left: e.clientX - 130,
				top: e.clientY,
				width: 265
			}
		}
		this.setAdminDepId = list.id
		this.riccioPboxService.setSubject(obj)
		this.setAdminType = 'setAdmin'
		this.adminOrDepartment = 'admin'
	}

	/**
	 * 处理设置负责人主体
	 * @param user 用户信息
	 */
	public resolveSetAdmin(user: any) {
		this.riccioLoadingService.setLoading({
			message: '设置负责人中'
		})
		this.membersOpService.setDepartment(
			3,
			[user.id],
			[this.setAdminDepId],
			this.routerInfo.cid,
			this.fnGetNoAdmin.bind(this)
		)
	}

	/**
	 * 显示设置部门弹窗
	 * @param userId 用户id
	 * @param e 点击事件
	 * @param el 点击元素
	 */
	public fnShowSetDepart(userId: number, e: MouseEvent, el: any) {
		let obj = {
			genre: 'other',
			el: el,
			type: 'setDepartment',
			position: {
				left: e.clientX - 130,
				top: e.clientY,
				width: 265
			}
		}
		this.setDepUserId = userId
		this.riccioPboxService.setSubject(obj)
		this.setAdminType = 'setDepartment'
		this.adminOrDepartment = 'department'
	}

	/**
	 * 处理设置部门
	 * @param depId 
	 */
	public resolveSetDepart(department: any) {
		this.riccioLoadingService.setLoading({
			message: '设置部门中'
		})
		this.membersOpService.setDepartment(
			1,
			[this.setDepUserId],
			[department.id],
			this.routerInfo.cid,
			this.fnGetNoDepartment.bind(this)
		)
	}

	/**
   * @author GR-03
   * @editor GR-05
   * @copyright 从顶部左侧展开的效果
   * @param     [param]
   * @return    [return]
   * @check     GR-05             GR-03
   * @param     {any}             list   [description]
   * @param     {string}          str    [description]
   * @param     {string="single"} symbol [description]
   */
	public fnShowPopUp(list: any, str: string, symbol: string = "single"): void {

		let obj = {
			'data': [...this.deparmentUserListData],
			'viewText': this.postSearchUserData['data']['department_id'] == ''
				? [...this.popUpRightData].filter(e => e['id'] != 1).filter(e => e['id'] != 7)
				: [...this.popUpRightData]
		}

		if (symbol == 'single') {
			list.isCheck = !list.isCheck
			this.allCheckIs = this[str].filter(e => e['isCheck'] == false).length == 0 ? true : false

		} else if (symbol == 'all') {
			this.allCheckIs = !this.allCheckIs
			this[str].map(e => e['isCheck'] = this.allCheckIs)
		}

		this.riccioPopUpRightService.setSubject(obj)
	}

	/**
	 * @author GR-03
	* @eidtor GR-05
	* 监听popright发射回来的数据
	* @check     GR-05       GR-03
	*/
	public resolvePopRightEmit(res: any): void {
		let data = this.popUpRightPrompt['data'][res['type']['id']]

		if (data) this.popUpRightPrompt['promptText'] = res['data'].length > 1 ? data['more'] : data['one']

		this.popUpRightPrompt['showModalText'] = 'normal'

		if (res['type']['id'] == 1 && res['data'].length > 1) {
			let obj = {
				text: this.popUpRightPrompt['promptText'],
				status: 'danger'
			}
			this.riccioNotificationsService.setSubject(obj)
		} else if (res['type']['id'] == 0 && res['data'].length == 1) {
			this.popUpRightPrompt['showModalText'] = 'department'
			this.popUpRightPrompt.SetDepartmentData = [...res['data']]
			this.constDepartmentSymbol = 'Other'
			this.riccioModalService.setSubject({
				data: res['data'],
				size: 700,
				header: '设置附属部门',
				type: 'setDepartment',
				noBtn: true
			})
		} else if (res['type']['id'] == 6 && res['data'].length == 1) {
			this.popUpRightPrompt['showModalText'] = 'department'
			this.popUpRightPrompt.SetDepartmentData = [...res['data']]
			this.constDepartmentSymbol = 'Main'
			this.riccioModalService.setSubject({
				data: res['data'],
				size: 700,
				header: '设置主属部门',
				type: 'setDepartment',
				noBtn: true
			})
		}
		else if (res['type']['id'] == 3 && res['data'].length == 1) {
			this.popUpRightPrompt['showModalText'] = 'role'
			this.popUpRightPrompt.SetRoleData = [...res['data']]
			this.riccioModalService.setSubject({
				data: res['data'],
				size: 500,
				header: '分配角色',
				type: 'setRole',
				noBtn: true
			})
		} else if (data) {
			this.riccioModalService.setSubject({
				data: res,
				header: data.header,
				type: 'PopUpRight',
				size: 500,
				btn: {
					name: '确认',
					status: 'success'
				}
			})
		}
	}

	/**
	 * 分页动作
	 * @param pageData 分页数据
	 */
	public fnPagination(pageData: any) {
		this.pageParam = {
			page: pageData.page,
			rows: pageData.rows
		}
		this.getData(false)
	}

	/**
	 * 统一获取数据公用
	 * @author GR-05
	 */
	public getData(isReset:boolean){
		switch (this.TableTitle.symbol) {
			case 'AllUserItems':
				//获取企业成员
				this.getDepartmentUser()
				break
			case 'NoAdminItems':
				//获取未设置负责人部门
				isReset?this.fnGetNoAdmin('NoAdminItems'):this.fnGetNoAdmin()
				break
			case 'NoDepartmentItems':
				//获取未设置部门成员
				isReset?this.fnGetNoDepartment('NoDepartmentItems'):this.fnGetNoDepartment()
				break
		}
	}

	/**
	 * 获取没有负责人的部门方法
	 * @param e  判别
	 * @author GR-05
	 */
	public fnGetNoAdmin(e?: any): void {
		this.loading = true
		if (e) {
			this.TableTitle.symbol = 'NoAdminItems'
			this.postSearchUserData.title = '未设置负责人的部门'
			this.resetPageParam()
			this.searchName = ''
		}
		let obj = {
			cid: this.routerInfo.cid,
			...this.pageParam,
			name:this.searchName
		}
		this.grMembersService.getDepartmentNoAdmin(obj).subscribe(res => {
			this.loading = false;
			if (res.status == 1) {
				this.noAdminList = [...res['data']['data']]
				this.noAdminTotal = res.data.total
				e ? this.postSearchUserData.length = this.noAdminTotal : {}
				this.searchNameTemp = this.searchName
			}
		})
	}

	/**
	 * 重置分页参数
	 */
	public resetPageParam() {
		this.pageParam = {
			page: 1,
			rows: 20
		}
	}

	/**
	 * 获取未设置部门的员工方法
	 * @param e  判别
	 * @author GR-05
	 */
	public fnGetNoDepartment(e?: any): void {
		this.loading = true
		if (e) {
			//通过点击   表重置分页
			this.TableTitle.symbol = 'NoDepartmentItems'
			this.postSearchUserData.title = '未设置部门的员工'
			this.resetPageParam()
			this.searchName = ''
		}
		let obj = {
			cid: this.routerInfo.cid,
			...this.pageParam,
			name:this.searchName
		}
		this.grMembersService.postUserNoDepartment(obj).subscribe(res => {
			this.loading = false;
			if (res.status == 1) {
				this.noDepartment = [...res['data']['data']]
				this.noDepartmentTotal = res.data.total
				e ? this.postSearchUserData.length = this.noDepartmentTotal : {}
				this.searchNameTemp = this.searchName
			}
		})
	}

	/**
	 * 搜索成员
	*/
	public fnSearch(e: KeyboardEvent) {
		if (e.keyCode == 13) {
			this.getData(false)
		}
	}

	/**
	 * 按键搜索用户
	 */
	public fnKeySearch(e: KeyboardEvent) {
		this.searchCheck(e)
	}

	/**
	 * 失焦搜索用户
	 */
	public fnBlurSearch() {
		this.searchCheck()
	}

	/**
	 * 搜索用户判断
	 */
	public searchCheck(e?: KeyboardEvent) {
		if (this.searchNameTemp == this.searchName) {
			this.loading = false
		}
		else {
			if ((e && e.keyCode == 13) || !e) {
				this.getData(false)
			}
		}
	}

	/**
	 * 显示添加成员组件
	 * 
	 */
	public fnAddMember(){
		this.addMembers.isShow = !this.addMembers.isShow
	}

	/**
	 * 接收添加成员过来的数据方法
	 */
	public receiveMembersAdd(event: any): void {
		this.addMembers.isShow = event.isShow
		this.adminOrDepartment = event.type
		if(event.type=='success'){
			this.fnGetUserList()
		}
	}


	// 点击输入框显示pbox选项列表
	public FnShowPbox(str: string, event: any, dataEl: any): void {
		switch (str) {
			case "selectClick":
				(() => {
					let obj = {
						el: dataEl,
						type: 'select',
						position: {
							left: event.clientX - event.offsetX,
							top: 180,
							width: 200
						},
						data: [
							{
								'id': 0, 'name': '全部员工'
							},
							{
								'id': 1, 'name': '部门管理员'
							},
							{
								'id': 2, 'name': '正常员工'
							},
							{
								'id': 3, 'name': '禁用员工'
							},
							{
								'id': 4, 'name': '部门负责人'
							},
						]
					}
					this.riccioPboxService.setSubject(obj);
				})()
				break;

			case "tableClick":
				(() => {
					let obj = {
						el: dataEl,
						type: 'table',
						position: {
							left: event.clientX - 100,
							top: event.clientY,
							width: 200
						},
						data: [{ 'id': 0, 'name': '选项1111' }, { 'id': 1, 'name': '选项2222' }]
					}
					this.riccioPboxService.setSubject(obj);
				})()
				break;

			default: break;
		}

	}


	//点击右侧弹出列表详情页面
	public FnShowDetails(data: any, event: any): void {

		let bool = false;

		event['path'].map(e => {
			if (e['className'] == 'customer-content' && e['tagName'] == 'TD') {
				bool = true
			}
		})

		if (bool == false) { }
		else {
			this.membersDetailsData.isShow = true;
			this.membersDetailsData.data = [data];
		};


	}

	//搜索事件
	public FnSearchList(value: string, type: string): void {
		this.Search.nativeElement.blur();
		if (type == 'blur' && value.trim() !== '') {

			// 此处判断如果是搜索部门的话调用不同接口
			switch (this.TableTitle.symbol) {
				// 搜索部门接口
				case "NoAdminItems":
					(() => {

					})()
					break;

				// 搜索成员列表接口
				case "NoDepartmentItems":
					(() => {

					})()
					break;

				//搜索成员列表接口
				case "AllUserItems":
					(() => {
						this.postSearchUserData.data['name'] = value;
						this.getDepartmentUser();
					})()
					break;

				default: break;
			}

		}
	}

	//获取对应成员
	public fnGetUserList(): void {
		this.loading = true;
		this.postSearchUserData.data.cid = this.routerInfo.cid;
		this.grMembersService.postUserList(this.postSearchUserData.data).subscribe(res => {
			this.loading = false;
			if (res.status == 1) {
				this.postSearchUserData.length = res['data']['total'];
				this.deparmentUserListData = [...res['data']['data']];
				this.tempAllUser = JSON.parse(JSON.stringify(this.deparmentUserListData))
			}
		})
	}


	//接受tree传递过来的数据从而在右边的table显示对应的部门下的员工列表
	public CallTreeData(value: any): void {
		this.TableTitle.symbol = 'AllUserItems'
		this.riccioPopUpRightService.setSubject({})
		this.searchName = ''
		this.departmentInfo.data = value
		this.resetPageParam()
		// this.postSearchUserData = new MembersData().postSearchUserData
		this.postSearchUserData['data']['department_id'] = value['id'] ? value['id'] : ''
		this.setAdminDepId = this.postSearchUserData['data']['department_id']
		if (this.postSearchUserData['data']['department_id'] == '') {
			this.pboxOptions = new MembersData().pboxTopOption
		} else {
			this.pboxOptions = new MembersData().pboxOptions
			value.status == 1 ? this.pboxOptions[2].name = '禁用部门' : this.pboxOptions[2].name = '启用部门'
		}
		this.postSearchUserData['title'] = value['name']
		this.getDepartmentUser()
	}

	public pboxActive(value:any){
		this.departmentInfo.data = value
		this.postSearchUserData['data']['department_id'] = value['id'] ? value['id'] : ''
		this.setAdminDepId = this.postSearchUserData['data']['department_id']
	}
}
