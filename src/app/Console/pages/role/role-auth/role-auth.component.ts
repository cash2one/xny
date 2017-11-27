import { Component, OnInit,Input,OnChanges,Output, EventEmitter } from '@angular/core';

import { RoleAuthService }  from './role-auth.service'
import { GrRoleService }		from '../../../services'

import { RiccioNotificationsService }		from '../../../../Public/riccio-notifications/riccio-notifications.service'

@Component({
  selector: 'app-role-auth',
  templateUrl: './role-auth.component.html',
  styleUrls: ['../../../Console.component.scss','./role-auth.component.scss']
})
export class RoleAuthComponent implements OnInit {

  @Input() RoleAuthData:any;
  @Input() roleInfo:any

  @Output() emitData:EventEmitter<boolean>

  /**
   * 显示按钮的状态标志位
   * @type {boolean}
   */
  public disabledBtn:boolean

  public testTab:any[]

  constructor(
  	public roleAuthService:RoleAuthService,
  	public grRoleService:GrRoleService,
  	public riccioNotificationsService:RiccioNotificationsService
  ) {
  	this.emitData = new EventEmitter<boolean>()
  	this.disabledBtn = true
    // this.testTab = [
    //   {
    //       "id":8,
    //       "name":"百搜百应【服务端11】",
    //       "app_name":"百搜百应【服务端】",
    //       "model":"BsbyService",
    //       "group":"bsby",
    //       "isCheck":false,
    //       "parentid":0,
    //       "level":0,
    //       "chilren":[
    //           {
    //               "id":9,
    //               "name":"百搜百应【服务端2222】",
    //               "app_name":"百搜百应【服务端】",
    //               "model":"BsbyService",
    //               "group":"bsby",
    //               "isCheck":false,
    //               "parentid":8,
    //               "level":1,
    //               "chilren":[

    //                   {
    //                       "id":11,
    //                       "name":"百搜百应【服务端44444】",
    //                       "app_name":"百搜百应【服务端】",
    //                       "model":"BsbyService",
    //                       "group":"bsby",
    //                       "isCheck":false,
    //                       "parentid":9,
    //                       "level":2,
    //                       "chilren":[

    //                       ]
    //                   },
    //                   {
    //                       "id":12,
    //                       "name":"百搜百应【服务端5555】",
    //                       "app_name":"百搜百应【服务端】",
    //                       "model":"BsbyService",
    //                       "group":"bsby",
    //                       "isCheck":false,
    //                       "parentid":9,
    //                       "level":2,
    //                       "chilren":[

    //                       ]
    //                   }
    //               ]
    //           },
    //           {
    //               "id":10,
    //               "name":"百搜百应【服务端33333】",
    //               "app_name":"百搜百应【服务端】",
    //               "model":"BsbyService",
    //               "group":"bsby",
    //               "isCheck":false,
    //               "parentid":8,
    //               "level":1,
    //               "chilren":[

    //               ]
    //           }
    //       ]
    //   }
    // ]
  }

  ngOnInit() {
  }

  ngOnChanges(){
    if(this.roleInfo['id']!='0'){
      this.fnGetRoleAuthData(this.roleInfo['id'])
    }
  }

  /**
   * @author GR-03
   * @copyright 点击授权之后触发的方法
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {boolean}   value [description]
   */
  public fnSaveRoleRuth(value:boolean):void{
  	this.disabledBtn = false
  	if(value===true){
  		this.grRoleService.postRolePartPowerSet({
  			'id':this.roleInfo['id'],
  			'rules':this.roleAuthService.RoleData.rules.join(','),
  			'model':'Console'
  		}).subscribe(res=>{
  			this.disabledBtn = true
  			if(res.status===1){
  				// this.emitData.emit(true)
  				this.riccioNotificationsService.setSubject({text:'授权成功'})
  			}
  		},error=>{
  			throw new Error(error)
  		})
  		// console.log(this.roleAuthService.RoleData.rules)
  	}
  }

  /**
   * @author GR-03
   * @copyright 获取该角色的详情
   * @param     [param]
   * @return    [return]
   * @check     GR-05           GR-03
   * @param     {number|string} id    [description]
   */
  public fnGetRoleAuthData(id:number|string):void{
    this.grRoleService.getRolePartInfo(id).subscribe(res=>{
      if(res.status===1){
        let arr = res['data']['rules'].split(',')
        // this.roleAuthService.RoleData.rules = arr.filter(e=>e!='')
        // console.log(this.roleAuthService.RoleData.rules)
        this.roleAuthService.setSubject({
          symbol:'1',
          rules:arr.filter(e=>e!='')
        })
      }
    },error=>{
      throw new Error(error)
    })
  }

}
