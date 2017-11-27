import { Component, OnInit,Input,Output, EventEmitter } from '@angular/core';

import { GrRoleService }		from '../../../../services'

import { RiccioNotificationsService }		from '../../../../../Public/riccio-notifications/riccio-notifications.service'
import { RiccioModalService }			from '../../../../../Public/riccio-modal/riccio-modal.service'

@Component({
  selector: 'app-role-delete',
  templateUrl: './role-delete.component.html',
  styleUrls: ['../../../../Console.component.scss','./role-delete.component.scss']
})
export class RoleDeleteComponent implements OnInit {
 
  @Input() public deleteId:number|string
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
  public fnDelete(e:any):void{
  	this.disabledBtnOpen = false
  	if(this.deleteId){
	  	this.grRoleService.postRolePartDel({
	  		'id':this.deleteId
	  	}).subscribe(res=>{
		  	this.disabledBtnOpen = true
	  		if(res.status===1){
	  			this.closeView()
	  			this.emitData.emit(true)
	  			this.riccioNotificationsService.setSubject({text:'删除成功'})
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
  public closeView():void{
  	this.riccioModalService.setSubject({})
  }

}
