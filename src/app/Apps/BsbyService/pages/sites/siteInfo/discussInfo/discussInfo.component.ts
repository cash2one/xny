import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    ViewContainerRef,
    ElementRef,
    Input
} from '@angular/core'
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations'
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'

import { GrAppInfoService } from '../../../../../../ApiServices/grAppInfo/grAppInfo.service'
import { GrDemandService } from '../../../../services/grManagement/grDemand.service'
import { RiccioLoadingService } from '@gr-public/riccio-loading/riccio-loading.service'
import { RiccioPboxService } from '@gr-public/riccio-pbox/riccio-pbox.service'
import { RiccioNotificationsService } from '@gr-public/riccio-notifications/riccio-notifications.service'
import { InputToolService } from '../../../../common/input-tool/input-tool.service'
import { BsbyService } from '../../../../bsbyService.service'

let animations = {
    toolState: trigger('toolState', [
        state('hide', style({ height: '0px' })),
        state('show', style({ height: '*' })),
        transition('hide <=> show', animate('300ms ease-out'))
    ])
}

@Component({
    selector: 'site-discuss-info',
    templateUrl: './discussInfo.component.html',
    styleUrls: [
        '../../../../../../Public/theme/common/common.scss',
        './discussInfo.component.scss'
    ],
    animations:[
        animations.toolState
    ]
})
export class DiscussInfoComponent implements OnInit,OnDestroy {

    @Input() siteInfo: any

    //监听pbox
    pboxObj:Subscription
    appInfoObj:Subscription
    //loading
    demandLoadingType: string
    //最新几条需求
    demandList: any[] = []

    //工具栏动画标示
    toolState: string
    //提交数据
    postData: {
        content: string;
        images:string[];
    }
    //按钮状态
    btnStatu: {
        text: string,
        statu: boolean
    }

    uploadUrl:string

    constructor(
        private grDemandService: GrDemandService,
        private riccioLoadingService: RiccioLoadingService,
        private riccioPboxService:RiccioPboxService,
        private grAppInfoService:GrAppInfoService,
        private bsbyService:BsbyService,
        private riccioNotificationsService:RiccioNotificationsService,
        private inputToolService:InputToolService
    ) {
        this.demandLoadingType = 'empty'
        this.initInput()
    }

    ngOnInit() {
        this.getDemandList()
        this.pboxObj = this.riccioPboxService.getEmit().subscribe(res => {
            if(res.type == 'demandDel'){
                this.delDemand(res.data)
            }
        })

        //刷新
        this.appInfoObj = this.bsbyService.appInfoObj.subscribe(res => {
            this.uploadUrl = this.grAppInfoService.postUploadURL + `?model=${res.model}`
        })
        //路由切换
        this.uploadUrl = this.bsbyService.appInfo ? this.grAppInfoService.postUploadURL + `?model=${this.bsbyService.appInfo.model}` : ''
    }

    ngOnDestroy(){
        this.pboxObj ? this.pboxObj.unsubscribe() : {}
        this.appInfoObj ? this.appInfoObj.unsubscribe() : {}
    }

    /**
     * 获取需求列表
     * @author GR-05
     */
    getDemandList() {
        this.demandLoadingType = 'show'
        this.grDemandService.getDemandList({
            site_id: this.siteInfo.id,
            pagesize: 3
        }, 'my').subscribe(res => {
            if (res.status === 1) {
                res.data.total > 0 ? this.demandLoadingType = 'hide' : this.demandLoadingType = 'empty'
                this.demandList = res.data.data
            }
        })
    }

    /**
     * 显示工具栏
     * @author GR-05
     */
    fnShowTool() {
        this.toolState = 'show'
    }

    /**
     * 处理隐藏工具栏
     * @author GR-05
     */
    fnResolveTool() {
        //隐藏
        if (!this.contentNotEmpty(this.postData.content)) {
            this.toolState = 'hide'
        }
    }

    /**
     * 提交需求
     * @author GR-05
     */
    addDemand() {
        if (this.contentNotEmpty(this.postData.content)) {
            this.riccioLoadingService.setLoading({
                message: '提交需求中'
            })
            this.btnStatu = {
                text: '提交中...',
                statu: false
            }
            this.grDemandService.postDemandAdd({
                site_id: this.siteInfo.id,
                cid: this.siteInfo.cid,
                ...this.postData
            }).subscribe(res => {
                this.riccioLoadingService.closeLoading()
                if (res.status === 1) {
                    this.getDemandList()
                    this.initInput()
                    this.inputToolService.setFileDel()
                }
            })
        }else{
            this.riccioNotificationsService.setSubject({
                text:'请填写需求',
                status:'danger'
            })
        }
    }

    /**
     * 删除需求
     * @param id 
     * @author GR-05 
     */
    delDemand(id:any){
        this.riccioLoadingService.setLoading({
            message:'删除中'
        })
        this.grDemandService.postDemandDel({
            id:id,
            site_id:this.siteInfo.id
        }).subscribe(res => {
            this.riccioLoadingService.closeLoading()
            if(res.status === 1){
                this.getDemandList()
            }
        })
    }

    /**
     * 初始化
     * @author GR-05
     */
    initInput() {
        this.postData = {
            content: '',
            images:[]
        }
        this.toolState = 'hide'
        this.btnStatu = {
            text: '提交',
            statu: true
        }
    }

    /**
     * 判断输入是否为空
     * @param content 
     * @author GR-05
     */
    contentNotEmpty(content: string): boolean {
        return this.postData.content && this.postData.content.trim().length > 0
    }

    /**
     * 显示删除
     * @author GR-05
     */
    showDel(id:number,el:any,e:MouseEvent){
        this.riccioPboxService.setSubject({
            genre: 'delete',
            el: el,
            position: {
                left: e.clientX - 200,
                top: e.clientY,
                width: 240
            },
            type:'demandDel',
            data: {
                title: '删除此条记录',
                button: '删除',
                delID:id
            }
        })
    }

    /**
     * 监听上传输入组件
     * @param fileList 
     * @author GR-05
     */
    uploadEmit(fileList:Array<string>){
        this.postData.images = fileList
    }
}