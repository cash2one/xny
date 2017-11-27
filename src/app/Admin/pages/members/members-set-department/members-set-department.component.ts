import { Component, OnInit,Input,OnChanges } from '@angular/core'

import { RiccioModalService }	from '../../../../Public/riccio-modal/riccio-modal.service'
import { RiccioNotificationsService }    from '../../../../Public/riccio-notifications/riccio-notifications.service'

import { GrMembersService }    from '../../../services'
import { MembersOpService } from '../membersOp.service'

import { setDepartmentData }    from './setDepartmentData'

@Component({
  selector: 'app-admin-members-set-department',
  templateUrl: './members-set-department.component.html',
  styleUrls: [
    '../../role/role.common.scss',
    './members-set-department.component.scss'
  ]
})
export class MembersSetDepartmentComponent implements OnInit {
 
  @Input() SetDepartmentData:any[]
  @Input() public symbol:string
  @Input() routerInfo:any

  public MembersNameData:any
  public DepartmentList:any[]
  public DepartmentRightData:any[]
  public BtnData:any

  constructor(
  	public riccioModalService:RiccioModalService,
    public riccioNotificationsService:RiccioNotificationsService,
    public grMembersService:GrMembersService,
    public membersOpService:MembersOpService
  ) {
     this.symbol = 'Main'
     this.MembersNameData = new setDepartmentData().membersNameData
     this.DepartmentList = new setDepartmentData().departmentList
     this.DepartmentRightData = []
     this.BtnData = new setDepartmentData().BtnData
  }

  ngOnInit() {
  }

  ngOnChanges(){
    this.BtnData = new setDepartmentData().BtnData
    this.DepartmentRightData.length=0
    this.FnRealName()
    this.FnGetDepartmentList()
  }

  //将传递进来的数据进行用户昵称抽取显示在模版里
  public FnRealName():void{
    this.MembersNameData.real_name = Array.isArray(this.SetDepartmentData) === true
    ?(()=>{
      this.MembersNameData.total = this.SetDepartmentData.length
      return this.SetDepartmentData.map(e=>e['real_name']).join(',')
    })()
    :''

    if(this.SetDepartmentData.length==1){
      this.FnGetOneUserInfo(this.SetDepartmentData[0]['id'])
    }

  }

  //获取部门列表的方法
  public FnGetDepartmentList():void{
    this.grMembersService.getMembersDepartment({
      cid:this.routerInfo.cid
    }).subscribe(res=>{
      if(res.status===1){
        this.DepartmentList = Array.isArray(res['data'])===true
        ?[...res['data']]
        :[]
      }
    })
  }

  //接收tree的组件
  public FnObtain(value:any):void{
    this.DepartmentRightData = this.DepartmentRightData.filter(e=>e['id']==value['id']).length>0
    ?this.DepartmentRightData.filter(e=>e['id']!=value['id'])
    :[...this.DepartmentRightData,value]
  }


  //点击右侧部门数据的事件
  public FnDeleteRightData(list:any):void{
    this.DepartmentRightData = this.DepartmentRightData.filter(e=>e['id']!=list['id'])
  }

  //关闭事件
  public Close():void{
    this.riccioModalService.setSubject({})
  }

  //点击提交事件触发接口
  public FnSaveSet():void{
    this.BtnData = Object.assign({},this.BtnData,{text:'保存中...',disabled:true})
    let obj = {
      'user_arr':Array.isArray(this.SetDepartmentData) === true?this.SetDepartmentData.map(e=>e['id']):[],
      'department_arr':this.DepartmentRightData.map(e=>e['id']),
      'type':this.symbol==='Main'?1:2,
      'cid':this.routerInfo.cid
    }
    this.membersOpService.setDepartment(
      obj.type,
      obj.user_arr,
      obj.department_arr,
      this.routerInfo.cid,
      this.Close.bind(this)
    )
  }

  //如果是单人设置部门的时候获取该用户信息
  public FnGetOneUserInfo(id:number|string):void{
    this.grMembersService.postUserInfo({'id':id}).subscribe(res=>{
      if(res.status===1){
        this.DepartmentRightData = [...res['data']['department']]
      }
    })
  }


}
