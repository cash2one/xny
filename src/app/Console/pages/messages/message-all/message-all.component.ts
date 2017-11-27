import {
    Component,
    OnInit,
    ViewChild,
    ViewContainerRef,
    ElementRef,
    OnDestroy
} from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

import { PageData, MsgCommon } from '../message.data'
import { MessageService } from '../message.service'
import { RiccioNotificationsService } from '../../../../Public/riccio-notifications/riccio-notifications.service'
import { RiccioPopUpRightService } from '../../../../Public/riccio-pop-up-right/riccio-pop-up-right.service'
import { RiccioPboxService } from '../../../../Public/riccio-pbox/riccio-pbox.service'
import { RiccioLoadingService } from '../../../../Public/riccio-loading/riccio-loading.service'
import { GrNofityService } from '../../../services/grNotify/grNotify.service'

@Component({
    selector: 'app-console-message-all',
    templateUrl: './message-all.component.html',
    styleUrls: [
        '../../../Console.component.scss',
        '../message.component.scss',
        './message-all.component.scss'
    ]
})
export class MessageAllComponent implements OnInit,OnDestroy {
    //监听消息请求
    public msgRequestObj:any
    //表格loading
    public loadingType: string
    //全部消息列表
    public messageList: any[]
    //分页相关
    public pageData: PageData

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        private riccioNotificationsService: RiccioNotificationsService,
        private riccioPopUpRightService: RiccioPopUpRightService,
        private riccioPboxService: RiccioPboxService,
        private riccioLoadingService: RiccioLoadingService,
        private grNofityService: GrNofityService,
        private messageService:MessageService
    ) {
        this.loadingType = 'show'
        this.pageData = new PageData()
        this.msgRequestObj = this.messageService.msgRequestObj.subscribe(res=>{
            this.fnEmitGetMessageList(res)
        })
    }

    ngOnInit() {
        // this.getMessageList()
        // this.msgRequestObj = this.messageService.msgRequestObj.subscribe(res=>{
        //     this.fnEmitGetMessageList(res)
        // })
    }

    ngOnDestroy(){
        this.msgRequestObj ? this.msgRequestObj.unsubscribe():{}
        console.log('ssss')
    }

    /**
     * 监听common组件
     * @param pageData  
     *  @author GR-05
     */
    public fnEmitGetMessageList(pageData: PageData) {
        this.pageData = pageData
        this.getMessageList()
    }

    /**
     * 获取全部消息列表
     * @author GR-05
     */
    public getMessageList() {
        this.loadingType = 'show'
        this.resolveCommon()
        this.grNofityService.getNofityList({
            page: this.pageData.page,
            rows: this.pageData.rows
        }).subscribe(res => {
            if (res.status === 1) {
                this.pageData.total = res.data.total
                this.messageList = res.data.data
                if (this.pageData.total === 0) {
                    this.loadingType = 'empty'
                } else {
                    this.loadingType = 'hide'
                }
                this.resolveCommon()
            }
        })
    }

    public resolveCommon() {
        let data: MsgCommon
        data = {
            title: '全部消息',
            //是否显示全部已读按钮
            showReadAll: true,
            //是否显示标记为已读
            showFlagRead: true,
            //相关消息列表
            messageList: this.messageList,
            //数据总量
            messageTotal: this.pageData.total,
            //loading
            loadingType: this.loadingType
        }
        this.messageService.setMsgInfo(data)
    }
}
