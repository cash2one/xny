import { Injectable }                                               from '@angular/core';	
import { Observable }                                               from 'rxjs/Observable';
import { Subject }                                                  from 'rxjs/Subject';
import { Http, Headers, Response,  RequestOptions  }                from '@angular/http';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot }  from '@angular/router';

import { HttpHeadData }    from '../../HttpURL' 

import { AppService }    from '../../app.service'

@Injectable()
export class FindpwdService{

  private SAAShttpUrl   = new HttpHeadData().SAASURL

  private findpwdURl  = this.SAAShttpUrl + "token";          //找回密码手机验证          |POST
  private postSmssendURl  = this.SAAShttpUrl + "smssend";          //发送验证码          |POST
  private postResetURl  = this.SAAShttpUrl + "passwordreset";          //忘记密码          |POST
 
  constructor(
    private appService:AppService
    ) {

  }

  public findpwdToken(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.findpwdURl,obj)
  }


  public postSmssend(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postSmssendURl,obj)
  }

  public postReset(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postResetURl,obj)
  }

}
