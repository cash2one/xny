import {
    Component,
    OnInit,
    ViewChild,
    ViewContainerRef,
    ElementRef,
    OnDestroy
} from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

import { PageData,MsgCommon } from '../message.data'
import { MessageService } from '../message.service'
import { RiccioNotificationsService } from '../../../../Public/riccio-notifications/riccio-notifications.service'
import { GrNofityService } from '../../../services/grNotify/grNotify.service'

@Component({
    selector: 'app-console-message-unread',
    templateUrl: './message-unread.component.html',
    styleUrls: [
        '../../../Console.component.scss',
        '../message.component.scss',
        './message-unread.component.scss'
    ]
})
export class MessageUnReadComponent implements OnInit,OnDestroy {
    public msgCommonObj:any
    //表格loading
    public loadingType: string
    //未读消息列表
    public messageList:any[]
    //分页相关
    public pageData:PageData

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        private riccioNotificationsService:RiccioNotificationsService,
        private grNofityService:GrNofityService,
        private messageService:MessageService
    ) {
        this.messageList = []
        this.pageData = new PageData()
        this.msgCommonObj = this.messageService.msgRequestObj.subscribe(res=>{
            this.fnEmitGetMessageList(res)
        })
    }

    ngOnInit() {
        // this.getMessageList()
    }

    ngOnDestroy(){
        this.msgCommonObj.unsubscribe()
    }

    /**
     * 监听消息请求组件
     * @param pageData 
     * @author GR-05
     */
    public fnEmitGetMessageList(pageData:PageData){
        this.pageData = pageData
        this.getMessageList()
    }

    /**
     * 获取未读消息列表
     * @author GR-05
     */
    public getMessageList(){
        this.loadingType = 'show'
        this.resolveCommon()
        this.grNofityService.getNofityList({
            type:0,
            page:this.pageData.page,
            rows:this.pageData.rows
        }).subscribe(res=>{
            if(res.status === 1){
                this.pageData.total = res.data.total
                this.messageList = res.data.data
                if(this.pageData.total === 0){
                    this.loadingType = 'empty'
                }else{
                    this.loadingType = 'hide'
                }
                this.resolveCommon()
            }
        })
    }

    public resolveCommon() {
        let data: MsgCommon
        data = {
            title: '未读消息',
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
