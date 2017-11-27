import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AppService }      from '../../../../app.service'

import { HttpHeadData }    from '../../../../HttpURL'

@Injectable()
export class GrAccountServices {

  // 请求地址
  private httpURL = new HttpHeadData().SAASURL;

  private postAdminAccountListURL = this.httpURL + "api/ruanwen/admin/account/list"; // 消费记录列表

  constructor(
    private appService:AppService
  ) { }

  public postAdminAccountList(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postAdminAccountListURL,obj)
  }

}
