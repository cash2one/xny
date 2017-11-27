import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { BreadCrumbData } from '../../../../Public/riccio-breadcrumb/riccio-breadcrumb.data'
@Component({
  selector: 'app-model-bsbyClient',
  templateUrl: './model-bsbyClient.component.html',
  styleUrls: [
    '../appcenter.component.scss',
    '../../page.common.scss',
    '../model.commom.scss'
  ]
})
export class ModelBsbyClientComponent implements OnInit {

  public breadData: BreadCrumbData[]
  constructor(
    public router: Router
  ) {
    this.breadData = [
      {name:'应用管理',routerLink:['../list']},
      {name:'百搜百应（客户端）'}
    ]
  }

  ngOnInit() {
  }

  // 点击进入对应的管理组件
  public FnGoModel(str: string): void {

    switch (str) {
      case "defaultMenu":
        this.router.navigate(['/Admin/menu/list', 'model', 'BsbyClient', 'cid', '0', 'status', '1'])
        break;

      case "defaultTab":
        this.router.navigate(['/Admin/menu/list', 'model', 'BsbyClient', 'cid', '0', 'status', '2'])
        break;

      case "company":
        this.router.navigate(['/Admin/company/list', 'model', 'BsbyClient', 'app_id', '9', 'type', '0'])
        break;

      default: break;
    }

  }


}
