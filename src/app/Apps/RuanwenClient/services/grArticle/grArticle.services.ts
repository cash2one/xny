import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AppService }      from '../../../../app.service'

import { HttpHeadData }    from '../../../../HttpURL'

@Injectable()
export class GrArticleServices {

  // 请求地址
  private httpURL = new HttpHeadData().SAASURL;

  private getArticleListURL = this.httpURL + "api/ruanwen/article/list"; // 获取文章列表
  private getArticleInfoURL = this.httpURL + "api/ruanwen/article/info"; // 获取文章详情

  private postArticleAddURL = this.httpURL + "api/ruanwen/article/add"; // 添加文章草稿
  private postArticleEditURL = this.httpURL + "api/ruanwen/article/edit"; // 文章编辑
  private postArticleDelURL = this.httpURL + "api/ruanwen/article/del"; // 删除文章
  private postArticleOperateURL = this.httpURL + "api/ruanwen/article/operate"; // 添加和修改文章
  private postArticleDraftURL = this.httpURL + "api/ruanwen/article/article_draft"; // 草稿文章列表

  constructor(
    private appService:AppService
  ) { }

  /**
   * @author GR-03
   * @copyright name:检索字段
   * @param     [param]
   * @return    [return]
   * @param     {any}             obj [description]
   * @return    {Observable<any>}     [description]
   */
  public getArticleList(obj:any):Observable<any>{
    return this.appService.interfaceJudg('get',this.getArticleListURL,obj)
  }


  public getArticleInfo(obj:any):Observable<any>{
    return this.appService.interfaceJudg('get',this.getArticleInfoURL,obj)
  }


  /**
   * @author GR-03
   * @copyright title:文章标题,  content:文章内容
   * @param     [param]
   * @return    [return]
   * @param     {any}             obj [description]
   * @return    {Observable<any>}     [description]
   */
  public postArticleAdd(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postArticleAddURL,obj)
  }


  /**
   * @author GR-03
   * @copyright id:文章id ,   title:文章标题,  content:文章内容
   * @param     [param]
   * @return    [return]
   * @param     {any}             obj [description]
   * @return    {Observable<any>}     [description]
   */
  public postArticleEdit(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postArticleEditURL,obj)
  }


  /**
   * @author GR-03
   * @copyright id: 文章id
   * @param     [param]
   * @return    [return]
   * @param     {any}             obj [description]
   * @return    {Observable<any>}     [description]
   */
  public postArticleDel(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postArticleDelURL,obj)
  }

  /**
   * @author GR-03
   * @copyright id: 0为添加   修改的话传递相应的id 
   *            title:文章标题
   *            content:文章内容
   * 
   * @param     [param]
   * @return    [return]
   * @param     {any}             obj [description]
   * @return    {Observable<any>}     [description]
   */
  public postArticleOperate(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postArticleOperateURL,obj)
  }

  public postArticleDraft(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postArticleDraftURL,obj)
  }


}
