import { Component, OnInit,ElementRef,Renderer,OnDestroy,ViewChild,Output,EventEmitter,Input } from '@angular/core'
import { Subscription }    from 'rxjs/Subscription'

import { GrMembersService }		from '../../../../services'
import { RiccioNotificationsService }  from '../../../../../Public/riccio-notifications/riccio-notifications.service'
import { RiccioPboxService }    from '../../../../../Public/riccio-pbox/riccio-pbox.service' 
import { RiccioModalService }      from '../../../../../Public/riccio-modal/riccio-modal.service'

import { MembersSetAdminService }    from '../../members-set-admin/members-set-admin.service'
import { MembersSetDepartmentMainService }    from  '../../members-set-department-main/members-set-department-main.service'

import { MembersEditData }		from './MembersEditData'
import { btnData }      from './btnData'

@Component({
  selector: 'app-members-edit',
  templateUrl: './members-edit.component.html',
  styleUrls: ['../../../../Console.component.scss','./members-edit.component.scss']
})
export class MembersEditComponent implements OnInit {

  @ViewChild('selectDepartmentMain')  public selectDepartmentMain:ElementRef
  @ViewChild('selectDepartmentOther')  public selectDepartmentOther:ElementRef
  @ViewChild('selectParentAdmin')  public selectParentAdmin:ElementRef

  @Input() public membersInfo:any //成员详情数据
  @Output() callData:EventEmitter<{type:string,isShow:boolean}>

  public postAddData:MembersEditData
  public mobilePhone:string
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
    public riccioModalService:RiccioModalService,
    public riccioNotificationsService:RiccioNotificationsService
  ) { 
    this.btnData = new btnData()
    this.pboxSymbol = 'departmentMain'
    this.callData = new EventEmitter<{type:string,isShow:boolean}>()
    this.departmentMainName = ''
    this.departmentOtherName = []
    this.parentAdmin = ''
    this.mobilePhone = ''
    this.postAddData = new MembersEditData()
    this.danger = {
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
    this.rxSetAdmin$.unsubscribe()
    this.rxDepartmentMain$.unsubscribe()
  }

  ngOnChanges(){
    for(let e in this.postAddData){
      if(e=='department_id'){
        this.postAddData[e] = this.membersInfo[e]?this.membersInfo[e]:[]
      }else{
        this.postAddData[e] = this.membersInfo[e]?this.membersInfo[e]:''
      }
    }
    this.changeData()
  }

  /**
   * @author GR-03
   * @copyright 关闭视图事件
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public Close():void{
    this.riccioModalService.setSubject({})
  }

  /**
   * @author GR-03
   * @copyright 处理input进来的数据
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public changeData():void{
    this.btnData = new btnData()
    this.postAddData['phone'] = this.membersInfo['phone']?this.membersInfo['phone']:''
    this.postAddData['department_main'] = this.membersInfo['department_main']['id']?this.membersInfo['department_main']['id']:''
    this.postAddData['department_id'] = Array.isArray(this.membersInfo['department'])==true?this.membersInfo['department'].map(e=>e['id']):[]
    
    this.departmentMainName = [...this.membersInfo['department']].filter(e=>e['is_main']==1).length>0?[...this.membersInfo['department']].filter(e=>e['is_main']==1)[0]['name']:''
    this.departmentOtherName = Array.isArray(this.membersInfo['department'])==true?[...this.membersInfo['department']].filter(e=>e['is_main']==0):[]
    this.parentAdmin = this.membersInfo['parent_name']?this.membersInfo['parent_name']:''
    // console.log(this.membersInfo)
    // console.log(this.postAddData)
  }

  /**
   * @author GR-03
   * @copyright 所有失去焦点之后的事件判断
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {string}
   */
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
          this.callData.emit({type:'department',isShow:true})
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
          this.pboxSymbol = 'departmentOther'
          this.callData.emit({type:'department',isShow:true})
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
          this.callData.emit({type:'admin',isShow:true})
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

    let bool = true
    for(let e in this.danger){
      if(this.danger[e]==true){
        bool = false
      }
    }

    if(bool==true&&this.postAddData['id']!==''){
      this.btnData = {
        text:'保存中...',
        disabled:true
      }
      this.grMembersService.postUserSetting(this.postAddData).subscribe(res=>{
        this.btnData = new btnData()
        if(res.status===1){
          this.riccioNotificationsService.setSubject({
            text:'编辑成功',
            status:'success'
          })
          this.callData.emit({type:'',isShow:false})
          this.Close()
        }
      },error=>{
        throw new Error(error)
      })
    }

  }

}
