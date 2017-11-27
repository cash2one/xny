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
import { DatePickerConfig } from '@gr-public/riccio-pop-datePicker/riccio-pop-datePicker.data'
import { BsbyService } from '../../../../bsbyService.service'
import { KeywordADDFc, PostData, Difficults, Types } from './keyword-op.data'
import { KeywordOpService } from './keyword-op.service'
import { GrKeywordService } from '../../../../services/grManagement/grKeyword.service'
import { GrDateToolService } from '../../../../../../ApiServices/grDateTool/dateTool.service'

@Component({
    selector: 'app-bsby-service-keyword-op',
    templateUrl: './keyword-op.component.html',
    styleUrls: [
        '../../../../../../Public/theme/apps-common/common.scss',
        '../../../../../BsbyService/bsbyService.common.scss',
        './keyword-op.component.scss'
    ]
})
export class KeywordOpComponent implements OnInit, OnDestroy {
    /**
     * 几个下拉按钮元素
     */
    @ViewChild('showDiff') showDiff: ElementRef;
    @ViewChild('showTypes') showTypes: ElementRef;
    @ViewChild('showStarttime') showStarttime: ElementRef;

    @Output() keywordAddEmit: EventEmitter<any> = new EventEmitter<any>()
    @Output() keywordEditEmit: EventEmitter<any> = new EventEmitter<any>()
    @Output() keywordDelEmit: EventEmitter<number> = new EventEmitter<number>()

    //服务监听
    public kwObj: Subscription
    // 关闭事件监听
    public closeObj: Subscription
    //pbox监听
    public pboxObj: Subscription
    //关键词操作表单控件
    public ctrlKeyword: KeywordADDFc
    //提交服务器数据
    public keywordData: PostData
    //关键词表单
    public keywordForm: FormGroup
    //下拉选择显示
    public keywordShow: {
        difficult: string,
        type: string,
        starttime: string
    }
    //难易程度
    public difficults: any[]
    //关键词类型
    public types: any[]
    //配置数据
    public kwOpConfig: {
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
        private keywordOpService: KeywordOpService,
        private riccioModalService: RiccioModalService,
        private riccioPboxService: RiccioPboxService,
        private riccioPopDatePickerService: RiccioPopDatePickerService,
        private bsbyService: BsbyService,
        private grKeywordService: GrKeywordService,
        private grDateToolService:GrDateToolService
    ) {
        this.initData()
        this.initSubmitBtn()
    }

    ngOnInit() {
        this.resolveKeywordForm()
        this.kwObj = this.keywordOpService.kwOpObs.subscribe(res => {
            this.resolveKeywordObs(res)
        })
        this.pboxObj = this.riccioPboxService.getEmit().subscribe(res => {
            this.resolvePboxObj(res)
        })
        this.datePickerObj = this.riccioPopDatePickerService.emitObs.subscribe(res => {
            this.resolveDate(res)
        })
        this.closeObj = this.keywordOpService.closeObs.subscribe(res => {
            this.reset()
        })
    }

    ngOnDestroy() {
        this.kwObj ? this.kwObj.unsubscribe() : {}
        this.pboxObj ? this.pboxObj.unsubscribe() : {}
        this.datePickerObj ? this.datePickerObj.unsubscribe() : {}
        this.closeObj ? this.closeObj.unsubscribe() : {}
    }

