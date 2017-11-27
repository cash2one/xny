import {
    Component,
    OnInit,
    OnDestroy,
    AfterViewChecked,
    ChangeDetectorRef,
    Input,
    ViewChild,
    ElementRef
} from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'

import { RiccioModalService } from '@gr-public/riccio-modal/riccio-modal.service'
import { RiccioLoadingService } from '@gr-public/riccio-loading/riccio-loading.service'
import { RiccioNotificationsService } from '@gr-public/riccio-notifications/riccio-notifications.service'
import { RiccioPboxService } from '@gr-public/riccio-pbox/riccio-pbox.service'
import { RiccioPopDatePickerService } from '@gr-public/riccio-pop-datePicker/riccio-pop-datePicker.service'
import {
    SiteServiceFc,
    SiteServicePost,
    ServiceTypes
} from './site-service-edit.data'
import { DatePickerConfig } from '@gr-public/riccio-pop-datePicker/riccio-pop-datePicker.data'
import { SiteServiceEditService } from './site-service-edit.service'
import { BsbyService } from '../../../../../bsbyService.service'
import { GrCustomerService } from '../../../../../services/grManagement/grCustomer.service'
import { GrSiteService } from '../../../../../services/grManagement/grSite.service'
import { GrProductService } from '../../../../../services/grManagement/grProduct.service'
import { SitesService } from '../../../sites.service'
import { GrDateToolService } from '../../../../../../../ApiServices/grDateTool/dateTool.service'

@Component({
    selector: 'bsby-site-service-edit',
    templateUrl: './site-service-edit.component.html',
    styleUrls: [
        '../../../../../../../Public/theme/apps-common/common.scss',
        '../../../../../bsbyService.common.scss',
        './site-service-edit.component.scss'
    ]
})
export class SiteServiceEditComponent implements OnInit, OnDestroy, AfterViewChecked {

    @ViewChild('serviceType') serviceType:ElementRef
    @ViewChild('startDate') startDate:ElementRef
    @ViewChild('endDate') endDate:ElementRef

    //编辑的数据
    @Input() serviceInfo:any


    public siteOpObs: any
    //日期组件订阅
    public datePickEmit: any
    //pbox组件订阅
    public pboxEmit: any

    //账户信息表单控件
    public ctrlService: SiteServiceFc
    //账户信息数据模型
    public servicePostData: SiteServicePost
    //账户信息表单
    public serviceForm: FormGroup
    //提交按钮状态
    public submitBtn: {
        text: string;
        status: boolean
    }
    // 数据显示
    public dataShow:{
        service_type:String
    }

    constructor(
        private builder: FormBuilder,
        private riccioModalService: RiccioModalService,
        private riccioLoadingService: RiccioLoadingService,
        private riccioNotificationsService: RiccioNotificationsService,
        private grProductService: GrProductService,
        private grSiteService: GrSiteService,
        private SiteServiceEditService: SiteServiceEditService,
        private bsbyService: BsbyService,
        private changeDetectorRef: ChangeDetectorRef,
        private sitesService:SitesService,
        private riccioPboxService:RiccioPboxService,
        private riccioPopDatePickerService:RiccioPopDatePickerService,
        private grDateToolService:GrDateToolService
    ) {
        this.resolveCtrlService()
        this.servicePostData = new SiteServicePost()
        this.resolveSubmitBtn()
    }

