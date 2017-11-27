import { Injectable }                                					       from '@angular/core';	
import { Subject }                                   from 'rxjs/Subject';
import { Http, Headers, Response,  RequestOptions  } from '@angular/http';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot }   from '@angular/router';

import { promptSmall }													                     from './promptSmall';
import { viewData }														                       from './viewData'

import { HttpHeadData }      from '../../HttpURL'

@Injectable()
export class PersonalService {

  public PromptSmall:promptSmall = new promptSmall();
  public ViewData	  :viewData    = new viewData();
  private TimeOut:any;

  //请求接口
  private httpURL        = new HttpHeadData().URL;
  private searchUsers    = this.httpURL + "/index.php?g=Member&m=User&a=search&page=1&q="  //检索用户-普通 | GET
  private departmentItem = this.httpURL + "/index.php?m=user&a=getUserByDepartment"        //部门列表      | GET

  constructor(
    private http:Http
    ) { }

  // 验证小弹窗提示 | 第三个参数是对象
  public showPromptSmall(_text:any,_class:string,_position:any={top:"0px",right:"10%"}):void{
    if(this.TimeOut) clearTimeout(this.TimeOut)
    Object.assign(this.PromptSmall,{TipClassName:_class,
                                    TipText:_text,
                                    TipPosition:_position})


    this.TimeOut = setTimeout(()=>{Object.assign(this.PromptSmall,{TipClassName:null,TipText:null})},2000)
    
  }

  // 弹窗视图数据
  public showViewData(name:string,bool:boolean):void{
  	this.ViewData.viewSwitch = name;
    this.ViewData.isShow     = bool;
  }

  // 检索用户-普通
  public getSearchUsersURL(value:string="",filter:number=1){
    return this.http
               .get(this.searchUsers+value+"&status="+filter)
               .toPromise()
               .then(response=>{
                 return response.json()
               })
               .catch(console.log.bind(console))
  }

  // 部门列表-用户列表
  public getDepartmentURL(){
    return this.http
               .get(this.departmentItem)
               .toPromise()
               .then(response=>{
                 return response.json()
               })
               .catch(console.log.bind(console))
  }


}
