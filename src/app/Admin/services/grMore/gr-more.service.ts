import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {AppService} from "../../../app.service";
import {HttpHeadData} from "../../../HttpURL";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class GrMoreService {

  //请求地址
  private httpURL = new HttpHeadData().SAASURL;
  private getAppListURL = this.httpURL + "api/admin/more/list";   //GET
  private getOpenAppCompanyURL = this.httpURL + "api/admin/more/company_app";   //GET
  private getMenuContrastURL = this.httpURL + "api/admin/more/contrast";      //GET
  private postMenuDataURL = this.httpURL + "api/admin/more/save";       //POST

  constructor(
    private http:Http,
    private appService:AppService) { }

  /**
   *
   * 获取应用列表
   *
   */
  public getAppList(obj:any):Observable<any>{
    return this.appService.interfaceJudg('get',this.getAppListURL,obj);
  }

  /**
   *
   * 获取当前应用开启的公司列表
   *
   */
  public getOpenAppCompany(obj:any):Observable<any>{
    return this.appService.interfaceJudg('get',this.getOpenAppCompanyURL,obj);
  }

  /**
   *
   * 获取对比菜单
   *
   */
  public getMenuContrast(obj:any):Observable<any>{
    return this.appService.interfaceJudg('get',this.getMenuContrastURL,obj);
  }

  /**
   *
   * 保存菜单数据
   *
   */
  public postMenuData(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postMenuDataURL,obj);
  }
}
