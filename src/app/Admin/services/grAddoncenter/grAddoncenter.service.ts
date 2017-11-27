import { Injectable } from '@angular/core';
import { Http, Response ,Headers,RequestOptions,URLSearchParams}          from '@angular/http';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,RouterStateSnapshot }  from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { HttpHeadData }		from '../../../HttpURL'

@Injectable()
export class GrAddoncenterService{

  // 请求地址
  private httpURL = new HttpHeadData().SAASURL;
  private getAddoncenterURL = this.httpURL + "api/admin/addon/list"; // GET
  private getAddonAddURL = this.httpURL + "api/admin/addon/add"; // POST 添加
  private getAddonEditURL = this.httpURL + "api/admin/addon/edit"; // POST 修改
  private getAddonStatusURL = this.httpURL + "api/admin/addon/status"; // POST 修改状态
  private getAddonInfoURL = this.httpURL + "api/admin/addon/info"; // POST 修改状态

  constructor(
  	private http:Http
  ) { }


  /*
  *获取应用列表的接口
  */
  public getAddoncenter():Observable<any>{
    return this.http.get(this.getAddoncenterURL)
            .map(this.extractData)
            .catch(this.handleError)
  }



  /*
  *添加插件
  */
  public getAddonAdd(obj:any):Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.getAddonAddURL,obj, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }


  /*
  *修改插件
  */
  public getAddonEdit(obj:any):Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.getAddonEditURL,obj, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }


  /*
  *更改状态插件
  */
  public postAddonStatus(obj:any):Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.getAddonStatusURL,obj, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }




  /*
  *获取插件详细信息
  */
  public getAddonInfo(id:number):Observable<any>{
    let url = this.getAddonInfoURL+'?id='+id;
    return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError)
  }


  // public getceshi(obj:any):Observable<any>{
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });
  //   return this.http.post('https://api.mysubmail.com/mail/send.json',obj, options)
  //                   .map(this.extractData)
  //                   .catch(this.handleError);
  // }

  
  /*
  *
  *成功的回调方法
  *
  *
  */
  private extractData(res: Response) {
    let body = res.json();
    return body || [];
  }


  /*
  *
  *失败的回调方法
  *
  *
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
