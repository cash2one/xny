import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { AppService }      from '../../../app.service'

import { HttpHeadData }    from '../../../HttpURL'

@Injectable()
export class GrAppsService {

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

  private getAppListURL = this.httpURL + "api/console/app/app_list"; // 应用列表
  private getAppInfoURL = this.httpURL + "api/console/app/info"; // 应用详情
  private getAppTabListURL = this.httpURL + "api/app/menu"; // 点击应用的选项卡列表
  private getAppMyAppURL = this.httpURL + "api/console/app/my_app"; // 我的应用列表
  private getAppUserListURL = this.httpURL + "api/console/app/user_list"; // 应用成员列表

  private postAppOpenURL = this.httpURL + "api/console/app/open"; // 给企业开通应用
  private postAppUserAddURL = this.httpURL + "api/console/app/user_add"; // 添加应用成员
  private postAppUserDelURL = this.httpURL + "api/console/app/user_del"; // 删除应用成员


  constructor(
    private appService:AppService
  ) { 

    this.getModel().subscribe(res=>{
      this.modelRole = res
    })

  }

  public getAppList(obj:any):Observable<any>{
    return this.appService.interfaceJudg('get',this.getAppListURL,obj)
  }

  public getAppInfo(obj:any):Observable<any>{
    return this.appService.interfaceJudg('get',this.getAppInfoURL,obj)
  } 

  public getAppTabList(obj:any):Observable<any>{
    return this.appService.interfaceJudg('get',this.getAppTabListURL,obj)
  } 

  public getAppMyApp(obj:any):Observable<any>{
    return this.appService.interfaceJudg('get',this.getAppMyAppURL,obj)
  } 

  public getAppUserList(obj:any):Observable<any>{
    console.log(this.modelRole)
    return this.appService.interfaceJudg('get',this.modelRole=='Console'?this.getAppUserListURL:this.getAppUserListURL+`/${this.modelRole}`,obj)
  } 

  public postAppOpen(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postAppOpenURL,obj)
  } 

  public postAppUserAdd(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postAppUserAddURL+`/${this.modelRole}`,obj)
  } 

  public postAppUserDel(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postAppUserDelURL+`/${this.modelRole}`,obj)
  } 


}
