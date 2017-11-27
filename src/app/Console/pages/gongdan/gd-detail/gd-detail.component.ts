import { Component, OnInit } from '@angular/core';
import {GrGongdanService} from "../../../services/grGongdan/grGongdan.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-gd-detail',
  templateUrl: './gd-detail.component.html',
  styleUrls: ['./gd-detail.component.scss']
})
export class GdDetailComponent implements OnInit {
  public feedback:number;                 //待您反馈数量
  public confirm:number;                  //待您确认数量
  public id:number;                       //工单id

  constructor(
    private grGongdanService:GrGongdanService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params["id"];
    this.fnGetNotify();
    this.getGongdanInfo();
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
        this.confirm = res.data.confirm;
      }
    },error=>{
      throw new Error(error)
    })
  }

  /**
   * @author GR-06
   * @copyright [获取工单详情信息]
   * @param     [param]
   * @return    [return]
   */
    public getGongdanInfo():void{
      this.grGongdanService.getGongdanDetail({id:this.id})
        .subscribe(res=>{
          if(res.status == 1){
            console.log(res)
          }
        },error=>{
          throw new Error(error);
        })
  }
}
