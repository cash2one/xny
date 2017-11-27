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
export class GrMenuListService implements Resolve<any>{

  // 请求地址
  private httpURL = new HttpHeadData().SAASURL;
  private getAdminMenuURL = this.httpURL + "api/admin/menu/menu"; // GET
  private getMenuTreeURL = this.httpURL + "api/admin/menu/tree";//GET
  private getMenuTreeTabURL = this.httpURL + "api/admin/menu/tabTree";//GET

  private getMenuListURL = this.httpURL + "api/admin/menu/list";
  private getAppcenterURL = this.httpURL + "api/admin/app/appcenter";
  private getMenuInfoURL = this.httpURL + "api/admin/menu/info"
  
  private postAddMenuURL = this.httpURL + "api/admin/menu/add";//POST
  private postDelMenuURL = this.httpURL + "api/admin/menu/del";//POST
  private postEditMenuURL = this.httpURL + "api/admin/menu/edit";//POST
  private postMenuTabListURL = this.httpURL + "api/admin/menu/tab_list";//POST
  private postMenuSortListURL = this.httpURL + "api/admin/menu/sort";//POST

  //全局菜单列表（用于在其他子组件获取到if_left为1的菜单数据）
  public AllMenuListData:any = {
    data:[]
  };

  // 选中的团队标签名字
  public selectTeamData:any = {
    isShow:false,
    data:[]
  };

  public defineSelectTeamData(e:boolean,data:Array<any>):void{

    Object.defineProperty(this.selectTeamData,'isShow',{
      get:()=>e,
      set:value=>{value=e}
    })
    Object.defineProperty(this.selectTeamData,'data',{
      get:()=>data,
      set:value=>{value=data}
    })

  }
 


  constructor(
    private http:Http,
    private appService:AppService
  ) { }

  //根据路由获取对应的菜单数据
  public FnActiveRouterMenu(_url:string):any{
      let menu = {};
      let MenuListData = this.AllMenuListData.data?this.AllMenuListData.data:[];
      let url = _url;
      if(MenuListData.length>0){
        MenuListData.forEach((result,number)=>{
          MenuListData[number]['chilren'].map(e=>{
            if(e['path'].match(url)!=null){
              menu = e;
              return;
            }
            else if(e['chilren'].length>0){
              e['chilren'].map(el=>{
                if(el['path'].match(url)!=null){
                  menu = el;
                  return;
                }
              })
            }
          })     
        })

      }
      else {
        menu = {}
      }

      return menu;
      
  }


  /*
  *
  *获取左侧菜单列表的方法
  *
  *
  */
  public getAdminMenu(model:string='Admin',cid:string='0'):Observable<any>{
    let params:URLSearchParams = new URLSearchParams()
    params.set('model',model);
    params.set('cid',cid);
    return this.http.get(this.getAdminMenuURL,{search:params})
                    .map(res=>{
                      let body = res.json();
                      this.AllMenuListData.data = body.data;
                      return body || [];
                    })
                    .catch(this.handleError)
  }

  /*
  *
  *新建菜单选择菜单的树状接口
  *
  *
  */
  public getMenuTree(model:string='Admin',cid:string='0',type:string='1'):Observable<any>{
    let params:URLSearchParams = new URLSearchParams()
    params.set('model',model);
    params.set('cid',cid);
    params.set('type',type);

    return this.http.get(this.getMenuTreeURL,{search:params})
            .map(this.extractData)
            .catch(this.handleError)
  }


  public getMenuTabTree(model:string='Admin',cid:string='0'):Observable<any>{
    let params:URLSearchParams = new URLSearchParams()
    params.set('model',model);
    params.set('cid',cid);

    return this.http.get(this.getMenuTreeTabURL,{search:params})
            .map(this.extractData)
            .catch(this.handleError)
  }


  /*
  *
  *菜单列表同级的接口
  *
  *
  */
  public getMenuList(data:any):Observable<any>{
    return this.appService.interfaceJudg('get',this.getMenuListURL,data)
  }

  /**
   * 获取菜单详情
   * @param id 
   */
  public getMenuInfo(id:number):Observable<any>{
    return this.appService.interfaceJudg('get',this.getMenuInfoURL,{
      id:id
    })
  }

  /**
   * 排序
   * @param obj 
   * id   菜单id
   * sort  排序
   */
  public postMenuSort(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postMenuSortListURL,obj)
  }

  /*
  *
  *应用列表的接口
  *
  *
  */
  public getAppcenter():Observable<any>{
    return this.appService.interfaceJudg('get',this.getAppcenterURL)
  }

  /*
  *
  *添加菜单的方法
  *
  *
  */
  public postAddMenu(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postAddMenuURL,obj)
  }

  /*
  *
  *删除菜单的方法
  *
  *
  */
  public postDelMenu(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postDelMenuURL,obj)
  }


  /*
  *
  *修改菜单的方法
  *
  *
  */
  public postEditMenu(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postEditMenuURL,obj)
  }


  /*
  *
  *选项卡列表的接口
  *
  *
  */
  public postMenuTabList(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postMenuTabListURL,obj)
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
          return this.http.get(this.getAdminMenuURL)
                      .toPromise()
                      .then(res=>{
                        return res
                      })
                      .catch(this.handleError)
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
    return Observable.throw(errMsg);
  }

}
