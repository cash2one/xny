import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { RiccioNotificationsService }      from '../../../../Public/riccio-notifications/riccio-notifications.service'
import { FileUploader } from 'ng2-file-upload';
import { GrSettingService }    from '../../../services'
import { RiccioBrowseService }    from '../../../../Public/riccio-browse/riccio-browse.service'
import { RiccioLoadingService }    from '../../../../Public/riccio-loading/riccio-loading.service'

import { postCompanyAuthData }    from './postCompanyAuthData'

import { grUpload }    from '../../../services'

@Component({
  selector: 'app-setting-certification',
  templateUrl: './setting-certification.component.html',
  styleUrls: ['../../../Console.component.scss','../setting.component.scss','./setting-certification.component.scss']
})
export class SettingCertificationComponent implements OnInit {

  /**
   * 身份证正面图片上传
   * @type {FileUploader}
   */
  public cardOn:FileUploader

  /**
   * 身份证背面图片上传
   * @type {FileUploader}
   */
  public cardBack:FileUploader

  /**
   * 营业执照图片上传
   * @type {FileUploader}
   */
  public license:FileUploader

  /**
   * 短信验证码的跳动的数字字段
   * @type {any}
   */
  public smsTimeData:any

  /**
   * 企业认证信息所需要提交post的数据
   * @type {postCompanyAuthData}
   */
  public companyAuthData:postCompanyAuthData

  /**
   * 判断是否已经认证过还是正在认证中    0:未认证,1:已认证,2正在认证中,3认证失败
   * @type {number}
   */
  public isAuth:number

  /**
   * 点击提交验证按钮之后切换显示的状态的字段
   * @type {boolean}
   */
  public isDisabledButton:boolean

  /**
   * 企业负责人的手机号
   * @type {string}
   */
  public adminPhone:string

  /**
   * 认证的企业详细信息
   * @type {any}
   */
  public companyInfo:any

  /**
   * 认证失败时的提示信息
   * @type {string}
   */
  public authFailTipText:string

  /**
   * 点击预览时需要显示的图片地址
   * @type {string}
   */
  public browseImg:string

  constructor(
     public grSettingService:GrSettingService,
     public riccioLoadingService:RiccioLoadingService,
     public riccioBrowseService:RiccioBrowseService,
     public riccioNotificationsService:RiccioNotificationsService,
     public activatedRoute:ActivatedRoute
  ) { 
    this.browseImg = ''
    this.isDisabledButton = true
    this.smsTimeData = 0
    this.companyAuthData = new postCompanyAuthData()

    /**
     * @author GR-03
     * @copyright 身份证正面上传实例
     * @param     [param]
     * @return    [return]
     * @check     GR-05               GR-03
     * @param     {"uploadedfile"         }} {          url [description]
     */
  	this.cardOn = new FileUploader({    
	    url: new grUpload('card_on').URL,   
	    method: "POST",    
	    itemAlias: "file",
      removeAfterUpload:true
  	})

    /**
     * @author GR-03
     * @copyright 身份证反面的实例
     * @param     [param]
     * @return    [return]
     * @check     GR-05               GR-03
     * @param     {"uploadedfile"         }} {          url [description]
     */
    this.cardBack = new FileUploader({    
      url: new grUpload('card_back').URL,   
      method: "POST",    
      itemAlias: "file",
      removeAfterUpload:true
    })

    /**
     * @author GR-03
     * @copyright 营业执照的实例
     * @param     [param]
     * @return    [return]
     * @check     GR-05               GR-03
     * @param     {"uploadedfile"         }} {          url [description]
     */
    this.license = new FileUploader({    
      url: new grUpload('license').URL,   
      method: "POST",    
      itemAlias: "file",
      removeAfterUpload:true
    })
    /**
     * @author GR-03
     * @copyright 订阅路由守卫接收到的企业信息。用来判断该企业是否被认证
     * @param     [param]
     * @return    [return]
     * @check     GR-05       GR-03
     */
    this.activatedRoute.parent.parent.parent.data.subscribe(res=>{
      this.companyInfo = res['UserInfo'].data.company_userinfo?{...res['UserInfo'].data.company_userinfo}:{}
      this.adminPhone = this.companyInfo['admin_phone']
      this.isAuth = this.companyInfo['is_auth']
      // this.isAuth = 0
      if(this.isAuth!=0) this.authFail()
      if(sessionStorage.getItem('isAuth')!=null){
        this.isAuth = 2
      }
    })

  }

