import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { AppService } from '../../../app.service'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { HttpHeadData } from '../../../HttpURL'

@Injectable()
export class GrConfigService {

  private headerCommon = new Headers({ 'Content-Type': 'application/json' });
  private optCommon = new RequestOptions({ headers: this.headerCommon })
  // 请求地址
  private httpURL = new HttpHeadData().SAASURL;

  private getSmsURL = this.httpURL + "api/admin/sms"; // GET
  private getSmsTplListURL = this.httpURL + "api/admin/sms/tpl_list"; // GET
  private getSmsRuleListURL = this.httpURL + "api/admin/sms/rule_list"; // GET

  private getMailListURL = this.httpURL + "api/admin/mail/tem_list"; // GET
  private getMailRuleListURL = this.httpURL + "api/admin/mail/rule_list"; // GET

  private postMailAddURL = this.httpURL + "api/admin/mail/add"; // POST
  private postMailEditURL = this.httpURL + "api/admin/mail/edit"; // POST
  private postMailTestURL = this.httpURL + "api/admin/mail/test" //POST
  private postMailTempDelURL = this.httpURL + "api/admin/mail/del" //POST
  private postMailSetMailURL = this.httpURL + "api/admin/mail/setMail"; // POST
  private postMailRuleAddURL = this.httpURL + "api/admin/mail/rule_add"; // POST
  private postMailRuleEditURL = this.httpURL + "api/admin/mail/rule_edit"; // POST
  private postMailTempInfoURL = this.httpURL + "api/admin/mail/tem_info" //POST
  private postMailTempBindURL = this.httpURL + "api/admin/mail/temBind" //POST
  private postMailRuleStatusURL = this.httpURL + "api/admin/mail/status" //POST
  private postMailRuleDelURL = this.httpURL + "api/admin/mail/del_rule" //POST
  private getMailInfoURL = this.httpURL + "api/admin/mail/info"; // POST  获取邮箱的初始化配置

  private postSmsEditURL = this.httpURL + "api/admin/sms/edit"; // POST
  private postSmsTplAddURL = this.httpURL + "api/admin/sms/tpl_add"; // POST
  private postSmsTplEditURL = this.httpURL + "api/admin/sms/tpl_edit"; // POST
  private postSmsTplDelURL = this.httpURL + "api/admin/sms/tpl_del"; // POST
  private postSmsRuleAddURL = this.httpURL + "api/admin/sms/rule_add"; // POST
  private postSmsRuleEditURL = this.httpURL + "api/admin/sms/rule_edit"; // POST
  private postSmsRuleDelURL = this.httpURL + "api/admin/sms/rule_del"; // POST
  private postSmsRuleTplInfoURL = this.httpURL + "api/admin/sms/tpl_info"; //POST

  private postSmsStatusURL = this.httpURL + "api/admin/sms/tpl_status"; //POST
  private postSmsTestURL = this.httpURL + "api/admin/sms/test"; //POST
  private postSmsRuleBindURL  = this.httpURL + 'api/admin/sms/rule_bind'; //POST
  private postSmsRuleStatusURL = this.httpURL + 'api/admin/sms/rule_status'; //POST


  constructor(
    private http: Http,
    private appService:AppService
  ) { }


  /*
   *
   *当前短信配置的接口
   *
   *
   */
  public getSms(): Observable<any> {
    return this.appService.interfaceJudg('get',this.getSmsURL)
  }

  /*
   *
   *获取邮件模板列表的接口
   *
   *
   */
  public getMailList(obj?:any): Observable<any> {
    return this.appService.interfaceJudg('get',this.getMailListURL,obj)
  }

  /*
   *
   *邮件规则列表的接口
   *
   *
   */
  public getMailRuleList(obj?:any): Observable<any> {
    return this.appService.interfaceJudg('get',this.getMailRuleListURL,obj)
  }


  /*
   *
   *短信模板列表的接口
   *
   *
   */
  public getSmsTplList(obj?:any): Observable<any> {
    return this.appService.interfaceJudg('get',this.getSmsTplListURL,obj)
  }



  /*
   *
   *短信规则列表的接口
   *
   *
   */
  public getSmsRuleList(obj?:any): Observable<any> {
    return this.appService.interfaceJudg('get',this.getSmsRuleListURL,obj)
  }



  /*
  *
  *编辑短信配置的接口
  *
  *
  */
  public postSmsEdit(obj: any): Observable<any> {
    return this.appService.interfaceJudg('post',this.postSmsEditURL,obj)
  }



