import { Component, OnInit,ElementRef,Renderer,OnDestroy,ViewChild,Output,EventEmitter } from '@angular/core'
import { Subscription }    from 'rxjs/Subscription'

import { GrMembersService }		from '../../../../services'
import { RiccioNotificationsService }  from '../../../../../Public/riccio-notifications/riccio-notifications.service'
import { RiccioPboxService }    from '../../../../../Public/riccio-pbox/riccio-pbox.service' 
import { RiccioModalService }    from '../../../../../Public/riccio-modal/riccio-modal.service'

import { MembersSetAdminService }    from '../../members-set-admin/members-set-admin.service'
import { MembersSetDepartmentMainService }    from  '../../members-set-department-main/members-set-department-main.service'

import { AddToMembersData }		from './AddToMembersData'
import { btnData }      from './btnData'

@Component({
  selector: 'app-add-to-members',
  templateUrl: './add-to-members.component.html',
  styleUrls: ['../../../../Console.component.scss','../members-add.component.scss','./add-to-members.component.scss']
})
export class AddToMembersComponent implements OnInit {

  @ViewChild('selectDepartmentMain')  public selectDepartmentMain:ElementRef
  @ViewChild('selectDepartmentOther')  public selectDepartmentOther:ElementRef
  @ViewChild('selectParentAdmin')  public selectParentAdmin:ElementRef

  @Output() callData:EventEmitter<string>
  @Output() emitUserId: EventEmitter<number>
  @Output() emitUserPhone: EventEmitter<string>

  public postAddData:AddToMembersData
  public mobilePhone:string         // 帐号
  public danger:any
  public pboxSymbol:string          // 该字段判断所选择的是主属部门还是附属部门还是直属上级的pbox组件

  public departmentMainName:string  // 主属部门的名称
  public departmentOtherName:Array<{name:string,id:string|number}> // 附属部门名称(可多个)
  public parentAdmin:string         // 直属上级名称

  public rxDepartmentMain$:Subscription  // setDepartmentMain的可订阅对象
  public rxSetAdmin$:Subscription        // setAdmin的可订阅对象

  public btnData:btnData

  constructor(
  	public grMembersService:GrMembersService,
    public membersSetDepartmentMainService:MembersSetDepartmentMainService,
    public membersSetAdminService:MembersSetAdminService,
    public riccioPboxService:RiccioPboxService,
    public riccioModalService: RiccioModalService,
  	public riccioNotificationsService:RiccioNotificationsService
  ) { 
    this.btnData = new btnData()
    this.pboxSymbol = 'departmentMain'
    this.callData = new EventEmitter<string>()
    this.emitUserId = new EventEmitter<number>()
    this.emitUserPhone = new EventEmitter<string>()
    this.departmentMainName = ''
    this.departmentOtherName = []
    this.parentAdmin = ''
  	this.mobilePhone = ''
  	this.postAddData = new AddToMembersData()
  	this.danger = {
  		'mobile':false,
      'phone':false,
  		'real_name':false,
  		'email':false,
  		'department_main':false
  	}
  }

  ngOnInit() {

    //监听setDepartmentMain发射回来的数据流
    this.getSetDepartmentMainEmit()

    //监听setAdmin发射回来的数据流
    this.getSetAdmin()

  }

  ngOnDestroy(){
    this.rxDepartmentMain$.unsubscribe()
    this.rxSetAdmin$.unsubscribe()
  }

  //点击邀请加入的函数
  public fnGetFindMobile():void{

  	// this.danger['mobile'] = this.mobilePhone.trim()===""||!(/^1[34578]\d{9}$/.test(this.mobilePhone.trim().toString()))
  	// ?(()=>{
  	// 	this.riccioNotificationsService.setSubject({
   //      text:'请填写正确的手机号',
   //      status:'danger'
   //    })
  	// 	return true
  	// })()
  	// :(()=>{
  	// 	this.grMembersService.postUserMobile({
   //      'action':'getuseridbymodile',
   //      'mobile':this.mobilePhone.trim()
   //    }).subscribe(res=>{
  	// 		if(res.status===1){
   //        this.postAddData['user_id'] = res['data']
  	// 		}else if(res.status===0){
		 //  		this.danger['mobile'] = true
  	// 		}
  	// 	},error=>{
  	// 		throw new Error(error)
  	// 	})
  	// 	return false
  	// })()

    if( this.phoneBlurHandle() == false ) {
      this.grMembersService.postUserMobile({
        'action':'getuseridbymodile',
        'mobile':this.mobilePhone.trim()
      }).subscribe(res=>{
        if(res.status===1){
          this.postAddData['user_id'] = res['data']
          this.emitUserId.emit(+this.postAddData['user_id'])
          this.emitUserPhone.emit(this.mobilePhone.trim())
          this.showModalSms()
        }else if(res.status===0){
          this.danger['mobile'] = true
        }
      },error=>{
        throw new Error(error)
      })
    }

  }

  /*
  处理账号失去焦点之后的判断
   */
  public phoneBlurHandle() : boolean {
    let bool: boolean = this.mobilePhone.trim()===""||!(/^1[34578]\d{9}$/.test(this.mobilePhone.trim().toString()))
    bool == true ? this.riccioNotificationsService.setSubject({text:'请填写正确的手机号',status:'danger'}) : { }
    return bool
  }

