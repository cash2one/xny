import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot } from '@angular/router'

import { profileData } from './profileData'
import { GrAccountService } from '../../../services'
import { GrMembersService } from '@gr-api-service/grMembers/grMembers.service'
import { RiccioNotificationsService } from '../../../../Public/riccio-notifications/riccio-notifications.service'

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: [
    '../../../../Public/theme/common/common.scss',
    '../../../Console.component.scss',
    '../account.component.scss',
    './account-profile.component.scss'
  ]
})
export class AccountProfileComponent implements OnInit {

  /**
   * 准备提交的用户资料数据
   * @type {profileData}
   */
  public profileData: profileData

  public btnData: boolean


  constructor(
    public activatedRoute: ActivatedRoute,
    public grAccountService: GrAccountService,
    private grMembersService: GrMembersService,
    private riccioNotificationsService: RiccioNotificationsService
  ) {
    this.btnData = true
    this.profileData = new profileData()

  }

  ngOnInit() {
    this.grMembersService.getCurrentUser().subscribe(res=>{
      this.profileData = res.data.company_userinfo
    })
  }


  /**
   * @author GR-03
   * @copyright 点击修改按钮后提交编辑的信息给接口
   * @param     [param]
   * @return    [return]
   * @param     {boolean}   value [description]
   */
  public fnEditMemberInfo(value: boolean): void {
    if (value === true && this.validAll()) {
      this.btnData = false
      this.grAccountService.postUserEdit(this.profileData).subscribe(res => {
        this.btnData = true
        if (res.status == 1) {
          this.riccioNotificationsService.setSubject({
            text: '修改成功',
            status: 'success'
          })
        }
      }, error => {
        throw new Error(error)
      })
    }
  }

  //验证手机
  public validMobile(mobile: string) {
    return /^1[34578]\d{9}$/.test(mobile)
  }
  //验证邮箱
  public validEmail(email: string) {
    return /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(email)
  }

  public validAll(){
    let result = false
    if(!this.validEmail(this.profileData.email)){
      this.riccioNotificationsService.setSubject({
        text:'输入正确的邮箱',
        status:'danger'
      })
      result = false
    }
    else if(!this.validMobile(this.profileData.phone)){
      this.riccioNotificationsService.setSubject({
        text:'请输入正确的联系方式',
        status:'danger'
      })
      result = false
    }
    else{
      result = true
    }
    return result
  }
}
