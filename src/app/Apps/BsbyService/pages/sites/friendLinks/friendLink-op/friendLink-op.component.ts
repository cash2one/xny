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

import { RiccioPboxService } from '@gr-public/riccio-pbox/riccio-pbox.service'
import { RiccioLoadingService } from '@gr-public/riccio-loading/riccio-loading.service'
import { RiccioModalService } from '@gr-public/riccio-modal/riccio-modal.service'
import { RiccioPopDatePickerService } from '@gr-public/riccio-pop-datePicker/riccio-pop-datePicker.service'
import { GrDateToolService } from '../../../../../../ApiServices/grDateTool/dateTool.service'

import { DatePickerConfig } from '@gr-public/riccio-pop-datePicker/riccio-pop-datePicker.data'
import { BsbyService } from '../../../../bsbyService.service'
import { FriendLinkOpFc, PostData, IsLink, Status } from './friendLink-op.data'
import { FriendLinkOpService } from './friendLink-op.service'


@Component({
    selector: 'app-bsby-service-friendLink-op',
    templateUrl: './friendLink-op.component.html',
    styleUrls: [
        '../../../../../../Public/theme/apps-common/common.scss',
        '../../../../../BsbyService/bsbyService.common.scss',
        './friendLink-op.component.scss'
    ]
})
export class FriendLinkOpComponent implements OnInit, OnDestroy {
    /**
     * 下拉按钮元素
     */
    @ViewChild('showIsLinks') showIsLinks: ElementRef;
    @ViewChild('showStatus') showStatus: ElementRef;
    @ViewChild('showInputTime') showInputTime: ElementRef;

    @Output() friendLinkFormEmit: EventEmitter<any> = new EventEmitter<any>()

    //服务监听
    public flObj: Subscription
    // 关闭事件监听
    public closeObj: Subscription
    //pbox监听
    public pboxObj: Subscription
    //modal监听
    public modalObj: Subscription
    //文章操作表单控件
    public ctrlFriendLink: FriendLinkOpFc
    //提交服务器数据
    public friendLinkData: PostData
    //文章表单
    public friendLinkForm: FormGroup
    //下拉选择显示
    public friendLinkShow: {
        isLink: string;
        status: string;
        showInputTime: string;
    }
    //关键词类型
    public types: any[]
    //配置数据
    public flOpConfig: {
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
        private friendLinkService: FriendLinkOpService,
        private riccioModalService: RiccioModalService,
        private riccioPboxService: RiccioPboxService,
        private riccioPopDatePickerService: RiccioPopDatePickerService,
        private bsbyService: BsbyService,
        private grDateToolService:GrDateToolService
    ) {
        this.initData()
        this.initSubmitBtn()
    }

    ngOnInit() {
        this.resolveKeywordForm()
        this.flObj = this.friendLinkService.flOpObs.subscribe(res => {
            this.resolveFriendLinkObs(res)
        })
        this.pboxObj = this.riccioPboxService.getEmit().subscribe(res => {
            this.resolvePboxObj(res)
        })
        this.modalObj = this.riccioModalService.getEmit().subscribe(res => {
            if (res.type === 'close') {
                this.reset()
            }
        })
        this.datePickerObj = this.riccioPopDatePickerService.emitObs.subscribe(res => {
            this.resolveDate(res)
        })
        this.closeObj = this.friendLinkService.closeObs.subscribe(res => {
            this.reset()
        })
    }

    ngOnDestroy() {
        this.flObj ? this.flObj.unsubscribe() : {}
        this.pboxObj ? this.pboxObj.unsubscribe() : {}
        this.modalObj ? this.modalObj.unsubscribe() : {}
        this.datePickerObj ? this.datePickerObj.unsubscribe() : {}
        this.closeObj ? this.closeObj.unsubscribe() : {}
    }

