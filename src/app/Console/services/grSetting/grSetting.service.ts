import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response ,Headers,RequestOptions,URLSearchParams}          from '@angular/http';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,RouterStateSnapshot }  from '@angular/router';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

import { AppService }      from '../../../app.service'

import { HttpHeadData }    from '../../../HttpURL'

@Injectable()
export class GrSettingService implements Resolve<any>{

  // 请求地址
  private httpURL = new HttpHeadData().SAASURL;
  private getCompanyInfoURL = this.httpURL + "api/console/company/info"; // 获取企业信息
  private getConsoleAreaURL = this.httpURL + "api/console/area"; // 获取地区
  private getConsoleIndustryURL = this.httpURL + "api/console/industry"; // 获取行业
  private getConsoleScaleURL = this.httpURL + "api/console/scale"; // 获取公司规模
  private getViewImageURL = this.httpURL + "/viewImage"; // 获取企业logo图片
  private getCompanySmsURL = this.httpURL + "api/console/company/company_auth"; // 企业认证发送短信
  private getCompanyGetAuthInfoURL = this.httpURL + "api/console/company/getAuthInfo"; // 企业认证详情

  private postCompanyTransferURL = this.httpURL + "api/console/company/transfer"; // 转让企业
  private postCompanySettingURL = this.httpURL + "api/console/company/setting"; // 企业设置
  private postCompanyRemarkURL = this.httpURL + "api/console/company/remark"; // 修改企业信息
  private postCompanyBasicURL = this.httpURL + "api/console/company/basic"; // 修改企业信息
  private postCompanyAuthURL = this.httpURL + "api/console/company/company_auth"; // 企业认证

  constructor(
  	private appService:AppService,
    private http:Http
  ) { }

  /**
   * @author GR-03
   * @copyright [resolve路由守卫，只有请求到菜单后才可以进入企业控制台]
   * @param     [param]
   * @return    [return]
   * @check     GR-05                    GR-03
   * @param     {ActivatedRouteSnapshot}
   * @param     {RouterStateSnapshot}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.http.get(this.getCompanyInfoURL)
                .toPromise()
                .then(res=>{
                  return res
                })
                .catch(this.handleError)
  }


  /**
   * @author GR-03
   * @copyright 获取企业信息
   * @check     GR-05             GR-03
   * @return    {Observable<any>}
   */
  public getCompanyInfo():Observable<any>{
    return this.appService.interfaceJudg('get',this.getCompanyInfoURL)
  }

  /**
   * @author GR-03
   * @copyright 获取地区接口
   * @param     [param]
   * @return    [return]
   * @check     GR-05             GR-03
   * @return    {Observable<any>}
   */
  public getConsoleArea(obj:any):Observable<any>{
    return this.appService.interfaceJudg('get',this.getConsoleAreaURL,obj)
  }


  /**
   * @author GR-03
   * @copyright [获取行业接口]
   * @param     [param]
   * @return    [return]
   * @check     GR-05             GR-03
   * @return    {Observable<any>}
   */
  public getConsoleIndustry():Observable<any>{
    return this.appService.interfaceJudg('get',this.getConsoleIndustryURL)
  }

  /**
   * @author GR-03
   * @copyright 获取公司规模接口
   * @param     [param]
   * @return    [return]
   * @check     GR-05             GR-03
   * @return    {Observable<any>}
   */
  public getConsoleScale():Observable<any>{
    return this.appService.interfaceJudg('get',this.getConsoleScaleURL)
  }

  /**
   * @author GR-03
   * @copyright 获取图片logo
   * @param     [param]
   * @return    [return]
   * @check     GR-05             GR-03
   * @return    {Observable<any>} [description]
   */
  public getViewImage(obj:any):Observable<any>{
    return this.appService.interfaceJudg('get',this.getViewImageURL,obj)
  }

  /**
   * @author GR-03
   * @copyright 企业发送短信
   * @param     [param]
   * @return    [return]
   * @check     GR-05             GR-03
   * @param     {any}             obj   [description]
   * @return    {Observable<any>}       [description]
   */
  public getCompanySms(obj:any = {
    'type':'sms_send'
  }):Observable<any>{
    return this.appService.interfaceJudg('get',this.getCompanySmsURL,obj)
  }

  /**
   * @author GR-03
   * @copyright 企业认证详情
   * @param     [param]
   * @return    [return]
   * @check     GR-05             GR-03
   * @return    {Observable<any>} [description]
   */
  public getCompanyGetAuthInfo():Observable<any>{
    return this.appService.interfaceJudg('get',this.getCompanyGetAuthInfoURL)
  }
  
  /**
   * @author GR-03
   * @copyright 转让企业的操作
   * @param     [user_id]  int 成员id
   * @param     [password] string 当前用户密码
   * @check     GR-05             GR-03
   * @return    {Observable<any>}
   */
  public postCompanyTransfer(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postCompanyTransferURL,obj)
  } 

  /**
   * @author GR-03
   * @copyright 企业设置的操作
   * @param     name       string  企业名称
   * @param     domain       string  企业域名
   * @param     industry       int  行业id
   * @param     scale       int  规模id
   * @param     location       array  地区
   * @param     logo       string  主页logo
   * @param     logo_login       string  登录页logo
   * @param     starttime       string  开始时间
   * @param     endtime       string  结束时间
   * @check     GR-05             GR-03
   * @return    {Observable<any>}
   */
  public postCompanySetting(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postCompanySettingURL,obj)
  }

  /**
   * @author GR-03
   * @copyright 修改企业信息
   * @param     [param]
   * @return    [return]
   * @check     GR-05             GR-03
   * @param     {any}
   * @return    {Observable<any>}
   */
  public postCompanyRemark(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postCompanyRemarkURL,obj)
  }

  /**
   * @author GR-03
   * @copyright 修改企业名称、域名
   * @param     [param]
   * @return    [return]
   * @check     GR-05             GR-03
   * @param     {any}
   * @return    {Observable<any>}
   */
  public postCompanyBasic(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postCompanyBasicURL,obj)
  }

  /**
   * @author GR-03
   * @copyright 企业认证的接口
   * @param     [param]
   * @return    [return]
   * @check     GR-05             GR-03
   * @param     {any}             obj   [description]
   * @return    {Observable<any>}       [description]
   */
  public postCompanyAuth(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postCompanyAuthURL,obj)
  }




  /**
   * @author GR-03
   * @copyright 失败的回调方法
   * @param     [param]
   * @return    [return]
   * @check     GR-05         GR-03
   * @param     {Response |     any}
   */
  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
