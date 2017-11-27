import {Component, OnDestroy, OnInit} from '@angular/core';
import {GrGongdanService} from "../../../services/grGongdan/grGongdan.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-problem-type',
  templateUrl: './problem-type.component.html',
  styleUrls: ['./problem-type.component.scss']
})
export class ProblemTypeComponent implements OnInit,OnDestroy {
  public lastCat:Array<any>;                 //二级菜单列表
  public id:number;                         //分类列表id
  public feedback:number;                   //待您反馈数量

  constructor(
    private grGongdanService:GrGongdanService,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params["id"];
    this.fnGetLastCat(this.id);
    this.routerEvent();
    this.fnGetNotify();
  }

  ngOnDestroy(){

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
  public fnGetLastCat(id:number):void{
    this.grGongdanService.getLastCat({id:id}).subscribe(res=>{
      if(res.status == 1){
        if(res.data == ""){
          this.router.navigate(['/Console/gongdan/submitStepOne']);
        }else {
          this.lastCat = res.data;
        }
      }
    },error=>{
      throw new Error(error);
    })
  }

  /**
   * @author GR-06
   * @copyright [获取分类下问题列表]
   * @param     [param]
   * @return    [return]
   */
  public issueList(cat_id:number){
    this.router.navigate(['/Console/gongdan/submitStepThree','id',this.id,'cat_id',cat_id]);
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
        if(event.snapshot.params.id != this.id){
          this.fnGetLastCat(event.snapshot.params.id);
          this.id = event.snapshot.params.id;
        }
      });

  }


}
