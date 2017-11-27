import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AppService }      from '../../../../app.service'

import { HttpHeadData }    from '../../../../HttpURL'

@Injectable()
export class GrOrderService {

  // 请求地址
  private httpURL = new HttpHeadData().SAASURL;

  private postAdminOrderListURL = this.httpURL + "api/ruanwen/admin/order/list"; // 软文订单列表
  private postAdminOrderWriteListURL = this.httpURL + "api/ruanwen/admin/order/write_list"; // 代写订单列表

  constructor(
    private appService:AppService
  ) { }

  public postAdminOrderList(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postAdminOrderListURL,obj)
  }

  public postAdminOrderWriteList(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postAdminOrderWriteListURL,obj)
  }

}
