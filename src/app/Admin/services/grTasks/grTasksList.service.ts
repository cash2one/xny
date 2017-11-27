import { Injectable } from '@angular/core';
import { Http, Response ,Headers,RequestOptions}          from '@angular/http';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,RouterStateSnapshot }  from '@angular/router';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { HttpHeadData }		from '../../../HttpURL'

@Injectable()
export class GrTasksListService implements Resolve<any>{

  // 请求地址
  private httpURL = new HttpHeadData().SAASURL;
  private getTasksListURL = this.httpURL + "api/admin/task/temcat"; // GET  任务模板列表
  private getTasksAddURL = this.httpURL + "api/admin/task/temcat_add"; // POST     任务模板添加
  private getTasksDelURL = this.httpURL + "api/admin/task/temcat_del"; // POST     任务模板添加
  private getTasksEditURL = this.httpURL + "api/admin/task/temcat_edit"; // POST     任务模板修改
  private getTasksInfoURL = this.httpURL + "api/admin/task/temlist"; // POST     任务模板详情




  constructor(private http:Http) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    // return this.getAdminMenu().subscribe(result => {
    //       if(result) return result;
    //       else {
    //           return false;
    //       }
    //   })
  }


  /*
  *获取任务列表的方法
  */
  public getTasksList(obj:any):Observable<any>{
    let dataArrKeys:Array<string> = Object.keys(obj);
    let argStr:string ='?';
    for(let value of dataArrKeys){
      argStr += `${value}=${obj[value]}&`;
    }

    return this.http.get(this.getTasksListURL+argStr)
            .map(this.extractData)
            .catch(this.handleError)
  }



  /*
  *
  *添加菜单的方法
  *
  *
  */
  public postAddTask(obj:any):Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.getTasksAddURL,obj, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }


  /*
  *
  *删除任务模板
  *
  *
  */
  public postDeleteTask(obj:any):Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.getTasksDelURL,obj, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }



 /*
  *
  *修改任务模板
  *
  *
  */
  public postTaskEdit(obj:any):Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.getTasksEditURL,obj, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }


 /*
  *
  *获取任务模板详情
  *
  *
  */
  public postTaskInfo(obj:any):Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.getTasksInfoURL,obj, options)
                    .map(this.extractData)
                    .catch(this.handleError);

  }


  
  /*
  *成功的回调方法
  */
  private extractData(res: Response) {
    let body = res.json();
    return body || [];
  }


  /*
  *失败的回调方法
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
