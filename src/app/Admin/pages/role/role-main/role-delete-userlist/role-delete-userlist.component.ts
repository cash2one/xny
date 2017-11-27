import { Component, OnInit,Input,OnChanges,Output, EventEmitter  } from '@angular/core';

import { GrRoleService }		from '../../../../services/grRole/grRole.service'
import { RiccioNotificationsService }			from '../../../../../Public/riccio-notifications/riccio-notifications.service'
import { RiccioModalService }		from '../../../../../Public/riccio-modal/riccio-modal.service'

import { RoleRouterInfo } from '../roleData'

@Component({
  selector: 'app-role-delete-userlist',
  templateUrl: './role-delete-userlist.component.html',
  styleUrls: [
    '../../role.common.scss',
    './role-delete-userlist.component.scss'
  ]
})
export class RoleDeleteUserlistComponent implements OnInit {

  @Input() public roleId:string|number
  @Input() public userid:any
  @Input() public routerInfo:RoleRouterInfo

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
  		this.grRoleService.postRolePartuserDel({
  			'id':this.roleId,
        'userid':this.userid.map(e=>e['id']).join(','),
        ...this.routerInfo
  		}).subscribe(res=>{
		  	this.disabledBtnOpen = true
  			if(res.status===1){
  				this.closeView()
  				this.emitData.emit(true)
  				this.riccioNotificationsService.setSubject({text:'移除成功'})
  			}
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