  /*
   *
   *邮箱驱动初始数据
   *
   *
   */
  public getMailInfo(): Observable<any> {
    return this.appService.interfaceJudg('get',this.getMailInfoURL)
  }


  /*
  *
  *邮件模板添加的接口
  *
  *
  */
  public postMailAdd(obj: any): Observable<any> {
    return this.appService.interfaceJudg('post',this.postMailAddURL,obj)
  }


  /*
  *
  *邮件模板修改的接口
  *
  *
  */
  public postMailEdit(obj: any): Observable<any> {
    return this.appService.interfaceJudg('post',this.postMailEditURL,obj)
  }

  /**
   * 邮件规则状态
   *  
   */
  public postMailRuleStatus(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postMailRuleStatusURL,obj)
  }

  /**
   * 删除邮件模版
   * 
   */
  public postMailTempDel(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postMailTempDelURL,obj)
  }

  /**
   * 邮件测试
   */
  public postMailTest(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postMailTestURL,obj)
  }


  /*
  *
  *设置邮件配置的接口
  *
  *
  */
  public postMailSetMail(obj: any): Observable<any> {
    return this.appService.interfaceJudg('post',this.postMailSetMailURL,obj)
  }

  /**
   * 获取邮件绑定的模版详情
   */
  public postMailTempInfo(obj):Observable<any>{
    return this.appService.interfaceJudg('post',this.postMailTempInfoURL,obj)
  }


  /*
  *
  *邮件规则添加的接口
  *
  *
  */
  public postMailRuleAdd(obj: any): Observable<any> {
    return this.appService.interfaceJudg('post',this.postMailRuleAddURL,obj)
  }

  /**
   * 删除邮件规则
   */
  public postMailRuleDel(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postMailRuleDelURL,obj)
  }

  /*
  *
  *邮件规则修改的接口
  *
  *
  */
  public postMailRuleEdit(obj: any): Observable<any> {
    return this.appService.interfaceJudg('post',this.postMailRuleEditURL,obj)
  }

  /**
   * 邮件规则绑定模版
   * 
   */
  public postMailTempBind(obj:any) :Observable<any>{
    return this.appService.interfaceJudg('post',this.postMailTempBindURL,obj)
  }


  /*
  *
  *添加短信模板的接口
  *
  *
  */
  public postSmsTplAdd(obj: any): Observable<any> {
    return this.appService.interfaceJudg('post',this.postSmsTplAddURL,obj)
  }


  /**
   * 
   *  更新短信模版状态
   */
  public postSmsStatus(obj:any): Observable<any> {
    return this.appService.interfaceJudg('post',this.postSmsStatusURL,obj)
  }

  /*
  *
  *修改短信模板的接口
  *
  *
  */
  public postSmsTplEdit(obj: any): Observable<any> {
    return this.appService.interfaceJudg('post',this.postSmsTplEditURL,obj)
  }


  /**
   * 短信测试接口
   * 
   * 
   */
  public postSmsTplTest(obj:any): Observable<any>{
    return this.appService.interfaceJudg('post',this.postSmsTestURL,obj)
  }


  /*
  *
  *删除短信模板的接口
  *
  *
  */
  public postSmsTplDel(obj: any): Observable<any> {
    return this.appService.interfaceJudg('post',this.postSmsTplDelURL,obj)
  }


  /*
  *
  *添加短信规则的接口
  *
  *
  */
  public postSmsRuleAdd(obj: any): Observable<any> {
    return this.appService.interfaceJudg('post',this.postSmsRuleAddURL,obj)
  }


  /*
  *
  *修改短信规则的接口
  *
  *
  */
  public postSmsRuleEdit(obj: any): Observable<any> {
    return this.appService.interfaceJudg('post',this.postSmsRuleEditURL,obj)
  }


  /*
  *
  *删除短信规则的接口
  *
  *
  */
  public postSmsRuleDel(obj: any): Observable<any> {
    return this.appService.interfaceJudg('post',this.postSmsRuleDelURL,obj)
  }

  /**
   * 获取规则对应的模版详情
   */
  public postSmsRuleTplInfo(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postSmsRuleTplInfoURL,obj)
  }

  /**
   * 绑定规则模版
   */
  public postSmsRuleBind(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postSmsRuleBindURL,obj)
  }

  /**
   * 更改短信规则状态
   */
  public postSmsRuleStatus(obj):Observable<any> {
    return this.appService.interfaceJudg('post',this.postSmsRuleStatusURL,obj)
  }

}
