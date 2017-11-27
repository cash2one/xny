import { Component, OnInit ,Input,OnChanges,SimpleChanges,OnDestroy} from '@angular/core'
import { Subscription }   from 'rxjs/Subscription'

import { RiccioPboxService }    from '../../../../../Public/riccio-pbox/riccio-pbox.service'
import { RiccioNotificationsService }    from '../../../../../Public/riccio-notifications/riccio-notifications.service'
import { RiccioModalService }    from '../../../../../Public/riccio-modal/riccio-modal.service'
import { RiccioLoadingService } from '../../../../../Public/riccio-loading/riccio-loading.service'

import { departmentData }		from '../departmentData'

import { GrMembersService }    from '../../../../services'

@Component({
  selector: 'app-department-normal',
  templateUrl: './department-normal.component.html',
  styleUrls: [
    '../../../role/role.common.scss',
    './department-normal.component.scss']
})
export class DepartmentNormalComponent implements OnInit {
  
  @Input() departmentNormal:any[]
  @Input() routerInfo:any

  /**
   * 该字段来判断pbox为other的时候该显示设置负责人还是设置主属部门的字段
   * @type {string}
   */
  public adminOrDepartment:string

  /**
   * 某一个部门的详细数据
   * @type {[type]}
   */
  public departmentInfo:any

  /**
   * 用来排序的字段
   * @type {[type]}
   */
  public isSort:number|string

  /**
   * 表单的标题名称
   * @type {string[]}
   */
  public tableTitle:string[]

  /**
   * 是否显示loading效果的标示位
   * @param  false
   * @type {boolean}
   */
  public loading:boolean

  /**
   * 订阅pbox的数据流
   * @type {Subscription}
   */
  public riccioPboxRX$:Subscription

  /**
   * 订阅modal的数据流
   * @type {Subscription}
   */
  public riccioModalRX$:Subscription

  /**
   * 显示不同modal框的字段
   * @type {string}
   */
  public riccioModalSymbol:string

  /**
   * 变化之前的排序值，用来判断如果不同才进行提交数据
   * @type {[type]}
   */
  public constIsSort:number|string

  constructor(
    public riccioPboxService:RiccioPboxService,
    public riccioModalService:RiccioModalService,
    public grMembersService:GrMembersService,
    public riccioLoadingService:RiccioLoadingService,
    public riccioNotificationsService:RiccioNotificationsService
  ) {
    this.constIsSort = '0'
    this.riccioModalSymbol = 'create'
    this.isSort = -1
  	this.loading = true
  	this.tableTitle = new departmentData().NormalTableTitleArr
  }

  ngOnInit() {
    this.getModalEmit()
    this.getPboxEmit()
  }

  ngOnChanges(changes:SimpleChanges){
  	this.FnSetParentDepartment()
  }

  ngOnDestroy(){
    this.riccioPboxRX$.unsubscribe()
    this.riccioModalRX$.unsubscribe()
  }

  /**
   * @author GR-03
   * @copyright 根据parentid匹配所有部门id目的是为正常部门列表设置所有上级部门的名称
   * @param     null
   * @return    null
   * @check     GR-05       GR-03
   */
  public FnSetParentDepartment():void{
  	if(this.departmentNormal.length>0) this.loading = false
  	this.departmentNormal.map(e=>{
  		this.departmentNormal.map(_e=>{
  			if(_e['parentid']==e['id']) _e['parentname'] = e['name']
  		})
  	})
  }

  /**
   * @author GR-03
   * @copyright 点击更多按钮显示下拉框选择
   * @check     GR-05       GR-03
   * @param     {any}
   * @param     {any}
   */
  public FnShowPbox(event:any,dataEl:any,list:any):void{
    this.departmentInfo = {...list}
    let obj = {
      el:dataEl,
      type:'select',
      position:{
        left:event.clientX-100,
        top:event.clientY,
        width:200
      },
      data:[
        {
          'id':0,'name':'禁用'
        },
        {
          'id':1,'name':'删除'
        }
      ]
    }
    this.riccioPboxService.setSubject(obj)
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
    }else if(this.constIsSort != list.listorder){
      let obj = {
        'id':list.id,
        'listorder':list.listorder,
        'cid':this.routerInfo.cid
      }
      this.grMembersService.postDepartmentOrder(obj).subscribe(res=>{
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
   * @copyright 显示编辑部门modal组件
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {any}
   */
  public fnShowModalEditDepartment(list:any):void{
    this.riccioModalSymbol = ''
    setTimeout(()=>{
      this.riccioModalSymbol = 'create'
    })
    this.departmentInfo = {...list}
    this.riccioModalService.setSubject({
      data:list,
      size: 600,
      header: '编辑部门',
      type:'editDepartment',
      noBtn:true
    })
  }

 /**
   * @author GR-03
   * @copyright 监听members－create发送回来的数据
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {any}
   */
  public fnOutPutCreateEdit(value:any):void{
    this.adminOrDepartment = value.type
    this.departmentNormal.map((e,i)=>{
      if(e['id']==value['data']['id']){
        return this.departmentNormal[i] = value['data']
      }
    })
    this.FnSetParentDepartment()
  }

  /**
   * @author GR-03
   * @copyright 订阅pbox发射过来的数据流
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public getPboxEmit():void{
    this.riccioPboxRX$ = this.riccioPboxService.getEmit().subscribe(res=>{
      if(res['type']==='select'){

        if(res['data']['id']==0){
          this.riccioModalSymbol = 'disabled'
          this.riccioModalService.setSubject({
            data:this.departmentInfo,
            size: 600,
            header: '提示',
            type:'disabledDepartment',
            btn:{
              name:'禁用',
              status:'success'
            }
          })

        }else if(res['data']['id']==1){
          this.riccioModalSymbol = 'delete'
          this.riccioModalService.setSubject({
            data:this.departmentInfo,
            size: 600,
            header: '提示',
            type:'deleteDepartment',
            btn:{
              name:'禁用',
              status:'danger'
            }
          })

        }

      }
    })
  }

  /**
   * @author GR-03
   * @copyright 订阅modal发射回来的数据流
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public getModalEmit():void{
    this.riccioModalRX$ = this.riccioModalService.getEmit().subscribe(res=>{
      if(res['type']==='disabledDepartment'){
        this.riccioLoadingService.setLoading({
          message:'禁用中'
        })
        this.grMembersService.postDepartmentStatus({
          'id':res['data']['id'],
          'status':0,
          'cid':this.routerInfo.cid
        }).subscribe(_res=>{
          this.riccioLoadingService.closeLoading()
          if(_res.status===1){
            this.riccioNotificationsService.setSubject({text:'禁用成功'})
            this.departmentNormal = this.departmentNormal.filter(e=>e['id']!=res['data']['id'])
          }
        },error=>{
          throw new Error(error)
        })

      }else if(res['type']==='deleteDepartment'){
        this.riccioLoadingService.setLoading({
          message:'删除中'
        })
        this.grMembersService.postDepartmentDel({
          'id':res['data']['id'],
          'cid':this.routerInfo.cid
        }).subscribe(_res=>{
          this.riccioLoadingService.closeLoading()
          if(_res.status===1){
            this.riccioNotificationsService.setSubject({text:'删除成功'})
            this.departmentNormal = this.departmentNormal.filter(e=>e['id']!=res['data']['id'])
          }
        },error=>{
          throw new Error(error)
        })
      }
    })
  }

}
