import { Component, OnInit,Output, EventEmitter,ElementRef,OnDestroy,Input,OnChanges,SimpleChanges  } from '@angular/core';
import { Subscription } from  'rxjs/Subscription';

import { RiccioNotificationsService }    from '../../../../../Public/riccio-notifications/riccio-notifications.service'
import { RiccioModalService }    from '../../../../../Public/riccio-modal/riccio-modal.service'
import { RiccioPboxService }		from '../../../../../Public/riccio-pbox/riccio-pbox.service'
import { MembersSetDepartmentMainService }		from '../../members-set-department-main/members-set-department-main.service'
import { MembersSetAdminService }		from '../../members-set-admin/members-set-admin.service'
import { GrMembersService }    from '../../../../services'

import { createEditDepartment }  from './createEditDepartment'
import { btnData }    from './btnData'

@Component({
  selector: 'app-members-create',
  templateUrl: './members-create.component.html',
  styleUrls: ['../../../../Console.component.scss','./members-create.component.scss']
})
export class MembersCreateComponent implements OnInit {

  @Output() callData:EventEmitter<{type:string,symbol:boolean,data:any}>
  @Input()  departmentInfo:any
  @Input()  symbol:string

  public rxSetDepartmentRX$:Subscription // 订阅设置部门发射回来的数据流
  public rxSetAdminRX$:Subscription      // 订阅设置负责人发射回来的数据流

  public parentDepartment:string         // 上级部门名称
  public departmentAdmin:string          // 部门负责人名称

  public btnData:btnData
  public postCreateEditData:createEditDepartment

  public dangerShow:boolean              // 是否显示空值提示

  /**
   * 是否显示loading效果图
   * @type {boolean}
   */
  public loading:boolean

  constructor(
  	public riccioPboxService:RiccioPboxService,
    public riccioModalService:RiccioModalService,
    public riccioNotificationsService:RiccioNotificationsService,
  	public membersSetDepartmentMainService:MembersSetDepartmentMainService,
  	public membersSetAdminService:MembersSetAdminService,
    public grMembersService:GrMembersService
  ) {
    this.dangerShow = false
    this.loading = true
    this.postCreateEditData = new createEditDepartment()
    this.btnData = new btnData()
    this.parentDepartment = ''
    this.departmentAdmin  = ''
  	this.callData = new EventEmitter<{type:string,symbol:boolean}>()
  }

  ngOnInit() {
  	this.getSetDepatmentEmit()
  	this.getSetAdminEmit()
  }

  ngOnDestroy(){
  	this.rxSetDepartmentRX$.unsubscribe()
  	this.rxSetAdminRX$.unsubscribe()
  }

  ngOnChanges(changes:SimpleChanges){
     this.btnData = new btnData()
     this.dangerShow = false
     this.postCreateEditData = new createEditDepartment()
     if(this.symbol==='create'){
       this.btnData.text = '添加'
       this.postCreateEditData['parentid'] = this.departmentInfo['id']
       this.parentDepartment = this.departmentInfo['name']
       this.departmentAdmin = ''
       this.loading = false
     }else if(this.symbol==='edit'){
       this.btnData.text = '保存'
       this.postCreateEditData['id'] = this.departmentInfo['id']
       if(this.departmentInfo['id']!=''){
          this.fnGetDepartmentInfo()
       }else if(this.departmentInfo['id']==''){
          this.parentDepartment = '全公司'
          this.postCreateEditData['parentid'] = ''
       }
       
     }
  }

