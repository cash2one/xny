import {
    Component,
    OnInit,
    OnDestroy,
    AfterViewChecked,
    ChangeDetectorRef,
    Input
} from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'

import { RiccioModalService } from '@gr-public/riccio-modal/riccio-modal.service'
import { RiccioLoadingService } from '@gr-public/riccio-loading/riccio-loading.service'
import { RiccioNotificationsService } from '@gr-public/riccio-notifications/riccio-notifications.service'

import {
    SiteAccountFc,
    SiteAccountPost,
    Competitions
} from './site-account-edit.data'
import { SiteAccountEditService } from './site-account-edit.service'
import { BsbyService } from '../../../../../bsbyService.service'
import { GrCustomerService } from '../../../../../services/grManagement/grCustomer.service'
import { GrSiteService } from '../../../../../services/grManagement/grSite.service'
import { GrProductService } from '../../../../../services/grManagement/grProduct.service'
import { SitesService } from '../../../sites.service'

@Component({
    selector: 'bsby-site-account-edit',
    templateUrl: './site-account-edit.component.html',
    styleUrls: [
        '../../../../../../../Public/theme/apps-common/common.scss',
        '../../../../../bsbyService.common.scss',
        './site-account-edit.component.scss'
    ]
})
export class SiteAccountEditComponent implements OnInit, OnDestroy, AfterViewChecked {
    //编辑的数据
    @Input() accountInfo:any
    public siteOpObs: any
    //日期组件订阅
    public datePickEmit: any
    //pbox组件订阅
    public pboxEmit: any

    //账户信息表单控件
    public ctrlAccount: SiteAccountFc
    //账户信息数据模型
    public accountPostData: SiteAccountPost
    //账户信息表单
    public accountForm: FormGroup
    //提交按钮状态
    public submitBtn: {
        text: string;
        status: boolean
    }

    constructor(
        public builder: FormBuilder,
        public riccioModalService: RiccioModalService,
        public riccioLoadingService: RiccioLoadingService,
        public riccioNotificationsService: RiccioNotificationsService,
        public grProductService: GrProductService,
        public grSiteService: GrSiteService,
        public siteAccountEditService: SiteAccountEditService,
        public bsbyService: BsbyService,
        public changeDetectorRef: ChangeDetectorRef,
        private sitesService:SitesService
    ) {
        this.resolveCtrlAccount()
        this.accountPostData = new SiteAccountPost()
        this.resolveSubmitBtn()
    }

    ngOnInit() {
        this.resolveAccountForm()
        this.resolveSiteObs(this.accountInfo)
    }

    ngAfterViewChecked() {
        this.changeDetectorRef.detectChanges()
    }

    ngOnDestroy() {
        this.siteOpObs ? this.siteOpObs.unsubscribe() : {}
        this.datePickEmit ? this.datePickEmit.unsubscribe() : {}
        this.pboxEmit ? this.pboxEmit.unsubscribe() : {}
    }

    /**
     * 处理初始化提交按钮
     */
    resolveSubmitBtn() {
        this.submitBtn = {
            text: '更新',
            status: true
        }
    }

    /**
     * 初始化处理表单控件及验证（账户信息）
     * @author GR-05
     */
    resolveCtrlAccount() {
        this.ctrlAccount = {
            domain_admin: new FormControl('', [
                Validators.required
            ]),
            domain_user: new FormControl('', [
                Validators.required
            ]),
            domain_password: new FormControl('', [
                Validators.required
            ]),
            ftp_address: new FormControl(''),
            ftp_port: new FormControl(''),
            ftp_user: new FormControl(''),
            ftp_password: new FormControl('')
        }
    }

    /**
     * 初始化账户信息表单
     * @author GR-05
     */
    resolveAccountForm() {
        this.accountForm = this.builder.group({
            domain_admin: this.ctrlAccount.domain_admin,
            domain_user: this.ctrlAccount.domain_user,
            domain_password: this.ctrlAccount.domain_password,
            ftp_address: this.ctrlAccount.ftp_address,
            ftp_port: this.ctrlAccount.ftp_port,
            ftp_user: this.ctrlAccount.ftp_user,
            ftp_password: this.ctrlAccount.ftp_password
        })
    }

    /**
     * 处理监听
     * @param v 监听到的配置数据
     * @author GR-05 
     */
    resolveSiteObs(v: any) {
        this.accountPostData = {
            domain_admin:v['domain_admin'],
            domain_user:v['domain_user'],
            domain_password:v['domain_password'],
            ftp_address:v['ftp_address'],
            ftp_port:v['ftp_port'],
            ftp_user:v['ftp_user'],
            ftp_password:v['ftp_password']
        }
    }

    /**
    * 提交表单  
    */
    fnPostSite() {
        if (this.accountForm.valid) {
            this.submitBtn = {
                text:'提交中...',
                status:false
            }
            this.grSiteService.postSiteAccount({
                id:this.bsbyService.siteInfo.siteId,
                ...this.accountPostData
            }).subscribe(res=>{
                this.resolveSubmitBtn()
                if(res.status === 1){
                    this.siteAccountEditService.setEmit(this.accountPostData)
                    this.afterPost()
                }
            })
        } else {
            this.riccioNotificationsService.setSubject({
                text: '表单没完善',
                status: 'danger'
            })
        }
    }

    /**
     * 提交成功后续动作
     */
    afterPost(){
        this.riccioModalService.close()
        this.riccioNotificationsService.setSubject({
            text: '更新成功',
            status: 'success'
        })
        //一系列初始化
        this.accountForm.reset(new SiteAccountPost())
    }
}