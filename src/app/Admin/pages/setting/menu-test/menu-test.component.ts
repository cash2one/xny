import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreadCrumbData} from "../../../../Public/riccio-breadcrumb/riccio-breadcrumb.data";
import {GrMoreService} from "../../../services/grMore/gr-more.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu-test',
  templateUrl: './menu-test.component.html',
  styleUrls: ['./menu-test.component.scss']
})
export class MenuTestComponent implements OnInit,OnDestroy {

  public breadData:BreadCrumbData[];
  public getAppListObj:any;
  public appList:Array<any>;

  constructor(
    private grMoreService:GrMoreService,
    private router:Router
              ) {
    this.breadData = [
      {name:'更多',routerLink:['../']},
      {name:'菜单体检'}
    ]
  }

  ngOnInit() {
    this.getAppListObj = this.grMoreService.getAppList({}).subscribe(res=> {
      if(res.status == 1){
        this.appList = res.data.data;
      }
    })
  }

  ngOnDestroy(): void {
    this.getAppListObj.unsubscribe();
  }

  //体检
  test(model:string,id:number){
    this.router.navigate(['/Admin/setting/more/test/result','model',model,'app_id',id]);
  }

}
