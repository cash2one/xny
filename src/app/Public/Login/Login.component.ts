import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser'
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

import { LoginService } from './Login.service'
import { AppService } from '../../app.service'
import { GrMembersService } from '@gr-api-service/grMembers/grMembers.service'
import { RiccioLoadingService } from '../riccio-loading/riccio-loading.service'
import { RiccioNotificationsService }    from '../riccio-notifications/riccio-notifications.service'

import { UserData } from './UserData'

@Component({
  selector: 'app-user-login',
  templateUrl: './Login.component.html',
  styleUrls: ['../../app.component.scss', './Login.component.scss'],
  animations: [
    trigger('flyLeft', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        animate(200, keyframes([
          style({ opacity: 0.9, transform: 'translateX(-101%)', offset: 0 }),
          style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
        ]))
      ]),
      transition('* => void', [
        animate(200, keyframes([
          style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
          style({ opacity: 0, transform: 'translateX(-101%)', offset: 1.0 })
        ]))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {

  public user: UserData = new UserData();
  public selectedHeroUser: boolean = false;
  public errorText: string;
  public showBoxText: string;
  public btnType: any;
  public dangerUser:any
  public nowYearTime:number = 2017

  constructor(
    public userLoginService: LoginService,
    public grMembersService: GrMembersService,
    public router: Router,
    public appService: AppService,
    public riccioLoadingService:RiccioLoadingService,
    public riccioNotificationsService:RiccioNotificationsService,
    private title: Title
  ) {
    this.btnType = {
      text: '登 录',
      disabled: false
    }
    this.dangerUser = {
      'loginName':false,
      'password':false
    }
  }

  ngOnInit() {
    // 验证用户是否登录过，如果是则跳转到Console

    /**
     * 旧版的跳转到grzhixing的方法
     */
    // this.userLoginService.Islogin().then(respons=>{
    //   if(respons.status){
    //     // this.router.navigateByUrl("Members")
    //   }
    //   else{
    //   }
    // },reject=>{

    // })

    /**
     * @author GR-03
     * @copyright 判断是否登陆，是的话跳转到Members
     * @param     [param]
     * @return    [return]
     * @check     GR-05       GR-03
     */
    this.isLogin()

    sessionStorage.setItem('loading', 'false')
    this.title.setTitle('登录 - 星牛云')

  }

  /**
   * @author GR-03
   * @copyright 登录页面验证是否
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public isLogin(): void {
    this.grMembersService.getCurrentUser().subscribe(res => {

      if (res.status === 1) {
        this.router.navigateByUrl("Member")
      }

    }, error => {
    })
  }


  /**
   * @author GR-03
   * @copyright 登录按钮
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public toLogin(): void {
    let bool = true;
    switch ("") {
      case this.user.loginname.trim():
        this.errorText = "请输入用户名"
        this.dangerUser['loginName'] = true
        this.riccioNotificationsService.setSubject({text:'请输入手机号码或邮箱',status:'danger'})
        this.selectedHeroUser = true;
        bool = false;
        break;
      case this.user.password.trim():
        this.errorText = "请输入密码"
        this.selectedHeroUser = true;
        this.dangerUser['password'] = true
        this.riccioNotificationsService.setSubject({text:'请输入密码',status:'danger'})
        bool = false;
        break;
      default: break;
    }

    if (bool === true) {

      this.btnType = {
        text: '登录中...',
        disabled: true
      }
      this.selectedHeroUser = false;
      this.userLoginService.postLogin(this.user)
        .subscribe((response) => {
          // 验证用户是否登录成功
          this.btnType = {
            text: '登 录',
            disabled: false
          }
          if (response.status == 1) {
            this.showBoxText = response.message
            response['data']['last_cid'] == 0 
            ? (()=>{
              this.router.navigateByUrl("Member")
            })() 
            : (()=>{
                  this.riccioLoadingService.setLoading({'message':'登陆成功,请稍候'})
                  this.grMembersService.postMemberCompany({
                    'cid':response['data']['last_cid']
                  }).subscribe(res=>{
                    if(res.status===1){
                      setTimeout(()=>{
                        this.riccioLoadingService.closeLoading()
                        this.router.navigateByUrl('Console/apps/my')
                      },2000)
                    }
                  },error=>{
                    throw new Error(error)
                  })
            })()  
            
          }
          else if (response.status == 0) {
            this.selectedHeroUser = true;
            this.errorText = response.message;
          }
        }, error => {
          console.error(error)
        })

    }

  }


  //点击进入注册页面
  public FnGoRegister(): void {
    this.router.navigateByUrl("register")
  }


  /**
   * @author GR-03
   * @copyright 点击忘记密码的操作
   * @param     [param]
   * @return    [return]
   */
  public forgetPassword(): void {
    this.router.navigateByUrl("findpwd")
  }

}
