import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router }   from '@angular/router';

import { LoginService }			from '../Login/Login.service'
import { PersonalService }    from '../../Public/Personal/personal.service'

import { registerData }			from './registerData'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../app.component.scss','./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public RegisterData:registerData = new registerData()
  public selectedHeroUser: boolean = false;
  public errorText:string;
  public showBoxText:string;
  public btnType:any;

  public CodeData:any;
  public CodeTime:number;

  public Terms:boolean;

  public mobileDanger:boolean;
  public passwordDanger:boolean;
  public codeDanger:boolean;

  redShow:boolean

  constructor(
  	public userLoginService:LoginService,
    public personalService:PersonalService,
    public router:Router
  ) {
    this.codeDanger = false;
    this.mobileDanger = false;
    this.passwordDanger = false;
    this.Terms = true
    this.CodeTime = 60;
    this.btnType = {
      text:'注 册',
      disabled:false
    };
    this.CodeData = {
    	text:'获取验证码',
    	disabled:false
    }
  }

  ngOnInit() {

    sessionStorage.setItem('loading','false')

  }


  //点击注册按钮进行一系列验证
  public ToRegister():void{
    let bool = true;

    switch ("") {
      case this.RegisterData.code:
        bool = false;
        this.selectedHeroUser = true;
        this.codeDanger = true;
        this.errorText = '请输入验证码'
        break;
      case this.RegisterData.name:
        bool = false;
        this.selectedHeroUser = true;
        this.errorText = '请输入真实姓名'
        break;
      
      default:break;
    }

    let password = this.isPassword();
    let mobile = this.isMobile();

    if(this.Terms===true){
    }
    else {
      bool = false;
      this.selectedHeroUser = true;
      this.errorText = '请勾选并同意服务条款'
    }

    if(bool===true&&mobile===true&&password===true&&this.mobileDanger===false){

      this.selectedHeroUser = false;
      this.btnType = {
        text:'注册中...',
        disabled:true
      };

      let codeObj = {
        'code':this.RegisterData.code
      };
      this.userLoginService.postSmscheck(codeObj)
                           .subscribe(res=>{

                             if(res.status===1){

                               this.userLoginService.postRegister(this.RegisterData)
                                                    .subscribe(res=>{
                                                      this.btnType = {
                                                        text:'注 册',
                                                        disabled:false
                                                      };
                                                      if(res.status===1){
                                                         this.personalService.showPromptSmall("注册成功","success",{right:'50%',top:'30%'})
                                                         this.router.navigateByUrl("login")
                                                      }
                                                      else if(res.status===0){
                                                         this.personalService.showPromptSmall("注册失败","danger",{right:'50%',top:'30%'})
                                                      }

                                                    })

                             }else if(res.status===0){
                              this.codeDanger = true;
                              this.selectedHeroUser = true;
                              this.errorText = '验证码错误';
                              this.btnType = {
                                text:'注 册',
                                disabled:false
                              };
                             }

                           },error=>{
                             console.error(error)
                           })


    }





  }

  //验证手机号的方法
  public isMobile():boolean{

      let bool = true;
      if(!(/^1[34578]\d{9}$/.test(this.RegisterData.mobile.toString()))){
          this.mobileDanger = true;
          this.selectedHeroUser = true;
          this.errorText = '请输入正确的手机号';
          bool = false
      }

      return bool;

  }

  //验证密码的方法
  public isPassword():boolean{
    let bool = true;
    let data = this.RegisterData.password.toString();
    if(!((/^.*?[\d]+.*$/.test(data))&&(/^.*?[A-Za-z]/.test(data))&&(/^.{8,20}$/.test(data)))){
      bool = false;
      this.passwordDanger = true;
      this.selectedHeroUser = true;
      this.errorText = '请输入8-20位字符，包含字母和数字';
    }

    return bool

  }

  //点击获取短信验证码
  public FnGetCode():void{

    if(this.isMobile()===true){

      this.CodeData = {
        text:'准备发送',
        disabled:true
      }

      let postObj = {
        'mobile':this.RegisterData.mobile
      }
      this.userLoginService.postMobilecheck(postObj)
                           .subscribe(res=>{

                            if(res.status===1){
                                let mobile = this.RegisterData.mobile;
                                this.selectedHeroUser = false
                                this.CodeData = {
                                  text:this.CodeTime+'秒后重新获取',
                                  disabled:true
                                }
                                let codeInter = setInterval(()=>{

                                  if(this.CodeTime===0){
                                   clearInterval(codeInter);
                                    this.CodeTime = 0
                                    this.CodeData = {
                                      text:'获取验证码',
                                      disabled:false
                                    }
                                  }
                                  else {
                                    this.CodeTime--;
                                    this.CodeData = {
                                      text:this.CodeTime+'秒后重新获取',
                                      disabled:true
                                    }
                                  }
                                },1000);

                                let postObj = {
                                  'mobile':mobile
                                }
                                this.userLoginService.postSmssend(postObj)
                                                     .subscribe(res=>{
                                                       console.log(res)
                                                       if(res.status===1){
                                                         this.personalService.showPromptSmall("发送成功","success",{right:'50%',top:'30%'})
                                                       }
                                                       else if(res.status===0){
                                                         this.personalService.showPromptSmall("发送失败","danger",{right:'50%',top:'30%'})
                                                       }
                                                     })

                             }else if(res.status===0){
                              this.CodeData = {
                                text:'获取验证码',
                                disabled:false
                              }
                              this.mobileDanger = true;
                              this.selectedHeroUser = true;
                              this.errorText = '该手机已被注册，请重新填写';
                             }
                           })

    }



  }

  //点击直接登录跳转到登录页面
  public FnGoLogin():void{
    this.router.navigateByUrl("login")
  }


}
