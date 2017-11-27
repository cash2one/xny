import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Http, Response ,Headers,RequestOptions,URLSearchParams}          from '@angular/http'
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,RouterStateSnapshot }  from '@angular/router'

import 'rxjs/add/operator/toPromise'
import 'rxjs/add/operator/catch'

import { AppService }      from '../../app.service'

import { HttpHeadData }    from '../../HttpURL'

@Injectable()
export class GrUeditorService{

  // 请求地址
  private httpURL = new HttpHeadData().SAASURL

  private postUeditorURL = this.httpURL + "ueditor" // 编辑器公用上传接口

  constructor(
    private appService:AppService
  ) { }

  /**
   * @author GR-03
   * @copyright 获取应用基本信息
   * @param     
   * action:string   上传的类型 图片 uploadimage 文件 uploadfile
   * module:string   应用model
   * @return    [return]
   * @param     {any}             obj [description]
   * @return    {Observable<any>}     [description]
   */
  public postUeditor(obj:any): Observable<any> {
      return this.appService.interfaceJudg('post', this.postUeditorURL,obj)
  }

}
