import { Component, OnInit } from '@angular/core';

import { MailDriveData } from './MailDriveData'

import { GrConfigService } from '../../../../services'
import { PersonalService } from '../../../../../Public/Personal/personal.service'

@Component({
  selector: 'app-mail-drive',
  templateUrl: './mail-drive.component.html',
  styleUrls: [
    '../../../../Admin.component.scss',
    './mail-drive.component.scss',
    './mail-drive.component.new.scss'
  ]
})
export class MailDriveComponent implements OnInit {

  public showDataSMTP: Array<any>;
  public showDataShaiyun: Array<any>;

  public SMTPData: any;
  public ShaiyunData: any;

  public tabShow: string;
  public btnStatus:any

  red:boolean

  constructor(
    public grConfigService: GrConfigService,
    public personalService: PersonalService
  ) {
    this.tabShow = "SMTP"
    this.btnStatus = {
      status:1,
      text:'保存'
    }
    this.showDataSMTP = new MailDriveData().showViewSMTP;
    this.showDataShaiyun = new MailDriveData().showViewShaiyun;
    this.SMTPData = new MailDriveData().SMTPData;
    this.ShaiyunData = new MailDriveData().ShaiyunData
  }

  ngOnInit() {
    //页面加载完成拉取邮箱驱动初始数据
    this.grConfigService.getMailInfo().subscribe(res => {
      if (res.data.mail_driver === 'submail') {
        this.tabShow = 'shaiyun';
        this.ShaiyunData = res.data.driver_data;
        this.ShaiyunData.mail_driver = 'submail';
      }
      if (res.data.mail_driver === 'smtp') {
        this.tabShow = 'SMTP';
        this.SMTPData = res.data.driver_data;
        this.SMTPData.mail_driver = 'smtp';
      }
    })
  }

  //点击保存触发的事件
  public FnSaveMail(): void {
    // postMailSetMail

    let bool = true;

    if (this.tabShow === 'SMTP') {
      for (let i in this.SMTPData) {
        if (this.SMTPData[i] === "") bool = false;
      }
      if (bool === true) {
        this.saveBtnSet(0)
        this.grConfigService.postMailSetMail(this.SMTPData)
          .subscribe(res => { 
            this.saveBtnSet(1)
            if (res.status === 1) {
              this.personalService.showPromptSmall('设置成功', 'success', { 'right': '50%', 'top': '30%' })
            }
            else if (res.status === 0) {
              this.personalService.showPromptSmall('设置失败', 'danger', { 'right': '50%', 'top': '30%' })
            }
          })
      }

    }
    else if (this.tabShow === 'shaiyun') {
      for (let i in this.ShaiyunData) {
        if (this.ShaiyunData[i] === "") bool = false;
      }

      if (bool === true) {
        this.saveBtnSet(0)
        this.grConfigService.postMailSetMail(this.ShaiyunData)
          .subscribe(res => {
            this.saveBtnSet(1)
            if (res.status === 1) {
              this.personalService.showPromptSmall('设置成功', 'success', { 'right': '50%', 'top': '30%' })
            }
            else if (res.status === 0) {
              this.personalService.showPromptSmall('设置失败', 'danger', { 'right': '50%', 'top': '30%' })
            }
          })
      }
    }
  }

  /**
   * 设置按钮状态
   * @param type 类型
   */
  public saveBtnSet(type:number){
    if(type === 0 ){
      //活动中
      this.btnStatus = {
        status:0,
        text:'设置中...'
      }
    }else if(type === 1){
      this.btnStatus = {
        status:1,
        text:'保存'
      }
    }
  }
}
