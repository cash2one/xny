import {
    Component,
    OnInit,
    OnDestroy,
    Output,
    EventEmitter,
    ViewChild,
    ElementRef,
    ViewContainerRef
} from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { Subscription } from 'rxjs/Subscription'
import { FileUploader } from 'ng2-file-upload'

import { RiccioModalService } from '@gr-public/riccio-modal/riccio-modal.service'
import { RiccioLoadingService } from '@gr-public/riccio-loading/riccio-loading.service'
import { RiccioNotificationsService } from '@gr-public/riccio-notifications/riccio-notifications.service'

import { GrAppInfoService } from '../../../../../../ApiServices/grAppInfo/grAppInfo.service'
import { BsbyService } from '../../../../bsbyService.service'
import { DemandADDFc, PostData } from './demand-add.data'
import { DemandsService } from '../demands.service'

@Component({
    selector: 'app-bsby-service-demand-add',
    templateUrl: './demand-add.component.html',
    styleUrls: [
        '../../../../../../Public/theme/apps-common/common.scss',
        '../../../../../BsbyService/bsbyService.common.scss',
        './demand-add.component.scss'
    ]
})
export class DemandAddComponent implements OnInit, OnDestroy {
    @Output() demandFormEmit: EventEmitter<PostData> = new EventEmitter<PostData>()

    //服务监听
    public dObj: Subscription
    //监听关闭事件
    public closeObj: Subscription
    //监听modal
    public modalObj: Subscription
    //关键词操作表单控件
    public ctrlDemand: DemandADDFc
    //提交服务器数据
    public demandData: PostData
    //关键词表单
    public demandForm: FormGroup
    //添加按钮状态
    public addBtn: {
        text: string;
        status: boolean
    }
    uploadUrl:string

    constructor(
        private builder: FormBuilder,
        private riccioModalService: RiccioModalService,
        private riccioLoadingService: RiccioLoadingService,
        private riccioNotificationsService: RiccioNotificationsService,
        private demandsService: DemandsService,
        private bsbyService: BsbyService,
        private grAppInfoService: GrAppInfoService
    ) {
        this.initData()
    }

    ngOnInit() {
        this.resolveDemandForm()
        this.modalObj = this.riccioModalService.getEmit().subscribe(res => {
            if (res.type == 'close') {
                this.reset()
            }
        })
        this.dObj = this.demandsService.dOpObs.subscribe(res => {
            this.resolveDemandsObs(res)
        })
        this.closeObj = this.demandsService.closeAddObs.subscribe(res => {
            this.reset()
        })
        this.uploadUrl = this.grAppInfoService.postUploadURL + `?model=${this.bsbyService.appInfo.model}`
    }

    ngOnDestroy() {
        this.modalObj ? this.modalObj.unsubscribe() : {}
        this.dObj ? this.dObj.unsubscribe() : {}
        this.closeObj ? this.closeObj.unsubscribe() : {}
    }

    /**
     * 初始化数据
     * @author GR-05
     */
    initData() {
        this.demandData = new PostData()
        this.resolveDemandCtrl()
        this.addBtn = {
            text: '提交',
            status: true
        }
    }

    /**
     * 处理服务监听
     * @param v 监听到的配置数据
     * @author GR-05 
     */
    resolveDemandsObs(v: any) {
        let modalData: any
        modalData = {
            header: '提交需求',
            size: 600,
            noBtn: true
        }
        this.riccioModalService.setSubject(modalData)
    }

    /**
     * 处理表单控件
     * @author GR-05
     */
    resolveDemandCtrl() {
        let checkEmpty = this.checkEmpty.bind(this)
        this.ctrlDemand = {
            content: new FormControl('', [
                Validators.required,
                checkEmpty
            ])
        }
    }

    /**
     * 验证非空
     * @param mobile 手机控件
     * @author GR-05
     */
    checkEmpty(content: FormControl) {
        let emptyResult = content.value ? content.value.toString().trim().length > 0 : false
        return emptyResult ? null : { contentError: true };
    }

    /**
     * 处理初始化需求表单
     * @author GR-05
     */
    resolveDemandForm() {
        this.demandForm = this.builder.group({
            content: this.ctrlDemand.content
        })
    }

    /**
     * 添加需求
     * @author GR-05
     */
    public addDemand() {
        if (this.demandForm.valid) {
            this.addBtn = {
                text: '提交中...',
                status: false
            }
            this.demandFormEmit.emit(this.demandData)
        }
    }

    /**
     * 重置表单
     * @author GR-05
     */
    public reset() {
        this.addBtn = {
            text: '提交',
            status: true
        }
        this.demandForm.reset(new PostData())
        this.riccioModalService.setSubject({})
    }

    /**
     * 监听上传组件的通知
     * @param fileList 
     * @author GR-05 
     */
    uploadEmit(fileList:Array<string>){
        this.demandData.images = fileList
    }
}