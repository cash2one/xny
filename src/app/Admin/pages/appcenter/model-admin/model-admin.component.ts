import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot }  from '@angular/router'

import { BreadCrumbData } from '../../../../Public/riccio-breadcrumb/riccio-breadcrumb.data'

@Component({
  selector: 'app-model-admin',
  templateUrl: './model-admin.component.html',
  styleUrls: [
    '../appcenter.component.scss',
    '../../page.common.scss',
    '../model.commom.scss'
  ]
})
export class ModelAdminComponent implements OnInit {

  public breadData:BreadCrumbData[]
  constructor(
  	public router:Router
  ) { 
    this.breadData = [
      {name:'应用管理',routerLink:['../list']},
      {name:'总控制中心'}
    ]
  }

  ngOnInit() {
  }

  // 点击进入对应的管理组件
  public FnGoModel(str:string,title:string):void{
    switch (str) {
      case "menu":
        this.router.navigate(['/Admin/menu/list','model','Admin','cid','0','status','1'])
        break;
  
      case "auth":
        this.router.navigate(['/Admin/role/list','model','Admin','cid','0'])
        break;

      case "user":
        this.router.navigate(['/Admin/adminuser/list'])
        break;

      default:break;
    }
  }
}
