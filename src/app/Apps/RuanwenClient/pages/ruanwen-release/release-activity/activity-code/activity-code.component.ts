import { Component, OnInit,Input,Output,EventEmitter,OnChanges,SimpleChange } from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot } from '@angular/router'

import { GrOrderService }		from '../../../../services'

import { RiccioNotificationsService }		from '@gr-public/riccio-notifications/riccio-notifications.service'
import { RiccioModalService }		from '@gr-public/riccio-modal/riccio-modal.service'
	
@Component({
  selector: 'app-activity-code',
  templateUrl: './activity-code.component.html',
  styleUrls: ['../../../../../../Public/theme/apps-common/common.scss','./activity-code.component.scss']
})
export class ActivityCodeComponent implements OnInit {

  @Input() public btnType:boolean
  @Input() public close:boolean
  @Input() public codeTypeApi:string
  @Input() public writeData:any   // 具体的某一条文章的详细信息
  @Input() public orderMediaArr:any[]  //所有媒体列表
  @Output() public emitCode:EventEmitter<string>

  /**
   * 短信验证码的跳动的数字字段
   * @type {any}
   */
  public smsTimeData:any

  /**
   * 短信验证码字段
   * @type {string}
   */
  public code:string

  /**
   * 用户资料信息
   * @type {any}
   */
  public userInfo:any

  constructor(
  	public grOrderService:GrOrderService,
  	public riccioModalService:RiccioModalService,
    public activatedRoute:ActivatedRoute,
  	public riccioNotificationsService:RiccioNotificationsService
  ) {
  	this.btnType = true
    this.close = false
  	this.code = ''
  	this.smsTimeData = 0
    this.writeData = {
      'total_count':'1',
      'article_type':'A'
    }
    this.orderMediaArr = []
    this.codeTypeApi = 'order'
    this.emitCode = new EventEmitter<string>()
    this.userInfo = {
      'admin_phone':''
    }

    this.activatedRoute.parent.parent.parent.data.subscribe(res=>{

      if(res['UserInfo']){
        let _userinfo = res['UserInfo']['data']['company_userinfo']
        this.userInfo = {..._userinfo}
        // this.userInfo['admin_phone'] = this.handleMobile(this.userInfo['admin_phone'])
      }
    })

  }

  ngOnInit() {
  }

  ngOnChanges(change:SimpleChange){
    if(change['close']&&this.close==true){
      this.closer()
    }
    if(change['writeData']){
    }
  }

  /**
   * @author GR-03
   * @copyright 处理手机中间四位数字为＊号的函数
   * @param     [param]
   * @return    [return]
   */
  public handleMobile(mobile:string):string{

    return mobile.length>0?mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'):''

  }

  /**
   * @author GR-03
   * @copyright 点击获取验证码
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public fnGetSmsCode():void{

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


    if(this.codeTypeApi === 'order'){

      this.grOrderService.postOrderSendSms({
        'media_idarr':this.orderMediaArr
      }).subscribe(res=>{
        if(res.status===1){
          this.riccioNotificationsService.setSubject({text:'发送成功'})
        }else if(res.status===0){
          this.smsTimeData = 0
        }
      },error=>{
         throw new Error(error) 
      })

    }else if(this.codeTypeApi === 'write'){

      this.grOrderService.postOrderWriteSendSms({
        'total_count':this.writeData['total_count'],
        'article_type':this.writeData['article_type']
      }).subscribe(res=>{
        if(res.status===1){
          this.riccioNotificationsService.setSubject({text:'发送成功'})
        }else if(res.status===0){
          this.smsTimeData = 0
        }
      },error=>{
         throw new Error(error) 
      })

    }



  }

  /**
   * @author GR-03
   * @copyright 点击确认支付后提交所有数据
   * @param     [param]
   * @return    [return]
   */
  public fnAddOrder():void{
  	if(this.code.length<4){
      	this.riccioNotificationsService.setSubject({text:'请输入4位数验证码',status:'danger'})
  	}else {
  		
      this.emitCode.emit(this.code)
  		this.btnType = false
  		
  	}

  }

  /**
   * @author GR-03
   * @copyright 取消支付关闭试图
   * @param     [param]
   * @return    [return]
   */
  public closer():void{
  	this.riccioModalService.setSubject({})
  }

}
