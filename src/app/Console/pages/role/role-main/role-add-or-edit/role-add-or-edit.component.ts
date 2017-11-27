import { Component, OnInit,Input,OnChanges,Output, EventEmitter ,ElementRef,ViewChild,OnDestroy} from '@angular/core';

import { Subscription } from 'rxjs/Subscription'

import { roleAddEdit }	from './roleAddEditData'
import { btnData }    from './btnData'

import { GrRoleService }    from '../../../../services'
import { RiccioPboxService }    from '../../../../../Public/riccio-pbox/riccio-pbox.service'
import { RoleSelectRoleService }  from '../role-select-role/role-select-role.service'
import { RiccioNotificationsService }    from '../../../../../Public/riccio-notifications/riccio-notifications.service'

@Component({
  selector: 'app-role-add-or-edit',
  templateUrl: './role-add-or-edit.component.html',
  styleUrls: ['../../../../Console.component.scss','./role-add-or-edit.component.scss']
})
export class RoleAddOrEditComponent implements OnInit {
  
  @ViewChild('selectParentName')  public selectParentName:ElementRef

  /**
   * @author GR-03
   * @copyright 
   * @param     角色名称
   * @return    [return]
   * @check     GR-05       GR-03
   */
  @Input() public roleInfoName:string

  /**
   * @author GR-03
   * @copyright 角色ID
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  @Input() public roleInfoId:string|number

  /**
   * @author GR-03
   * @copyright 该字段判断是添加还是删除
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  @Input() public roleSymbol:string

  /**
   * @author GR-03
   * @copyright 需要继承的角色id
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  @Input() public roleRules:string|number

  @Output() emitData:EventEmitter<{name:string,isShow:boolean}>

  @Output() emitRefresh:EventEmitter<{data:any,show:boolean}>

  /**
   * 添加或编辑角色时的详细信息 也是需要post到后台的数据
   * @type {roleAddEdit}
   */
  public postRoleData:roleAddEdit

  /**
   * 父级角色的名称
   * @type {string}
   */
  public parentName:string

  /**
   * 是否显示loading效果的字段
   * @type {boolean}
   */
  public loading:boolean

  /**
   * 订阅roleSelect的数据
   * @type {Subscription}
   */
  public roleSelectRX$:Subscription

  /**
   * 点击添加按钮是否显示禁用状态的标志位
   * @type {boolean}
   */
  public disabledBtnOpen:boolean

  /**
   * 必填项没有填写则提示
   * @type {boolean}
   */
  public dangerShow:boolean

  /**
   * 根据是添加还是编辑来显示不同的按钮文字
   * @type {btnData}
   */
  public btnData:btnData

  constructor(
    public riccioPboxService:RiccioPboxService,
    public grRoleService:GrRoleService,
    public roleSelectRoleService:RoleSelectRoleService,
    public riccioNotificationsService:RiccioNotificationsService
  ) {
    this.btnData = new btnData()
    this.parentName = ''
    this.loading = false
    this.disabledBtnOpen = true
    this.dangerShow = false
  	this.postRoleData = new roleAddEdit()
    this.emitData = new EventEmitter<{name:string,isShow:boolean}>()
    this.emitRefresh = new EventEmitter<{data:any,show:boolean}>()

    this.roleSelectRX$ = this.roleSelectRoleService.getSubject().subscribe(res=>{
      if(res['id']==this.roleInfoId&&this.roleSymbol==='editRole'){
          this.riccioNotificationsService.setSubject({text:'父级角色不能选自己',status:'danger'})
      }else{
        this.riccioPboxService.setSubject({})
        this.parentName = res['groupname']
        this.postRoleData['parent_id'] = res['id'] 
      }

    })

  }

  ngOnInit() {
  }

  ngOnChanges(){
    if(this.roleSymbol==='addRole'){
      this.fnAddChange()
    }else if(this.roleSymbol==='editRole'){
      this.fnEditChange()
    }
  }

  ngOnDestroy(){
    this.roleSelectRX$.unsubscribe()
  }

  /**
   * @author GR-03
   * @copyright 处理展示添加子角色的时候调用该函数
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public fnAddChange():void{
    this.btnData = new btnData('添加','添加中...')
    this.parentName = this.roleInfoName
    this.postRoleData['parent_id'] = this.roleInfoId
  }

  /**
   * @author GR-03
   * @copyright 处理展示编辑角色的时候调用该函数
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public fnEditChange():void{
    this.btnData = new btnData('保存','保存中...')
    this.loading = true
    this.grRoleService.getRolePartInfo(this.roleInfoId).subscribe(res=>{
      this.loading = false
      if(res.status===1){
        let resData = res['data']
        Object.keys(this.postRoleData).map(e=>{
          this.postRoleData[e] = resData[e]
        })
        this.parentName = res['data']['parent_name']==""?'企业负责人':res['data']['parent_name']
      }
    },error=>{
      throw new Error(error)
    })
  }

  /**
   * @author GR-03
   * @copyright 选择父级角色触发的事件，用以显示pbox组件
   * @param     [param]
   * @return    [return]
   * @check     GR-05        GR-03
   * @param     {string}     str     [description]
   * @param     {ElementRef} dataEle [description]
   * @param     {MouseEvent} event   [description]
   */
  public fnShowPbox(str:string,dataEle:ElementRef,event:MouseEvent):void{
    this.emitData.emit({name:'',isShow:true})
    setTimeout(()=>this.emitData.emit({name:'selectRole',isShow:true}))
    let client = this.selectParentName.nativeElement.getBoundingClientRect()
    this.riccioPboxService.setSubject({
      genre:'other',
      el:dataEle,
      position:{
        left:client.left-25,
        top:client.top+37,
        width:450
      }
    })
  }


  /**
   * @author GR-03
   * @copyright 点击按钮触发的事件
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {boolean}   emit  [description]
   */
  public fnAddEdit(emit:boolean):void{
    if(this.postRoleData['groupname'].trim()==""){
      this.dangerShow = true
      this.riccioNotificationsService.setSubject({
        text:'角色名称必须填写',
        status:'danger'
      })
    }else if(this.roleSymbol === 'addRole'){
      this.disabledBtnOpen = false
      this.postRoleData['copy_id'] = this.roleRules?this.roleRules:''
      this.grRoleService.postRolePartAdd(this.postRoleData).subscribe(res=>{
        this.disabledBtnOpen = true
        if(res.status===1){
          this.closeView()
          this.emitRefresh.emit({data:{id:this.roleInfoId,...this.postRoleData},show:true})
          this.riccioNotificationsService.setSubject({
            text:'添加成功',
            status:'success'
          })
        }
      },error=>{
        throw new Error(error)
      })
    }else if(this.roleSymbol === 'editRole'){
      this.disabledBtnOpen = false
      this.grRoleService.postRolePartEdit({
        'id':this.roleInfoId,
        ...this.postRoleData
      }).subscribe(res=>{
        this.disabledBtnOpen = true
        if(res.status===1){
          this.closeView()
          this.emitRefresh.emit({data:{id:this.roleInfoId,...this.postRoleData},show:true})
          this.riccioNotificationsService.setSubject({
            text:'修改成功',
            status:'success'
          })
        }
      },error=>{
        throw new Error(error)
      })
    }
  }

  /**
   * @author GR-03
   * @copyright 关闭视图的事件
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public closeView():void{
    this.emitData.emit({name:'',isShow:false})
  }


}
