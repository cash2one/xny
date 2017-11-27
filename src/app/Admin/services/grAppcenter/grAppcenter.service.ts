import { Injectable } from '@angular/core';
import { Http, Response ,Headers,RequestOptions,URLSearchParams}          from '@angular/http';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,RouterStateSnapshot }  from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { HttpHeadData }		from '../../../HttpURL'
import { AppService } from '../../../app.service'

@Injectable()
export class GrAppcenterService {

  // 请求地址
  private httpURL = new HttpHeadData().SAASURL;
  private getAppCenterURL = this.httpURL + "api/admin/app/appcenter"; // GET
  private getAppiInfoURL = this.httpURL + "api/admin/app/info"; // GET
  private getCompanyListURL = this.httpURL + "api/admin/Company/list"; // GET

  private postAppListURL = this.httpURL + "api/admin/app/list"; // POST
  private postAppAddURL = this.httpURL + "api/admin/app/add"; // POST
  private postAppEditURL = this.httpURL + "api/admin/app/edit"; // POST
  private postAppStatusURL = this.httpURL + "api/admin/app/status"; // POST
  private postAppAddComURL = this.httpURL + "api/admin/app/add_company" //POST

  private postAppInfoURL = this.httpURL + "api/app/app_info"

  constructor(
  	private http:Http,
    private appService:AppService
  ) { }


  /*
  *
  *获取应用列表(无分页)的接口
  *
  *
  */
  public getAppcenter():Observable<any>{
    return this.appService.interfaceJudg('get',this.getAppCenterURL)
  }

  /*
  *
  *获取单个应用详情的接口
  *
  *
  */
  public getAppiInfo(id:number):Observable<any>{
    return this.appService.interfaceJudg('get',this.getAppiInfoURL,{
      id:id
    })
  }


  /*
  *
  *获取企业列表的接口
  *
  *
  */
  public getCompanyList():Observable<any>{
    return this.appService.interfaceJudg('get',this.getCompanyListURL)
  }


  /*
  *
  *获取应用详细列表的接口
  *
  *
  */
  public postAppList(obj?:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postAppListURL,obj)
  }

  /*
  *
  *添加应用的接口
  *
  *
  */
  public postAppAdd(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postAppAddURL,obj)
  }

  /*
  *
  *编辑应用的接口
  *
  *
  */
  public postAppEdit(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postAppEditURL,obj)
  }  

  /*
  *
  *修改应用状态(禁用、显示、隐藏)的接口
  *
  *
  */
  public postAppStatus(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postAppStatusURL,obj)
  }  

  /**
   * 给企业添加应用
   * app_id   应用id
   * cid   企业id 数组
   */
  public postAppAddCom(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postAppAddComURL,obj)
  }

  /**
   * 获取应用的信息
   * @param obj 
   * model   应用model
   */
  public postAppInfo(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postAppInfoURL,obj)
  }
}
