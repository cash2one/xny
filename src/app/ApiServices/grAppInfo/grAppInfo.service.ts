import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Http, Response ,Headers,RequestOptions,URLSearchParams}          from '@angular/http'
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,RouterStateSnapshot }  from '@angular/router'

import 'rxjs/add/operator/toPromise'
import 'rxjs/add/operator/catch'

import { AppService }      from '../../app.service'

import { HttpHeadData }    from '../../HttpURL'

@Injectable()
export class GrAppInfoService{

  // 请求地址
  private httpURL = new HttpHeadData().SAASURL

  private postAppInfoURL = this.httpURL + "api/app/app_info" // 获取应用基本信息
  private postUeditorURL = this.httpURL + "ueditor" // 编辑器公用上传接口
  public postUploadURL = this.httpURL + "upload" // 公用上传接口

  constructor(
    private appService:AppService
  ) { }

  /**
   * @author GR-03
   * @copyright 获取应用基本信息
   * @param     
   * model:string   应用的model名称
   * @return    [return]
   * @param     {any}             obj [description]
   * @return    {Observable<any>}     [description]
   */
  public postAppInfo(obj:any): Observable<any> {
      return this.appService.interfaceJudg('post', this.postAppInfoURL,obj)
  }

  /**
   * @author GR-03
   * @copyright 百度富文本编辑器共用上传接口
   * @param     
   * action:string   //上传的类型 图片 uploadimage 文件 uploadfile
   * module:string    //应用的model
   * @return    [return]
   * @param     {any}             obj [description]
   * @return    {Observable<any>}     [description]
   */
  public postUeditor(obj:any): Observable<any> {
      return this.appService.interfaceJudg('post', this.postUeditorURL,obj)
  }

  /**
   * @author GR-03
   * @copyright 共用的上传接口
   * @param     
   * model:string   // 应用的模型
   * @return    [return]
   * @param     {any}             obj [description]
   * @return    {Observable<any>}     [description]
   */
  public postUpload(obj:any): Observable<any> {
      return this.appService.interfaceJudg('post', this.postUploadURL,obj)
  }
  

}
