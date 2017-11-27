import {
    Component,
    OnInit,
    OnDestroy,
    AfterViewInit,
    AfterViewChecked,
    ElementRef,
    ViewChild,
    ChangeDetectorRef
} from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'

import { RiccioModalService } from '@gr-public/riccio-modal/riccio-modal.service'
import { RiccioLoadingService } from '@gr-public/riccio-loading/riccio-loading.service'
import { RiccioPboxService } from '@gr-public/riccio-pbox/riccio-pbox.service'
import { RiccioNotificationsService } from '@gr-public/riccio-notifications/riccio-notifications.service'
import { GrDateToolService } from '@gr-api-service/grDateTool/dateTool.service'

import {
    SiteAccountFc,
    SiteBaseFc,
    SiteAccountPost,
    SiteBasePost,
    Competitions,
    OpTypes,
    IConf
} from './site-op.data'
import { SiteOpService } from './site-op.service'
import { BsbyService } from '../../bsbyService.service'
import { GrCustomerService } from '../../services/grManagement/grCustomer.service'
import { GrSiteService } from '../../services/grManagement/grSite.service'
import { GrProductService } from '../../services/grManagement/grProduct.service'
import { SiteSelectComService } from './site-select-com/site-select-com.service'

import { DatePickerConfig } from '@gr-public/riccio-pop-datePicker/riccio-pop-datePicker.data'
import { RiccioPopDatePickerService } from '@gr-public/riccio-pop-datePicker/riccio-pop-datePicker.service'

@Component({
    selector: 'bsby-site-op',
    templateUrl: './site-op.component.html',
    styleUrls: [
        '../../../../Public/theme/apps-common/common.scss',
        '../../bsbyService.common.scss',
        './site-op.component.scss'
    ]
})
export class SiteOpComponent implements OnInit, OnDestroy, AfterViewChecked,AfterViewInit {
    //显示行业竞争程度控件
    @ViewChild('showCompetitions') showCompetitions: ElementRef;
    // 显示选择方案组件
    @ViewChild('showProducts') showProducts: ElementRef;
    //起始时间控件
    @ViewChild('showStarttime') showStarttime: ElementRef;
    //结束时间控件
    @ViewChild('showEndtime') showEndtime: ElementRef;

    // 操作类型 （添加、编辑）
    public opType: OpTypes
    public siteOpObs: any

    //选择企业组件的订阅
    public selectComEmit: any
    //日期组件订阅
    public datePickEmit: any
    //pbox组件订阅
    public pboxEmit: any
    //modal组件订阅
    public modalEmit: any

    //表单类型 base   account
    public formType: string

    //基本信息表单控件
    public ctrlBase: SiteBaseFc
    //账户信息表单控件
    public ctrlAccount: SiteAccountFc
    //基本信息数据模型
    public basePostData: SiteBasePost
    //账户信息数据模型
    public accountPostData: SiteAccountPost
    //基本信息表单
    public baseForm: FormGroup
    //账户信息表单
    public accountForm: FormGroup
    //选择显示的文字
    public selectShow: {
        cname: string,
        competition: string,
        starttime: string,
        endtime: string,
        product: string
    }
    //竞争力选择项
    public competitions: any[]
    //是否显示日期选择
    public dateAbout: {
        show: boolean;
        type: string;
        style: any;
    }
    //提交按钮状态
    public submitBtn: {
        text: string;
        status: boolean
    }

    constructor(
        private builder: FormBuilder,
        private riccioModalService: RiccioModalService,
        private riccioPboxService: RiccioPboxService,
        private riccioLoadingService: RiccioLoadingService,
        private riccioNotificationsService: RiccioNotificationsService,
        private riccioPopDatePickerService: RiccioPopDatePickerService,
        private grProductService: GrProductService,
        private grSiteService: GrSiteService,
        private siteOpService: SiteOpService,
        private siteSelectComService: SiteSelectComService,
        private bsbyService: BsbyService,
        private changeDetectorRef: ChangeDetectorRef,
        private grDateToolService:GrDateToolService
    ) {
        this.resolveCtrlBase()
        this.resolveCtrlAccount()
        this.basePostData = new SiteBasePost()
        this.accountPostData = new SiteAccountPost()
        this.comInit()
        this.resolveSubmitBtn()
    }

