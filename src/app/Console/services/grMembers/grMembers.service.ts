import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { AppService }      from '../../../app.service'

import { HttpHeadData }		from '../../../HttpURL'

@Injectable()
export class GrMembersService {

  private RXJS   = new Subject<string>();

  //传入数据
  public setModel(model: string) {
    this.RXJS.next(model);
  }
  public getModel():Observable<string>{
    return this.RXJS.asObservable()
  }

  private modelRole:string = 'Console'

 
  // 请求地址
  private httpURL = new HttpHeadData().SAASURL;

  private getMembersDepartmentURL = this.httpURL + "api/console/department"; // GET
  private getDepartmentNoAdminURL = this.httpURL + "api/console/department/no_admin"; // GET
  private getUserDisableURL = this.httpURL + "api/console/user/disable"; // GET
  private getDepartmentInfoURL = this.httpURL + "api/console/department/info"; // 部门详情
  private getDepartmentListURL = this.httpURL + "api/console/department/list"; // 部门结构无成员
  private getUserListURL = this.httpURL + "api/console/user"; // 企业成员列表
  private getUserNoDepartmentURL = this.httpURL + "api/console/user/no_department"; // 没有部门的员工
  private getUserSmscheckURL = this.httpURL + "api/console/user/smscheck"; // 邀请加入的验证码

  private postDepartmentAddURL = this.httpURL + "api/console/department/add"; // POST
  private postDepartmentEditURL = this.httpURL + "api/console/department/edit"; // POST
  private postDepartmentDelURL = this.httpURL + "api/console/department/del"; // POST
  private postDepartmentUserAddURL = this.httpURL + "api/console/department/user_add"; // POST
  private postUserDenyURL = this.httpURL + "api/console/user/deny"; // POST
  private postUserAddURL = this.httpURL + "api/console/user/add"; // POST
  private postUserSettingURL = this.httpURL + "api/console/user/setting"; // POST
  private postUserInfoURL = this.httpURL + "api/console/user/userinfo"; // POST
  private postUserPasswordURL = this.httpURL + "api/console/user/password"; // POST
  private postUserMobileURL = this.httpURL + "api/console/user/add"; // POST
  private postAdminMailRequestURL = this.httpURL + "api/console/user/add"; // POST
  private postUserSmsShareURL = this.httpURL + "api/console/user/add"; // POST
  private postPartAssignURL = this.httpURL + "api/console/part/partAssign"; // 分配角色
  private postUserDepartmentURL = this.httpURL + "api/console/user/department"; // 批量设置主属部门，附属部门，部门负责人，部门管理员和普通员工
  private postDepartmentListorderURL = this.httpURL + "api/console/department/listorder"; // 部门排序
  private postDepartmentStatusURL = this.httpURL + "api/console/department/status"; // 部门启用、禁用
  private postDepartmentUserDelURL = this.httpURL + "api/console/department/user_del"; // 移除部门成员
  private postNoConsoleUserURL = this.httpURL + "api/console/app/no_app"; // 非应用成员列表


  constructor(
    private appService:AppService
  ) {
    this.getModel().subscribe(res=>{
      this.modelRole = res
    })
  }

  /*
  *
  *获取部门树状结构的接口
  *
  *
  */
  public getMembersDepartment():Observable<any>{
    return this.appService.interfaceJudg('get',this.getMembersDepartmentURL)
  }

  /*
  *
  *获取没有负责人的部门的接口
  *
  *
  */
  public getDepartmentNoAdmin(obj:any={}):Observable<any>{
    return this.appService.interfaceJudg('get',this.getDepartmentNoAdminURL,obj)
  }


  /*
  *
  *获取已禁用成员的接口
  *
  *
  */
  public getUserDisable():Observable<any>{
    return this.appService.interfaceJudg('get',this.getUserDisableURL)
  }

  /*
  *
  *部门结构无成员的接口
  *
  *
  */
  public getDepartmentList():Observable<any>{
    return this.appService.interfaceJudg('get',this.getDepartmentListURL)
  }


  public getUserSmscheck(obj: any):Observable<any>{
    return this.appService.interfaceJudg('get',this.getUserSmscheckURL,obj)
  }

