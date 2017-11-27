import {
    Component,
    OnInit,
    ViewChild,
    ViewContainerRef,
    ElementRef,
    OnDestroy,
    Input,
    Output,
    EventEmitter
} from '@angular/core'
import { Location } from '@angular/common'
import { Router, ActivatedRoute } from '@angular/router'

import { MessageContentData } from './message-content.data'
import { RiccioNotificationsService } from '../../../../Public/riccio-notifications/riccio-notifications.service'
import { GrNofityService } from '../../../services/grNotify/grNotify.service'
import { ConsolesService } from '../../../Console.service'

@Component({
    selector: 'app-console-message-content',
    templateUrl: './message-content.component.html',
    styleUrls: [
        '../../../Console.component.scss',
        '../message.component.scss',
        './message-content.component.scss'
    ]
})
export class MessageContentComponent implements OnInit {

    //表格loading
    public loadingType: string
    //内容
    public messageInfo:any
    //消息id
    public messageId:any

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        private location:Location,
        private riccioNotificationsService:RiccioNotificationsService,
        private grNofityService:GrNofityService,
        private consolesService:ConsolesService
    ) {
        this.loadingType = 'show'
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(res=>{
            this.messageId = res.id
            this.getMessageInfo()
        })
    }

    /**
     * 获取消息内容
     * @author GR-05
     */
    public getMessageInfo(){
        this.loadingType = 'show'
        this.grNofityService.getNofityRead({
            id:this.messageId
        }).subscribe(res=>{
            this.loadingType = 'hide'
            if(res.status === 1){
                this.messageInfo = res.data
                this.consolesService.changeNofityCount(res.data.notify)
            }
            // this.resolveInfo()
        })
    }

    /**
     * 解析数据
     * @author GR-05
     */
    public resolveInfo(){
        let extra = JSON.parse(this.messageInfo.extra)
        Object.keys(extra).forEach(key=>{
            this.messageInfo.text = this.messageInfo.text.replace(`{${key.replace('"','')}}`,` ${extra[key]} `)
        })
    }

    /**
     * 返回上一级
     * @author GR-05
     */
    public returnUrl(){
        this.location.back()
    }
}
