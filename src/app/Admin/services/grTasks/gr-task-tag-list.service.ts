import { Injectable } from '@angular/core';
import { Http, Response ,Headers,RequestOptions}          from '@angular/http';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,RouterStateSnapshot }  from '@angular/router';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { HttpHeadData }		from '../../../HttpURL'

@Injectable()
export class GrTaskTagListService {

	// 请求地址
	private httpURL = new HttpHeadData().SAASURL;
	private getTasksTagAddURL = this.httpURL + "api/admin/task/tem_add"; // GET  任务列表添加
  	private getTasksTagEditURL = this.httpURL + "api/admin/task/tem_edit"; // POST     任务列表修改
  	private getTasksTagDelURL = this.httpURL + "api/admin/task/tem_del"; // POST     任务列表删除
  	private getTasksAddURL = this.httpURL + "api/admin/task/temlist_add"; // POST     列表任务添加
  	private getTasksEditURL = this.httpURL + "api/admin/task/temlist_edit"; // POST   列表任务修改
  	private getTasksDelURL = this.httpURL + "api/admin/task/temlist_del"; // POST     列表任务删除

	constructor(private http:Http) { }



 /*
  *
  *添加任务列表
  *
  *
  */
  public postAddTaskTag(obj:any):Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.getTasksTagAddURL,obj, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }


  /*
  *
  *删除任务列表
  *
  *
  */
  public postDeleteTaskTag(obj:any):Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.getTasksTagDelURL,obj, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }



 /*
  *
  *修改任务列表
  *
  *
  */
  public postTaskEditTag(obj:any):Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.getTasksTagEditURL,obj, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }	


	/*
	*添加列表任务
	*/
	public postTemListAdd(obj:any):Observable<any>{
	    let headers = new Headers({ 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: headers });
	    return this.http.post(this.getTasksAddURL,obj, options)
	                    .map(this.extractData)
	                    .catch(this.handleError);
    }	


	/*
	*修改列表任务
	*/
	public postTemListEdit(obj:any):Observable<any>{
	    let headers = new Headers({ 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: headers });
	    return this.http.post(this.getTasksEditURL,obj, options)
	                    .map(this.extractData)
	                    .catch(this.handleError);
    }


	/*
	*删除列表任务
	*/
	public postTemListDel(obj:any):Observable<any>{
	    let headers = new Headers({ 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: headers });
	    return this.http.post(this.getTasksDelURL,obj, options)
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
