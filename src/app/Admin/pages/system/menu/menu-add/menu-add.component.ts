import { Component, OnInit,Input,Output,EventEmitter,OnDestroy } from '@angular/core';

import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,NavigationEnd }  from '@angular/router';

import { GrMenuListService }    from '../../../../services'

import { animations }    from '../../../../../Public/Animations'

@Component({
  selector: 'app-menu-add',
  templateUrl: './menu-add.component.html',
  styleUrls: ['../../../../Admin.component.scss','./menu-add.component.scss'],
  animations:[
    animations.smallBig
  ]
})
export class MenuAddComponent implements OnInit {
 
  @Input() affiliatedTeam;
  @Input() model;
  @Input() cid;
  @Input() menuType;
  @Output() callAffiliatedTeamData: EventEmitter<any> = new EventEmitter<any>()

  public DepartmentData :Array<any>;
  public Loading:boolean = false;

  public routerModel:string;
  public routerCid:string;

  //callBackAffiliatedData返回的数据
  public callBackAffiliatedData:any = {

    isShow:false,
    data:{
      items:[]
    }

  }

  constructor(
  	public grMenuListService:GrMenuListService,
    public activatedRoute:ActivatedRoute
  ) { 
  }

  ngOnInit() {
    this.Loading = true;
  	// 组件创建完成后就开始获取所有的菜单列表
  	this.FnDepartmentData(this.model,this.cid,this.menuType)

  }

  // 获取所有菜单列表
  public FnDepartmentData(model:string="Admin",cid:string="0",menuType:string="1"){

  	this.grMenuListService.getMenuTree(model,cid,menuType)
                          .subscribe(res=>{
                             this.DepartmentData = res.data
                          })


  }

  //接收点击到的菜单事件
  public getCallData(event:any):void{
    this.callAffiliatedTeamData.emit(event)
  }

}
