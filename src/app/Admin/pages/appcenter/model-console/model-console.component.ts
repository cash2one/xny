import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot }  from '@angular/router';

import { BreadCrumbData } from '../../../../Public/riccio-breadcrumb/riccio-breadcrumb.data'
@Component({
  selector: 'app-model-console',
  templateUrl: './model-console.component.html',
  styleUrls: [
    '../appcenter.component.scss',
    '../../page.common.scss',
    '../model.commom.scss'
    // './model-console.component.scss'
  ]
})
export class ModelConsoleComponent implements OnInit {

  public breadData:BreadCrumbData[]

  constructor(
  	public router:Router
  ) { 
    this.breadData = [
      {name:'应用管理',routerLink:['../list']},
      {name:'企业控制台'}
    ]
   }

  ngOnInit() {
  }

  // 点击进入对应的管理组件
  public FnGoModel(str:string):void{
  	
    switch (str) {
      case "defaultMenu":
        this.router.navigate(['/Admin/menu/list','model','Console','cid','0','status','1'])
        break;
  
      case "defaultCompany":
        this.router.navigate(['/Admin/company/list','model','Console','app_id','0','type','0'])
        break;

      default:break;
    }

  }

}
