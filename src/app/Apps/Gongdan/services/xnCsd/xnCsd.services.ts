import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AppService }      from '../../../../app.service'

import { HttpHeadData }    from '../../../../HttpURL'

@Injectable()
export class XnCsdServices {

  // 请求地址
  private httpURL = new HttpHeadData().SAASURL;

  private getCustomerGroupListURL = this.httpURL + "api/gongdan/service/customer_group/list"; // 客服分组列表
  private getCustomerGroupNoAdminURL = this.httpURL + "api/gongdan/service/customer_group/no_admin"; // 无管理员客服组列表
  private getCustomerGroupClassURL = this.httpURL + "api/gongdan/service/customer_group/get_class"; // 分类范围列表
  private getCustomerGroupLastURL = this.httpURL + "api/gongdan/service/customer_group/get_last"; // 选择分类列表
  private getCustomerGroupInfoURL = this.httpURL + "api/gongdan/service/customer_group/info"; // 客服组详情

  private postCustomerGroupAddURL = this.httpURL + "api/gongdan/service/customer_group/add"; // 添加客服分组
  private postCustomerGroupEditURL = this.httpURL + "api/gongdan/service/customer_group/edit"; // 修改客服分组
  private postCustomerUserURL = this.httpURL + "api/gongdan/service/customer/user"; // 分组下的成员列表
  private postCustomerNoGroupURL = this.httpURL + "api/gongdan/service/customer/no_group"; // 无分组的成员列表
  private postCustomerAddURL = this.httpURL + "api/gongdan/service/customer/add"; // 添加客服
  private postCustomerDelURL = this.httpURL + "api/gongdan/service/customer/del"; // 移除客服
  private postCustomerAddClassURL = this.httpURL + "api/gongdan/service/customer_group/add_class"; // 添加分组分类
  private postCustomerDelClassURL = this.httpURL + "api/gongdan/service/customer_group/del_class"; // 移除分组分类
  private postCustomerSetAdminURL = this.httpURL + "api/gongdan/service/customer/set_admin"; // 设置客服组管理员

  constructor(
    private appService:AppService
  ) { }

  public getCustomerGroupList(): Observable<any>{
    return this.appService.interfaceJudg('get',this.getCustomerGroupListURL)
  }

  public getCustomerGroupNoAdmin(): Observable<any>{
    return this.appService.interfaceJudg('get',this.getCustomerGroupNoAdminURL)
  }

  public getCustomerGroupClass( obj:any ): Observable<any>{
    return this.appService.interfaceJudg('get',this.getCustomerGroupClassURL,obj)
  }

  public getCustomerGroupLast( obj:any = {} ): Observable<any>{
    return this.appService.interfaceJudg('get',this.getCustomerGroupLastURL,obj)
  }

  public getCustomerGroupInfo( obj:any = {} ): Observable<any>{
    return this.appService.interfaceJudg('get',this.getCustomerGroupInfoURL,obj)
  }

  public postCustomerGroupAdd( obj:any ): Observable<any>{
    return this.appService.interfaceJudg('post',this.postCustomerGroupAddURL,obj)
  }

  public postCustomerGroupEdit( obj:any ): Observable<any>{
    return this.appService.interfaceJudg('post',this.postCustomerGroupEditURL,obj)
  }

  public postCustomerUser( obj:any ): Observable<any>{
    return this.appService.interfaceJudg('post',this.postCustomerUserURL,obj)
  }

  public postCustomerNoGroup( obj:any ): Observable<any>{
    return this.appService.interfaceJudg('post',this.postCustomerNoGroupURL,obj)
  }

  public postCustomerAdd( obj:any ): Observable<any>{
    return this.appService.interfaceJudg('post',this.postCustomerAddURL,obj)
  }

  public postCustomerDel( obj:any ): Observable<any>{
    return this.appService.interfaceJudg('post',this.postCustomerDelURL,obj)
  }

  public postCustomerAddClass( obj:any ): Observable<any>{
    return this.appService.interfaceJudg('post',this.postCustomerAddClassURL,obj)
  }

  public postCustomerDelClass( obj:any ): Observable<any>{
    return this.appService.interfaceJudg('post',this.postCustomerDelClassURL,obj)
  }

  public postCustomerSetAdmin( obj:any ): Observable<any>{
    return this.appService.interfaceJudg('post',this.postCustomerSetAdminURL,obj)
  }

}
