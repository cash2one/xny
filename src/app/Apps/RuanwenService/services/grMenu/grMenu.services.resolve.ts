import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response ,Headers,RequestOptions,URLSearchParams}          from '@angular/http';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,RouterStateSnapshot }  from '@angular/router';

import { AppService }      from '../../../../app.service'

import { HttpHeadData }    from '../../../../HttpURL'

@Injectable()
export class GrMenuServicesResolve implements Resolve<any>{

  // 请求地址
  private httpURL = new HttpHeadData().SAASURL;

  private getAppMenuURL = this.httpURL + "api/app/menu"; // 获取菜单

  constructor(
  	private http:Http,
    private appService:AppService
  ) { }

  /**
   * @author GR-03
   * @copyright [resolve路由守卫，获取菜单]
   * @param     [param]
   * @return    [return]
   * @check     GR-05                    GR-03
   * @param     {ActivatedRouteSnapshot}
   * @param     {RouterStateSnapshot}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.http.get(this.getAppMenuURL+'?model=RuanwenService')
                .toPromise()
                .then(res=>{
                  return res
                })
                .catch(res => this.appService.handleError(res))
  }


}
 