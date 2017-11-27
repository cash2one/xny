import { Component, OnInit } from '@angular/core';
import {GrGongdanService} from "../../../services/grGongdan/grGongdan.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-gongdan',
  templateUrl: './my-gongdan.component.html',
  styleUrls: ['./my-gongdan.component.scss']
})
export class MyGongdanComponent implements OnInit {
  public gongdanList:Array<any>;
  public feedback:number;

  constructor(
    private grGongdanService:GrGongdanService,
    private router:Router
  ) {
    this.gongdanList = [];
  }

  ngOnInit() {
    this.getMyGongdan();
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
   * @copyright [获取我的工单数据]
   * @param     [param]
   * @return    [return]
   */
  public getMyGongdan(){
    this.grGongdanService.postGongdanList({status:'all'})
      .subscribe(res=>{
        if(res.status == 1){
          this.gongdanList = res.data.data;
        }
      },error=>{
        throw new Error(error);
      })
  }

  /**
   * @author GR-06
   * @copyright [查看工单]
   * @param     [param]
   * @return    [return]
   */
  public seeDetail(id:number){
    this.router.navigate(['/Console/gongdan/detail','id',id])
  }
}
