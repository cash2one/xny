import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {newGongdanData} from "./newGongdanData";
import {GrGongdanService} from "../../../services/grGongdan/grGongdan.service";
import {RiccioNotificationsService} from "@gr-public/riccio-notifications/riccio-notifications.service";

@Component({
  selector: 'app-create-gongdan',
  templateUrl: './create-gongdan.component.html',
  styleUrls: ['./create-gongdan.component.scss']
})
export class CreateGongdanComponent implements OnInit {
  public cat_id:number;
  public newGongdanData:newGongdanData;           //保存需要提交的工单的数据
  public danger:any;                             //验证不通过标记
  public feedback:number;                        //待您反馈数量

  constructor(
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private grGongdanService:GrGongdanService,
    public riccioNotificationsService:RiccioNotificationsService
  ) {
    this.danger = {
      'content':false,
      'mobile': false,
      'email': false,
    }
  }

  ngOnInit() {
    this.cat_id = this.activatedRoute.snapshot.params["cat_id"];
    this.newGongdanData = new newGongdanData();
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
   * @copyright [手机号失去焦点时对手机号进行验证]
   * @param     [param]
   * @return    [return]
   */

  public fnGetFindMobile():void{
    this.danger['mobile'] = this.newGongdanData.mobile.trim() === "" || !(/^1[34578]\d{9}$/.test(this.newGongdanData.mobile.trim().toString()))
      ? (() => {
        this.riccioNotificationsService.setSubject({
          text: '请填写正确的手机号',
          status: 'danger'
        })
        return true
      })()
      :false
  }

  /**
   * @author GR-06
   * @copyright [邮箱号失去焦点时对邮箱进行验证]
   * @param     [param]
   * @return    [return]
   */
  public fnGetFindEmail():void{
    this.danger['email'] = this.newGongdanData.email.trim() === "" || !(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.newGongdanData.email.trim().toString()))?(() => {
      let obj = {
        text: '请输入正确的邮箱',
        status: 'danger'
      }
      this.riccioNotificationsService.setSubject(obj)
      return true
    })() : false
  }

  /**
   * @author GR-06
   * @copyright [问题描述失去焦点是判断内容是否为空]
   * @param     [param]
   * @return    [return]
   */
  public fnGetFindDesc():void{
    this.danger['content'] = this.newGongdanData.content.trim() ===""?(()=>{
      let obj = {
        text:'问题描述不能为空',
        status:'danger'
      }
      this.riccioNotificationsService.setSubject(obj);
      return true
    })():false
  }

  /**
   * @author GR-06
   * @copyright [提交表单]
   * @param     [param]
   * @return    [return]
   */
  public submit():void{
    this.fnGetFindDesc();
    this.fnGetFindMobile();
    this.fnGetFindEmail();
    if(
      this.danger['content'] == false && this.newGongdanData.content != ""
      && this.danger['mobile'] == false && this.newGongdanData.mobile != ""
      && this.danger['email'] == false && this.newGongdanData.email != ""){
      this.grGongdanService.postGongdan({
        is_important:this.newGongdanData.is_important,
        content:this.newGongdanData.content,
        mobile:this.newGongdanData.mobile,
        email:this.newGongdanData.email,
        reason:this.newGongdanData.reason,
        cat_id:this.cat_id
      }).subscribe(res=>{
        if(res.status == 1){
          this.riccioNotificationsService.setSubject({text:'提交成功'})
          this.router.navigate(['/Console/gongdan/detail','id',res.data])
        }
      },error=>{
        throw new Error(error);
      })
    }
  }

}
