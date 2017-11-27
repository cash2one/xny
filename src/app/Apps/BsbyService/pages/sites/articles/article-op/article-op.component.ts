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
import { ArticleOpFc, PostData, Types } from './article-op.data'
import { ArticleOpService } from './article-op.service'
import { GrDateToolService } from '../../../../../../ApiServices/grDateTool/dateTool.service'

@Component({
    selector: 'app-bsby-service-article-op',
    templateUrl: './article-op.component.html',
    styleUrls: [
        '../../../../../../Public/theme/apps-common/common.scss',
        '../../../../../BsbyService/bsbyService.common.scss',
        './article-op.component.scss'
    ]
})
export class ArticleOpComponent implements OnInit, OnDestroy {
    /**
     * 下拉按钮元素
     */
    @ViewChild('showTypes') showTypes: ElementRef;
    @ViewChild('showInputTime') showInputTime: ElementRef;

    @Output() articleFormEmit:EventEmitter<any> = new EventEmitter<any>()

    //服务监听
    public aObj: Subscription
    // 关闭事件监听
    public closeObj:Subscription
    //pbox监听
    public pboxObj:Subscription
    //modal监听
    public modalObj:Subscription
    //文章操作表单控件
    public ctrlArticle: ArticleOpFc
    //提交服务器数据
    public articleData: PostData
    //文章表单
    public articleForm: FormGroup
    //下拉选择显示
    public articleShow: {
        types: string;
        showInputTime:string;
    }
    //关键词类型
    public types: any[]
    //配置数据
    public aOpConfig:{
        type:string,
        comType:string,
        data?:any
    }
    //时间组件监听
    public datePickerObj:Subscription
    //提交按钮状态
    public submitBtn:{
        text:string;
        status:boolean
    }

    constructor(
        private builder: FormBuilder,
        private articleOpService: ArticleOpService,
        private riccioModalService: RiccioModalService,
        private riccioPboxService:RiccioPboxService,
        private riccioPopDatePickerService:RiccioPopDatePickerService,
        private bsbyService:BsbyService,
        private grDateToolService:GrDateToolService
    ) {
        this.initData()
        this.initSubmitBtn()
    }

    ngOnInit() {
        this.resolveKeywordForm()
        this.aObj = this.articleOpService.aOpObs.subscribe(res => {
            this.resolveArticleObs(res)
        })
        this.pboxObj = this.riccioPboxService.getEmit().subscribe(res=>{
            this.resolvePboxObj(res)
        })
        this.modalObj = this.riccioModalService.getEmit().subscribe(res=>{
            if(res.type === 'close'){
                this.reset()
            }
        })
        this.datePickerObj = this.riccioPopDatePickerService.emitObs.subscribe(res=>{
            this.resolveDate(res)
        })
        this.closeObj = this.articleOpService.closeObs.subscribe(res=>{
            this.reset()
        })
    }

    ngOnDestroy() {
        this.aObj?this.aObj.unsubscribe():{}
        this.pboxObj?this.pboxObj.unsubscribe():{}
        this.modalObj?this.modalObj.unsubscribe():{}
        this.datePickerObj?this.datePickerObj.unsubscribe():{}
        this.closeObj?this.closeObj.unsubscribe():{}
    }

    /**
     * 初始化数据
     * @author GR-05
     */
    initData() {
        this.articleData = new PostData()
        this.resolveKeywordShow()
        this.resolveKeywordCtrl()
    }

    /**
     * 重置提交按钮
     * @author GR-05
     */
    initSubmitBtn(){
        this.submitBtn = {
            text:'添加',
            status:true
        }
    }

