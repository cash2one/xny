import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot }  from '@angular/router';

import { BreadCrumbData } from '../../../../Public/riccio-breadcrumb/riccio-breadcrumb.data'
@Component({
  selector: 'app-model-ruanwenClient',
  templateUrl: './model-ruanwenClient.component.html',
  styleUrls: [
    '../appcenter.component.scss',
    '../../page.common.scss',
    '../model.commom.scss'
    // './model-project.component.scss'
  ]
})
export class ModelRuanwenClientComponent implements OnInit {
  public breadData:BreadCrumbData[]

  constructor(
    public router:Router
  ) {
    this.breadData = [
      {name:'应用管理',routerLink:['../list']},
      {name:'软文营销（客户端）'}
    ]
   }

  ngOnInit() {
  }

  // 点击进入对应的管理组件
  public FnGoModel(str:string):void{
    
    switch (str) {
      case "defaultMenu":
        this.router.navigate(['/Admin/menu/list','model','RuanwenClient','cid','0','status','1'])
        break;
  
      case "defaultTab":
        this.router.navigate(['/Admin/menu/list','model','RuanwenClient','cid','0','status','2'])
        break;

      case "company":
        this.router.navigate(['/Admin/company/list','model','RuanwenClient','app_id','11','type','0'])
        break;

      default:break;
    }

  }


}
