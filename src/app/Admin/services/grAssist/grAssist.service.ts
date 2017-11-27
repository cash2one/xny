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
export class GrAssistService {

  // 请求地址
  private httpURL = new HttpHeadData().SAASURL;

  private getHelpcatListURL = this.httpURL + "api/admin/helpcat/list"; // 帮助分类列表
  private getHelpListURL = this.httpURL + "api/admin/help/list"; // 帮助文档列表
  private getHelpInfoURL = this.httpURL + "api/admin/help/info"; // 文档详情
  private getHelpSortURL = this.httpURL + "api/admin/help/sort"; // 文档排序

  private postHelpcatAddURL = this.httpURL + "api/admin/helpcat/add"; // 添加分类
  private postHelpcatEditURL = this.httpURL + "api/admin/helpcat/edit"; // 编辑分类
  private postHelpcatDelURL = this.httpURL + "api/admin/helpcat/del"; // 删除分类

  private postHelpAddURL = this.httpURL + "api/admin/help/add"; // 添加文档
  private postHelpEditURL = this.httpURL + "api/admin/help/edit"; // 编辑文档
  private postHelpDelURL = this.httpURL + "api/admin/help/del"; // 删除文档

  constructor(
  	private http:Http,
    private appService:AppService
  ) { }

  public getHelpcatList():Observable<any>{
    return this.appService.interfaceJudg('get',this.getHelpcatListURL)
  }

  public getHelpList(obj):Observable<any>{
    return this.appService.interfaceJudg('get',this.getHelpListURL,obj)
  }

  public getHelpInfo(obj):Observable<any>{
    return this.appService.interfaceJudg('get',this.getHelpInfoURL,obj)
  }

  public getHelpSort(obj):Observable<any>{
    return this.appService.interfaceJudg('get',this.getHelpSortURL,obj)
  }

  public postHelpcatAdd(obj):Observable<any>{
    return this.appService.interfaceJudg('post',this.postHelpcatAddURL,obj)
  }

  public postHelpcatEdit(obj):Observable<any>{
    return this.appService.interfaceJudg('post',this.postHelpcatEditURL,obj)
  }

  public postHelpcatDel(obj):Observable<any>{
    return this.appService.interfaceJudg('post',this.postHelpcatDelURL,obj)
  }

  public postHelpAdd(obj):Observable<any>{
    return this.appService.interfaceJudg('post',this.postHelpAddURL,obj)
  }

  public postHelpEdit(obj):Observable<any>{
    return this.appService.interfaceJudg('post',this.postHelpEditURL,obj)
  }

  public postHelpDel(obj):Observable<any>{
    return this.appService.interfaceJudg('post',this.postHelpDelURL,obj)
  }

}
