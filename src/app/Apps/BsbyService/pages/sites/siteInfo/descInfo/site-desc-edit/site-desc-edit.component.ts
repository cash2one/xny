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
    SiteDescFc,
    SiteDescPost
} from './site-desc-edit.data'
import { SiteDescEditService } from './site-desc-edit.service'
import { BsbyService } from '../../../../../bsbyService.service'
import { GrCustomerService } from '../../../../../services/grManagement/grCustomer.service'
import { GrSiteService } from '../../../../../services/grManagement/grSite.service'
import { GrProductService } from '../../../../../services/grManagement/grProduct.service'
import { SitesService } from '../../../sites.service'

@Component({
    selector: 'bsby-site-desc-edit',
    templateUrl: './site-desc-edit.component.html',
    styleUrls: [
        '../../../../../../../Public/theme/apps-common/common.scss',
        '../../../../../bsbyService.common.scss',
        './site-desc-edit.component.scss'
    ]
})
export class SiteDescEditComponent implements OnInit, OnDestroy, AfterViewChecked {
    @Input() descInfo:any
    public siteOpObs: any

    //网站描述信息表单控件
    public ctrlDesc: SiteDescFc
    //网站描述信息数据模型
    public descPostData: SiteDescPost
    //网站描述信息表单
    public descForm: FormGroup
    //提交按钮状态
    public submitBtn: {
        text: string;
        status: boolean
    }

    constructor(
        private builder: FormBuilder,
        private riccioModalService: RiccioModalService,
        private riccioLoadingService: RiccioLoadingService,
        private riccioNotificationsService: RiccioNotificationsService,
        private grProductService: GrProductService,
        private grSiteService: GrSiteService,
        private siteDescEditService: SiteDescEditService,
        private bsbyService: BsbyService,
        private changeDetectorRef: ChangeDetectorRef,
        private sitesService:SitesService
    ) {
        this.resolveCtrlDesc()
        this.descPostData = new SiteDescPost()
        this.resolveSubmitBtn()
    }

    ngOnInit() {
        this.resolvedescForm()
        this.resolveSiteObs(this.descInfo)
    }

    ngAfterViewChecked() {
        this.changeDetectorRef.detectChanges()
    }

    ngOnDestroy() {
        this.siteOpObs ? this.siteOpObs.unsubscribe() : {}
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
     * 初始化处理表单控件及验证（网站信息）
     * @author GR-05
     */
    resolveCtrlDesc() {
        this.ctrlDesc = {
            title: new FormControl('',[Validators.required]),
            description: new FormControl('',[Validators.required]),
            keyword: new FormControl('',[Validators.required])
        }
    }

    /**
     * 初始化网站信息表单
     * @author GR-05
     */
    resolvedescForm() {
        this.descForm = this.builder.group({
            title: this.ctrlDesc.title,
            description: this.ctrlDesc.description,
            keyword: this.ctrlDesc.keyword
        })
    }

    /**
     * 处理监听
     * @param v 监听到的配置数据
     * @author GR-05 
     */
    resolveSiteObs(v: any) {
        this.descPostData = {
            title:v['title'],
            description:v['description'],
            keyword:v['keyword'],
        }
    }

    /**
    * 提交表单  
    */
    fnPostSite() {
        if (this.descForm.valid) {
            this.submitBtn = {
                text:'提交中...',
                status:false
            }
            this.grSiteService.postSiteBasic({
                id:this.bsbyService.siteInfo.siteId,
                ...this.descPostData
            }).subscribe(res=>{
                this.resolveSubmitBtn()
                if(res.status === 1){
                    this.siteDescEditService.setEmit(this.descPostData)
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
        this.descForm.reset(new SiteDescPost())
    }
}