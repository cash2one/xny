import { Component, OnInit,Input } from '@angular/core';

import { GrRoleService }		from '../../../../services'

import { RoleSelectRoleService }    from './role-select-role.service'
import { RoleRouterInfo } from '../roleData'

@Component({
  selector: 'app-role-select-role',
  templateUrl: './role-select-role.component.html',
  styleUrls: ['./role-select-role.component.scss']
})
export class RoleSelectRoleComponent implements OnInit {

  @Input() public roleId:string|number
  @Input() public type:string
  @Input() public routerInfo:RoleRouterInfo

  /**
   * 编辑角色状态下需要禁用的角色id
   * @type {[type]}
   */
  public disabledId:number|string

  /**
   * 角色树状列表
   * @type {any[]}
   */
  public roleTreeList:any[]

  /**
   * 是否显示loading效果的字段
   * @type {boolean}
   */
  public loading:boolean

  constructor(
  	public grRoleService:GrRoleService,
    public roleSelectRoleService:RoleSelectRoleService
  ) {
    this.loading = true
    this.disabledId = '-100'
  }

  ngOnInit() {
  	this.fnGetRoleList()
  }

  
  /**
   * @author GR-03
   * @copyright 获取角色列表的方法
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public fnGetRoleList():void{
    this.loading = true
    console.log(this.routerInfo)
  	this.grRoleService.getRoleList(this.routerInfo).subscribe(res=>{
      this.loading = false
  		if(res.status===1){
  			this.roleTreeList = [...res['data']]
        if(this.type==='editRole'){
          this.disabledId = this.roleId
        }
  		}
  	})
  }

  /**
   * @author GR-03
   * @copyright 接收选择角色后返回到的数据
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {any}       event [description]
   */
  public callTreeData(event:any):void{
    this.roleSelectRoleService.setSubject(event)
  }
}
