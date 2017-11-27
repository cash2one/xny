import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AppService }      from '../../../../app.service'

import { HttpHeadData }    from '../../../../HttpURL'

@Injectable()
export class GrReleaseService {

  // 请求地址
  private httpURL = new HttpHeadData().SAASURL;

  private getRuanwenMediaSearchListURL = this.httpURL + "api/ruanwen/media/public_init"; // 媒体查询筛选条件的列表
  private getRuanwenCartListURL = this.httpURL + "api/ruanwen/cart/public_list"; // 购物车列表

  private postRuanwenMediaListURL = this.httpURL + "api/ruanwen/media/public_list"; // 筛选出来后的所有媒体列表
  private postRuanwenMediaListCollectionURL = this.httpURL + "api/ruanwen/medialist/public_collection"; // 收藏，取消操作
  private postRuanwenMediaListPullBlackURL = this.httpURL + "api/ruanwen/medialist/public_pull_black"; // 拉黑，取消操作
  private postRuanwenMediaPublicInfoURL = this.httpURL + "api/ruanwen/media/public_info"; // 媒体详情
  
  private postRuanwenCartAddURL = this.httpURL + "api/ruanwen/cart/public_add"; // 加入购物车
  private postRuanwenCartDelURL = this.httpURL + "api/ruanwen/cart/public_del"; // 删除购物车

  private postRuanwenOrderListURL = this.httpURL + "api/ruanwen/order/list"; // 订单列表

  constructor(
    private appService:AppService
  ) { }

  public getRuanwenMediaSearchList():Observable<any>{
    return this.appService.interfaceJudg('get',this.getRuanwenMediaSearchListURL)
  }

  public getRuanwenCartList():Observable<any>{
    return this.appService.interfaceJudg('get',this.getRuanwenCartListURL)
  }

  public postRuanwenMediaList(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postRuanwenMediaListURL,obj)
  }

  public postRuanwenMediaListCollection(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postRuanwenMediaListCollectionURL,obj)
  }

  public postRuanwenMediaListPullBlack(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postRuanwenMediaListPullBlackURL,obj)
  }

  public postRuanwenCartAdd(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postRuanwenCartAddURL,obj)
  }

  public postRuanwenCartDel(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postRuanwenCartDelURL,obj)
  }

  public postRuanwenOrderList(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postRuanwenOrderListURL,obj)
  }

  public postRuanwenMediaPublicInfo(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postRuanwenMediaPublicInfoURL,obj)
  }

}