    /**
     * 初始化数据
     * @author GR-05
     */
    initData() {
        this.keywordData = new PostData()
        this.keywordData.starttime = this.grDateToolService.resolveDate(new Date().toLocaleString('chinese', { hour12: false }))
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
    resolveKeywordObs(v: any) {
        this.kwOpConfig = v
        switch (v.type) {
            case 'add':
                this.submitBtn.text = '添加'
                break
            case 'edit':
                this.submitBtn.text = '更新'
                this.resolveEdit(v.data)
                break
            case 'del':
                this.submitBtn.text = '删除'
                break
        }
    }

    /**
     * 编辑模式下处理显示数据
     * @param conf 
     * @author GR-05 
     */
    public resolveEdit(conf: any) {
        this.keywordData = {
            name: conf.name,
            difficult: conf.difficult,
            type: conf.type,
            starttime: conf.starttime
        }
        this.keywordShow = {
            difficult: new Difficults().data.find(d => d.value == conf.difficult).name,
            type: new Types().data.find(t => t.value == conf.type).name,
            starttime: conf.starttime
        }
    }

    /**
     * 处理下拉显示
     * @author GR-05
     */
    resolveKeywordShow() {
        this.difficults = new Difficults().data
        this.types = new Types().data
        this.keywordShow = {
            difficult: this.difficults[0].name,
            type: this.types[0].name,
            starttime: this.keywordData.starttime
        }
    }

    /**
     * 处理表单控件
     * @author GR-05
     */
    resolveKeywordCtrl() {
        this.ctrlKeyword = {
            name: new FormControl('', [
                Validators.required
            ])
        }
    }

    /**
     * 处理初始化关键词表单
     * @author GR-05
     */
    resolveKeywordForm() {
        this.keywordForm = this.builder.group({
            name: this.ctrlKeyword.name
        })
    }

    /**
     * 处理pbox数据
     * @param data 
     * @author GR-05
     */
    resolvePboxObj(data: any) {
        switch (data.type) {
            case 'keywordOpDiff':
                //难易
                this.keywordData.difficult = data.data.value
                this.keywordShow.difficult = data.data.name
                break;
            case 'keywordOpType':
                //类型
                this.keywordData.type = data.data.value
                this.keywordShow.type = data.data.name
                break;
        }
    }

    /**
     * 显示难易选择
     * @author GR-05
     * @param el 点击元素
     */
    public showDifficult(el: any) {
        this.bsbyService.showPbox(
            this.showDiff,
            el,
            this.difficults,
            'keywordOpDiff'
        )
    }

    /**
     * 显示关键词类型选择
     * @param el 
     * @author GR-05
     */
    public showType(el: any) {
        this.bsbyService.showPbox(
            this.showTypes,
            el,
            this.types,
            'keywordOpType'
        )
    }

    /**
     * 显示时间组件
     * @author GR-05
     */
    public fnShowStartDate() {
        let position = this.showStarttime.nativeElement.getBoundingClientRect()
        let dateConfig: DatePickerConfig = {
            style: {
                left: position.left,
                top: position.top,
                width: 400
            },
            type: this.kwOpConfig.comType,
            expectClick: this.showStarttime,
            date:new Date(this.keywordData.starttime)
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
        if (res.type === this.kwOpConfig.comType) {
            this.keywordShow.starttime = this.grDateToolService.resolveDate(res.date.toLocaleString('chinese', { hour12: false }))
            this.keywordData.starttime = this.grDateToolService.resolveDate(res.date.toLocaleString('chinese', { hour12: false }))
        }
    }

    /**
     * 表单数据返回给调用者
     * @author GR-05
     */
    public fnEmitOpKeyword() {
        if (this.keywordForm.valid) {
            if (this.kwOpConfig.type == 'add') {
                this.submitBtn = {
                    text: '添加中...',
                    status: false
                }
                this.keywordAddEmit.emit(this.keywordData)
            } else {
                this.submitBtn = {
                    text: '更新中...',
                    status: false
                }
                this.keywordEditEmit.emit(this.keywordData)
            }
        }
    }

    /**
     * 重置组件数据
     * @author GR-05
     */
    public reset() {
        // this.initData()
        this.initSubmitBtn()
        this.keywordForm.reset(new PostData())
        this.keywordData.starttime = this.grDateToolService.resolveDate(new Date().toLocaleString('chinese', { hour12: false }))
        this.resolveKeywordShow()
        this.riccioModalService.setSubject({})
    }

    /**
     * 取消删除
     * @author GR-05 
     */
    public cancle() {
        this.riccioModalService.setSubject({})
    }

    /**
     * 删除关键词
     * @author GR-05
     */
    public del() {
        this.submitBtn = {
            text: '删除中...',
            status: false
        }
        this.keywordDelEmit.emit(this.kwOpConfig.data)
    }
}