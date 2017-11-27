import { Component, OnInit,Input,OnDestroy } from '@angular/core';

import { GrMembersService }		from '../../../services'
import { RiccioTreeDepartmentService }    from '../../../../Public/riccio-tree-department/riccio-tree-department.service'
import { RiccioPboxService }    from '../../../../Public/riccio-pbox/riccio-pbox.service'

import { MembersSetAdminService }    from './members-set-admin.service'

@Component({
  selector: 'app-admin-members-set-admin',
  templateUrl: './members-set-admin.component.html',
  styleUrls: ['./members-set-admin.component.scss']
})
export class MembersSetAdminComponent implements OnInit {

  @Input() public routerInfo:any
  public UserList:any[];

  public departmentData:any;  //传给riccio-tree-department组件树的数据
  public Tab:string;

  public RXSubject:any;
  constructor(
  	public grMembersService:GrMembersService,
    public membersSetAdminService:MembersSetAdminService,
    public riccioPboxService:RiccioPboxService,
    public riccioTreeDepartmentService:RiccioTreeDepartmentService
  ) { 
    this.UserList = [];
  	this.Tab = 'User';
    //监听树形选择部门的数据流
    this.RXSubject = this.riccioTreeDepartmentService.getEmit().subscribe(res=>{
      this.Tab = 'User';
      this.membersSetAdminService.setSubject(res)
      this.riccioPboxService.setSubject({})
    })

  }

  ngOnInit() {
    this.FnGetUserList()
    this.FnGetDepartmentList()
  }
  ngOnDestroy(){
    this.RXSubject?this.RXSubject.unsubscribe():{}
  }

  //获取所有成员列表
  public FnGetUserList():void{
    this.UserList.length=0;
    let obj = {
      'type':2,
      'cid':this.routerInfo.cid
    }
    this.grMembersService.postUserList(obj).subscribe(res=>{
      if(res.status===1){
        this.UserList = [...res['data']['data']]
      }
    })
  }

  //获取部门列表
  public FnGetDepartmentList():void{
  	this.grMembersService.getMembersDepartment({
      cid:this.routerInfo.cid
    }).subscribe(res=>{
  		if(res.status===1){
  			let obj = {
		      data:[...res['data']],					//递归部门的数据
		      nodeKey:'name',			//部门名称的key值
		      childrenKey:'useritems',	//部门下的成员数组key值
		      childrenName:'real_name', //部门下的成员名称key值
		      symbol:'id'			    //唯一标示符,用来判断左右两边的key（重要）  保证右边已经选择的成员唯一标示符为id
  			}
  			this.departmentData = Object.assign({},this.departmentData,obj)
  		}
  	})
  }

  //点击成员列表获取成员信息
  public FnUsersData(list:any):void{
    this.membersSetAdminService.setSubject(list)
    this.riccioPboxService.setSubject({})
  }
}