    ngOnInit() {
        this.resolveBaseForm()
        this.resolveAccountForm()
        this.siteOpObs = this.siteOpService.sOpObs.subscribe(res => {
            this.resolveSiteObs(res)
        })
        this.selectComEmit = this.siteSelectComService.emitObs.subscribe(res => {
            this.resolveSelectComEmit(res)
        })
        this.datePickEmit = this.riccioPopDatePickerService.emitObs.subscribe(res => {
            this.resolveDate(res)
        })
        this.pboxEmit = this.riccioPboxService.getEmit().subscribe(res => {
            this.resolvePbox(res)
        })
        this.modalEmit = this.riccioModalService.getEmit().subscribe(res => {
            if (res.type == 'close') {
                //初始化
                this.baseForm.reset(new SiteBasePost())
                this.accountForm.reset(new SiteAccountPost())
                this.comInit()
            }
        })
        this.riccioModalService.getEmit().subscribe(res => {
            if (res.type === 'close') {
                this.riccioPopDatePickerService.close()
            }
        })
    }

    ngAfterViewChecked() {
        this.changeDetectorRef.detectChanges()
    }

    ngAfterViewInit(){
        this.siteOpService.setViewInit()
    }

    ngOnDestroy() {
        this.siteOpObs ? this.siteOpObs.unsubscribe() : {}
        this.selectComEmit ? this.selectComEmit.unsubscribe() : {}
        this.datePickEmit ? this.datePickEmit.unsubscribe() : {}
        this.pboxEmit ? this.pboxEmit.unsubscribe() : {}
        this.modalEmit ? this.modalEmit.unsubscribe() : {}
    }

    /**
     * 一些数据初始化操作
     * @author GR-05
     */
    comInit() {
        this.formType = 'base'
        this.competitions = new Competitions().data
        this.selectShow = {
            cname: '选择公司',
            competition: this.competitions[0].name,
            product: '选择产品方案',
            starttime: new Date().toLocaleDateString(),
            endtime: new Date().toLocaleDateString()
        }
        this.dateAbout = {
            show: false,
            type: 'start',
            style: {}
        }
    }

    /**
     * 处理初始化提交按钮
     */
    resolveSubmitBtn() {
        this.submitBtn = {
            text: '提交',
            status: true
        }
    }

