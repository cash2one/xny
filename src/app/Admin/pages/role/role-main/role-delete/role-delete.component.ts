import { Component, OnInit,Input,Output, EventEmitter } from '@angular/core';

import { GrRoleService }		from '../../../../services/grRole/grRole.service'

import { RiccioNotificationsService }		from '../../../../../Public/riccio-notifications/riccio-notifications.service'
import { RiccioModalService }			from '../../../../../Public/riccio-modal/riccio-modal.service'

import { RoleRouterInfo } from '../roleData'

@Component({
  selector: 'app-role-delete',
  templateUrl: './role-delete.component.html',
  styleUrls: [
    '../../role.common.scss',
    './role-delete.component.scss'
  ]
})
export class RoleDeleteComponent implements OnInit {
 
  @Input() public deleteId:number|string
  @Input() public routerInfo:RoleRouterInfo
  @Output() public emitData:EventEmitter<boolean>

  /**
   * 点击按钮后切换状态标志位
   * @type {boolean}
   */
  public disabledBtnOpen:boolean

  constructor(
  	public grRoleService:GrRoleService,
  	public riccioModalService:RiccioModalService,
  	public riccioNotificationsService:RiccioNotificationsService
  ) {
  	this.emitData = new EventEmitter<boolean>()
  	this.disabledBtnOpen = true
  }

  ngOnInit() {
  }


  /**
   * @author GR-03
   * @copyright 点击按钮后触发的事件
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public fnDelete():void{
  	this.disabledBtnOpen = false
  	if(this.deleteId){
	  	this.grRoleService.postRoleDelete({
        'id':this.deleteId,
        'model':this.routerInfo.model,
        'cid':this.routerInfo.cid
	  	}).subscribe(res=>{
		  	this.disabledBtnOpen = true
	  		if(res.status===1){
	  			this.closeView()
	  			this.emitData.emit(true)
	  			this.riccioNotificationsService.setSubject({text:'删除成功'})
	  		}
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
  public closeView():void{
  	this.riccioModalService.setSubject({})
  }

}
