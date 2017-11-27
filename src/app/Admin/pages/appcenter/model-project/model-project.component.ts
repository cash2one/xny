import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot }  from '@angular/router';

import { BreadCrumbData } from '../../../../Public/riccio-breadcrumb/riccio-breadcrumb.data'
@Component({
  selector: 'app-model-project',
  templateUrl: './model-project.component.html',
  styleUrls: [
    '../appcenter.component.scss',
    '../../page.common.scss',
    '../model.commom.scss'
    // './model-project.component.scss'
  ]
})
export class ModelProjectComponent implements OnInit {
  public breadData:BreadCrumbData[]

  constructor(
    public router:Router
  ) {
    this.breadData = [
      {name:'应用管理',routerLink:['../list']},
      {name:'项目管理'}
    ]
   }

  ngOnInit() {
  }

  // 点击进入对应的管理组件
  public FnGoModel(str:string):void{
    
    switch (str) {
      case "defaultMenu":
        this.router.navigate(['/Admin/menu/list','model','Project','cid','0','status','1'])
        break;
  
      case "defaultTab":
        this.router.navigate(['/Admin/menu/list','model','Project','cid','0','status','2'])
        break;

      case "company":
        this.router.navigate(['/Admin/company/list','model','Project','app_id','4','type','0'])
        break;

      case "price":
        this.router.navigate(['/Admin/role/list','model','Admin','cid','0'])
        break;

      case "tasks":
        this.router.navigate(['/Admin/task/list'])
        break;

      default:break;
    }

  }


}
