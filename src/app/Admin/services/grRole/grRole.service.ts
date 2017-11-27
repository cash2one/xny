import { Injectable } from '@angular/core';
import { Http, Response ,Headers,RequestOptions,URLSearchParams}          from '@angular/http';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,RouterStateSnapshot }  from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { HttpHeadData }		from '../../../HttpURL'
import { AppService } from '../../../app.service'

@Injectable()
export class GrRoleService {

  // 请求地址
  private httpURL = new HttpHeadData().SAASURL;
  private getRoleListURL = this.httpURL + "api/admin/part/part_list"; // GET
  private getRoleNoListURL = this.httpURL + "api/admin/part/list"; // GET
  private getRoleInfoURL = this.httpURL + "api/admin/part/part_info"; // GET
  private getRoleUserIdURL = this.httpURL + "api/admin/user/user_id"; // GET
  private getRoleUserListURL = this.httpURL + "api/admin/part/user_list" //GET
  private getRoleAuthTreeURL = this.httpURL + "api/admin/menu/tabTree" //GET

  private postRoleDeleteURL = this.httpURL + "api/admin/part/part_del"; //POST
  private postRoleAddURL = this.httpURL + "api/admin/part/part_add"; //POST
  private postRoleEditURL = this.httpURL + "api/admin/part/part_edit"; //POST
  private postRolePowerSetURL = this.httpURL + "api/admin/part/power_set"; //POST
  private postRolePartuserAddURL = this.httpURL + "api/admin/part/partuser_add"; //POST
  private postRolePartuserDelURL = this.httpURL + "api/admin/part/partuser_del"; //POST
  private postRolePartAddUserURL = this.httpURL + "api/admin/part/part_add_user"; //POST
  private postRoleAssignURL = this.httpURL + "api/admin/part/part_assign" //POST
  private postRoleExpUserURL = this.httpURL + "api/admin/part/unuser_list" //POST

  public RoleData:any = {
    symbol:'1',
    rules:[]
  }

  //添加用户的时候验证手机号出现未注册的情况下传递手机号姓名和职位信息到添加成员组件去
  public $RoleAddData:Observable<any>;

  public FnRoleAddDataRx(data:any={},id:string|number = 1):void{

    this.$RoleAddData = Observable.create(sub=>{
      sub.next({'data':data,'id':id})
    })

  }

 
  constructor(
  	private http:Http,
    private appService:AppService
  ) {

   }

  /*
  *
  *获取角色列表的接口方法
  * model     cid
  *
  */
  public getRoleList(obj:{
    model:string,
    cid:string | number
  }):Observable<any>{
    return this.appService.interfaceJudg('get',this.getRoleListURL,obj)
  }

  /**
   * 获取当前角色之外的成员列表
   * @param obj 
   * id   name  ...
   */
  public postRoleExpUser(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postRoleExpUserURL,obj)
  }

  /**
   * 获取角色下的成员
   * name model rows page id
   * id -1获取为设置角色成员
   */
  public getRoleUserList(obj:{
    name?:string,
    model:string,
    rows:number | string,
    page:number | string,
    id:number | string,
    cid:number | string
  }){
    return this.appService.interfaceJudg('get',this.getRoleUserListURL,obj)
  }

  /*
  *
  *获取角色列表的接口方法(无树状结构的)
  * model     cid
  *
  */
  public getRoleNoList(obj:{
    model:string,
    cid:number | string
  }):Observable<any>{
    return this.appService.interfaceJudg('get',this.getRoleNoListURL,obj)
  }

  /**
   * 获取角色权限列表
   */
  public getRoleAuthTree(obj:{
    model:string,
    cid:number | string
  }):Observable<any>{
    return this.appService.interfaceJudg('get',this.getRoleAuthTreeURL,obj)
  }

  /*
  *
  *获取角色详情的接口(可获取对应成员)
  *
  *
  */
  public getRoleInfo(obj:any):Observable<any>{
    let data = {
      id:obj.id,
      model:obj.model,
      cid:obj.cid
    }
    return this.appService.interfaceJudg('get',this.getRoleInfoURL,data)
  }


  /*
  *
  *根据手机号验证该用户是否有注册过
  *
  *
  */
  public getRoleUserId(tel:number|string,model:string='Admin',cid:string|number=0):Observable<any>{
    let params:URLSearchParams = new URLSearchParams()
    params.set('mobile',tel.toString());
    params.set('model',model);
    params.set('cid',cid.toString());
    return this.http.get(this.getRoleUserIdURL,{search:params})
            .map(this.extractData)
            .catch(this.handleError)
  }

  /*
  *
  *删除角色的方法
  *
  *
  */
  public postRoleDelete(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postRoleDeleteURL,obj)
  }

  /*
  *
  *添加角色的方法
  *
  *
  */
  public postRoleAdd(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postRoleAddURL,obj)
  }

  /**
   * 分配角色
   * ids 用户数组
   * roleids  角色数组
   * 
   */
  public postRoleAssign(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postRoleAssignURL,obj)
  }



  /*
  *
  *修改角色的方法
  *
  *
  */
  public postRoleEdit(obj:any):Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.postRoleEditURL,obj, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  /*
  *
  *修改功能权限的方法
  *
  *
  */
  public postRolePowerSet(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postRolePowerSetURL,obj)
  }


  /*
  *
  *添加角色成员的方法
  *
  *
  */
  public postRolePartuserAdd(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postRolePartuserAddURL,obj)
  }

 
  /*
  *
  *删除角色成员的方法
  *
  *
  */
  public postRolePartuserDel(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postRolePartuserDelURL,obj)
  }

  /*
  *
  *角色直接添加成员的接口
  *
  *
  */
  public postRolePartAddUser(obj:any):Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.postRolePartAddUserURL,obj, options)
                    .map(this.extractData)
                    .catch(this.handleError);
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
