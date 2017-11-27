import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AppService }      from '../../../app.service'

import { HttpHeadData }    from '../../../HttpURL'

@Injectable()
export class GrNofityService {

  // 请求地址
  private httpURL = new HttpHeadData().SAASURL;

  public getNofityListURL = this.httpURL + "api/console/notify/list" //获取消息列表
  public getNofityReadURL = this.httpURL + "api/console/notify/read" // 读取内容（标记
  public postNofityDelURL = this.httpURL + "api/console/notify/del" // 删除消息

  constructor(
    private appService:AppService
  ) { }

  /**
   * 获取消息列表
   * @param obj 
   * type	否	int	不传：全部，0未读，1已读
   */
  public getNofityList(obj:any):Observable<any>{
      return this.appService.interfaceJudg('get',this.getNofityListURL,obj)
  }

  /**
   * 获取内容，标记已读
   * @param obj 
   * type	否	string	传’all’标记所有为已读
   * id	是	int	传单个id读取单篇通知，传数组标记为已读
   */
  public getNofityRead(obj:any):Observable<any>{
      return this.appService.interfaceJudg('get',this.getNofityReadURL,obj)
  }

  /**
   * 删除消息
   * @param obj 
   * ids	是	array	id数组
   */
  public postNofityDel(obj:any):Observable<any>{
      return this.appService.interfaceJudg('post',this.postNofityDelURL,obj)
  }

}
