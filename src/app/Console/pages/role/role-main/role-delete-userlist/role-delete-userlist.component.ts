import { Component, OnInit,Input,OnChanges,Output, EventEmitter  } from '@angular/core';

import { GrRoleService }		from '../../../../services'
import { RiccioNotificationsService }			from '../../../../../Public/riccio-notifications/riccio-notifications.service'
import { RiccioModalService }		from '../../../../../Public/riccio-modal/riccio-modal.service'

@Component({
  selector: 'app-role-delete-userlist',
  templateUrl: './role-delete-userlist.component.html',
  styleUrls: ['../../../../Console.component.scss','./role-delete-userlist.component.scss']
})
export class RoleDeleteUserlistComponent implements OnInit {

  @Input() public roleId:string|number
  @Input() public userid:any

  @Output() emitData:EventEmitter<boolean>

  /**
   * 改变按钮状态的标志位
   * @type {boolean}
   */
  public disabledBtnOpen:boolean

  constructor(
  	public grRoleService:GrRoleService,
  	public riccioModalService:RiccioModalService,
  	public riccioNotificationsService:RiccioNotificationsService
  ) { 
  	this.disabledBtnOpen = true
  	this.emitData = new EventEmitter<boolean>()
  }

  ngOnInit() {
  }

  ngOnChanges(){
  }

  /**
   * @author GR-03
   * @copyright 接收按钮返回的数据
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public fnDelete(event:boolean):void{
  	this.disabledBtnOpen = false
  	if(event===true){
  		this.grRoleService.postRolePartUserDel({
  			'id':this.roleId,
  			'userid':this.userid.map(e=>e['id']).join(',')
  		}).subscribe(res=>{
		  	this.disabledBtnOpen = true
  			if(res.status===1){
  				this.closeView()
  				this.emitData.emit(true)
  				this.riccioNotificationsService.setSubject({text:'移除成功'})
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

}
