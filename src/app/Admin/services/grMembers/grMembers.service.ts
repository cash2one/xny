import { Injectable } from '@angular/core';
import { Http, Response ,Headers,RequestOptions,URLSearchParams}          from '@angular/http';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,RouterStateSnapshot }  from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { HttpHeadData }		from '../../../HttpURL'
import { AppService } from '../../../app.service'

@Injectable()
export class GrMembersService {

  // 请求地址
  private httpURL = new HttpHeadData().SAASURL;
  private getMembersDepartmentURL = this.httpURL + "api/admin/department"; // GET
  private getALLDepartmentURL = this.httpURL + "api/console/department/list" //GET
  private getDepartmentNoAdminURL = this.httpURL + "api/admin/department/no_admin"; // GET
  private getUserDisableURL = this.httpURL + "api/admin/user/disable"; // GET

  private postDepartmentAddURL = this.httpURL + "api/admin/department/add" //POST
  private postDepartmentInfoURL = this.httpURL + "api/admin/department/info" //POST
  private postDepartmentStatusURL = this.httpURL + "api/admin/department/status" //POST
  private postDepartmentDelURL  = this.httpURL + "api/admin/department/del"  //POST
  private postUserNoDepartmentURL = this.httpURL + "api/admin/user/no_department"; // POST
  private postDepartmentUserAddURL = this.httpURL + "api/admin/department/user_add" //POST
  private postUserStatusURL = this.httpURL + "api/admin/user/deny" //POST
  private postDepartantSetURL = this.httpURL + "api/admin/user/department" //POST
  private postDepartmentOrderURL = this.httpURL + "api/console/department/listorder" //POST
  private postUserByPhoneURL = this.httpURL + "api/admin/user/public_getuseridbymobile" //POST
  private postUserAddURL = this.httpURL + "api/admin/user/add_user" //POST

  private postDepartmentEditURL = this.httpURL + "api/console/department/edit"; // POST
  private postUserDenyURL = this.httpURL + "api/console/user/deny"; // POST
  private postUserListURL = this.httpURL + "api/admin/user"; // POST
  private postUserSettingURL = this.httpURL + "api/console/user/setting"; // POST
  private postUserInfoURL = this.httpURL + "api/console/user/userinfo"; // POST
  private postUserPasswordURL = this.httpURL + "api/console/user/password"; // POST
  private postUserMobileURL = this.httpURL + "api/console/user/user_id"; // POST
  private postUserDelURL = this.httpURL + "api/admin/department/user_del" //POST

  private postAppUserURL = this.httpURL + "api/admin/department/app_user"; // POST  获取应用下的成员列表
  private postAppUserAddURL = this.httpURL + "api/admin/app/add_user"
  private postAppUserDelURL = this.httpURL + "api/admin/app/user_del"

  private getNoAppUserURL = this.httpURL + "api/admin/department/no_app"


  constructor(
    private http:Http,
    private appService:AppService
  ) { }


