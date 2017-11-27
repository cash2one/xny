import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AppService }      from '../../../../../app.service'

import { HttpHeadData }    from '../../../../../HttpURL'

@Injectable()
export class GrRuanwenServices {

  // 请求地址
  private httpURL = new HttpHeadData().SAASURL;

  private postAdminMediaSetURL = this.httpURL + "api/ruanwen/admin/media/set"; // 账号设置
  private postAdminMemberAddURL = this.httpURL + "api/ruanwen/admin/member/add"; // 添加会员组
  private postAdminMemberEditURL = this.httpURL + "api/ruanwen/admin/member/edit"; // 修改会员组

  private getAdminMemberListURL = this.httpURL + "api/ruanwen/admin/member/list"; // 会员组列表
  private getAdminMediaGetMeidaURL = this.httpURL + "api/ruanwen/admin/media/get_media"; // 获取账号设置信息

  constructor(
    private appService:AppService
  ) { }

  public postAdminMediaSet(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postAdminMediaSetURL,obj)
  }

  public postAdminMemberAdd(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postAdminMemberAddURL,obj)
  }

  public postAdminMemberEdit(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postAdminMemberEditURL,obj)
  }

  public getAdminMemberList():Observable<any>{
    return this.appService.interfaceJudg('get',this.getAdminMemberListURL)
  }

  public getAdminMediaGetMeida():Observable<any>{
    return this.appService.interfaceJudg('get',this.getAdminMediaGetMeidaURL)
  }


}
