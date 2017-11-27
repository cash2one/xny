import { Component, OnInit ,Input,OnChanges,SimpleChanges,OnDestroy} from '@angular/core'
import { Subscription } from 'rxjs/Subscription'

import { RiccioNotificationsService }    from '../../../../../Public/riccio-notifications/riccio-notifications.service'
import { RiccioPboxService }    from '../../../../../Public/riccio-pbox/riccio-pbox.service'
import { RiccioModalService }    from '../../../../../Public/riccio-modal/riccio-modal.service'

import { departmentData }		from '../departmentData'

import { GrMembersService }    from '../../../../services'

@Component({
  selector: 'app-department-disable',
  templateUrl: './department-disable.component.html',
  styleUrls: ['../../../../Console.component.scss','./department-disable.component.scss']
})
export class DepartmentDisableComponent implements OnInit {
 
  @Input() departmentDisable:any[]

  /**
   * 某一个部门的详细数据
   * @type {[type]}
   */
  public departmentInfo:any

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
   * 订阅ricciomodal发射回来的数据流
   * @type {Subscription}
   */
  public riccioModalRX$:Subscription

  constructor(
    public riccioPboxService:RiccioPboxService,
    public riccioModalService:RiccioModalService,
    public riccioNotificationsService:RiccioNotificationsService,
    public grMembersService:GrMembersService
  ) {
    this.departmentInfo = {}
  	this.loading = true
  	this.tableTitle = new departmentData().NormalTableTitleArr
  }

  ngOnInit() {
    this.getModalEmit()
  }

  ngOnChanges(changes:SimpleChanges){
  	this.FnSetParentDepartment()
  }

  ngOnDestroy(){
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
  	if(this.departmentDisable.length>0){
      this.loading = false
     }
    setTimeout(()=>{
      this.loading = false
    },1000)
  	this.departmentDisable.map(e=>{
  		this.departmentDisable.map(_e=>{
  			if(_e['parentid']==e['id']) _e['parentname'] = e['name']
  		})
  	})
  }

  /**
   * @author GR-03
   * @copyright 点击启用触发事件请求
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {any}
   */
  public fnShowModalOpen(list:any):void{
    this.departmentInfo = {...list}
    this.riccioModalService.setSubject({
      data:list,
      size: 600,
      header: '提示',
      type:'openDepartment',
      btn:{
        name:'确认',
        status:'success'
      }
    })
  }

  /**
   * @author GR-03
   * @copyright 负责订阅modal发射回来的数据流
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public getModalEmit():void{
    this.riccioModalRX$ = this.riccioModalService.getEmit().subscribe(res=>{
      if(res['type']==='openDepartment'){
        this.grMembersService.postDepartmentStatus({
          'id':res['data']['id'],
          'status':1
        }).subscribe(_res=>{

          if(_res.status===1){
            this.riccioNotificationsService.setSubject({text:'启用成功'})
            this.departmentDisable = this.departmentDisable.filter(e=>e['id']!=res['data']['id'])
          }

        },error=>{
          throw new Error(error)
        })
      }
    })
  }

}
