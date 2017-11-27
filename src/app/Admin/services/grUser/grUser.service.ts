import { Injectable } from '@angular/core';
import { Http, Response ,Headers,RequestOptions,URLSearchParams }          from '@angular/http';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,RouterStateSnapshot }  from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { HttpHeadData }		from '../../../HttpURL'
import { AppService } from '../../../app.service'

@Injectable()
export class GrUserService {

  // 请求地址
  private httpURL = new HttpHeadData().SAASURL;
  private getUserListURL = this.httpURL + "api/admin/user/list"; // GET
  private getUserInfoURL = this.httpURL + "api/admin/user/info"; // get
  private postUserAddURL = this.httpURL + "api/admin/user/add"; // POST
  private postUserEditURL = this.httpURL + "api/admin/user/edit"; // POST
  private postUserStatusURL = this.httpURL + "api/admin/user/status"; // POST

  private getAdminUserListURL  = this.httpURL + "api/admin/user/admin_list" //GET
  private postAdminUserStatuURL = this.httpURL + "api/admin/user/status" //POST
  private postAdminUserInfoURL = this.httpURL + "api/admin/user/admin_info" //POST
  private postAdminUserAddURL = this.httpURL + "api/admin/user/admin_add" //POST


  //用户中心成员
  private getUserIndexURL = this.httpURL + "api/admin/user/indexs"; // get


  constructor(
  	private http:Http,
    private appService:AppService
  ) { }

  /*
  *
  *获取成员列表的接口方法
  * @params   name:名字
  * @params   rows:每页条数
  * @params   page:分页
  *
  */
  public getUserList(name:string='',rows:number|string=20,page:number|string=1):Observable<any>{
    let params:URLSearchParams = new URLSearchParams()
    params.set('name',name);
    params.set('rows',rows.toString());
    params.set('page',page.toString());
    return this.http.get(this.getUserListURL,{search:params})
            .map(this.extractData)
            .catch(this.handleError)
  }


  /*
  *
  *用户中心成员列表的接口
  *
  */
  public getUserIndex(obj?:any):Observable<any>{
    if(obj){
      return this.appService.interfaceJudg('get',this.getUserIndexURL,obj)
    }else{
      return this.appService.interfaceJudg('get',this.getUserIndexURL)
    }
  }



  /*
  *
  *添加员工的方法
  *
  *
  */
  public postUserAdd(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postUserAddURL,obj)
  }

  /*
  *
  *员工修改的方法
  *
  *
  */
  public postUserEdit(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postUserEditURL,obj)
  }

  /**
   * 选择添加后台成员
   *
   */
  public postUserAdminAdd(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postAdminUserAddURL,obj)
  }


  /*
  *
  *修改员工状态的方法
  *
  *
  */
  public postUserStatus(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postAdminUserStatuURL,obj)
  }


  /*
  *
  *获取成员详情的接口方法
  *
  */
  public getUserInfo(id:number|string):Observable<any>{
    return this.appService.interfaceJudg('get',this.getUserInfoURL,{
      id:id
    })
  }

  /**
   * 获取admin user列表
   * @param name
   * @param row
   * @param page
   */
  public getAdminUserList(obj:any):Observable<any>{
    if(obj){
      return this.appService.interfaceJudg('get',this.getAdminUserListURL,obj)
    }else{
      return this.appService.interfaceJudg('get',this.getAdminUserListURL)
    }
  }

  /**
   * 修改成员状态
   *
   */
  public postAdminUserStatu(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postAdminUserStatuURL,obj)
  }
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
