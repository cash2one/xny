import { Component, OnInit, ElementRef, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';

import { PersonalService } from '../../../../Public/Personal/personal.service'
import { GrMenuListService } from '../../../services'

import { GrUserService } from '../../../services'
import { GrMembersService } from '../../../services'
import { GrCompanyService } from '../../../services/grCompany/grCompany.service'
import { MemberAppData } from './memberAppData'

import { animations } from '../../../../Public/Animations/index'

import { ShowDetailService } from '../../../show-detail/show-detail.service'
import { Conf } from '../../../show-detail/show-detail.data'
import { RiccioLoadingService } from '../../../../Public/riccio-loading/riccio-loading.service'
import { RiccioNotificationsService } from '../../../../Public/riccio-notifications/riccio-notifications.service'
import { RiccioPboxService } from '../../../../Public/riccio-pbox/riccio-pbox.service'
import { RiccioPaginationsService } from '../../../../Public/riccio-paginations/riccio-paginations.service'
import { AdminService } from '../../../Admin.service'
import { MembersService } from '../members.service'
// import { UserOpService } from '../../user/user-op/user-op.service'

@Component({
    selector: 'app-members-app',
    templateUrl: './members-app.component.html',
    styleUrls: [
        '../../../Admin.component.scss',
        '../../page.common.scss',
        './members-app.component.scss'
    ],
    animations: [
        animations.flyTop
    ]
})
export class MembersAppComponent implements OnInit, OnDestroy {
    @ViewChild('clickTb', { read: ViewContainerRef }) clickTb: ViewContainerRef;
    @ViewChild('rangeBtn', { read: ElementRef }) rangeBtn: ElementRef;

    public MemberAppData: MemberAppData;
    public userTitle: Array<string>;
    public UserSearchName: string;
    public FlyLeftData: any;
    public allCheck: boolean;

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

    //显示添加后台 （总控制中心） 成员标示
    public addAdminUser: {
        isShow: boolean
    }

    public routerInfo: {
        model: string;
        cid: number | string;
        appid:number | string;
    }

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
        // public userOpService: UserOpService,
        public grMembersService: GrMembersService,
        private grCompanyService:GrCompanyService,
        private membersService:MembersService
    ) {
        this.MemberAppData = new MemberAppData();
        this.userTitle = this.MemberAppData.userTitle
        this.allCheck = false;
        this.showDetailData = this.MemberAppData.showDetailData
        this.userSearchParams = {
            range: 0,
            other: ''
        }
        this.addAdminUser = {
            isShow: false
        }
        this.rangeVal = '全部'
        this.searchNameTemp = this.userSearchParams.other
        this.FlyLeftData = {
            showText: [
                // {
                //     name: '启用',
                //     type: '1'
                // },
                // {
                //     name: '禁用',
                //     type: '2'
                // },
                {
                    name:'移除',
                    type: '3'
                }
            ],
            ids: [],
            status: 0,
            isShow: false,
            number: 0
        };
        this.pageParam = {
            pboxData: [20, 50, 100]
        }
        this.pageRequestParam = {
            rows: this.pageParam.pboxData[0],
            page: 1,
            name: this.userSearchParams.other,
            type: this.userSearchParams.range
        }
        this.selectMemberData = {
			name: '',
			isShow: false,
			leftData: [],
			rightData: [],
			tempLeft: [],
			page: 1,
			nextPage: 'loading'
		}
        this.activatedRoute.params.subscribe(res => {
			this.routerInfo = {
				model: res.model,
                cid: res.cid,
                appid:res.appid
            }
            this.pageRequestParam.cid = res.cid
            this.pageRequestParam.app_id = res.appid
            this.membersService.setRouterInfo({
                model:res.model,
                cid:res.cid
            })
		})
    }

    ngOnInit() {
        this.getUserList()

        //监听选项
        this.pboxObj = this.riccioPboxService.getEmit().subscribe(v => {
            if (v.type === 'userCheck') {
                //多选
                this.opStatusBatch(v.data.ids, v.data.status)
            } else if (v.type === 'memberAppRange') {
                //范围点击·
                this.rangeVal = v.data.name
                this.userSearchParams.range = v.data.value 
                this.pageRequestParam.type = this.userSearchParams.range
                this.searchUser()
            } else if (v.type === 'userStatus') {
                //切换状态 
                this.fnChangeStatu(v.data)
            } else if(v.type === 'membersAppRemove'){
                this.delRoleUser([v.data])
            }

        })

        //订阅添加员工
        // this.userAddObj = this.userOpService.uaEmitObs.subscribe(v => {
        //     if (v) {
        //         // 添加成员成功
        //         this.getUserList()
        //     }
        // })
    }

    ngOnDestroy() {
        this.pboxObj?this.pboxObj.unsubscribe():{}
        this.userAddObj?this.userAddObj.unsubscribe():{}
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
     * 获取全部用户
     */
    public getUserList() {
        this.isLoading = true
        //后台
        this.grMembersService.postAppUserList(this.pageRequestParam).subscribe(res => {
            this.isLoading = false
            if(res.status === 1){
                this.MemberAppData.data = res.data.data
                this.MemberAppData.data.map(e => {
                    e['isCheck'] = false
                })
                this.pageParam['total'] = res.data.total
            }
        })
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
        // type === '1' ? this.FlyLeftData.status = 1 : this.FlyLeftData.status = 2
        this.FlyLeftData.status = type
        let show:{
            text:string,
            btn:string
        }
        switch(type){
            case '1':
                show = {
                    text:'确定启用所选成员？',
                    btn:'启用？'
                }
                break
            case '2':
                show = {
                    text:'确定禁用所选成员',
                    btn:'禁用'
                }
                break
            case '3':
                show = {
                    text:'确定移除所选成员',
                    btn:'移除'
                }
                break
        }
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
                title: show.text,
                button: show.btn,
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
            type: 'memberAppRange',
            data: [
                { name: '全部', value: 0 },
                { name: '正常', value: 2 },
                { name: '禁用', value: 3 }
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
        this.grMembersService.postAppUserList(
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


    /**
     * 搜索成员后的数据处理
     * @param res 响应
     * @author GR-05
     * @check GR-03
     */
    public resolveSearch(res: any) {
        let result = res
        this.MemberAppData.data = result.data
        this.pageParam.total = result.total
        this.MemberAppData.data.map(e => {
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
        // this.userOpService.setUserOp({
        //     type: 'add'
        // })
    }

    /**
     * 编辑用户
     * @param user 用户数据 
     * @param e 点击事件
     */
    public fnEditUser(user: any, e: MouseEvent) {
        e ? e.stopPropagation() : {}
        // this.userOpService.setUserOp({
        //     type: 'edit',
        //     data: user
        // })
    }

    /**
     * 移除企业成员
     * @param user 用户数据 
     * @param e 点击事件
     */
    public fnRemoveUser(user:any,el:any,e:MouseEvent){
        e?e.stopPropagation():{}
        this.riccioPboxService.setSubject({
            genre: 'delete',
            el: el,
            position: {
                left: e.clientX,
                top: e.clientY,
                width: 250
            },
            type: 'membersAppRemove',
            data: {
                title: '移除所选成员？',
                button: '移除',
                delID: user.id
            }
        })
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
                this.MemberAppData.data = res.data.data;
                this.MemberAppData.data.map(e => { return e['isCheck'] = false, e['isSwitch'] = true })
            })
    }

    //点击全选时的事件
    public fnCheckAll(bool: boolean): void {
        this.allCheck = bool;
        this.FlyLeftData.ids = []
        this.MemberAppData.data.map(e => e['isCheck'] = this.allCheck);
        this.FlyLeftData.isShow = this.SwitchCheck(this.MemberAppData.data) === true ? true : false;

    }

    //选中的当前用户信息
    public fnCheckUser(list: any, e: MouseEvent): void {
        e ? e.stopPropagation() : {}
        this.FlyLeftData.ids = []
        list.isCheck = !list.isCheck;
        this.FlyLeftData.isShow = this.SwitchCheck(this.MemberAppData.data) === true ? true : false;
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



    /**
   * @author GR-05
   * @copyright 选择成员的方法
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
	public fnShowAddAdminUser(): void {
		this.selectMemberData.isShow = true
		this.selectMemberData.name = ''
		this.selectMemberData.page = 1
		this.selectMemberData.leftData = []
		this.selectMemberData.rightData = JSON.parse(JSON.stringify(this.MemberAppData.data))
		this.getMemberAppUsers(false)
	}

	/**
   * 选择成员 请求全部用户
   * @author GR-05
   */
	public getMemberAppUsers(search:boolean,name:string = '') {
		this.selectMemberData.nextPage = 'loading'
		this.grMembersService.getNoAppUser({
            cid: this.routerInfo.cid,
            app_id:this.routerInfo.appid,
			rows: 1000,
            page: this.selectMemberData.page,
            name:name
		}).subscribe(res => {
			let data = res['data']
			if (res.status === 1 && data.length > 0) {
				search?this.selectMemberData.leftData = data:this.selectMemberData.leftData = this.selectMemberData.leftData.concat(data)
                this.selectMemberData.nextPage = 'hide'
                // if(total > this.selectMemberData.leftData.length){
                //     this.selectMemberData.nextPage = 'normal'
                // }else{
                //     this.selectMemberData.nextPage = 'hide'
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
   * 添加成员点击加载更多
   * @author GR-05
   */
	public fnMoreRoleUser(flag: boolean) {
		if (flag) {
			this.selectMemberData.page += this.selectMemberData.page
			this.getMemberAppUsers(false)
		}
	}

	/**
   * 选择成员组件搜索功能 仅名称
   * @author GR-05
   * @param value 名称
   */
	public fnSearchRoleUser(value: string) {
        this.getMemberAppUsers(true,value)
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
		this.grMembersService.postAppUserAdd({
            app_id:this.routerInfo.appid,
			user_ids: ids,
			cid: this.routerInfo.cid
		}).subscribe(res => {
			this.riccioLoadingService.closeLoading()
			if (res.status === 1) {
				this.riccioNotificationsService.setSubject({
					status: 'success',
					text: '添加成功'
				})
				this.getUserList()
			}
		})
    }
    
    /**
     * 移除 成员
     * @param data 
     */
    public delRoleUser(data: any) {
		this.riccioLoadingService.setLoading({
			message: '移除成员中'
		})
		this.grMembersService.postAppUserDel({
            app_id:this.routerInfo.appid,
			user_ids: data,
			cid: this.routerInfo.cid
		}).subscribe(res => {
			this.riccioLoadingService.closeLoading()
			if (res.status === 1) {
				this.riccioNotificationsService.setSubject({
					status: 'success',
					text: '移除成功'
				})
				this.getUserList()
			}
		})
	}

}