  //所有失去焦点之后的事件判断
  public fnAllBlurEle(str:string):void{

  	switch (str) {
  		case "real_name":
  			(()=>{
  				this.danger[str] = this.postAddData[str].trim()===""?(()=>{
  					let obj = {
  						text:'请输入真实姓名',
  						status:'danger'
  					}
			  		this.riccioNotificationsService.setSubject(obj)
			  		return true
  				})():false
  			})()
  			break
  		
  		case "email":
  			(()=>{
  				this.danger[str] = this.postAddData[str].trim()===""||!(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.postAddData[str].trim().toString()))
  				?(()=>{
  					let obj = {
  						text:'请输入正确的邮箱',
  						status:'danger'
  					}
			  		this.riccioNotificationsService.setSubject(obj)
			  		return true
  				})():false
  			})()
  			break

      case "phone":
        (()=>{
          this.danger[str] = this.postAddData[str].trim()===""||!(/^1[34578]\d{9}$/.test(this.postAddData[str].trim().toString()))
          ?(()=>{
            this.riccioNotificationsService.setSubject({
              text:'请输入正确的联系方式',
              status:'danger'
            })
            return true
          })():false
        })()
        break

  		default:break
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
  public fnShowPbox(str:string,dataEl:ElementRef,event:MouseEvent):void{
    switch (str) {
      case "departmentMain":
        (()=>{
          this.pboxSymbol = 'departmentMain'
          this.callData.emit('department')
          this.riccioPboxService.setSubject({
            'genre':'other',
            'el':dataEl,
            'type':'departmentMain',
            'position':{
              'left':this.selectDepartmentMain.nativeElement.getBoundingClientRect().left-15,
              'top':event.clientY+28,
              'width':265
            }
          })
        })()
        break

      case "departmentOther":
        (()=>{
          this.membersSetDepartmentMainService.setSetting('sss')
          this.pboxSymbol = 'departmentOther'
          this.callData.emit('department')
          this.riccioPboxService.setSubject({
            'genre':'other',
            'el':dataEl,
            'type':'departmentOther',
            'position':{
              'left':this.selectDepartmentOther.nativeElement.getBoundingClientRect().left-15,
              'top':event.clientY+28,
              'width':265
            }
          })
        })()
        break
    
      case "parentAdmin":
        (()=>{
          this.callData.emit('admin')
          this.riccioPboxService.setSubject({
            'genre':'other',
            'el':dataEl,
            'type':'parentAdmin',
            'position':{
              'left':this.selectParentAdmin.nativeElement.getBoundingClientRect().left-15,
              'top':event.clientY+28,
              'width':265
            }
          })
        })()
        break

      default:break

    }
  }

  /**
   * @author GR-03
   * @copyright 订阅SetDepartmentMain的可观察对象
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public getSetDepartmentMainEmit():void{
    this.rxDepartmentMain$ = this.membersSetDepartmentMainService.getSubject().subscribe(res=>{
      if(Object.keys(res).length>0&&this.pboxSymbol == 'departmentMain'){
        if(this.postAddData['department_id'].filter(e=>e==res['id']).length>0){
          this.riccioNotificationsService.setSubject({
            text:'已选的附属部门不能作为主属部门',
            status:'danger'
          })
        }else {
          this.postAddData['department_main'] = res['id']
          this.departmentMainName = res['name']
        }
      }else if(Object.keys(res).length>0&&this.pboxSymbol == 'departmentOther'){
        if(this.postAddData['department_main']==res['id']){
          this.riccioNotificationsService.setSubject({
            text:'已选的主属部门不能作为附属部门',
            status:'danger'
          })
        }else {
          this.departmentOtherName = this.departmentOtherName.filter(e=>e['id']!=res['id'])
          this.departmentOtherName = [...this.departmentOtherName,{name:res['name'],id:res['id']}]
          this.postAddData['department_id'] = this.departmentOtherName.map(e=>e['id'])
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
  public getSetAdmin():void{
    this.rxSetAdmin$ = this.membersSetAdminService.getSubject().subscribe(res=>{
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
  public fnCloseDepartmentMain():void{
    this.departmentMainName = ''
    this.postAddData['department_main'] = ''
  }

  /**
   * @author GR-03
   * @copyright 删除某一个附属部门
   * @param     [param]
   * @return    [return]
   * @check     GR-05           GR-03
   * @param     {number|string}
   */
  public fnCloseDepartmentOther(list:Array<{name:string,id:number|string}>):void{
    this.departmentOtherName = this.departmentOtherName.filter(e=>e['id']!=list['id'])
    this.postAddData['department_id'] = this.postAddData['department_id'].filter(e=>e!=list['id'])
  }

  /**
   * @author GR-03
   * @copyright 删除直属上级
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public fnCloseParentAdmin():void{
    this.parentAdmin = ''
  }

  /**
   * @author GR-03
   * @copyright 添加成员按钮
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public fnAddMembers():void{
    // this.fnGetFindMobile()
    this.fnAllBlurEle('real_name')
    this.fnAllBlurEle('phone')
    this.fnAllBlurEle('email')
    this.danger['department_main'] = this.departmentMainName==''?(()=>{
      this.riccioNotificationsService.setSubject({
        text:'请选择主属部门',
        status:'danger'
      })
      return true
    })():false

    let bool = true;
    for(let e in this.danger){
      if(this.danger[e]==true){
        bool = false
      }
    }

    if(bool==true&&this.postAddData['user_id']!==''){

      this.btnData = {
        text:'添加中...',
        disabled:true
      }
      this.grMembersService.postUserAdd(this.postAddData).subscribe(res=>{
        this.btnData = new btnData()
        if(res.status===1){
          this.riccioNotificationsService.setSubject({
            text:'添加成功',
            status:'success'
          })
          this.callData.emit('success')
        }
      },error=>{
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
  public Close():void{
    this.callData.emit('close')
  }

  /**
   * @author GR-03
   * @copyright 点击邀请加入弹出输入验证码
   * @param     [param]
   * @return    [return]
   */
  public showModalSms(): void {
    this.riccioModalService.setSubject({
      'header': '验证码',
      'size': 470,
      'noBtn': true,
      'type': 'SMS'
    })
  }

}
