import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    ElementRef,
    ViewContainerRef,
    Output,
    EventEmitter
} from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { Subscription } from 'rxjs/Subscription'

import { RiccioLoadingService } from '@gr-public/riccio-loading/riccio-loading.service'
import { RiccioModalService } from '@gr-public/riccio-modal/riccio-modal.service'
import { RiccioPopDatePickerService } from '@gr-public/riccio-pop-datePicker/riccio-pop-datePicker.service'
import { DatePickerConfig } from '@gr-public/riccio-pop-datePicker/riccio-pop-datePicker.data'
import { BsbyService } from '../../../../bsbyService.service'
import { BackLinkOpFc, PostData } from './backLink-op.data'
import { BackLinkOpService } from './backLink-op.service'
import { GrDateToolService } from '../../../../../../ApiServices/grDateTool/dateTool.service'

@Component({
    selector: 'app-bsby-service-backLink-op',
    templateUrl: './backLink-op.component.html',
    styleUrls: [
        '../../../../../../Public/theme/apps-common/common.scss',
        '../../../../../BsbyService/bsbyService.common.scss',
        './backLink-op.component.scss'
    ]
})
export class BackLinkOpComponent implements OnInit, OnDestroy {
    /**
     * 下拉按钮元素
     */
    @ViewChild('showInputTime') showInputTime: ElementRef;

    @Output() backLinkFormEmit: EventEmitter<any> = new EventEmitter<any>()

    //服务监听
    public blObj: Subscription
    // 关闭事件监听
    public closeObj: Subscription
    // 监听modal
    public modalObj: Subscription
    //文章操作表单控件
    public ctrlBackLink: BackLinkOpFc
    //提交服务器数据
    public backLinkData: PostData
    //文章表单
    public backLinkForm: FormGroup
    //下拉选择显示
    public backLinkShow: {
        showInputTime: string;
    }
    //关键词类型
    public types: any[]
    //配置数据
    public blOpConfig: {
        type: string,
        comType: string,
        data?: any
    }
    //时间组件监听
    public datePickerObj: Subscription
    //提交按钮状态
    public submitBtn: {
        text: string;
        status: boolean
    }

    constructor(
        private builder: FormBuilder,
        private backLinkOpService: BackLinkOpService,
        private riccioModalService: RiccioModalService,
        private riccioPopDatePickerService: RiccioPopDatePickerService,
        private bsbyService: BsbyService,
        private grDateToolService:GrDateToolService
    ) {
        this.initData()
        this.initSubmitBtn()
    }

    ngOnInit() {
        this.resolveBackLinkForm()
        this.blObj = this.backLinkOpService.blOpObs.subscribe(res => {
            this.resolveBackLinkObs(res)
        })
        this.datePickerObj = this.riccioPopDatePickerService.emitObs.subscribe(res => {
            this.resolveDate(res)
        })
        this.modalObj = this.riccioModalService.getEmit().subscribe(res => {
            if (res.type === 'close') {
                this.reset()
            }
        })
        this.closeObj = this.backLinkOpService.closeObs.subscribe(res => {
            this.reset()
        })
    }

    ngOnDestroy() {
        this.blObj ? this.blObj.unsubscribe() : {}
        this.datePickerObj ? this.datePickerObj.unsubscribe() : {}
        this.closeObj ? this.closeObj.unsubscribe() : {}
    }

    /**
     * 初始化数据
     * @author GR-05
     */
    initData() {
        this.backLinkData = new PostData()
        this.resolveBackLinkShow()
        this.resolveBackLinkCtrl()
    }

    /**
     * 重置提交按钮
     * @author GR-05
     */
    initSubmitBtn() {
        this.submitBtn = {
            text: '添加',
            status: true
        }
    }

    /**
     * 处理服务监听
     * @param v 监听到的配置数据
     * @author GR-05 
     */
    resolveBackLinkObs(v: any) {
        this.blOpConfig = v
        let modalData: any
        if (v.type === 'add') {
            modalData = {
                header: '添加外链',
                size: 600,
                noBtn: true
            }
            this.submitBtn.text = '添加'
        } else if (v.type === 'edit') {
            modalData = {
                header: '编辑外链',
                size: 600,
                noBtn: true
            }
            this.backLinkData = {
                title: this.blOpConfig.data['title'],
                url: this.blOpConfig.data['url'],
                platform: this.blOpConfig.data['platform'],
                inputtime: this.grDateToolService.resolveDate(this.blOpConfig.data['inputtime'])
            }
            this.backLinkShow = {
                showInputTime: this.blOpConfig.data['inputtime']
            }
            this.submitBtn.text = '更新'
        }
        this.riccioModalService.setSubject(modalData)
    }

    /**
     * 处理下拉显示
     * @author GR-05
     */
    resolveBackLinkShow() {
        this.backLinkShow = {
            showInputTime: new PostData().inputtime
        }
    }

    /**
     * 处理表单控件
     * @author GR-05
     */
    resolveBackLinkCtrl() {
        let checkUrl = this.checkUrl.bind(this)
        this.ctrlBackLink = {
            title: new FormControl('', [
                Validators.required
            ]),
            url: new FormControl('', [
                Validators.required,
                checkUrl
            ]),
            platform: new FormControl('', [
                Validators.required
            ]),
            inputtime: new FormControl('', [
                Validators.required
            ])
        }
    }

    /**
     * 处理初始化关键词表单
     * @author GR-05
     */
    resolveBackLinkForm() {
        this.backLinkForm = this.builder.group({
            title: this.ctrlBackLink.title,
            url: this.ctrlBackLink.url,
            platform: this.ctrlBackLink.platform,
            inputtime: this.ctrlBackLink.inputtime
        })
    }

    /**
     * 显示时间组件
     * @author GR-05
     */
    public fnShowInputDate() {
        let position = this.showInputTime.nativeElement.getBoundingClientRect()
        let dateConfig: DatePickerConfig = {
            style: {
                left: position.left,
                top: position.top,
                width: position.width
            },
            type: this.blOpConfig.comType,
            expectClick: this.showInputTime,
            date:new Date(this.backLinkData.inputtime)
        }
        this.riccioPopDatePickerService.setDp(dateConfig)
    }

    /**
     * 处理时间组件传回数据
     * @param res 
     * @author GR-05
     */
    public resolveDate(res: {
        type: string;
        date: Date;
    }) {
        // 确保准确调用者
        if (res.type === this.blOpConfig.comType) {
            this.backLinkShow.showInputTime = this.grDateToolService.resolveDate(res.date.toLocaleString('chinese', { hour12: false })) 
            this.backLinkData.inputtime = this.grDateToolService.resolveDate(res.date.toLocaleString('chinese', { hour12: false }))
        }
    }

    /**
     * 表单数据返回给调用者
     * @author GR-05
     */
    public fnEmitOpBackLink() {
        if (this.backLinkForm.valid) {
            this.submitBtn = {
                text: this.blOpConfig.type == 'add' ? '添加中...' : '更新中...',
                status: false
            }
            this.backLinkFormEmit.emit({
                type: this.blOpConfig.type,
                data: this.backLinkData
            })
        }
    }

    /**
     * 重置组件
     * @author GR-05
     */
    public reset() {
        // this.initData()
        this.initSubmitBtn()
        this.backLinkForm.reset(new PostData())
        this.riccioModalService.setSubject({})
    }

    /**
     * 简单检查链接
     * @param url 域名控件
     * @author GR-05 
     */
    checkUrl(url: FormControl) {
        let urlResult = this.bsbyService.validUrl(url.value, true)
        return urlResult ? null : { urlError: true };
    }
}