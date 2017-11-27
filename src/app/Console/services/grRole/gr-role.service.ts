import { Injectable } from '@angular/core'
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable'

import { AppService }      from '../../../app.service'

import { HttpHeadData }    from '../../../HttpURL'

@Injectable()
export class GrRoleService {

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
  private httpURL = new HttpHeadData().SAASURL
  private getRolePartListURL = this.httpURL + "api/console/part/part_list" // GET
  private getRolePartInfoURL = this.httpURL + "api/console/part/part_info" // GET
  private getRolePartTabTreeURL = this.httpURL + "api/console/part/tabTree" // GET
  
  private postRolePartUserListURL = this.httpURL + "api/console/part/user_list" // POST
  private postRolePartUnUserListURL = this.httpURL + "api/console/part/unuser_list" // 未设置角色的成员列表
  private postRolePartAddURL = this.httpURL + "api/console/part/part_add" // POST
  private postRolePartEditURL = this.httpURL + "api/console/part/part_edit" // POST
  private postRolePartDelURL = this.httpURL + "api/console/part/part_del" // POST
  private postRolePartUserAddURL = this.httpURL + "api/console/part/partuser_add" // POST
  private postRolePartUserDelURL = this.httpURL + "api/console/part/partuser_del" // POST
  private postRolePartListURL = this.httpURL + "api/console/part/list" // 角色平级列表
  private postRolePartSortURL = this.httpURL + "api/console/part/sort" // 角色排序接口
  private postRolePartPowerSetURL = this.httpURL + "api/console/part/power_set" // 权限设置

  constructor(
  	private appService:AppService
  ) {

    this.getModel().subscribe(res=>{
      this.modelRole = res
    })

  }

  /**
   * @author GR-03
   * @copyright 获取角色列表的接口
   * @param     [param]
   * @return    [return]
   * @param     {this.modelRole  }}          obj [description]
   * @return    {Observable<any>}    [description]
   */
  public getRolePartList(obj:any = {
    'model':this.modelRole
  }):Observable<any>{
    return this.appService.interfaceJudg('get',this.getRolePartListURL+`/${this.modelRole}`,obj)
  }


  /**
   * @author GR-03
   * @copyright 获取角色详情的接口
   * @param     [param]
   * @return    [return]
   * @param     {string|number}         id    [description]
   * @param     {string=this.modelRole} model [description]
   * @return    {Observable<any>}             [description]
   */
  public getRolePartInfo(id:string|number,model:string=this.modelRole):Observable<any>{
    return this.appService.interfaceJudg('get',this.getRolePartInfoURL+`/${this.modelRole}`,{
      'id':id,
      'model':model
    })
  }


  /**
   * @author GR-03
   * @copyright 获取角色树的接口
   * @param     [param]
   * @return    [return]
   * @param     {this.modelRole  }}          obj [description]
   * @return    {Observable<any>}    [description]
   */
  public getRolePartTabTree(obj:any = {
    'model':this.modelRole
  }):Observable<any>{
    return this.appService.interfaceJudg('get',this.getRolePartTabTreeURL+`/${this.modelRole}`,obj)
  }

  /**
   * @author GR-03
   * @copyright 获取角色成员列表的接口
   * @param     [param]
   * @return    [return]
   * @param     {any}             obj [description]
   * @return    {Observable<any>}     [description]
   */
  public postRolePartUserList(obj:any):Observable<any>{
    let _obj = {
      ...obj,
      'model':this.modelRole
    }
    return this.appService.interfaceJudg('post',this.postRolePartUserListURL+`/${this.modelRole}`,_obj)
  } 



  /**
   * @author GR-03
   * @copyright 添加角色的接口
   * @param     [param]
   * @return    [return]
   * @param     {any}             obj [description]
   * @return    {Observable<any>}     [description]
   */
  public postRolePartAdd(obj:any):Observable<any>{
    let _obj = {
      ...obj,
      'model':this.modelRole
    }
    return this.appService.interfaceJudg('post',this.postRolePartAddURL+`/${this.modelRole}`,_obj)
  } 

