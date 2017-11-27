import { Component, OnInit,OnDestroy,Input } from '@angular/core'
import { Subscription }    from 'rxjs/Subscription'

import { GrMembersService }		from '../../../services'

import { RiccioPboxService }		from '../../../../Public/riccio-pbox/riccio-pbox.service'
import { MembersSetDepartmentMainService }		from './members-set-department-main.service'

@Component({
  selector: 'app-admin-members-set-department-main',
  templateUrl: './members-set-department-main.component.html',
  styleUrls: [
    '../../role/role.common.scss',
    './members-set-department-main.component.scss'
  ]
})
export class MembersSetDepartmentMainComponent implements OnInit {

  @Input() public routerInfo:any
  public DeparmentListData:any[] // 部门列表
  public setSettingRX$:Subscription

  constructor(
  	public grMembersService:GrMembersService,
  	public riccioPboxService:RiccioPboxService,
  	public membersSetDepartmentMainService:MembersSetDepartmentMainService
  ) { 
  	this.DeparmentListData = []
  }

  ngOnInit() {
  	this.FnGetDepartmentListData() // 获取主属部门列表的请求方法
  }

  ngOnDestroy(){
    this.setSettingRX$?this.setSettingRX$.unsubscribe():{}
  }

  /**
   * @author GR-03
   * @copyright 获取主属部门列表的请求方法
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public FnGetDepartmentListData():void{
  	this.grMembersService.getMembersDepartment({
      cid:this.routerInfo.cid
    }).subscribe(res=>{

  		if(res.status===1){
  			this.DeparmentListData = Array.isArray(res['data'])===true?[{'name':'全公司','id':'0','chilren':[...res['data']]}]:[]
  		}

  	},error=>{
  		throw new Error(error)
  	})
  }

  /**
   * @author GR-03
   * @copyright 接收tree返回过来的数据
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {any}
   */
  public CallTreeData(event:any):void{
  	this.membersSetDepartmentMainService.setSubject(event)
  	this.riccioPboxService.setSubject({})
  }

}
