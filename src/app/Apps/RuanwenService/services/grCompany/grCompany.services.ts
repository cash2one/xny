import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AppService }      from '../../../../app.service'

import { HttpHeadData }    from '../../../../HttpURL'

@Injectable()
export class GrCompanyService {

  // 请求地址
  private httpURL = new HttpHeadData().SAASURL;

  private getAdminCenterListURL = this.httpURL + "api/ruanwen/admin/center/list"; // 企业中心列表

  private postAdminCenterAddURL = this.httpURL + "api/ruanwen/admin/center/add"; // 添加企业会员
  private postAdminCenterEditURL = this.httpURL + "api/ruanwen/admin/center/edit"; // 修改企业会员
  private postAdminCenterDelURL = this.httpURL + "api/ruanwen/admin/center/del"; // 删除企业会员

  constructor(
    private appService:AppService
  ) { }

  public getAdminCenterList(obj:any = {}):Observable<any>{
    return this.appService.interfaceJudg('get',this.getAdminCenterListURL,obj)
  }

  public postAdminCenterAdd(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postAdminCenterAddURL,obj)
  }

  public postAdminCenterEdit(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postAdminCenterEditURL,obj)
  }

  public postAdminCenterDel(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postAdminCenterDelURL,obj)
  }

}