  /**
   * @author GR-03
   * @copyright 修改角色的接口
   * @param     [param]
   * @return    [return]
   * @param     {any}             obj [description]
   * @return    {Observable<any>}     [description]
   */
  public postRolePartEdit(obj:any):Observable<any>{
    let _obj = {
      ...obj,
      'model':this.modelRole
    }
    return this.appService.interfaceJudg('post',this.postRolePartEditURL+`/${this.modelRole}`,_obj)
  } 

  /**
   * @author GR-03
   * @copyright 删除角色的接口
   * @param     [param]
   * @return    [return]
   * @param     {any}             obj [description]
   * @return    {Observable<any>}     [description]
   */
  public postRolePartDel(obj:any):Observable<any>{
    let _obj = {
      ...obj,
      'model':this.modelRole
    }
    return this.appService.interfaceJudg('post',this.postRolePartDelURL+`/${this.modelRole}`,_obj)
  } 


  /**
   * @author GR-03
   * @copyright 添加角色成员的接口
   * @param     [param]
   * @return    [return]
   * @param     {any}             obj [description]
   * @return    {Observable<any>}     [description]
   */
  public postRolePartUserAdd(obj:any):Observable<any>{
    let _obj = {
      ...obj,
      'model':this.modelRole
    }
    return this.appService.interfaceJudg('post',this.postRolePartUserAddURL+`/${this.modelRole}`,_obj)
  } 


  /**
   * @author GR-03
   * @copyright 删除角色成员的接口
   * @param     [param]
   * @return    [return]
   * @param     {any}             obj [description]
   * @return    {Observable<any>}     [description]
   */
  public postRolePartUserDel(obj:any):Observable<any>{
    let _obj = {
      ...obj,
      'model':this.modelRole
    }
    return this.appService.interfaceJudg('post',this.postRolePartUserDelURL+`/${this.modelRole}`,_obj)
  } 

  /**
   * @author GR-03
   * @copyright 获取角色平级列表的接口
   * @param     [param]
   * @return    [return]
   * @param     {any}             obj [description]
   * @return    {Observable<any>}     [description]
   */
  public postRolePartList(obj:any):Observable<any>{
    let _obj = {
      ...obj,
      'type':'list',
      'model':this.modelRole
    }
    return this.appService.interfaceJudg('post',this.postRolePartListURL+`/${this.modelRole}`,_obj)
  }  


  /**
   * @author GR-03
   * @copyright 获取该角色未设置角色的成员列表
   * @param     [param]
   * @return    [return]
   * @check     GR-05             GR-03
   * @param     {any}             obj   [description]
   * @return    {Observable<any>}       [description]
   */
  public postRolePartUnUserList(obj:any):Observable<any>{
    let _obj = {
      ...obj,
      'model':this.modelRole
    }
    return this.appService.interfaceJudg('post',this.postRolePartUnUserListURL+`/${this.modelRole}`,_obj)
  }

  /**
   * @author GR-03
   * @copyright 角色排序的接口方法
   * @param     [param]
   * @return    [return]
   * @check     GR-05             GR-03
   * @param     {any}             obj   [description]
   * @return    {Observable<any>}       [description]
   */
  public postRolePartSort(obj:any):Observable<any>{
    let _obj = {
      ...obj,
      'model':this.modelRole
    }
    return this.appService.interfaceJudg('post',this.postRolePartSortURL+`/${this.modelRole}`,_obj)
  }
   

  /**
   * @author GR-03
   * @copyright 权限设置的接口方法
   * @param     [param]
   * @return    [return]
   * @check     GR-05             GR-03
   * @param     {any}             obj   [description]
   * @return    {Observable<any>}       [description]
   */
  public postRolePartPowerSet(obj:any):Observable<any>{
    let _obj = {
      ...obj,
      'model':this.modelRole
    }
    return this.appService.interfaceJudg('post',this.postRolePartPowerSetURL+`/${this.modelRole}`,_obj)
  }

}
