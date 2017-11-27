import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { AppService }      from '../../../app.service';

import { HttpHeadData }    from '../../../HttpURL';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class GrGongdanService {

  // 请求地址
  private httpURL = new HttpHeadData().SAASURL;

  private getNotifyURL = this.httpURL + "api/console/gongdan/get_notify";                     //GET
  private getProblemCatURL = this.httpURL + "api/console/gongdan/problem_cat";                //GET
  private getLastCatURL = this.httpURL + "/api/console/gongdan/get_last_cat";                 //GET
  private getissueListURL = this.httpURL + "/api/console/gongdan/get_problem";                //GET
  private getSearchListURL = this.httpURL + "/api/console/gongdan/serach_list";               //GET
  private getGongdanDetailURL = this.httpURL + "/api/console/gongdan/info";                   //GET
  private postGongdanURL = this.httpURL + "/api/console/gongdan/add";                         //POST
  private postGongdanListURL = this.httpURL + "/api/console/gongdan/list";                     //POST

  constructor(
    private appService:AppService
  ) {}

  /**
   * @author GR-06
   * @copyright [获取工单提醒]
   * @param     [param]
   * @return    [return]
   * @return    {Observable<any>}
   */
    public getNotify():Observable<any>{
      return this.appService.interfaceJudg('get',this.getNotifyURL)
  }

  /**
   * @author GR-06
   * @copyright [获取常见问题分类列表]
   * @param     [param]
   * @return    [return]
   * @return    {Observable<any>}
   */
  public getProblemCat():Observable<any>{
    return this.appService.interfaceJudg('get',this.getProblemCatURL);
  }

  /**
   * @author GR-06
   * @copyright [获取常见分类下的分类列表]
   * @param     [param]
   * @return    [return]
   * @return    {Observable<any>}
   */
  public getLastCat(obj:any):Observable<any>{
    return this.appService.interfaceJudg('get',this.getLastCatURL,obj);
  }

  /**
   * @author GR-06
   * @copyright [获取分类下问题列表]
   * @param     [param]
   * @return    [return]
   * @return    {Observable<any>}
   */
    public getIssueList(obj:any):Observable<any>{
      return this.appService.interfaceJudg('get',this.getissueListURL,obj);
  }

  /**
   * @author GR-06
   * @copyright [添加工单]
   * @param     [param]
   * @return    [return]
   * @return    {Observable<any>}
   */
    public postGongdan(obj:any):Observable<any>{
      return this.appService.interfaceJudg('post',this.postGongdanURL,obj);
  }

  /**
   * @author GR-06
   * @copyright [搜索列表]
   * @param     [param]
   * @return    [return]
   * @return    {Observable<any>}
   */
  public getSearchList(obj:any):Observable<any>{
    return this.appService.interfaceJudg('get',this.getSearchListURL,obj);
  }

  /**
   * @author GR-06
   * @copyright [工单详情]
   * @param     [param]
   * @return    [return]
   * @return    {Observable<any>}
   */
  public getGongdanDetail(obj:any):Observable<any>{
    return this.appService.interfaceJudg('get',this.getGongdanDetailURL,obj);
  }

  /**
   * @author GR-06
   * @copyright [获取我的工单]
   * @param     [param]
   * @return    [return]
   * @return    {Observable<any>}
   */
  public postGongdanList(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postGongdanListURL,obj);
  }
}
