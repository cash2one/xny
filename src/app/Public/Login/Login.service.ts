import { Injectable }                                               from '@angular/core';	
import { Observable }                                               from 'rxjs/Observable';
import { Subject }                                                  from 'rxjs/Subject';
import { Http, Headers, Response,  RequestOptions  }                from '@angular/http';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot }  from '@angular/router';

// 权限不足给弹窗提示
import { PersonalService }                                          from '../../Public/Personal/personal.service'

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { HttpHeadData }    from '../../HttpURL' 

import { AppService }    from '../../app.service'

@Injectable()
export class LoginService implements Resolve<any>{

  // private httpUrl      = "";
  private httpUrl       = new HttpHeadData().URL;
  private SAAShttpUrl   = new HttpHeadData().SAASURL

  // grzhixing登录注册接口
  private userLoginURL  = this.httpUrl + "/index.php?g=Member&m=Index&a=tologin";          //会员登录接口          |POST
  private userInfoURL   = this.httpUrl + "/index.php?g=Member&m=Logintrue&a=getuserinfo";  //获取登录用户信息接口
  private userMenuList  = this.httpUrl + "/index.php?g=Member&m=Logintrue&a=getmenulist";  //获取登录用户菜单接口
  private userIsLogin   = this.httpUrl + "/index.php?g=Member&m=Index&a=getloginstatus";   //验证登录状态接口
  private userLoginOut  = this.httpUrl + "/index.php?g=Member&m=Index&a=logout";           //退出登录接口
  private userResetpass = this.httpUrl + "/index.php?g=Member&m=Logintrue&a=resetpass";    //重置登录密码接口      |POST


  //grsaas登录注册接口
  private postLoginURL     = this.SAAShttpUrl + "login"      //POST 登录接口
  private postRegisterURL  = this.SAAShttpUrl + "register"   //POST 注册接口
  private postSmssendURL   = this.SAAShttpUrl + "smssend"    //POST 发送短信验证码
  private postSmscheckURL  = this.SAAShttpUrl + "smscheck"   //POST 短信验证码验证
  private postMobilecheckURL  = this.SAAShttpUrl + "mobilecheck"   //POST 验证手机号是否已注册
  private getLogoutURL     = this.SAAShttpUrl + "logout"     //GET  退出登录

  public  Menulist      : any;

  // 弹窗提示的时间间隔标志位
  public Timeout        : any;

  constructor(
    public http  :Http,
    private router: Router,
    private personalService:PersonalService,
    private appService:AppService
    ) {

  }

  resolve(){
    return this.getmenulist().then(result => {
          if(result) return result;
          else {
              return false;
          }
      })
  }

  // 登录状态验证，登录成功后所有接口都需要经过此验证
  public checkLoginStatus(response:any):string{

    if(this.Timeout) clearTimeout(this.Timeout);

    let Info:string;

    switch (response.status){
      case 10001:
        Info = response.message
        break;
      case 10002:
        Info = response.message
       break;
      default:
       break;
    }

    if(Info){
      this.personalService.showPromptSmall(Info,"danger",{top:"10%",right:"10%"});
      this.Timeout =  setTimeout(()=>{
                        this.personalService.showPromptSmall(null,null)
                      },2500)
    }

    return Info
  }

  // 提交表单接口
  public login(user:any){
	    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' });
      let options = new RequestOptions({ headers: headers });
      let postObject = JSON.parse(JSON.stringify(user));
      return this.http.post(this.userLoginURL,postObject,options)
					.toPromise()
					.then(response=>{
						return response.json()
					})
          .catch(console.log.bind(console))
  }

  // 重置登录密码接口
  public postResetpass(Reset:any){
      let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' });
      let options = new RequestOptions({ headers: headers });
      let postObject = JSON.parse(JSON.stringify(Reset));
      return this.http.post(this.userResetpass,postObject,options)
          .toPromise()
          .then(response=>{
            return response.json()
          })
          .catch(console.log.bind(console))
  }

  // 获取登录用户信息
  public getuserinfo(){
      return this.http.get(this.userInfoURL)
          .toPromise()
          .then(response=>{
            return response.json()
          })
          .catch(console.log.bind(console))
  }

  // 获取登录用户菜单
  public getmenulist(){
      return this.http.get(this.userMenuList)
          .toPromise()
          .then(response=>{
            this.Menulist = response.json();
            return response.json()
          })
          .catch(console.log.bind(console))
  }

  // 判断登录状态
  public Islogin(){
      return this.http.get(this.userIsLogin)
          .toPromise()
          .then(response=>{
            return response.json()
          })
          .catch(console.log.bind(console))
  }

  // 退出登录服务
  public LoginOut(){
      return this.http.get(this.userLoginOut)
          .toPromise()
          .then(response=>{
            return response.json()
          })
          .catch(console.log.bind(console))
  }

  // 设置cookie的值
  public setCookies(name:any, value:any, day:number){
      var oDate = new Date();
      oDate.setDate(oDate.getDate() + day);
      document.cookie = name + '=' + value + ';expires=' + oDate;
  }

  // 获取cookie值
  public getCookie(name:any):any{
      var arr = document.cookie.split('; ');

      for(var i = 0; i < arr.length; i++) {
        var arrName = arr[i].split('=');
        if(arrName[0] == name) {
          return arrName[1];
        }
      }
      return '';
  }

  // 删除cookie
  public delCookie(name:any){
    this.setCookies(name, 1, -1);
  }

  // 获取localStorage的值
  public getLocalStorage(name:string):any{
    return localStorage.getItem(name)?localStorage.getItem(name):0
  }


  /*
  *
  *退出登录的接口
  *
  *
  */
  public getLogout():Observable<any>{
    return this.appService.interfaceJudg('get',this.getLogoutURL)
  }



  /*
  *
  *登录验证的接口方法
  *
  *
  */
  public postLogin(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postLoginURL,obj)
  }


  /*
  *
  *注册验证的接口方法
  *
  *
  */

  public postRegister(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postRegisterURL,obj)
  }

  /*
  *
  *发送短信验证码的接口方法
  *
  *
  */

  public postSmssend(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postSmssendURL,obj)
  }

  /*
  *
  *短信验证码的接口方法
  *
  *
  */
  public postSmscheck(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postSmscheckURL,obj)
  }

  /*
  *
  *验证手机号是否已注册的接口方法
  *
  *
  */
  public postMobilecheck(obj:any):Observable<any>{
    return this.appService.interfaceJudg('post',this.postMobilecheckURL,obj)
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
