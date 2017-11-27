import { Component, OnInit,Input,OnChanges,Output,EventEmitter } from '@angular/core';

import { RiccioModalService }			 from '@gr-public/riccio-modal/riccio-modal.service';
import { RiccioNotificationsService }		from '@gr-public/riccio-notifications/riccio-notifications.service';

export class setData{

	membersNameData:any = {
		real_name:'',
		total:''
	};

	RoleList:any[] = [];

	BtnData:any = {
		text:'保存',
		disabled:false
	}

}

@Component({
  selector: 'app-set-grouping-user',
  templateUrl: './set-grouping-user.component.html',
  styleUrls: ['./set-grouping-user.component.scss']
})
export class SetGroupingUserComponent implements OnInit {

  @Input() InputData:any[];
  @Output() emitData:EventEmitter<boolean>

  public MembersNameData:any;
  public RoleList:any[];
  public BtnData:any;

  constructor(
  	public riccioModalService:RiccioModalService,
    public riccioNotificationsService:RiccioNotificationsService
  ) {
     this.MembersNameData = new setData().membersNameData;
     this.RoleList = new setData().RoleList;
     this.BtnData = new setData().BtnData;
     this.emitData = new EventEmitter<boolean>()
  }

  ngOnInit() {
  }

  ngOnChanges(){
  	this.RoleList = new setData().RoleList;
  	this.BtnData = new setData().BtnData;
    this.FnGetRoleList();
    this.FnRealName();
  }

  //将传递进来的数据进行用户昵称抽取显示在模版里
  public FnRealName():void{
    this.MembersNameData.real_name = Array.isArray(this.InputData) === true
    ?(()=>{
      this.MembersNameData.total = this.InputData.length;
      return this.InputData.map(e=>e['real_name']).join(',')
    })()
    :'';

  }

  //获取角色列表的方法
  public FnGetRoleList():void{
  	// this.grRoleService.getRolePartList().subscribe(res=>{
  	// 	if(res.status===1){
			// this.RoleList = [...res['data']];
		 //    if(this.InputData.length==1) this.FnGetOneUserInfo(this.InputData[0].id);
  	// 	}
  	// })
  }

  //关闭事件
  public Close():void{
    this.riccioModalService.setSubject({})
  }

  //点击提交事件触发接口
  public FnSaveSet():void{
    this.BtnData = Object.assign({},this.BtnData,{text:'保存中...',disabled:true})
  	let obj = {
  		'ids':this.InputData.map(e=>e['id']),
  		'roleids':this.RoleList.filter(e=>e['isCheck']==true).map(e=>e['id'])
  	}
  	// this.grMembersService.postPartAssign(obj).subscribe(res=>{
	  //   this.BtnData = new setData().BtnData;
  	// 	if(res.status===1){
	  //       this.Close();
	  //       this.riccioNotificationsService.setSubject({
	  //         text:'分配角色成功'
	  //       })
   //        this.emitData.emit(true)
  	// 	}
  	// })
  }

  //如果是单人设置部门的时候获取该用户信息
  public FnGetOneUserInfo(id:number|string):void{
    // this.grMembersService.postUserInfo({'id':id}).subscribe(res=>{
    //   if(res.status===1){

    //   	let hasRole = [...res['data']['group']]||[];

    //   	this.RoleList.map(e=>{

    //   		hasRole.map(_e=>{
    //   			if(e['id']==_e['id']){
    //   				e['isCheck']=true;
    //   			}
    //   		})

    //   	})

    //   }
    // })
  }

  //单个用户的情况下匹配角色信息
  public FnRoleMatch():void{

  }

  //点击单个角色判断是否显示勾选状态
  public FnIsCheck(list:any):void{
  	list.isCheck = !list.isCheck;
  }

}