    /**
     * 处理服务监听
     * @param v 监听到的配置数据
     * @author GR-05 
     */
    resolveArticleObs(v: any) {
        this.aOpConfig = v
        let modalData: any
        if (v.type === 'add') {
            modalData = {
                header: '添加文章',
                size: 600,
                noBtn: true
            }
            this.submitBtn.text = '添加'
        }else if(v.type === 'edit'){
            modalData = {
                header: '编辑文章',
                size: 600,
                noBtn: true
            }
            this.articleData = {
                title:this.aOpConfig.data['title'],
                url:this.aOpConfig.data['url'],
                type:this.aOpConfig.data['type'],
                inputtime:this.grDateToolService.resolveDate(this.aOpConfig.data['inputtime'])
            }
            this.articleShow = {
                types:new Types().data[this.aOpConfig.data['type'] - 1].name,
                showInputTime:this.aOpConfig.data['inputtime']
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
        this.types = new Types().data
        this.articleShow = {
            types: this.types[0].name,
            showInputTime: new PostData().inputtime
        }
    }

    /**
     * 处理表单控件
     * @author GR-05
     */
    resolveKeywordCtrl() {
        let checkUrl = this.checkUrl.bind(this)
        this.ctrlArticle = {
            title: new FormControl('', [
                Validators.required
            ]),
            url:new FormControl('',[
                Validators.required,
                checkUrl
            ]),
            inputtime:new FormControl('', [
                Validators.required
            ])
        }
    }

    /**
     * 处理初始化关键词表单
     * @author GR-05
     */
    resolveKeywordForm() {
        this.articleForm = this.builder.group({
            title: this.ctrlArticle.title,
            url:this.ctrlArticle.url,
            inputtime:this.ctrlArticle.inputtime
        })
    }

    /**
     * 处理pbox数据
     * @param data 
     * @author GR-05
     */
    resolvePboxObj(data:any){
        switch(data.type){
            case 'articleOpType':
                //类型
                this.articleData.type = data.data.value
                this.articleShow.types = data.data.name
                break;
        }
    }
    /**
     * 显示关键词类型选择
     * @param el 
     * @author GR-05
     */
    public showType(el:any){
        this.bsbyService.showPbox(
            this.showTypes,
            el,
            this.types,
            'articleOpType'
        )
    }

    /**
     * 显示时间组件
     * @author GR-05
     */
    public fnShowInputDate(){
        let position = this.showInputTime.nativeElement.getBoundingClientRect()
        let dateConfig: DatePickerConfig = {
            style: {
                left: position.left,
                top: position.top,
                width: position.width
            },
            type: this.aOpConfig.comType,
            expectClick:this.showInputTime,
            date:new Date(this.articleData.inputtime)
        }
        this.riccioPopDatePickerService.setDp(dateConfig)
    }

    /**
     * 处理时间组件传回数据
     * @param res 
     * @author GR-05
     */
    public resolveDate(res:{
        type:string;
        date:Date;
    }){
        // 确保准确调用者
        if(res.type === this.aOpConfig.comType){
            this.articleShow.showInputTime = this.grDateToolService.resolveDate(res.date.toLocaleString('chinese',{hour12:false}))
            this.articleData.inputtime = this.grDateToolService.resolveDate(res.date.toLocaleString('chinese',{hour12:false}))
        }
    }

    /**
     * 表单数据返回给调用者
     * @author GR-05
     */
    public fnEmitOpArticle(){
        if(this.articleForm.valid){
            this.submitBtn = {
                text:this.aOpConfig.type=='add'?'添加中...':'更新中...',
                status:false
            }
            this.articleFormEmit.emit({
                type:this.aOpConfig.type,
                data:this.articleData
            })
        }
    }

    /**
     * 重置组件
     * @author GR-05
     */
    public reset(){
        // this.initData()
        this.initSubmitBtn()
        this.articleForm.reset(new PostData())
        this.riccioModalService.setSubject({})
    }

    /**
     * 简单检查链接
     * @param url 域名控件
     * @author GR-05 
     */
    checkUrl(url: FormControl) {
        let urlResult = this.bsbyService.validUrl(url.value,true)
        return urlResult ? null : { urlError: true };
    }
}