    /**
     * 初始化处理表单控件及验证（基本信息）
     * @author GR-05
     */
    resolveCtrlBase() {
        let checkDomain = this.checkDomain.bind(this)
        this.ctrlBase = {
            cid: new FormControl('', [
                Validators.required
            ]),
            domain: new FormControl('', [
                Validators.required,
                checkDomain
            ]),
            competition: new FormControl(''),
            product_id: new FormControl('', [
                Validators.required
            ])
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
     * 初始化基本信息表单
     * @author GR-05
     */
    resolveBaseForm() {
        this.baseForm = this.builder.group({
            cid: this.ctrlBase.cid,
            domain: this.ctrlBase.domain,
            competition: this.ctrlBase.competition,
            product_id: this.ctrlBase.product_id
        })
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
     * 简单检查域名
     * @param domain 域名控件
     * @author GR-05 
     */
    checkDomain(domain: FormControl) {
        let domainResult = this.bsbyService.validUrl(domain.value)
        return domainResult ? null : { mobileError: true };
    }

    /**
     * 处理监听
     * @param v 监听到的配置数据
     * @author GR-05 
     */
    resolveSiteObs(v: IConf) {
        this.opType = v.type
        switch(this.opType){
            case OpTypes.ADD:
                if(v.data){
                    this.basePostData.cid = v.data['cid']
                    this.selectShow.cname = v.data['name']
                }
                break;
            case OpTypes.ADDFORCOM:
                this.basePostData.cid = v.data['cid']
                this.selectShow.cname = v.data['name']
                break
        }
    }

    /**
     * 显示选择公司组件
     * @author GR-05 
     */
    fnSelectCom() {
        if(this.opType == OpTypes.ADD){
            this.siteSelectComService.setSscOp(true)
        }
    }

    /**
     * 获取处理选择公司组件传回数据
     * @param data 公司数据
     * @author GR-05 
     */
    resolveSelectComEmit(data: {
        id: number,
        name: string
    }) {
        this.basePostData.cid = data.id
        this.selectShow.cname = data.name
    }

    /**
     * 显示行业竞争程度
     * @param el 
     * @author GR-05 
     */
    fnShowCompetitions(el: any) {
        this.bsbyService.showPbox(
            this.showCompetitions,
            el,
            this.competitions,
            'siteCompetitions'
        )
    }

    /**
     * 显示方案选择
     * @param el 点击元素
     * @author GR-05 
     */
    fnSelectProduct(el: any) {
        this.riccioLoadingService.setLoading({
            message: '获取所有方案中'
        })
        this.grProductService.getProductList({}).subscribe(res => {
            this.riccioLoadingService.closeLoading()
            if (res.status === 1) {
                let productList = res.data.data
                let data = []
                productList.forEach(product => {
                    data.push({
                        name: product.name,
                        value: product.id
                    })
                })
                this.bsbyService.showPbox(
                    this.showProducts,
                    el,
                    data,
                    'siteProcucts'
                )
            }
        })
    }

    /**
     * 显示启用时间选择组件
     * @author GR-05 
     */
    fnShowDate(type: string) {
        let position: any
        let dateType: string
        let el: ElementRef
        let date:Date
        if (type == 'start') {
            position = this.showStarttime.nativeElement.getBoundingClientRect()
            dateType = 'siteOpStart'
            el = this.showStarttime
            this.selectShow.starttime ? date = new Date(this.selectShow.starttime) : {}
        } else if (type == 'end') {
            position = this.showEndtime.nativeElement.getBoundingClientRect()
            dateType = 'siteOpEnd'
            el = this.showEndtime
            this.selectShow.endtime ? date = new Date(this.selectShow.endtime) : {}
        }
        let dateConfig: DatePickerConfig = {
            style: {
                left: position.left,
                top: position.top,
                width: position.width
            },
            type: dateType,
            expectClick: el,
            date:date
        }
        this.riccioPopDatePickerService.setDp(dateConfig)
    }

    /**
     * 处理日期组件的数据
     * @param date  Date类型数据 
     * @author GR-05 
     */
    resolveDate(data: {
        type: string,
        date: Date
    }) {
        if(data.date && data.date.toString() != ''){
            switch (data.type) {
                case 'siteOpStart':
                    if(this.grDateToolService.compareStartEndDate(data.date.toLocaleDateString(),this.selectShow.endtime)){
                        this.selectShow.starttime = data.date.toLocaleDateString()
                        this.basePostData.starttime = data.date.toLocaleDateString()
                    }else{
                        this.riccioNotificationsService.setSubject({
                            text:'开始时间不能晚于结束时间',
                            status:'danger'
                        })
                    }
                    break;
                case 'siteOpEnd':
                    if(this.grDateToolService.compareStartEndDate(this.selectShow.starttime,data.date.toLocaleDateString())){
                        this.selectShow.endtime = data.date.toLocaleDateString()
                        this.basePostData.endtime = data.date.toLocaleDateString()
                    }else{
                        this.riccioNotificationsService.setSubject({
                            text:'结束时间不能早于开始时间',
                            status:'danger'
                        })
                    }
                    break;
            }
        }
    }

    /**
     * 处理pbox回传数据
     * @param res
     * @author GR-05 
     *  
     */
    resolvePbox(res: any) {
        switch (res.type) {
            case 'siteCompetitions':
                //竞争程度
                this.selectShow.competition = res.data.name
                this.basePostData.competition = res.data.value
                break
            case 'siteProcucts':
                //产品方案
                this.selectShow.product = res.data.name
                this.basePostData.product_id = res.data.value
                break
        }
    }

    /**
     * 跳转表单
     * @param type 
     */
    fnNextForm(type: string) {
        if (type == 'account') {
            if (this.baseForm.valid) {
                this.formType = type
            } else {
                this.riccioNotificationsService.setSubject({
                    text: '基本信息表单还没完善',
                    status: 'danger'
                })
            }
        } else if (type == 'base') {
            this.formType = type
        }
    }

    /**
    * 提交表单  
    */
    fnPostSite() {
        if (this.baseForm.valid && this.accountForm.valid) {
            let postData = Object.assign(this.basePostData, this.accountPostData)
            this.submitBtn = {
                text: '提交中...',
                status: false
            }
            this.grSiteService.postSiteAdd(postData).subscribe(res => {
                this.resolveSubmitBtn()
                if (res.status === 1) {
                    this.afterPost(res.data.id)
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
    afterPost(siteID:number) {
        this.riccioModalService.setSubject({})
        this.riccioNotificationsService.setSubject({
            text: '添加成功',
            status: 'success'
        })
        //一系列初始化
        this.baseForm.reset(new SiteBasePost())
        this.accountForm.reset(new SiteAccountPost())
        this.comInit()

        this.siteOpService.setEmit(siteID)
    }
}