    /**
     * 初始化数据
     * @author GR-05
     */
    initData() {
        this.friendLinkData = new PostData()
        this.resolveKeywordShow()
        this.resolveKeywordCtrl()
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
    resolveFriendLinkObs(v: any) {
        this.flOpConfig = v
        let modalData: any
        if (v.type === 'add') {
            modalData = {
                header: '添加友链',
                size: 600,
                noBtn: true
            }
            this.submitBtn.text = '添加'
        } else if (v.type === 'edit') {
            modalData = {
                header: '编辑友链',
                size: 600,
                noBtn: true
            }
            this.friendLinkData = {
                mykey: this.flOpConfig.data['mykey'],
                otherkey: this.flOpConfig.data['otherkey'],
                url: this.flOpConfig.data['url'],
                pr: this.flOpConfig.data['pr'],
                included: this.flOpConfig.data['included'],
                islink: this.flOpConfig.data['islink'],
                status: this.flOpConfig.data['status'],
                inputtime: this.grDateToolService.resolveDate(this.flOpConfig.data['inputtime'])
            }
            this.friendLinkShow = {
                isLink: new IsLink().data[this.flOpConfig.data['islink'] - 1].name,
                status: new Status().data[this.flOpConfig.data['status'] - 1].name,
                showInputTime: this.flOpConfig.data['showInputtime']
            }
            this.submitBtn.text = '更新'
        }
        this.riccioModalService.setSubject(modalData)
    }

    /**
     * 处理下拉显示
     * @author GR-05
     */
    resolveKeywordShow() {
        this.friendLinkShow = {
            isLink: new IsLink().data[0].name,
            status: new Status().data[0].name,
            showInputTime: new PostData().inputtime
        }
    }

    /**
     * 处理表单控件
     * @author GR-05
     */
    resolveKeywordCtrl() {
        let checkUrl = this.checkUrl.bind(this)
        this.ctrlFriendLink = {
            mykey: new FormControl('', [
                Validators.required
            ]),
            otherkey: new FormControl('', [
                Validators.required
            ]),
            url: new FormControl('', [
                Validators.required,
                checkUrl
            ]),
            pr: new FormControl('', [
                Validators.required
            ]),
            included: new FormControl('', [
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
    resolveKeywordForm() {
        this.friendLinkForm = this.builder.group({
            mykey: this.ctrlFriendLink.mykey,
            otherkey: this.ctrlFriendLink.otherkey,
            url: this.ctrlFriendLink.url,
            pr: this.ctrlFriendLink.pr,
            included: this.ctrlFriendLink.included,
            inputtime: this.ctrlFriendLink.inputtime
        })
    }

    /**
     * 处理pbox数据
     * @param data 
     * @author GR-05
     */
    resolvePboxObj(data: any) {
        switch (data.type) {
            case 'flOpIsLink':
                //反链
                this.friendLinkData.islink = data.data.value
                this.friendLinkShow.isLink = data.data.name
                break
            case 'flOpStatu':
                //类型
                this.friendLinkData.status = data.data.value
                this.friendLinkShow.status = data.data.name
                break
        }
    }

    /**
     * 显示反链类型选择
     * @param el 
     * @author GR-05
     */
    public showIsLink(el: any) {
        this.bsbyService.showPbox(
            this.showIsLinks,
            el,
            new IsLink().data,
            'flOpIsLink'
        )
    }

    /**
     * 显示状态类型选择
     * @param el 
     * @author GR-05
     */
    public showStatu(el: any) {
        this.bsbyService.showPbox(
            this.showStatus,
            el,
            new Status().data,
            'flOpStatu'
        )
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
            type: this.flOpConfig.comType,
            expectClick: this.showInputTime,
            date:new Date(this.friendLinkData.inputtime)
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
        if (res.type === this.flOpConfig.comType) {
            this.friendLinkShow.showInputTime = this.grDateToolService.resolveDate(res.date.toLocaleString('chinese', { hour12: false }))
            this.friendLinkData.inputtime = this.grDateToolService.resolveDate(res.date.toLocaleString('chinese', { hour12: false }))
        }
    }

    /**
     * 表单数据返回给调用者
     * @author GR-05
     */
    public fnEmitOpFriendLink() {
        if (this.friendLinkForm.valid) {
            this.submitBtn = {
                text: this.flOpConfig.type == 'add' ? '添加中...' : '更新中...',
                status: false
            }
            this.friendLinkFormEmit.emit({
                type: this.flOpConfig.type,
                data: this.friendLinkData
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
        this.friendLinkForm.reset(new PostData())
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