    ngOnInit() {
        this.resolveserviceForm()
        this.resolveSiteObs(this.serviceInfo)
        this.pboxEmit = this.riccioPboxService.getEmit().subscribe(res=>{
            this.resolvePbox(res)
        })
        this.datePickEmit = this.riccioPopDatePickerService.emitObs.subscribe(res=>{
            this.resolveDate(res)
        })
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
    resolveCtrlService() {
        this.ctrlService = {
            starttime: new FormControl('', [
                Validators.required
            ]),
            endtime: new FormControl('', [
                Validators.required
            ]),
            service_type:new FormControl('')
        }
    }

    /**
     * 处理监听pbox
     * @param res 
     * @author GR-05
     */
    resolvePbox(res){
        switch(res.type){
            case 'siteServiceType':
                //修改服务方式
                this.servicePostData.service_type = res.data.value
                this.dataShow.service_type = res.data.name
                break
        }
    }

    /**
     * 初始化账户信息表单
     * @author GR-05
     */
    resolveserviceForm() {
        this.serviceForm = this.builder.group({
            starttime: this.ctrlService.starttime,
            endtime: this.ctrlService.endtime,
            service_type:this.ctrlService.service_type
        })
    }

    /**
     * 处理监听
     * @param v 监听到的配置数据
     * @author GR-05 
     */
    resolveSiteObs(v: any) {
        this.servicePostData = {
            starttime:v['starttime'],
            endtime:v['endtime'],
            service_type:v['service_type']
        }
        this.resolveShow()
    }
    
    /**
     * 处理显示
     * @author GR-05 
     */
    resolveShow(){
        this.dataShow = {
            service_type:new ServiceTypes().data.find(s => s.value == this.servicePostData.service_type).name
        }
    }

    /**
    * 提交表单
    * @author GR-05 
    */
    fnPostSite() {
        if (this.serviceForm.valid) {
            this.submitBtn = {
                text:'提交中...',
                status:false
            }
            this.grSiteService.postSiteService({
                id:this.bsbyService.siteInfo.siteId,
                ...this.servicePostData
            }).subscribe(res=>{
                this.resolveSubmitBtn()
                if(res.status === 1){
                    this.SiteServiceEditService.setEmit(this.servicePostData)
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
     * @author GR-05 
     */
    afterPost(){
        this.riccioModalService.close()
        this.riccioNotificationsService.setSubject({
            text: '更新成功',
            status: 'success'
        })
        //一系列初始化
        this.serviceForm.reset(new SiteServicePost())
    }

    /**
     * 显示服务方式选择
     * @param el 
     * @param e 
     * @author GR-05 
     */
    fnShowType(el:any,e:MouseEvent){
        this.bsbyService.showPbox(
            this.serviceType,
            el,
            new ServiceTypes().data,
            'siteServiceType'
        )
    }

    /**
     * 显示启用时间选择组件
     * @author GR-05 
     */
    fnShowDate(type: string) {
        let position: any
        let dateType: string
        let el:ElementRef
        let date:Date
        if (type == 'start') {
            position = this.startDate.nativeElement.getBoundingClientRect()
            dateType = 'siteServiceStart'
            el = this.startDate
            this.servicePostData.starttime ? date = new Date(this.servicePostData.starttime) : {}
        } else if (type == 'end') {
            position = this.endDate.nativeElement.getBoundingClientRect()
            dateType = 'siteServiceEnd'
            el = this.endDate
            this.servicePostData.endtime ? date = new Date(this.servicePostData.endtime) : {}
        }
        let dateConfig: DatePickerConfig = {
            style: {
                left: position.left,
                top: position.top,
                width: position.width
            },
            type: dateType,
            expectClick:el,
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
                case 'siteServiceStart':
                    if(this.grDateToolService.compareStartEndDate(data.date.toLocaleDateString(),this.servicePostData.endtime)){
                        //成功
                        this.servicePostData.starttime = data.date.toLocaleDateString()
                    }else{
                        this.riccioNotificationsService.setSubject({
                            text:'开始时间不要晚于结束时间',
                            status:'danger'
                        })
                    }
                    break;
                case 'siteServiceEnd':
                    if(this.grDateToolService.compareStartEndDate(this.servicePostData.starttime,data.date.toLocaleDateString())){
                        this.servicePostData.endtime = data.date.toLocaleDateString()
                    }else{
                        this.riccioNotificationsService.setSubject({
                            text:'结束时间不要早于开始时间',
                            status:'danger'
                        })
                    }
                    break;
            }
        }
    }
}