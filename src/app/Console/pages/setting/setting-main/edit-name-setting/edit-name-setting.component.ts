import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot } from '@angular/router'

import { GrSettingService } from '../../../../services'

import { RiccioModalService } from '../../../../../Public/riccio-modal/riccio-modal.service'
import { RiccioNotificationsService } from '../../../../../Public/riccio-notifications/riccio-notifications.service'
import { ConsolesService }    from '../../../../Console.service'

import { EditNameSettingData } from './editNameSettingData'
import { BtnData } from './btnData'

@Component({
  selector: 'app-edit-name-setting',
  templateUrl: './edit-name-setting.component.html',
  styleUrls: ['../../../../Console.component.scss', './edit-name-setting.component.scss']
})
export class EditNameSettingComponent implements OnInit {

  public companyInfo: EditNameSettingData
  public btnData: BtnData  // 按钮文字和禁用状态

  public loadingSymbol: boolean  // loading效果标志位

  /**
   * 企业如果认证通过后则不允许修改企业名称
   * @type {boolean}
   */
  public disabledInput: boolean

  constructor(
    public grSettingService: GrSettingService,
    public activatedRoute: ActivatedRoute,
    public riccioModalService: RiccioModalService,
    public consolesService:ConsolesService,
    public riccioNotificationsService: RiccioNotificationsService
  ) {
    this.disabledInput = false
    this.loadingSymbol = true
    this.btnData = new BtnData()
    this.companyInfo = new EditNameSettingData()

    this.activatedRoute.parent.parent.parent.data.subscribe(res=>{
      let companyInfo = res.UserInfo.data.company_userinfo
      if(companyInfo.is_auth==1){
        this.disabledInput = true
      }
    })

  }

  ngOnInit() {
    //获取企业信息来填充二级域名和企业名称
    this.fnGetCompanyInfo()
  }

  /**
   * @author GR-03
   * @copyright 获取企业信息来填充二级域名和企业名称
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public fnGetCompanyInfo(): void {
    this.grSettingService.getCompanyInfo().subscribe(res => {
      if (res.status === 1) {
        this.loadingSymbol = false
        this.companyInfo['name'] = res['data']['name']
        this.companyInfo['domain'] = res['data']['domain']
        if (res['data']['is_auth'] == 1) {
          this.disabledInput = true
        }else{
          this.disabledInput = false
        }
      }
    }, error => {
      throw new Error(error)
    })
  }

  /**
   * @author GR-03
   * @copyright 点击保存之后提交数据
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public fnSaveEdit(): void {
    this.btnData.text = '保存中...'
    this.btnData.disabled = true
    this.grSettingService.postCompanyBasic({
      'name': this.companyInfo['name'],
      // 'domain':this.companyInfo['domain']
    }).subscribe(res => {
      this.btnData = new BtnData()
      if (res.status === 1) {
        this.consolesService.changeComName(this.companyInfo['name'])
        this.riccioNotificationsService.setSubject({ text: '保存成功', status: 'success' })
        this.closeView()
      }
    }, error => {
      throw new Error(error)
    })
  }

  /**
   * @author GR-03
   * @copyright 取消视图
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public closeView(): void {
    this.riccioModalService.setSubject({})
  }

}
