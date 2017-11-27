import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AppService }      from '../../../../app.service'

import { HttpHeadData }    from '../../../../HttpURL'

@Injectable()
export class GrOrderService {

  // 请求地址
  private httpURL = new HttpHeadData().SAASURL;

  private postOrderListURL = this.httpURL + "api/ruanwen/order/list"; // 订单列表
  private postOrderAddDraftURL = this.httpURL + "api/ruanwen/order/add_draft"; // 保存订单
  private postOrderAddOrderURL = this.httpURL + "api/ruanwen/order/add_order"; // 软文发布
  private postOrderRefreshURL = this.httpURL + "api/ruanwen/order/refresh"; // 刷新媒体订单状态
  private postOrderCancelURL = this.httpURL + "api/ruanwen/order/cancel"; // 取消发布订单
  private postOrderAddMediaURL = this.httpURL + "api/ruanwen/order/add_media"; // 添加订单媒体
  private postOrderDelMediaURL = this.httpURL + "api/ruanwen/order/del_media"; // 删除订单媒体
  private postOrderWriteListURL = this.httpURL + "api/ruanwen/write/list"; // 代写订单列表
  private postOrderWriteAddDraftURL = this.httpURL + "api/ruanwen/write/add_draft"; // 添加代写草稿
  private postOrderWriteAddOrderURL = this.httpURL + "api/ruanwen/write/add_order"; // 添加代写订单
  private postOrderWriteRefreshURL = this.httpURL + "api/ruanwen/write/refresh"; // 刷新订单状态

  private getOrderInfoURL = this.httpURL + "api/ruanwen/order/info"; // 订单详情
  private getOrderDelURL = this.httpURL + "api/ruanwen/order/del"; // 删除订单
  private postOrderSendSmsURL = this.httpURL + "api/ruanwen/order/send_sms"; // 软文发布验证
  private getOrderWriteInfoURL = this.httpURL + "api/ruanwen/write/info"; // 代写订单详情
  private getOrderWriteDelURL = this.httpURL + "api/ruanwen/write/del"; // 删除代写订单
  private getOrderWritePriceURL = this.httpURL + "api/ruanwen/media/write_price"; // 获取代写文章规格
  private postOrderWriteSendSmsURL = this.httpURL + "api/ruanwen/write/send_sms"; // 代写文章的短信验证码

  constructor(
    private appService:AppService
  ) { }

  public getOrderInfo(obj:any={}):Observable<any>{
    return this.appService.interfaceJudg('get',this.getOrderInfoURL,obj)
  }

  public getOrderDel(obj:any={}):Observable<any>{
    return this.appService.interfaceJudg('get',this.getOrderDelURL,obj)
  }

  public postOrderSendSms(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postOrderSendSmsURL,obj)
  }

  public getOrderWriteInfo(obj:any):Observable<any>{
    return this.appService.interfaceJudg('get',this.getOrderWriteInfoURL,obj)
  }

  public getOrderWriteDel(obj:any):Observable<any>{
    return this.appService.interfaceJudg('get',this.getOrderWriteDelURL,obj)
  }

  public getOrderWritePrice():Observable<any>{
    return this.appService.interfaceJudg('get',this.getOrderWritePriceURL)
  }

  public postOrderWriteSendSms(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postOrderWriteSendSmsURL,obj)
  }

  public postOrderList(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postOrderListURL,obj)
  }

  public postOrderRefresh(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postOrderRefreshURL,obj)
  }

  public postOrderAddDraft(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postOrderAddDraftURL,obj)
  }

  public postOrderAddOrder(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postOrderAddOrderURL,obj)
  }
  
  public postOrderCancel(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postOrderCancelURL,obj)
  }

  public postOrderAddMedia(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postOrderAddMediaURL,obj)
  }
 
  public postOrderDelMedia(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postOrderDelMediaURL,obj)
  } 

  public postOrderWriteList(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postOrderWriteListURL,obj)
  } 

  public postOrderWriteAddDraft(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postOrderWriteAddDraftURL,obj)
  } 

  public postOrderWriteAddOrder(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postOrderWriteAddOrderURL,obj)
  } 

  public postOrderWriteRefresh(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postOrderWriteRefreshURL,obj)
  } 

}