  /**
   * @author GR-03
   * @copyright 部门详情接口
   * @param     [param]
   * @return    [return]
   * @check     GR-05             GR-03
   * @return    {Observable<any>}
   */
  public getDepartmentInfo(obj:any):Observable<any>{
    return this.appService.interfaceJudg('get',this.getDepartmentInfoURL,obj)
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
  public getUserList(obj:any):Observable<any>{
    return this.appService.interfaceJudg('get',this.modelRole=='Console'?this.getUserListURL:this.getUserListURL+`/${this.modelRole}`,obj)
  }

  /*
  *
  *没有部门的员工的接口
  *
  *
  */
  public getUserNoDepartment(obj:any):Observable<any>{
    return this.appService.interfaceJudg('get',this.getUserNoDepartmentURL,obj)
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
  *
  */
  public postDepartmentAdd(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postDepartmentAddURL,obj)
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
  *删除部门的接口
  *
  id  是  int  部门ID
  *
  */
  public postDepartmentDel(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postDepartmentDelURL,obj)
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


  /**
   * @author GR-03
   * @copyright 非应用成员的列表
   * @param     [param]
   * @return    [return]
   * @param     {any}             obj [description]
   * @return    {Observable<any>}     [description]
   */
  public postNoConsoleUser(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.modelRole=='Console'?this.postNoConsoleUserURL:this.postNoConsoleUserURL+`/${this.modelRole}`,obj)
  }

  /*
  *
  *启用、禁用成员的接口
  *
  id      是  int  用户id
  status  是  int  是否启用 1:启用，2:禁用
  *
  */
  public postUserDeny(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postUserDenyURL,obj)
  }


  /*
  *
  *添加企业成员的接口
  *
  user_id        是  int  用户id
  status        否  int  1:正常，2:禁用
  real_name      是  string  姓名
  positionname  否  string  职务
  employeecode  否  string  员工编号
  department_id  否  array  部门id数组
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
    return this.appService.interfaceJudg('post',this.postUserSettingURL,obj)
  }


  /*
  *
  *帐户设置的接口
  *
  id  是  int  用户id
  *
  */
  public postUserInfo(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postUserInfoURL,obj)
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
    return this.appService.interfaceJudg('post',this.postUserPasswordURL,obj)
  }


  /*
  *
  *通过手机查找用户的接口
  *
  mobile  是  string  手机号
  *
  */
  public postUserMobile(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postUserMobileURL,obj)
  }


  /*
  *
  *通过邮箱邀请添加的接口
  *
  *
  */
  public postAdminMailRequest(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postAdminMailRequestURL,obj)
  }


 /*
  *
  *通过手机邀请的接口
  *
  *
  */
  public postUserSmsShare(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postUserSmsShareURL,obj)
  }

 /*
  *
  *分配角色的接口
  *
  *
  */
  public postPartAssign(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postPartAssignURL,obj)
  }

 /*
  *
  *批量设置部门的接口
  *
  *user_arr  是  array        用户id数组
  *department_arr  是  array  部门id数组
  *type  是  int              1：设置主属部门 2：设置副属部门 3：设置部门负责人 4：设置部门管理员 5：普通员工
  *
  *
  */
  public postUserDepartment(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postUserDepartmentURL,obj)
  }

  /**
   * @author GR-03
   * @copyright 部门排序接口
   * @param     ids  array  序号对应部门ID数组
   * @return    [return]
   * @check     GR-05             GR-03
   * @param     {any}
   * @return    {Observable<any>}
   */
  public postDepartmentListorder(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postDepartmentListorderURL,obj)
  }

  /**
   * @author GR-03
   * @copyright 部门启用、禁用接口
   * @param     id  是  string  部门id
                status  是  int  0禁用，1启用
   * @return    [return]
   * @check     GR-05             GR-03
   * @param     {any}
   * @return    {Observable<any>}
   */
  public postDepartmentStatus(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postDepartmentStatusURL,obj)
  }

  /**
   * @author GR-03
   * @copyright 移除部门成员
   * @param     [param]
   * @return    [return]
   * @param     {any}             obj [description]
   * @return    {Observable<any>}     [description]
   */
  public postDepartmentUserDel(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postDepartmentUserDelURL,obj)
  }

}
