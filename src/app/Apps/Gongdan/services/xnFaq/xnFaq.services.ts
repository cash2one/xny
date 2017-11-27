import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AppService }      from '../../../../app.service'

import { HttpHeadData }    from '../../../../HttpURL'

@Injectable()
export class XnFaqServices {

  // 请求地址
  private httpURL = new HttpHeadData().SAASURL;

  private getProblemcateListURL = this.httpURL + "api/gongdan/service/problemcate/list"; // 分类列表
  private getProblemListURL = this.httpURL + "api/gongdan/service/problem/list"; // 常见问题列表
  private getProblemInfoURL = this.httpURL + "api/gongdan/service/problem/info"; // 常见问题详情

  private postProblemcateAddURL = this.httpURL + "api/gongdan/service/problemcate/add"; // 添加分类
  private postProblemcateEditURL = this.httpURL + "api/gongdan/service/problemcate/edit"; // 修改分类
  private postProblemcateDelURL = this.httpURL + "api/gongdan/service/problemcate/del"; // 删除分类

  private postProblemAddURL = this.httpURL + "api/gongdan/service/problem/add"; // 添加常见问题
  private postProblemEditURL = this.httpURL + "api/gongdan/service/problem/edit"; // 编辑常见问题
  private postProblemDelURL = this.httpURL + "api/gongdan/service/problem/del"; // 删除常见问题

  private postProblemHelpListURL = this.httpURL + "api/gongdan/service/problem/help_list"; // 帮助文档列表
  private postProblemSortURL = this.httpURL + "api/gongdan/service/problem/sort"; // 常见问题排序

  constructor(
    private appService:AppService
  ) { }

  public getProblemcateList(): Observable<any>{
    return this.appService.interfaceJudg('get',this.getProblemcateListURL)
  }

  public getProblemList( obj: any ): Observable<any>{
    return this.appService.interfaceJudg('get',this.getProblemListURL,obj)
  }

  public getProblemInfo( obj: any = {} ): Observable<any>{
    return this.appService.interfaceJudg('get',this.getProblemInfoURL,obj)
  }

  public postProblemcateAdd( obj: any ): Observable<any>{
    return this.appService.interfaceJudg('post',this.postProblemcateAddURL,obj)
  }

  public postProblemcateEdit( obj: any ): Observable<any>{
    return this.appService.interfaceJudg('post',this.postProblemcateEditURL,obj)
  }

  public postProblemcateDel( obj: any ): Observable<any>{
    return this.appService.interfaceJudg('post',this.postProblemcateDelURL,obj)
  }

  public postProblemAdd( obj: any ): Observable<any>{
    return this.appService.interfaceJudg('post',this.postProblemAddURL,obj)
  }

  public postProblemEdit( obj: any ): Observable<any>{
    return this.appService.interfaceJudg('post',this.postProblemEditURL,obj)
  }

  public postProblemDel( obj: any ): Observable<any>{
    return this.appService.interfaceJudg('post',this.postProblemDelURL,obj)
  }

  public postProblemHelpList( obj: any = {} ): Observable<any>{
    return this.appService.interfaceJudg('post',this.postProblemHelpListURL,obj)
  }

  public postProblemSort( obj: any ): Observable<any>{
    return this.appService.interfaceJudg('post',this.postProblemSortURL,obj)
  }

}
