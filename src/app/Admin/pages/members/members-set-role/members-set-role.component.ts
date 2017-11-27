import { Component, OnInit,Input,OnChanges,Output,EventEmitter } from '@angular/core';

import { RiccioModalService } from '../../../../Public/riccio-modal/riccio-modal.service';
import { RiccioNotificationsService }		from '../../../../Public/riccio-notifications/riccio-notifications.service';
import { GrMembersService }	from '../../../services';
import { GrRoleService }	from '../../../services';

import { setRoleData }		from './setRoleData'
import { RoleRouterInfo } from '../../role/role-main/roleData'

@Component({
  selector: 'app-admin-members-set-role',
  templateUrl: './members-set-role.component.html',
  styleUrls: [
    './members-set-role.component.scss'
  ]
})
export class MembersSetRoleComponent implements OnInit {
 
  @Input() SetRoleData:any[];
  @Input() routerInfo:RoleRouterInfo
  @Output() emitData:EventEmitter<boolean>

  public MembersNameData:any;
  public RoleList:any[];
  public BtnData:any;

  constructor(
  	public riccioModalService:RiccioModalService,
    public riccioNotificationsService:RiccioNotificationsService,
    public grRoleService:GrRoleService,
    public grMembersService:GrMembersService
  ) {
     this.MembersNameData = new setRoleData().membersNameData;
     this.RoleList = new setRoleData().RoleList;
     this.BtnData = new setRoleData().BtnData;
     this.emitData = new EventEmitter<boolean>()
  }

  ngOnInit() {
  }

  ngOnChanges(){
  	this.RoleList = new setRoleData().RoleList;
  	this.BtnData = new setRoleData().BtnData;
    this.FnGetRoleList();
    this.FnRealName();
  }

  //将传递进来的数据进行用户昵称抽取显示在模版里
  public FnRealName():void{
    this.MembersNameData.real_name = Array.isArray(this.SetRoleData) === true
    ?(()=>{
      this.MembersNameData.total = this.SetRoleData.length;
      return this.SetRoleData.map(e=>e['real_name']).join(',')
    })()
    :'';

  }

  //获取角色列表的方法
  public FnGetRoleList():void{
  	this.grRoleService.getRoleNoList({
      ...this.routerInfo
    }).subscribe(res=>{
  		if(res.status===1){
			this.RoleList = [...res['data']];
		    if(this.SetRoleData.length==1) this.FnGetOneUserInfo(this.SetRoleData[0].id);
  		}
  	})
  }

  //关闭事件
  public Close():void{
    this.riccioModalService.setSubject({})
  }

  //点击提交事件触发接口
  public FnSaveSet():void{
    this.BtnData = Object.assign({},this.BtnData,{text:'保存中...',disabled:true})
  	let obj = {
  		'ids':this.SetRoleData.map(e=>e['id']),
      'roleids':this.RoleList.filter(e=>e['isCheck']==true).map(e=>e['id']),
      ...this.routerInfo
  	}
  	this.grRoleService.postRoleAssign(obj).subscribe(res=>{
	    this.BtnData = new setRoleData().BtnData;
  		if(res.status===1){
	        this.Close();
	        this.riccioNotificationsService.setSubject({
	          text:'分配角色成功'
	        })
          this.emitData.emit(true)
  		}
  	})
  }

  //如果是单人设置部门的时候获取该用户信息
  public FnGetOneUserInfo(id:number|string):void{
    this.grMembersService.postUserInfo({'id':id}).subscribe(res=>{
      if(res.status===1){

      	let hasRole = [...res['data']['group']]||[];

      	this.RoleList.map(e=>{

      		hasRole.map(_e=>{
      			if(e['id']==_e['id']){
      				e['isCheck']=true;
      			}
      		})

      	})

      }
    })
  }

  //单个用户的情况下匹配角色信息
  public FnRoleMatch():void{

  }

  //点击单个角色判断是否显示勾选状态
  public FnIsCheck(list:any):void{
  	list.isCheck = !list.isCheck;
  }

}
