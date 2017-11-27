import { Component, OnInit, Input, ElementRef, Renderer, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'

import { GrMembersService } from '../../../../services'
import { RiccioNotificationsService } from '../../../../../Public/riccio-notifications/riccio-notifications.service'
import { RiccioPboxService } from '../../../../../Public/riccio-pbox/riccio-pbox.service'

import { MembersSetAdminService } from '../../members-set-admin/members-set-admin.service'
import { MembersSetDepartmentMainService } from '../../members-set-department-main/members-set-department-main.service'

import { AddToMembersData } from './AddToMembersData'
import { btnData } from './btnData'
import {GrUserService} from "../../../../services/grUser/grUser.service";
import 'rxjs/Rx';
import {Observable} from "rxjs";

@Component({
	selector: 'app-add-to-members',
	templateUrl: './add-to-members.component.html',
	styleUrls: [
		'../../../role/role.common.scss',
		'../members-add.component.scss',
		'./add-to-members.component.scss'
	]
})
export class AddToMembersComponent implements OnInit {

	@ViewChild('selectDepartmentMain') public selectDepartmentMain: ElementRef
	@ViewChild('selectDepartmentOther') public selectDepartmentOther: ElementRef
	@ViewChild('selectParentAdmin') public selectParentAdmin: ElementRef

	@Input() routerInfo: {
		model: string,
		cid: number | string
	}
	@Output() callData: EventEmitter<string>

	public postAddData: AddToMembersData
	public mobilePhone: string         // 帐号
	public danger: any
	public pboxSymbol: string          // 该字段判断所选择的是主属部门还是附属部门还是直属上级的pbox组件

	public departmentMainName: string  // 主属部门的名称
	public departmentOtherName: Array<{ name: string, id: string | number }> // 附属部门名称(可多个)
	public parentAdmin: string         // 直属上级名称

	public rxDepartmentMain$: Subscription  // setDepartmentMain的可订阅对象
	public rxSetAdmin$: Subscription        // setAdmin的可订阅对象

	public btnData: btnData
	public title:string = "请选择成员";
	public placeholder:string = "请输入员工姓名";
	public header:string = "";

	constructor(
		public grMembersService: GrMembersService,
		public membersSetDepartmentMainService: MembersSetDepartmentMainService,
		public membersSetAdminService: MembersSetAdminService,
		public riccioPboxService: RiccioPboxService,
		public riccioNotificationsService: RiccioNotificationsService,
    public grUserService:GrUserService
	) {
		this.btnData = new btnData()
		this.pboxSymbol = 'departmentMain'
		this.callData = new EventEmitter<string>()
		this.departmentMainName = ''
		this.departmentOtherName = []
		this.parentAdmin = ''
		this.mobilePhone = ''
		this.postAddData = new AddToMembersData()
		this.danger = {
			'mobile': false,
			'phone': false,
			'real_name': false,
			'email': false,
			'department_main': false
		}
		//cmf 添加
		this.membersList = [];
    this.searchPage = 1;
    this.moreBtn = {
      text:'加载更多',
      status:true
    }
    this.membersName = '';
	}

	ngOnInit() {
		this.postAddData.cid = this.routerInfo.cid
		//监听setDepartmentMain发射回来的数据流
		this.getSetDepartmentMainEmit()
		//监听setAdmin发射回来的数据流
		this.getSetAdmin()

	}

	ngOnDestroy() {
		this.rxDepartmentMain$.unsubscribe()
		this.rxSetAdmin$.unsubscribe()
	}

	//手机号失去焦点之后获取该用户的信息同时获取到id
	public fnGetFindMobile(): void {

		this.danger['mobile'] = this.mobilePhone.trim() === "" || !(/^1[34578]\d{9}$/.test(this.mobilePhone.trim().toString()))
			? (() => {
				this.riccioNotificationsService.setSubject({
					text: '请填写正确的手机号',
					status: 'danger'
				})
				return true
			})()
			: (() => {
				this.grMembersService.postUserIdByPhone({
					mobile: this.mobilePhone.trim(),
					cid: this.routerInfo.cid
				}).subscribe(res => {
					if (res.status === 1) {
						this.postAddData['user_id'] = res['data']
					} else if (res.status === 0) {
						this.danger['mobile'] = true
					}
				}, error => {
					throw new Error(error)
				})
				return false
			})()

	}

	//所有失去焦点之后的事件判断
	public fnAllBlurEle(str: string): void {

		switch (str) {
			case "real_name":
				(() => {
					this.danger[str] = this.postAddData[str].trim() === "" ? (() => {
						let obj = {
							text: '请输入真实姓名',
							status: 'danger'
						}
						this.riccioNotificationsService.setSubject(obj)
						return true
					})() : false
				})()
				break

			case "email":
				(() => {
					this.danger[str] = this.postAddData[str].trim() === "" || !(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.postAddData[str].trim().toString()))
						? (() => {
							let obj = {
								text: '请输入正确的邮箱',
								status: 'danger'
							}
							this.riccioNotificationsService.setSubject(obj)
							return true
						})() : false
				})()
				break

			case "phone":
				(() => {
					this.danger[str] = this.postAddData[str].trim() === "" || !(/^1[34578]\d{9}$/.test(this.postAddData[str].trim().toString()))
						? (() => {
							this.riccioNotificationsService.setSubject({
								text: '请输入正确的联系方式',
								status: 'danger'
							})
							return true
						})() : false
				})()
				break

			default: break
		}

	}


	/**
	 * @author GR-03
	 * @copyright 需要显示的pbox组件内容
	 * @check     GR-05        GR-03
	 * @param     {string}
	 * @param     {ElementRef}
	 * @param     {MouseEvent}
	 */
	public fnShowPbox(str: string, dataEl: ElementRef, event: MouseEvent): void {
		switch (str) {
			case "departmentMain":
				(() => {
					this.pboxSymbol = 'departmentMain'
					this.callData.emit('department')
					let position = this.selectDepartmentMain.nativeElement.getBoundingClientRect()
					this.riccioPboxService.setSubject({
						'genre': 'other',
						'el': dataEl,
						'type': 'departmentMain',
						'position': {
							'left': position.left,
							'top': position.top,
							'width': position.width
						}
					})
				})()
				break

			case "departmentOther":
				(() => {
					this.membersSetDepartmentMainService.setSetting('sss')
					this.pboxSymbol = 'departmentOther'
					this.callData.emit('department')
					let position = this.selectDepartmentOther.nativeElement.getBoundingClientRect()
					this.riccioPboxService.setSubject({
						'genre': 'other',
						'el': dataEl,
						'type': 'departmentOther',
						'position': {
							'left': position.left,
							'top': position.top,
							'width': position.width
						}
					})
				})()
				break

			case "parentAdmin":
				(() => {
					this.callData.emit('admin')
					let position = this.selectParentAdmin.nativeElement.getBoundingClientRect()
					this.riccioPboxService.setSubject({
						'genre': 'other',
						'el': dataEl,
						'type': 'parentAdmin',
						'position': {
							'left': position.left,
							'top': position.top,
							'width': position.width
						}
					})
				})()
				break

			default: break

		}
	}

	/**
	 * @author GR-03
	 * @copyright 订阅SetDepartmentMain的可观察对象
	 * @param     [param]
	 * @return    [return]
	 * @check     GR-05       GR-03
	 */
	public getSetDepartmentMainEmit(): void {
		this.rxDepartmentMain$ = this.membersSetDepartmentMainService.getSubject().subscribe(res => {
			if (Object.keys(res).length > 0 && this.pboxSymbol == 'departmentMain') {
				if (this.postAddData['department_id'].filter(e => e == res['id']).length > 0) {
					this.riccioNotificationsService.setSubject({
						text: '已选的附属部门不能作为主属部门',
						status: 'danger'
					})
				} else {
					this.postAddData['department_main'] = res['id']
					this.departmentMainName = res['name']
				}
			} else if (Object.keys(res).length > 0 && this.pboxSymbol == 'departmentOther') {
				if (this.postAddData['department_main'] == res['id']) {
					this.riccioNotificationsService.setSubject({
						text: '已选的主属部门不能作为附属部门',
						status: 'danger'
					})
				} else {
					this.departmentOtherName = this.departmentOtherName.filter(e => e['id'] != res['id'])
					this.departmentOtherName = [...this.departmentOtherName, { name: res['name'], id: res['id'] }]
					this.postAddData['department_id'] = this.departmentOtherName.map(e => e['id'])
				}
			}
		})
	}

	/**
	 * @author GR-03
	 * @copyright 订阅SetAdmin的可观察对象
	 * @param     [param]
	 * @return    [return]
	 * @check     GR-05       GR-03
	 */
	public getSetAdmin(): void {
		this.rxSetAdmin$ = this.membersSetAdminService.getSubject().subscribe(res => {
			this.postAddData['parent_userid'] = res['id']
			this.parentAdmin = res['real_name']
		})
	}


	/**
	 * @author GR-03
	 * @copyright 删除主属部门
	 * @param     [param]
	 * @return    [return]
	 * @check     GR-05       GR-03
	 */
	public fnCloseDepartmentMain(): void {
		this.departmentMainName = ''
	}

	/**
	 * @author GR-03
	 * @copyright 删除某一个附属部门
	 * @param     [param]
	 * @return    [return]
	 * @check     GR-05           GR-03
	 * @param     {number|string}
	 */
	public fnCloseDepartmentOther(list: Array<{ name: string, id: number | string }>): void {
		this.departmentOtherName = this.departmentOtherName.filter(e => e['id'] != list['id'])
	}

	/**
	 * @author GR-03
	 * @copyright 删除直属上级
	 * @param     [param]
	 * @return    [return]
	 * @check     GR-05       GR-03
	 */
	public fnCloseParentAdmin(): void {
		this.parentAdmin = ''
	}

	/**
	 * @author GR-03
	 * @copyright 添加成员按钮
	 * @param     [param]
	 * @return    [return]
	 * @check     GR-05       GR-03
	 */
	public fnAddMembers(): void {
		// this.fnGetFindMobile()
		this.fnAllBlurEle('real_name')
		this.fnAllBlurEle('phone')
		this.fnAllBlurEle('email')
		this.danger['department_main'] = this.departmentMainName == '' ? (() => {
			this.riccioNotificationsService.setSubject({
				text: '请选择主属部门',
				status: 'danger'
			})
			return true
		})() : false

		let bool = true;
		for (let e in this.danger) {
			if (this.danger[e] == true) {
				bool = false
			}
		}

		if (bool == true && this.postAddData['user_id'] !== '') {
			this.btnData = {
				text: '添加中...',
				disabled: true
			}
			this.grMembersService.postUserAdd(this.postAddData).subscribe(res => {
				this.btnData = new btnData()
				if (res.status === 1) {
					this.riccioNotificationsService.setSubject({
						text: '添加成功',
						status: 'success'
					})
					this.callData.emit('success')
				}
			}, error => {
				throw new Error(error)
			})
		}

	}

	/**
	 * @author GR-03
	 * @copyright 关闭视图的方法
	 * @param     [param]
	 * @return    [return]
	 * @check     GR-05       GR-03
	 */
	public Close(): void {
		this.callData.emit('close')
	}

	/* cmf的修改 */
  public isShow:boolean = false;
	public isClose:boolean;
	public loading:boolean;
  public membersList:any[];
  public searchPage:number;
  public moreBtn:{
    text:string,
    status:boolean
  }
  public name:string = "name";
  public membersName:string;
  public searchValue:string;
  public member:any;
  public nextPage:string = "hide";
  public closeViewHandler(isClose){
    this.isClose = isClose;
    if(this.isClose == true){
      this.isShow = false;
    }
  }

  public fnGetFindDepartment(){
    this.danger['department_main'] = this.departmentMainName == '' ? (() => {
      this.riccioNotificationsService.setSubject({
        text: '请选择主属部门',
        status: 'danger'
      })
      return true
    })() : false
  }
  emitDataHandler(member){
    this.member = member;
    this.isShow = false;
    this.mobilePhone = this.member.mobile;
    this.postAddData['real_name'] = this.member.name;
    this.postAddData['phone'] = this.member.mobile;
    this.postAddData['email'] = this.member.email;
    this.fnGetFindMobile();
    this.fnGetFindDepartment();

  }
  public searchMember():void{
    this.isShow = true;
    this.loading = true;
    this.fnGetMembersList(this.membersName,'search');
  }

  public fnGetMembersList(name:string='',type:string):void{
    type == 'search'?this.loading = true:{}
    this.grUserService.getUserIndex({
      name:name,
      page:this.searchPage
    }).subscribe(res=>{
      this.loading = false
      if(res.status===1){
        let temp = Array.isArray(res['data']['data'])==true
          ?(()=>{
            let arr = []
            res['data']['data'].map(e=>{
              arr.push({
                id:e['id'],
                name:e['real_name']?e['real_name']:e['name'],
                sliceName:e['real_name']?e['real_name'].slice(0,1):e['name'].slice(0,1),
                mobile:e['mobile'],
                email:e['email']
              })
            })
            return [...arr]
          })()
          :[]
        if(type === 'search'){
          // 搜索，直接赋值
          this.membersList = temp
        }else if(type === 'more'){
          // 更多，追加赋值
          this.membersList = this.membersList.concat(temp)
        }
      }else{
        this.riccioNotificationsService.setSubject({
          text:res.message,
          status:'danger'
        })
        this.moreBtn = {
          text:'加载更多',
          status:true
        }
      }
    })

  }

  //搜索事件
  searchHandler(searchValue){
    this.searchValue = searchValue;
    this.fnGetMembersList(this.searchValue,'search')
  }

}
