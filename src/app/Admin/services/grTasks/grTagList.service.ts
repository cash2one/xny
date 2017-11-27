import { Injectable } from '@angular/core';
import { Http, Response ,Headers,RequestOptions}          from '@angular/http';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,RouterStateSnapshot }  from '@angular/router';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { HttpHeadData }		from '../../../HttpURL'

@Injectable()
export class GrTagListService implements Resolve<any>{

  // 请求地址
  private httpURL = new HttpHeadData().SAASURL;
  private getTagListURL = this.httpURL + "api/admin/task/tag"; // GET     任务标签列表
  private getTagDelURL = this.httpURL + "api/admin/task/tag_del"; // GET     任务标签删除
  private getTagAddURL = this.httpURL + "api/admin/task/tag_add"; // GET     任务标签添加
  private getTagEditURL = this.httpURL + "api/admin/task/tag_edit"; // GET     任务标签删除




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
  *获取任务标签列表
  */
  public getTagList(obj:any):Observable<any>{

      let dataArrKeys:Array<string> = Object.keys(obj);
      let argStr:string ='?';
      for(let value of dataArrKeys){
        argStr += `${value}=${obj[value]}&`;
      }

    return this.http.get(this.getTagListURL+argStr)
            .map(this.extractData)
            .catch(this.handleError)
  }



  /*
  *添加任务标签
  */
  public postAddTag(obj:any):Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.getTagAddURL,obj, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }


  /*
  *修改任务标签
  */
  public postEditTag(obj:any):Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.getTagEditURL,obj, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }


  /*
  *删除任务标签
  */
  public getTagDel(obj:any):Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.getTagDelURL,obj, options)
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
