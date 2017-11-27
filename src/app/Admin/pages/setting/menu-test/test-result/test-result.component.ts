import { Component, OnInit } from '@angular/core';
import {BreadCrumbData} from "../../../../../Public/riccio-breadcrumb/riccio-breadcrumb.data";
import {GrMoreService} from "../../../../services/grMore/gr-more.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.scss']
})
export class TestResultComponent implements OnInit {

  public breadData:BreadCrumbData[];
  public appId:number;
  public appModel:string;
  public companyList:Array<any>;
  public appName:string;
  public currentPage:number = 1;
  public totalPages:number;
  public count:number = 0;
  public rollSpeed:number = 200;                //滚动速度控制,毫秒为单位
  public testFinish:boolean = false;

  constructor(
    private grMoreService:GrMoreService,
    private activatedRoute:ActivatedRoute
  ) {

  }

  ngOnInit() {
    //面包屑最后一个文字的控制
    this.appId = this.activatedRoute.snapshot.params["app_id"];
    this.appModel = this.activatedRoute.snapshot.params["model"];
    this.companyList = [];
    switch(this.appModel){
      case "Console":
        this.appName = "企业控制台";
        break;
      case "RuanwenService":
        this.appName = "软文营销（服务端）";
        break;
      case "RuanwenClient":
        this.appName = "软文营销（客户端）";
        break;
      case "BsbyService":
        this.appName = "百搜百应（服务端）";
        break;
      case "BsbyClient":
        this.appName = "百搜百应（客户端）";
        break;
      default:
        this.appName = "";
    }
    this.breadData = [
      {name:'更多',routerLink:['../../../../../../']},
      {name:'菜单体检',routerLink:['../../../../../']},
      {name:this.appName}
    ];


    this.grMoreService.getOpenAppCompany({app_id:this.appId,page:this.currentPage}).subscribe(res=> {
      if(res.status == 1) {
        this.totalPages = res.data.last_page;
        let arr = [];
        if(res.data.data == '') this.testFinish = true;
        res.data.data.map(e => {
          if (e.count > 0) {
            arr.push(e);
          }
        });
        this.dataShowRoll(arr);
        if(this.currentPage<res.data.last_page){
          this.getCompanyList();
        }
      }
    })
  }

  //分页请求企业列表数据
  getCompanyList(){
    this.grMoreService.getOpenAppCompany({app_id:this.appId,page:this.currentPage++}).subscribe(res=> {
      if(res.status == 1){
        let arr = [];
        res.data.data.map(e=>{
          if(e.count>0){
            arr.push(e);
          }
        });
        this.dataShowRoll(arr);
        if(this.currentPage<res.data.last_page){
          this.getCompanyList();
        }
      }
    })
  }

  //动态显示数据
  dataShowRoll(arr:Array<any>){
    let i = 0;
    let interval = setInterval(()=>{
      if(i<arr.length){
        this.companyList.push(arr[i]);
        i++;
        this.count++;
      }
      if(i == arr.length){
        clearInterval(interval);
        if(this.currentPage == this.totalPages){
          this.testFinish = true;
        }
      }
    },this.rollSpeed);
  }
}