  ngOnInit() {
  }

  /**
   * @author GR-03
   * @copyright 认证失败时的特殊处理
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public authFail():void{
    this.grSettingService.getCompanyGetAuthInfo().subscribe(res=>{

      if(res.status===1){
        let resData = res['data']['info']
        this.authFailTipText = resData['verify_postil']

        Object.keys(this.companyAuthData).map(e=>{
          this.companyAuthData[e] = resData[e]?resData[e]:''
        })

        this.companyInfo['company_name'] = this.companyAuthData['company_name']

      }

    },error=>{
      throw new Error(error)
    })
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


    this.grSettingService.getCompanySms().subscribe(res=>{
      if(res.status===1){
      }else if(res.status===0){
        this.smsTimeData = 0
      }
    },error=>{
       throw new Error(error) 
    })

  }

  /**
   * @author GR-03
   * @copyright 接收ricciodisabledbutton返回回来的数据 提交企业认证信息
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {boolean}   value [description]
   */
  public fnOutputButtonData(value:boolean):void{
    if(this.provingData()===true){
      this.isDisabledButton = false
      this.grSettingService.postCompanyAuth(this.companyAuthData).subscribe(res=>{
        this.isDisabledButton = true
        if(res.status===1){
          this.isAuth=2
          this.companyInfo['company_name'] = this.companyAuthData['company_name']
          sessionStorage.setItem('isAuth','2');
        }
      },error=>{
        throw new Error(error)
      })
    }else if(this.provingData()===false){
      this.riccioNotificationsService.setSubject({text:'请完善提交信息',status:'danger'})
    }
  }

  /**
   * @author GR-03
   * @copyright 数据校验的方法
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @return    {boolean}   [description]
   */
  public provingData():boolean{

    let bool = true

    Object.keys(this.companyAuthData).map(e=>{
      if(this.companyAuthData[e]==''){
        return bool = false
      }
    })

    return bool
  }

  /**
   * @author GR-03
   * @copyright 监听上传组件传递回来的数据用来判断是上传的哪一张照片
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {any}       value [description]
   * @param     {string}    type  [description]
   */
  public fnOutputUploader(value:any,type:string):void{

    if(this[type].queue.length>0){
      this[type].queue[this[type].queue.length-1].onSuccess = (response, status, headers) => {
          this.riccioLoadingService.setLoading('上传中')
          if (status == 200) {
              this.riccioLoadingService.closeLoading()
              let tempRes = JSON.parse(response)     
              if(tempRes.status===1){
                  switch (type) {
                    case "cardOn":
                      this.companyAuthData['card_on'] = tempRes['data'][0]['filepath']
                      break;
                     
                    case "cardBack":
                      this.companyAuthData['card_back'] = tempRes['data'][0]['filepath']
                      break;

                    case "license":
                      this.companyAuthData['license'] = tempRes['data'][0]['filepath']
                      break;

                    default:break;
                  }

              }else if(tempRes.status===0){
                this.riccioNotificationsService.setSubject({text:tempRes.message,status:'danger'})
              } 

          }else {            
              
          }
      }
      this[type].queue[this[type].queue.length-1].upload()
    }

  }

  /**
   * @author    GR-03
   * @copyright 点击浏览预览大图
   * @param     [param]
   * @return    [return]
   * @param     {string}    type [description]
   */
  public fnShowBrowseImg(type:string):void{
    this.browseImg = this.companyAuthData[type]
    this.riccioBrowseService.setSubject({
      src:this.browseImg
    })
  }


}
