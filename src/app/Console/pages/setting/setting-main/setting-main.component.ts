import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot } from '@angular/router'


import { RiccioModalService } from '../../../../Public/riccio-modal/riccio-modal.service'
import { RiccioNotificationsService } from '../../../../Public/riccio-notifications/riccio-notifications.service'

import { GrSettingService } from '../../../services'

import { Enum } from './Enum'

@Component({
    selector: 'app-setting-main',
    templateUrl: './setting-main.component.html',
    styleUrls: ['../../../Console.component.scss', '../setting.component.scss', './setting-main.component.scss']
})
export class SettingMainComponent implements OnInit {

    public modalSymbol: string; 		// 用来辨别显示哪个弹窗的标志位字段

    public modalRX$: Subscription;    // 监听Modal发射回来的数据流

    /**
     * 需要被转让企业的成员名称
     * @type {Enum}
     */
    public transferData: Enum

    /**
     * 需要转让企业时验证的密码
     * @type {string}
     */
    public transferPassword: string

    //转让企业短信验证码
    public transferCode: number = null

    /**
     * 短信验证码的跳动的数字字段
     * @type {any}
     */
    public smsTimeData: any

    //用户信息
    public userInfo: {
        mobile: string
    }

    isShowName: boolean
    isShowArea: boolean
    isShowTransfer: boolean


    constructor(
        public activatedRoute: ActivatedRoute,
        public riccioModalService: RiccioModalService,
        public riccioNotificationsService: RiccioNotificationsService,
        public grSettingService: GrSettingService
    ) {
        this.transferPassword = ''
        this.transferData = new Enum('请选择成员')
        this.modalSymbol = ''
        this.smsTimeData = 0
        this.activatedRoute.parent.parent.parent.data.subscribe(res => {
            let companyInfo = res.UserInfo.data.company_userinfo
            this.userInfo = {
                mobile: res.UserInfo.data.company_userinfo['admin_phone']
            }
        })
    }

    ngOnInit() {
        //用来订阅modal发射回来的数据流
        this.getModalEmit();
    }

    ngOnDestroy() {
        this.modalRX$ ? this.modalRX$.unsubscribe : {}
    }

    /**
     * @author GR-03
     * @copyright 根据点击的不同修改按钮显示对应的模态框组件的方法
     * @check     GR-05       GR-03
     * @param     {string}
     */
    public fnShowModal(str: string): void {

        switch (str) {
            case "editName":
                (() => {
                    this.modalSymbol = ''
                    setTimeout(() => {
                        this.modalSymbol = 'editName'
                    })
                    let obj = {
                        data: '',
                        header: '修改企业名',
                        size: 600,
                        type: 'editName',
                        noBtn: true
                    }
                    this.riccioModalService.setSubject(obj)
                })()
                break;

            case "editArea":
                (() => {
                    this.modalSymbol = ''
                    setTimeout(() => {
                        this.modalSymbol = 'editArea'
                    })
                    let obj = {
                        data: '',
                        header: '修改企业地区、规模和行业',
                        size: 600,
                        type: 'editArea',
                        noBtn: true
                    }
                    this.riccioModalService.setSubject(obj)
                })()
                break;

            case "editTransfer":
                (() => {
                    this.modalSymbol = ''
                    setTimeout(() => {
                        this.modalSymbol = 'editTransfer'
                    })
                    let obj = {
                        data: '',
                        header: '选择成员',
                        size: 400,
                        type: 'editTransfer',
                        noBtn: true
                    }
                    this.riccioModalService.setSubject(obj)
                })()
                break;

            case "transferCode":
                (() => {
                    this.modalSymbol = ''
                    setTimeout(() => {
                        this.modalSymbol = 'transferCode'
                    })
                    let obj = {
                        data: '',
                        header: '获取验证码',
                        size: 500,
                        type: 'transferCode',
                        noBtn: true
                    }
                    this.riccioModalService.setSubject(obj)
                })()
                break;

            default: break;
        }

    }

    /**
     * @author GR-03
     * @copyright 用来订阅modal发射回来的数据流
     * @param     [param]
     * @return    [return]
     * @check     GR-05       GR-03
     */
    public getModalEmit(): void {
        this.modalRX$ = this.riccioModalService.getEmit().subscribe(res => {
            // console.log(res)
        })
    }

    /**
     * @author GR-03
     * @copyright 接受transfer组件的数据
     * @param     [param]
     * @return    [return]
     * @check     GR-05       GR-03
     * @param     {any}
     */
    public fnOutputTransfer(value: any): void {
        this.transferData = new Enum(value.name, value.id)
    }

    /**
     * @author GR-03
     * @copyright 点击获取验证码
     * @param     [param]
     * @return    [return]
     * @check     GR-05       GR-03
     */
    public fnGetSmsCode(): void {

        if (this.transferData['id'] == '') {
            this.riccioNotificationsService.setSubject({ text: '请选择成员', status: 'danger' })
        } else {
            this.smsTimeData = 60
            let codeInter = setInterval(() => {
                if (this.smsTimeData == 0) {
                    clearInterval(codeInter)
                    this.smsTimeData = 0
                }
                else {
                    this.smsTimeData--
                }
            }, 1000)

            this.grSettingService.postCompanyTransfer({
                type: 'sms_send'
            }).subscribe(res => {
                if (res.status === 1) {
                    this.riccioNotificationsService.setSubject({ text: '发送成功' })
                } else if (res.status === 0) {
                    this.smsTimeData = 0
                }
            }, error => {
                throw new Error(error)
            })
        }


    }

    /**
     * @author GR-03
     * @copyright 点击转让企业按钮发送请求
     * @param     [param]
     * @return    [return]
     * @check     GR-05       GR-03
     */
    public fnTransfer(): void {

        if (this.transferData['id'] == '') {
            this.riccioNotificationsService.setSubject({ text: '请选择成员', status: 'danger' })
        } else if (this.transferPassword == '') {
            this.riccioNotificationsService.setSubject({ text: '请输入密码', status: 'danger' })
        } else if (this.transferCode == null) {
            this.riccioNotificationsService.setSubject({ text: '请输入验证码', status: 'danger' })
        } else {
            this.grSettingService.postCompanyTransfer({
                user_id: this.transferData['id'],
                password: this.transferPassword,
                code: this.transferCode
            }).subscribe(res => {
                if (res.status === 1) {
                    this.transferPassword = ''
                    this.transferCode = null
                    this.transferData = new Enum('请选择成员')
                    this.riccioNotificationsService.setSubject({ text: '转让成功' })
                }
            }, error => {
                throw new Error(error)
            })
        }
    }

}
