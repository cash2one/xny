import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {GrGongdanService} from "../../../services/grGongdan/grGongdan.service";

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.scss']
})
export class SolutionComponent implements OnInit {
  public id:number;
  public cat_id:number;                  //常见问题id
  public lastCat:Array<any>;             //二级菜单
  public issueList:Array<any>;           //问题列表
  public issueLength:number;
  public clickId:number;                 //点击选择的分类id
  public feedback:number;                //待您反馈数量

  constructor(
    private activatedRoute:ActivatedRoute,
    private grGongdanService:GrGongdanService,
    private router:Router
  ) { }

  ngOnInit() {
    this.cat_id = this.activatedRoute.snapshot.params["cat_id"];
    this.id = this.activatedRoute.snapshot.params["id"];
    this.clickId = this.cat_id;
    this.fnGetLastCat();
    this.fnGetIssueList(this.cat_id);
    this.routerEvent();
    this.fnGetNotify();
  }

  /**
   * @author GR-06
   * @copyright [获取工单提醒]
   * @param     [param]
   * @return    [return]
   */
  public fnGetNotify() : void {
    this.grGongdanService.getNotify().subscribe(res=>{
      if(res.status == 1){
        this.feedback = res.data.feedback;
      }
    },error=>{
      throw new Error(error)
    })
  }

  /**
   * @author GR-06
   * @copyright [获取二级菜单列表]
   * @param     [param]
   * @return    [return]
   */
  public fnGetLastCat():void{
    this.grGongdanService.getLastCat({id:this.id}).subscribe(res=>{
      if(res.status == 1){
        if(res.data == ""){
          this.router.navigate(['/Console/gongdan/submitStepOne']);
        }else{
          this.lastCat = res.data;
        }
      }
    },error=>{
      throw new Error(error);
    })
  }

  /**
   * @author GR-06
   * @copyright [获取问题列表]
   * @param     [param]
   * @return    [return]
   */
  public fnGetIssueList(cat_id:number):void{

    this.grGongdanService.getIssueList({cat_id:cat_id}).subscribe(res=>{
      if(res.status == 1){
        if(res.data == ""){
          this.router.navigate(['/Console/gongdan/submitStepTwo','id',this.id]);
        }else{
          this.issueList = res.data;
          this.issueLength = this.issueList.length;
        }
      }
    },error=>{
      throw new Error(error);
    })
  }

  /**
   * @author GR-06
   * @copyright [选择分类]
   * @param     [param]
   * @return    [return]
   */
  public chooseClassify(id:number):void{
    this.clickId = id;
    this.router.navigate(['/Console/gongdan/submitStepThree','id',this.id,'cat_id',id]);
    this.fnGetIssueList(id);
  }

  /**
   * @author GR-06
   * @copyright [新建工单]
   * @param     [param]
   * @return    [return]
   */
  public newGongdan(){
    this.cat_id = this.activatedRoute.snapshot.params["cat_id"];
    this.id = this.activatedRoute.snapshot.params["id"];
    this.router.navigate(['/Console/gongdan/submitStepFour','id',this.id,'cat_id',this.cat_id]);
  }

  /**
   * @author GR-06
   * @copyright 监听路由变化
   * @param     [param]
   * @return    [return]
   */
  public routerEvent():void{
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .subscribe((event) => {
        if(event.snapshot.params.cat_id != this.cat_id){
          this.fnGetIssueList(event.snapshot.params.cat_id);
          this.cat_id = event.snapshot.params.cat_id;
          this.clickId = this.cat_id;
        }
      });
  }

}
