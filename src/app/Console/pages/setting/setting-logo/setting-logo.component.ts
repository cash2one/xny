import { Component, OnInit,ViewChild,ElementRef } from '@angular/core'
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { grUpload }    from '../../../services'

import { FileUploader } from 'ng2-file-upload'
import { RiccioModalService }    from '../../../../Public/riccio-modal/riccio-modal.service'
import { RiccioNotificationsService }    from '../../../../Public/riccio-notifications/riccio-notifications.service'

import { GrSettingService }    from '../../../services'
import { ConsolesService } from '../../../Console.service'

@Component({
  selector: 'app-setting-logo',
  templateUrl: './setting-logo.component.html',
  styleUrls: ['../../../Console.component.scss','../setting.component.scss','./setting-logo.component.scss']
})
export class SettingLogoComponent implements OnInit {

  /**
   * 图片上传
   * @type {FileUploader}
   */
  public uploader:FileUploader


  /**
   * 登陆页上传
   * @type {FileUploader}
   */
  public uploaderLogin:FileUploader


  @ViewChild('img_logo')  public img_logo:ElementRef


  /**
   * 公司logo
   * @type {string}
   */
  public imgLogoURL:string

  /**
   * 登陆页logo
   * @type {string}
   */
  public imgLoginLogoURL:string

  constructor(
    public riccioModalService:RiccioModalService,
    public grSettingService:GrSettingService,
    public activatedRoute:ActivatedRoute,
    public riccioNotificationsService:RiccioNotificationsService,
    private consolesService:ConsolesService
  ) { 
    this.imgLogoURL = ''
    this.imgLoginLogoURL = ''
  	this.uploader = new FileUploader({    
	    url: new grUpload('logo').URL,
	    method: "POST",
	    itemAlias: "file"
  	})
    this.uploaderLogin = new FileUploader({    
      url: new grUpload('logo_login').URL,
      method: "POST",
      itemAlias: "file"
    })

    /**
     * @author GR-03
     * @copyright 订阅路由守卫接收到的企业信息。用来判断该企业是否被认证
     * @param     [param]
     * @return    [return]
     * @check     GR-05       GR-03
     * @param     {[type]}    res=>{      let companyInfo = res['CompanyInfo'].json().data      console.log(companyInfo)      this.isAuth = companyInfo['is_auth']    } [description]
     */
    this.activatedRoute.parent.parent.parent.data.subscribe(res=>{
      let companyInfo = res['UserInfo'].data.company_userinfo?{...res['UserInfo'].data.company_userinfo}:{}
      this.imgLogoURL = window['setting']['fileurl'] + companyInfo['logo']
      this.imgLoginLogoURL = window['setting']['fileurl'] + companyInfo['logo_login']
    })

  }

  ngOnInit() {
  }


  /**
   * @author GR-03
   * @copyright 公司logo
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {any}       value [description]
   */
  public selectedFileOnChangedLogo(value:any):void{
    if(this.uploader.queue.length>0){
      this.uploader.queue[this.uploader.queue.length-1].onSuccess = (response, status, headers) => {
          if (status == 200) {
              let tempRes = JSON.parse(response)     
              if(tempRes.status===1){
                this.imgLogoURL = tempRes['data'][0]['filepath']+'?v='+(new Date().getTime())
                this.consolesService.changeComLogo(this.imgLogoURL)
              }else if(tempRes.status===0){
                this.riccioNotificationsService.setSubject({text:tempRes.message,status:'danger'})
              } 
          }else {            
          }
      }
      this.uploader.queue[this.uploader.queue.length-1].upload()
    }
  }

  /**
   * @author GR-03
   * @copyright 登陆页logo
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {any}       value [description]
   */
  public selectedFileOnChangedLoginLogo(value:any):void{
    // let file = value.target.files
    // let reader = new FileReader()
    // let fn = ()=>{
    //   this.imgLoginLogoURL = result
    // }
    // let result = ''
    // reader.readAsDataURL(file[0])
    // reader.onload = function(e){
    //   result = this.result
    //   fn()
    // }
    if(this.uploaderLogin.queue.length>0){
      this.uploaderLogin.queue[this.uploaderLogin.queue.length-1].onSuccess = (response, status, headers) => {    
          if (status == 200) {
              let tempRes = JSON.parse(response)     
              if(tempRes.status===1){
                this.imgLoginLogoURL = tempRes['data'][0]['filepath']
              }else if(tempRes.status===0){
                this.riccioNotificationsService.setSubject({text:tempRes.message,status:'danger'})
              } 
          }else {            
          }
      }
      this.uploaderLogin.queue[this.uploaderLogin.queue.length-1].upload()
    }

  }

}