  /**
   * 移除部门成员接口
   * 
   */
  public postMemberRemove(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postUserDelURL,obj)
  }

  /*
  *
  *获取部门树状结构的接口
  * cid  企业id
  *
  */
  public getMembersDepartment(obj:any):Observable<any>{
    return this.appService.interfaceJudg('get',this.getMembersDepartmentURL,obj)
  }

  /*
  *
  *获取没有负责人的部门的接口
  * cid 公司id
  *
  */
  public getDepartmentNoAdmin(obj:any):Observable<any>{
    return this.appService.interfaceJudg('get',this.getDepartmentNoAdminURL,obj)
  }

  /**
   * 获取没有分配应用的成员
   * appid
   * cid
   */
  public getNoAppUser(obj:any):Observable<any>{
    return this.appService.interfaceJudg('get',this.getNoAppUserURL,obj)
  }

  /**
   * 获取所有部门
   * cid 企业id 
   */
  public getAllDepartment(obj:any):Observable<any>{
    return this.appService.interfaceJudg('get',this.getALLDepartmentURL,obj)
  }


  /**
   * 批量设置部门
   * user_arr		用户id数组
   * department_arr		部门id数组
   * type		1：设置主属部门 2：设置副属部门 3：设置部门负责人 4：设置部门管理员 5：普通员工
   * cid	企业id
   */
  public postDepartmentSet(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postDepartantSetURL,obj)
  }


  /*
  *
  *添加部门的接口
  *
    name      是  string  部门名称
    parentid  否  int  父级部门ID
    status    是  bool  状态
    note      否  string  说明
    listorder 否  int  排序
    user_id   否  array  部门管理员ID数组
    cid  企业id
  *
  */
  public postDepartmentAdd(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postDepartmentAddURL,obj)
  } 

  /**
   * 获取部门详情
   *  cid 企业id    id  部门id
   */
  public postDepartmentInfo(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postDepartmentInfoURL,obj)
  }

  /**
   * 修改部门状态
   * cid 企业id     id 部门id     status 状态
   */
  public postDepartmentStatus(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postDepartmentStatusURL,obj)
  }

  /**
   * 部门排序
   * id  部门id
   * cid  企业id
   * listorder  排序
   */
  public postDepartmentOrder(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postDepartmentOrderURL,obj)
  }

  /**
   * 删除部门
   * cid 企业id    id 部门id
   */
  public postDepartmentDel(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postDepartmentDelURL,obj)
  }

  /**
   * 禁用启用成员
   * user_arr  用户id数组 
   * status  状态码  1 启用    2 禁用
   * cid  企业id
   */
  public postUserStatus(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postUserStatusURL,obj)
  }


  /*
  *
  *修改部门的接口
  *
  cid        是  int  公司ID
  name      是  string  部门名称
  parentid  否  int  父级部门ID
  status    是  bool  状态
  note      否  string  说明
  listorder  否  int  排序
  user_id    否  array  部门管理员ID数组
  *
  */
  public postDepartmentEdit(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postDepartmentEditURL,obj)
  }


  /*
  *
  *添加部门成员的接口
  *
  department_id  是  int  部门ID
  user_id        是  array  用户ID数组
  *
  */
  public postDepartmentUserAdd(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postDepartmentUserAddURL,obj)
  }



  /*
  *
  *获取该企业下的所有成员的接口
  *
  type              否  int  0：全部员工，1：部门管理员，2：正常员工，3：禁用员工，4：部门负责人
  name              否  string  姓名或员工编号
  department_id     否  int  部门id
  *
  */
  public postUserList(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postUserListURL,obj)
  }

  /**
   * 通过手机号获取用户id
   * mobile  手机号
   * cid  企业id
   */
  public postUserIdByPhone(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postUserByPhoneURL,obj)
  }



  /*
  *
  *添加企业成员的接口
  *
  *  user_id        是  int  用户id
  *  status        否  int  1:正常，2:禁用
  *  real_name      是  string  姓名
  *  positionname  否  string  职务
  *  employeecode  否  string  员工编号
  *  department_id  否  array  部门id数组
  *  cid 是 企业id
  *
  */
  public postUserAdd(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postUserAddURL,obj)
  }

  /*
  *
  *帐户设置的接口
  *
  id          是  int  用户id
  name        否  string  用户名
  real_name    否  string  姓名
  password    否  string  密码
  job          否  string  职务
  thumb          否  string  缩略图
  employeecode  否  string  员工编号
  *
  */
  public postUserSetting(obj:any):Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.postUserSettingURL,obj, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }


  /*
  *
  *帐户设置的接口
  *
  id  是  int  用户id
  *
  */
  public postUserInfo(obj:any):Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.postUserInfoURL,obj, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }


  /*
  *
  *帐户设置的接口
  *
  id              是  int  用户id
  old_password  是  string  原密码
  new_password  是  string  新密码
  *
  */
  public postUserPassword(obj:any):Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.postUserPasswordURL,obj, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }


  /*
  *
  *通过手机查找用户的接口
  *
  mobile  是  string  手机号
  *
  */
  public postUserMobile(obj:any):Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.postUserMobileURL,obj, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }


  /*
  *
  *没有部门的员工的接口
  * cid 企业id   department_id 部门id ...
  *
  */
  public postUserNoDepartment(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postUserNoDepartmentURL,obj)
  }



  /*
  * 获取应用对应的成员列表
    cid		公司id
    app_id		应用id
    name	检索字段
  */
  public postAppUserList(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postAppUserURL,obj)
  }

  /**
   * 添加应用成员
   * @param obj app_id	是	int	应用id
      user_ids	是	array	用户id数组
      cid	是	int	公司id
   */
  public postAppUserAdd(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postAppUserAddURL,obj)
  }

  /**
   * 移除应用成员
   * @param obj app_id	是	int	应用id
      user_ids	是	array	用户id数组
      cid	是	int	公司id
   */
  public postAppUserDel(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postAppUserDelURL,obj)
  }



  /*
  *
  *分配角色的接口
  *
  *
  */
  public postPartAssign(obj:any):Observable<any>{
    return null
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
