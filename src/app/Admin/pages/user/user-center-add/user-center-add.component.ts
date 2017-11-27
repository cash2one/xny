import { Component, OnInit } from '@angular/core';

import { UserCenterAddData }			from './UserCenterAddData'

import { PersonalService }    from '../../../../Public/Personal/personal.service'

import { UserCenterAddService }    from './user-center-add.service'

import { GrUserService }    from '../../../services'


@Component({
  selector: 'app-user-center-add',
  templateUrl: './user-center-add.component.html',
  styleUrls: ['../../../Admin.component.scss','./user-center-add.component.scss']
})
export class UserCenterAddComponent implements OnInit {

  public UserAddData:any;
  public ShowAddView:Array<any>;

  redShow:boolean

  constructor(
    public personalService:PersonalService,
    public userCenterAddService:UserCenterAddService,
    public grUserService:GrUserService
  ) { 

  	this.UserAddData = new UserCenterAddData().data;
  	this.ShowAddView = new UserCenterAddData().showView;

  }

  ngOnInit() {


  }


  //添加员工的方法
  public FnAddUser():void{
    let value = Object.keys(this.UserAddData).filter(e=>e!=='thumb').filter(e=>e!=='sex').filter(e=>e!=='roleid');
    let bool = true;
    value.forEach(e=>{if(this.UserAddData[e].trim()==="") return bool = false})

    if(bool===true){

      console.log('添加员工数据',this.UserAddData)
      this.grUserService.postUserAdd(this.UserAddData).subscribe(res=>{
        if(res.status ==1){
          this.personalService.showViewData(null,false);
          this.personalService.showPromptSmall('添加成功','success',{top:"30%",right:"50%"})
        }else{
          this.personalService.showPromptSmall('添加失败','error',{top:"30%",right:"50%"})
        }
      },error=>{
        console.log(error)
      })


    }

  }

  //关闭视图的方法
  public CloseBack():void{
    this.personalService.showViewData(null,false)
  }

}