  /**
   * @author GR-03
   * @copyright 获取部门详情
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public fnGetDepartmentInfo():void{
    this.loading = true
    let id = this.departmentInfo['id']
    this.grMembersService.getDepartmentInfo({'id':id}).subscribe(res=>{
      this.loading = false
      if(res.status===1){
        this.postCreateEditData['parentid'] = res['data']['parentid']
        this.postCreateEditData['admin_id'] = res['data']['parent_userid']?res['data']['parent_userid']:''
        this.postCreateEditData.name = res['data']['name']
        this.postCreateEditData.note = res['data']['note']

        this.parentDepartment = res['data']['parentid']==0?'全公司':res['data']['parentname']
        this.departmentAdmin = res['data']['parent_username']?res['data']['parent_username']:''
      }
    },error=>{
      throw new Error(error)
    })
  }

  /**
   * @author GR-03
   * @copyright 显示选择上级部门还是部门负责人的pbox组件
   * @return    [return]
   * @check     GR-05        GR-03
   * @param     {string}
   * @param     {ElementRef}
   * @param     {MouseEvent}
   */
  public fnShowPbox(str:string,dataEl:ElementRef,event:MouseEvent):void{
  	if(str==='departmentMain'){
  		this.callData.emit({type:'department',symbol:false,data:{}})
	  	this.riccioPboxService.setSubject({
	        genre:'other',
	        el:dataEl,
	        type:'department',
	        position:{
	          left:event.clientX-130,
	          top:event.clientY,
	          width:265
	        },
	        data:'list'
	  	})
  	}else if(str==='departmentAdmin'){
  		this.callData.emit({type:'admin',symbol:false,data:{}})
	  	this.riccioPboxService.setSubject({
	        genre:'other',
	        el:dataEl,
	        type:'admin',
	        position:{
	          left:event.clientX-130,
	          top:event.clientY,
	          width:265
	        },
	        data:'list'
	  	})
  	}


  }

  /**
   * @author GR-03
   * @copyright 负责订阅setdepatment发射回来的数据流
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public getSetDepatmentEmit():void{
  	this.rxSetDepartmentRX$ = this.membersSetDepartmentMainService.getSubject().subscribe(res=>{
      this.parentDepartment = res['name']
      this.postCreateEditData['parentid'] = res['id']
  	})
  }

  /**
   * @author GR-03
   * @copyright 负责订阅setadmin发射回来的数据流
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public getSetAdminEmit():void{
  	this.rxSetAdminRX$ = this.membersSetAdminService.getSubject().subscribe(res=>{
      this.departmentAdmin = res['real_name']
      this.postCreateEditData['admin_id'] = res['id']
  	})
  }


  /**
   * @author GR-03
   * @copyright 点击添加或保存的时候
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public fnSaveEdit():void{
    if(this.postCreateEditData['name'].trim()==''){
      this.dangerShow = true
      this.riccioNotificationsService.setSubject({text:'部门名称不能为空',status:'danger'})
    }else if(this.symbol==='create'){
      this.btnData.text = '添加中...'
      this.btnData.disabled = true
      this.grMembersService.postDepartmentAdd(this.postCreateEditData).subscribe(res=>{
        this.btnData = new btnData()
        this.btnData.text = '添加'
        if(res.status===1){
          this.riccioNotificationsService.setSubject({text:'添加成功'})
          this.callData.emit({type:'',symbol:true,data:{}})
          this.closeView()
        }
      },error=>{
        throw new Error(error)
      })
    }else if(this.symbol==='edit'){
      this.btnData.text = '保存中...'
      this.btnData.disabled = true
      this.grMembersService.postDepartmentEdit(this.postCreateEditData).subscribe(res=>{
        this.btnData = new btnData()
        this.btnData.text = '保存'
        if(res.status===1){
          this.riccioNotificationsService.setSubject({text:'编辑成功'})
          this.callData.emit({type:'',symbol:true,data:res['data']})
          this.closeView()
        }
      },error=>{
        throw new Error(error)
      })
    }
  }

  /**
   * @author GR-03
   * @copyright 关闭视图
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public closeView():void{
    this.riccioModalService.setSubject({})
  }

  /**
   * @author GR-03
   * @copyright 取消负责人事件
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public fnChooseCancel():void{
    this.departmentAdmin = ''
    this.postCreateEditData['admin_id'] = ''
  }


}
