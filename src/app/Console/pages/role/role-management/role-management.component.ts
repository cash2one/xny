import { Component, OnInit,OnDestroy,ElementRef } from '@angular/core';
import { Subscription }  from 'rxjs/Subscription'

import { MenuListData }		from './menuData'

import { GrRoleService }		from '../../../services'
import { RiccioModalService }  from '../../../../Public/riccio-modal/riccio-modal.service'
import { RiccioPboxService }    from '../../../../Public/riccio-pbox/riccio-pbox.service'
import { RiccioNotificationsService }  from '../../../../Public/riccio-notifications/riccio-notifications.service'

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['../../../Console.component.scss','./role-management.component.scss']
})
export class RoleManagementComponent implements OnInit {

  /**
   * 用来排序的字段
   * @type {[type]}
   */
  public isSort:number|string


  /**
   * 菜单标题
   * @type {string[]}
   */
  public tableTitle:string[]

  /**
   * 角色平级列表的数据
   * @type {any[]}
   */
  public roleListData:any[]

  /**
   * 选中的某一条角色的详细信息
   * @type {any}
   */
  public checkRoleInfo:any


  /**
   * 显示不同的pbox为other的组件的标志位
   * @type {string}
   */
  public pboxOtherSymbol:string

  /**
   * 订阅pbox发射回来的数据
   * @type {Subscription}
   */
  public riccioPboxRX$:Subscription

  /**
   * 排序值变化之前的值,用来判断排序值是否发生变化，只有修改不同的排序才进行提交
   * @type {[type]}
   */
  public constIsSort:string|number

  /**
   * loading动画效果的标志位
   * @type {boolean}
   */
  public loading:boolean

  constructor(
  	public grRoleService:GrRoleService,
    public riccioModalService:RiccioModalService,
    public riccioPboxService:RiccioPboxService,
    public riccioNotificationsService:RiccioNotificationsService
  ) { 
    this.loading = true
    this.constIsSort = '0'
    this.pboxOtherSymbol = ''
  	this.roleListData = []
  	this.tableTitle = new MenuListData().data
    this.checkRoleInfo = {
      groupname:"企业负责人",
      id:'0'
    }


    /**
     * @author GR-03
     * @copyright 订阅pbox组件的数据
     * @param     [param]
     * @return    [return]
     * @check     GR-05       GR-03
     * @param     {'删除成功'})                     }                            }} ).subscribe(res=>{         if(res['type']==='deleteRole'&&res['data']['id']===0){                         this.grRoleService.postRolePartDel({          'id' [description]
     * @param     {[type]}    error=>{            throw new Error(error)                               })                                                             }    } [description]
     */
    this.riccioPboxRX$ = this.riccioPboxService.getEmit().subscribe(res=>{
      if(res['type']==='deleteRole'&&res['data']['id']===0){
        this.grRoleService.postRolePartDel({
          'id':this.checkRoleInfo['id']
        }).subscribe(res=>{
          if(res.status===1){
            this.fnGetRoleList()
            this.riccioNotificationsService.setSubject({text:'删除成功'})
          }
        },error=>{
          throw new Error(error)
        })
      }
    })
  }

  ngOnInit() {
  	this.fnGetRoleList()
  }

  ngOnDestroy(){
   this.riccioPboxRX$.unsubscribe() 
  }

  /**
   * @author GR-03
   * @copyright 获取角色平级列表
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public fnGetRoleList():void{
    this.loading = true
  	this.grRoleService.postRolePartList({
  		'model':'Console'
  	}).subscribe(res=>{
      this.loading = false
  		if(res.status===1){
  			this.roleListData = [...res['data']]
  			this.findParentName()
  		}
  	},error=>{
  		throw new Error(error)
  	})
  }

  /**
   * @author GR-03
   * @copyright 循环找出父级角色的名称
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public findParentName():void{
  	this.roleListData.map(e=>{
  		this.roleListData.map(_e=>{
  			if(e['id']==_e['parent_id']) _e['parentName'] = e['groupname']
  		})
  	})
  }


  /**
   * @author GR-03
   * @copyright 失去焦点过后触发排序事件
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {any}
   */
  public fnSortList(list:any):void{
    if(list.listorder==""){
      list.listorder='0'
    }else if(this.constIsSort!=list.listorder){
      let obj = {
        'id':list.id,
        'sort':list.listorder
      }
      this.grRoleService.postRolePartSort(obj).subscribe(res=>{
        if(res.status===1){
          this.riccioNotificationsService.setSubject({text:'排序成功'})
        }
      },error=>{
        throw new Error(error)
      })
    }

  }

  /**
   * @author GR-03
   * @copyright 点击编辑按钮弹出编辑角色弹窗
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public fnShowModalEditRole(list:any):void{
    this.checkRoleInfo['groupname'] = list['groupname']
    this.checkRoleInfo['id'] = list['id']
    this.riccioModalService.setSubject({
      header:"编辑角色",
      type:'editRole',
      data:this.checkRoleInfo,
      noBtn:true
    })
  }

  /**
   * @author GR-03
   * @copyright 接受role-add-or-edit组件的数据
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {any}       value [description]
   */
  public fnOutputRoleAddEdit(value:any):void{
    this.pboxOtherSymbol = value.name
    if(value.isShow===false){
      this.riccioModalService.setSubject({})
    }
  }


  /**
   * @author GR-03
   * @copyright 判断添加和编辑完成后是否需要重新请求刷新页面
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {any}   value [description]
   */
  public fnOutputRoleRefresh(value:any,type:string):void{
    if(type==='editRole'){
      this.roleListData.map(e=>{
        if(e['id']==value['data']['id']){
            Object.assign(e,value['data'])
            return this.findParentName()
        }
      })
    }
  }

  /**
   * @author GR-03
   * @copyright 点击下拉箭头显示更多选项(删除)
   * @param     [param]
   * @return    [return]
   * @check     GR-05        GR-03
   * @param     {MouseEvent} event   [description]
   * @param     {ElementRef} dataEle [description]
   * @param     {any}        list    [description]
   */
  public FnShowPbox(event:MouseEvent,dataEle:ElementRef,list:any):void{
    this.checkRoleInfo = {...list}
    this.riccioPboxService.setSubject({
      genre:"option",
      el:dataEle,
      type:'deleteRole',
      position:{
        left:event.clientX-50,
        top:event.clientY,
        width:100
      },
      data:[{id:0,name:'删除'}]
    })  
  }


}
