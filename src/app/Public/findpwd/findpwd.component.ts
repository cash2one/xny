import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router }   from '@angular/router';

import { FindpwdService }		from './findpwd.service'
import { RiccioNotificationsService }    from '../riccio-notifications/riccio-notifications.service'
import { RiccioModalService }    from '../riccio-modal/riccio-modal.service'
      
import { findpwdData }		from './findData'
import { newPassword }    from './findData'

@Component({
  selector: 'app-findpwd',
  templateUrl: './findpwd.component.html',
  styleUrls: ['../../app.component.scss','../../Public/theme/common/common.scss','./findpwd.component.scss']
})
export class FindpwdComponent implements OnInit {

  public nowYearTime:number = 2017

  /**
   * 短信验证码的跳动的数字字段
   * @type {any}
   */
  public smsTimeData:any

  /**
   * 按钮的标志位
   * @type {[type]}
   */
  public btnType:any	

  /*
  修改密码的弹窗数据
   */
  public newPsw:newPassword

  /*
  是否开启按钮的标志位
   */
  public disabledBtnOpen:boolean

  /**
   * 找回密码数据对象
   * @type {findpwdData}
   */
  public findpwdData:findpwdData

  /**
   * 修改密码需要的token字段
   * @type {string}
   */
  public token:string

  /*
  是否显示密码的对象数据
   */
  public lookType:any

  constructor(
  	public findpwdService:FindpwdService,
    public router:Router,
    public riccioModalService:RiccioModalService,
    public riccioNotificationsService:RiccioNotificationsService
  ) { 
  	this.smsTimeData = 0
    this.btnType = {
      text:'修改密码',
      disabled:false
    }
    this.lookType = {
      'psw':false,
      'conPsw':false
    }
    this.token = ''
    this.disabledBtnOpen = true
    this.newPsw = new newPassword()
  	this.findpwdData = new findpwdData()
  }

  ngOnInit() {

    sessionStorage.setItem('loading','false')
  	
  }


  /**
   * @author GR-03
   * @copyright 点击获取验证码
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public fnGetSmsCode():void{

    let handleMobile = (data:string):boolean => {

      let bool:boolean

      if(/^1[34578]\d{9}$/.test(data) == true){
        bool = true
      }else {
        bool = false
      }

      return bool
    }

    if(handleMobile(this.findpwdData['mobile'])==true){

      this.smsTimeData = 60
      let codeInter = setInterval(()=>{
            if(this.smsTimeData==0){
             clearInterval(codeInter)
              this.smsTimeData = 0
            }
            else {
              this.smsTimeData--
            }
          },1000)

      this.findpwdService.postSmssend({
        'mobile':this.findpwdData['mobile']
      }).subscribe(res=>{
        if(res.status===1){
          this.riccioNotificationsService.setSubject({text:'发送成功'})
        }
      },error=>{
        throw new Error(error)
      })

    }else {
      this.riccioNotificationsService.setSubject({text:'请输入正确的手机格式',status:'danger'})
    }

  }

  /**
   * @author GR-03
   * @copyright 点击按钮发送数据给接口
   * @param     [param]
   * @return    [return]
   */
  public handleFindpwd():void{

    if(this.findpwdData['mobile'].trim() == ''){
      this.riccioNotificationsService.setSubject({text:'请输入手机号',status:'danger'})
    }else if(this.findpwdData['code'].trim() == ''){
      this.riccioNotificationsService.setSubject({text:'请输入验证码',status:'danger'})
    }else {

      this.btnType = {
        text:'请稍后...',
        disabled:true
      }

      this.findpwdService.findpwdToken({
        ...this.findpwdData
      }).subscribe(res=>{
        this.btnType = {
          text:'修改密码',
          disabled:false
        }
        if(res.status===1){
            this.token = res['data']
            this.openModal()
        }
        
      },error=>{
        throw new Error(error)
      })
    }

  }

  /**
   * @author GR-03
   * @copyright 打开弹窗修改密码
   * @param     [param]
   * @return    [return]
   */
  public openModal():void{
    this.newPsw = new newPassword()
    this.disabledBtnOpen = true
    this.riccioModalService.setSubject({
        'header':'修改密码',
        'size':700,
        'noBtn':true,
        'type':'psw'
    })
  }

  /**
   * @author GR-03
   * @copyright 关闭弹窗
   * @param     [param]
   * @return    [return]
   */
  public closeView():void{
    this.riccioModalService.setSubject({})
  }

  /**
   * @author GR-03
   * @copyright 处理验证规则
   * @param     [param]
   * @return    [return]
   * @param     {any}       obj [description]
   * @return    {boolean}       [description]
   */
  public handlePsw(obj:any):boolean{

    let bool:boolean = true

    if(this.newPsw['password'].trim().length<6){
      bool = false
      this.riccioNotificationsService.setSubject({text:'新密码不能少于6位',status:'danger'})
    }else if(this.newPsw['password'] != this.newPsw['password_confirmation']){
      bool = false
      this.riccioNotificationsService.setSubject({text:'新密码和确认密码不一致',status:'danger'})
    }else {
          switch ('') {
          case obj['password']:
            bool = false
            this.riccioNotificationsService.setSubject({text:'请输入新密码',status:'danger'})
            break;
          
          case obj['password_confirmation']:
            bool = false
            this.riccioNotificationsService.setSubject({text:'请输入确认密码',status:'danger'})
            break;

          default:break;
        }
      }
    
    return bool
  }

  /**
   * @author GR-03
   * @copyright 点击确认修改按钮提交修改密码接口
   * @param     [param]
   * @return    [return]
   * @param     {boolean}   value [description]
   */
  public modifyPsw(value:boolean):void{

    if(this.handlePsw(this.newPsw) == true){

      this.disabledBtnOpen = false
      this.findpwdService.postReset({
        ...this.newPsw,
        'token':this.token
      }).subscribe(res=>{
        this.disabledBtnOpen = true
        if(res.status==1){
          this.closeView()
          this.riccioNotificationsService.setSubject({text:'修改成功,正在返回登陆页'})
          setTimeout(()=>{
            this.FnGologin()
          },800)
        }
      },error=>{
        throw new Error(error)
      })


    }

  }

  /**
   * @author GR-03
   * @copyright 点击返回登录页面
   * @param     [param]
   * @return    [return]
   */
  public FnGologin():void{
    this.router.navigateByUrl("login")
  }


}
