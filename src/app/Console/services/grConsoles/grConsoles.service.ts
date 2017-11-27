import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response ,Headers,RequestOptions,URLSearchParams}          from '@angular/http';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,RouterStateSnapshot }  from '@angular/router';

import { RiccioNotificationsService }  from '../../../Public/riccio-notifications/riccio-notifications.service'

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

import { AppService }      from '../../../app.service'

import { HttpHeadData }    from '../../../HttpURL'

@Injectable()
export class  GrConsolesService implements Resolve<any>{

  // 请求地址
  private httpURL = new HttpHeadData().SAASURL;
  private getMenuListURL = this.httpURL + "api/console/menu/list"; // 菜单列表

  

  constructor(
  	private appService:AppService,
    private http:Http,
    private router:Router,
    private riccioNotificationsService:RiccioNotificationsService
  ) { }

  /**
   * @author GR-03
   * @copyright 获取菜单列表的接口
   * @param     [param]
   * @return    [return]
   * @check     GR-05             GR-03
   * @return    {Observable<any>}
   */
  public getMenuList():Observable<any>{
    return this.appService.interfaceJudg('get',this.getMenuListURL)
  }  

  /**
   * @author GR-03
   * @copyright [resolve路由守卫，只有请求到菜单后才可以进入企业控制台]
   * @param     [param]
   * @return    [return]
   * @check     GR-05                    GR-03
   * @param     {ActivatedRouteSnapshot}
   * @param     {RouterStateSnapshot}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.http.get(this.getMenuListURL)
                .toPromise()
                .then(res=>{
                  return res
                })
                .catch(res => this.appService.handleError(res))
  }


}
