import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AppService }      from '../../../app.service'

import { HttpHeadData }    from '../../../HttpURL'

@Injectable()
export class GrAccountService {

  // 请求地址
  private httpURL = new HttpHeadData().SAASURL;

  private postUserEditURL = this.httpURL + "api/console/user/edit"; // 企业个人设置

  constructor(
    private appService:AppService
  ) { }

  public postUserEdit(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postUserEditURL,obj)
  }



}
