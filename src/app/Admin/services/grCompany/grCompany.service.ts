import { Injectable } from '@angular/core';
import { Http, Response ,Headers,RequestOptions,URLSearchParams}          from '@angular/http'
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,RouterStateSnapshot }  from '@angular/router'
import { Observable } from 'rxjs/Observable';

import { HttpHeadData }		from '../../../HttpURL'
import { AppService } from '../../../app.service'

@Injectable()
export class GrCompanyService {

  // 请求地址
  private httpURL = new HttpHeadData().SAASURL;
  private getCompanyListURL = this.httpURL + "api/admin/company/list"; // GET
  private getCompanyInfoURL = this.httpURL + "api/admin/company/info" //GET
  private getDepartmentUserListURL = this.httpURL + "api/admin/department/user_list"; // GET

  private postCompanyListAppURL = this.httpURL + "api/admin/company/list_app"; // POST
  private postDepartmentURL = this.httpURL + "api/admin/department"; // POST

  private getCompanyScaleURL = this.httpURL + "api/console/scale"; // get 获取公司规模列表

  private getIndustryURL = this.httpURL + "api/console/industry"; // get 获取行业列表

  private getCompanyAreaURL = this.httpURL + "api/console/area"; // get 获取地区列表

  private getCompanyAccountLogURL = this.httpURL + "api/admin/account/log";  //get 企业收支记录

  private getCompanyApplicationURL = this.httpURL + "api/admin/app/my_app";  //get 获取企业开通的应用列表

  private getCompanyUnApplicationURL = this.httpURL + "api/admin/app/unmy_app";  //get 获取企业未开通的应用列表

  private postCompanyApplicationURL = this.httpURL + "api/admin/app/open_app";  //post  添加企业开通应用

  private postCompanyAddURL = this.httpURL + "api/admin/company/add"; // post 添加企业

  private postCompanyEditURL = this.httpURL + "api/admin/company/edit"; // post 修改企业

  private postCompanyStatuURL = this.httpURL + "api/admin/company/status" //POST 企业状态

  private postCompanyRechargeURL = this.httpURL + "api/admin/account/add"  //post 修改金额


  //////企业认证
  private postComAuditListURL = this.httpURL + "api/admin/company/audite_list" //POST 认证列表
  private postComAuditInfoURL = this.httpURL + "api/admin/company/audite_info" //POST 认证详情
  private postComAuditingURL = this.httpURL + "api/admin/company/auditing" //Post 认证审核



  constructor(
    private appService:AppService
  ) { }

  /*
  *
  *获取所有企业列表的接口
  *
  */
  public getCompanyList(obj:any):Observable<any>{
    return this.appService.interfaceJudg('get',this.getCompanyListURL,obj)
  }

  /**
   * 获取单个企业数据
   *
   */
  public getCompanyInfo(id:number | string):Observable<any>{
    return this.appService.interfaceJudg('get',this.getCompanyInfoURL,{
      id:id
    })
  }


  /*
  *获取公司规模列表
  */
  public getCompanyScaleList():Observable<any>{
    return this.appService.interfaceJudg('get',this.getCompanyScaleURL)
  }



  /*
  *获取行业列表
  */
  public getIndustryList():Observable<any>{
    return this.appService.interfaceJudg('get',this.getIndustryURL)
  }


  /*
  *获取地区列表
  */
  public getCompanyAreaList(id:string|number=0):Observable<any>{
    let url = this.getCompanyAreaURL+'?parentid='+id
    return this.appService.interfaceJudg('get',url)
  }


  /*
  *
  *获取团队成员列表的接口
  *
  */
  public getDepartmentUserList(obj:any):Observable<any>{
    return this.appService.interfaceJudg('get',this.getDepartmentUserListURL,obj)
  }

  /**
   * 获取企业收支明细
   * @param obj
   * cid   企业id 
   */
  public getCompanyAccountLog(obj:any){
    return this.appService.interfaceJudg('post',this.getCompanyAccountLogURL,obj)
  }


  /*
  *
  *获取所有应用企业列表的接口
  *
  *
  */
  public postCompanyListApp(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postCompanyListAppURL,obj)
  }

  /**
   *
   *
   * 获取企业开通的应用列表
   *
   */
  public getCompanyApplication(obj:any):Observable<any>{
    return this.appService.interfaceJudg('get',this.getCompanyApplicationURL,obj)
  }

  /**
   *
   *
   * 获取企业未开通的应用列表
   *
   */
  public getCompanyUnApplication(obj:any):Observable<any>{
    return this.appService.interfaceJudg('get',this.getCompanyUnApplicationURL,obj)
  }

  /**
   *
   *
   *添加企业要开通的应用
   *
   */
  public postCompanyApplication(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postCompanyApplicationURL,obj)
  }

  /*
  *
  *部门及成员树状结构的接口
  *
  *@params    cid
  *
  */
  public postDepartment(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postDepartmentURL)
  }


  /*
  *
  *添加企业（Admin）
  *
  */
  public postCompanyAdd(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postCompanyAddURL,obj)
  }

  /**
   * 修改企业状态
   */
  public postCompanyStatu(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postCompanyStatuURL,obj)
  }


  /*
  *
  *修改企业（Admin）
  *
  */
  public postCompanyEdit(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postCompanyEditURL,obj)
  }


  /**
   * 获取企业认证列表
   */
  public postComAuditList(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postComAuditListURL,obj)
  }

  /**
   * 获取企业认证详情
   */
  public postComAuditInfo(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postComAuditInfoURL,obj)
  }

  /**
   * 企业认证审核
   */
  public postComAuditing(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postComAuditingURL,obj)
  }

  /**
   * 修改企业金额
   * @param obj
   * cid	是	int	企业id
   * amount	是	string	金额
   * type	是	int	1充值，2扣款
   * desc	否	string	改动说明
   */
  public postCompanyRecharge(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postCompanyRechargeURL,obj)
  }
}
