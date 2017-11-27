import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } 	from '@angular/router';

import { animations }  from '../../../../Public/Animations/index'
import { PersonalService }      from '../../../../Public/Personal/personal.service'

import { UserReviseData }		from './UserReviseData'
import { GrUserService }			from '../../../services'

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['../../../Admin.component.scss','./user-details.component.scss'],
  animations:[
  	animations.rightIn
  ]
})
export class UserDetailsComponent implements OnInit {

  public DetailsData:any;
  public ShowDetailsData:Array<any>;
  public UserId:string|number;

  constructor(
  	public grUserService:GrUserService,
  	public activatedRoute:ActivatedRoute,
    public personalService:PersonalService,
  	public router:Router
  ) { 

  	this.DetailsData = new UserReviseData().data;
  	this.ShowDetailsData = new UserReviseData().showView;
  }

  ngOnInit() {

  	this.activatedRoute.params
  					   .map(id=>id.id)
  					   .subscribe(res=>{
							
  					   		this.UserId = res
  					   		this.UserInfo()
					   })

  }
 
  //获取员工详情的方法
  public UserInfo():void{
  	this.grUserService.getUserInfo(+this.UserId)
                      .map(data=>data.data)
          					  .subscribe(res=>{
                        Object.assign(this.DetailsData,res)
          					  },error=>{
                        console.error(error)
                      })


  }

  //关闭右侧弹窗返回上一级路由
  public CloseBack():void{
  	let backURL = this.router.url.split('/').slice(1,4).join('/')
  	this.router.navigateByUrl(backURL)
  }


  //点击保存按钮修改员工数据
  public FnSaveEdit():void{

  	console.log(this.DetailsData)

    this.grUserService.postUserEdit(this.DetailsData).subscribe(res=>{
      if(res.status === 1) this.personalService.showPromptSmall('修改成功','success',{right:'50%',top:'30%'}) 
      else     this.personalService.showPromptSmall('修改失败','error',{right:'50%',top:'30%'})                        
    })

  }

}
