import {
    Component,
    OnInit,
    Input,
    ViewChild,
    ViewContainerRef,
    ElementRef,
    OnDestroy,
    Output,
    EventEmitter
} from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

import { MessageCommonData } from './message-common.data'
import { PageData,MsgCommon } from '../message.data'
import { MessageService } from '../message.service'
import { RiccioNotificationsService } from '../../../../Public/riccio-notifications/riccio-notifications.service'
import { RiccioPopUpRightService } from '../../../../Public/riccio-pop-up-right/riccio-pop-up-right.service'
import { RiccioPboxService } from '../../../../Public/riccio-pbox/riccio-pbox.service'
import { RiccioLoadingService } from '../../../../Public/riccio-loading/riccio-loading.service'
import { ConsolesService } from '../../../Console.service'
import { GrNofityService } from '../../../services/grNotify/grNotify.service'

@Component({
    selector: 'app-console-message-common',
    templateUrl: './message-common.component.html',
    styleUrls: [
        '../../../Console.component.scss',
        '../message.component.scss',
        './message-common.component.scss'
    ]
})
export class MessageCommonComponent implements OnInit, OnDestroy {
    @ViewChild('clickTB', { read: ViewContainerRef }) clickTB: ViewContainerRef;

    //通用配置
    public msgCommon:MsgCommon
    //监听配置
    public msgCommonObj:any

    //popup监听
    public popupObs: any
    //pbox监听
    public pboxObs: any
    //记录表title
    public messageTitles: string[]
    //是否显示内容
    // public showContent: boolean
    //分页相关
    public pageData: PageData
    //是否全选
    public allCheckIs: boolean
    //操作的消息id
    public messageId: number
    //活动中的消息数组
    public activeMsg: any[]

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        private riccioNotificationsService: RiccioNotificationsService,
        private riccioPopUpRightService: RiccioPopUpRightService,
        private riccioPboxService: RiccioPboxService,
        private riccioLoadingService: RiccioLoadingService,
        private grNofityService: GrNofityService,
        private consolesService:ConsolesService,
        private messageService:MessageService
    ) {
        this.messageTitles = new MessageCommonData().messageTitle
        this.pageData = new PageData()
        this.msgCommon = new MsgCommon()
        this.emitGetMsgList()
    }

    ngOnInit() {
        this.msgCommonObj = this.messageService.msgInfoObj.subscribe(res=>{
            this.msgCommon = res
        })
        this.popupObs = this.riccioPopUpRightService.getEmit().subscribe(res => {
            this.resolvePopup(res)
        })
        this.pboxObs = this.riccioPboxService.getEmit().subscribe(res => {
            this.resolvePbox(res)
        })
    }

    ngOnDestroy() {
        this.msgCommonObj ? this.msgCommonObj.unsubscribe():{}
        this.popupObs ? this.popupObs.unsubscribe() : {}
        this.pboxObs ? this.pboxObs.unsubscribe() : {}
    }

    /**
     * 通知父组件获取对应消息列表
     * @author GR-05
     */
    public emitGetMsgList() {
        this.messageService.emitMsgRequest(this.pageData)
    }

    /**
     * 获取内容
     * @param msg 
     * @author GR-05 
     */
    public fnToDetail(msg: any) {
        this.messageId = msg.id
        this.router.navigate(['../content', msg.id], { relativeTo: this.activatedRoute })
    }

    /**
     * 关闭内容
     * @param flag 
     * @author GR-05 
     */
    public fnCloseContent(flag: boolean) {
        if (flag) {
            this.emitGetMsgList()
        }
    }

    /**
     * 显示顶部多选组件
     * @param msg 消息数据
     * @param flag 多选单选标示
     * @author GR-05
     */
    public fnShowPopUp(flag: string = "one", msg: any = null): void {
        let obj = {
            'data': [...this.msgCommon.messageList],
            'viewText': this.msgCommon.showFlagRead ? [
                { id: 1, name: '删除' },
                { id: 2, name: '标记已读' }
            ] : [
                    { id: 1, name: '删除' }
                ],
            'style': {
                'z-index': 1
            }
        }
        if (flag === 'one') {
            msg.isCheck = !msg.isCheck;
            this.allCheckIs = this.msgCommon.messageList.filter(e => e['isCheck'] == false).length == 0 ? true : false

        } else if (flag === 'all') {
            this.allCheckIs = !this.allCheckIs;
            this.msgCommon.messageList.map(e => e['isCheck'] = this.allCheckIs)
        }
        this.riccioPopUpRightService.setSubject(obj)
    }

    /**
     * 重置选择
     * @author GR-05 
     */
    public resetSelect() {
        this.allCheckIs = false
        this.msgCommon.messageList.map(msg => {
            msg['isCheck'] = false
        })
    }

    /**
     * 处理popup监听
     * @param res
     * @author GR-05 
     */
    public resolvePopup(res: any) {
        if (res.type === 0) {
            // 清空
            this.resetSelect()
            this.activeMsg = []
        } else {
            let ids = []
            res.data.forEach(v => {
                ids.push(v['id'])
            })
            this.activeMsg = ids
            switch (res.type.id) {
                case 1:
                    //删除
                    this.confirmDel(res.event)
                    break
                case 2:
                    //禁用
                    this.confirmRead(res.event)
                    break
            }
        }
    }

    /**
     * 监听pbox
     * @param res 
     * @author GR-05 
     */
    public resolvePbox(res: any) {
        switch (res.type) {
            case 'msgListDel':
                //删除
                this.riccioLoadingService.setLoading({
                    message: '删除中'
                })
                this.grNofityService.postNofityDel({
                    ids: this.activeMsg
                }).subscribe(res => {
                    this.riccioLoadingService.closeLoading()
                    if (res.status === 1) {
                        this.afterSuccess('删除成功')
                    }
                })
                break
            case 'msgListRead':
                //标记已读
                this.riccioLoadingService.setLoading({
                    message: '标记中'
                })
                this.grNofityService.getNofityRead({
                    id: this.activeMsg
                }).subscribe(res => {
                    this.riccioLoadingService.closeLoading()
                    if (res.status === 1) {
                        this.consolesService.changeNofityCount(res.data.notify)
                        this.afterSuccess('标记成功')
                    }
                })
                break
            case 'msgListAllRead':
                //全部已读
                this.riccioLoadingService.setLoading({
                    message: '标记中'
                })
                this.grNofityService.getNofityRead({
                    type: 'all'
                }).subscribe(res => {
                    this.riccioLoadingService.closeLoading()
                    if (res.status === 1) {
                        this.consolesService.changeNofityCount(0)
                        this.afterSuccess('全部已读')
                    }
                })
                break
        }
    }

    /**
     * 删除、标记成功后动作
     * @param msg 
     * @author GR-05
     */
    public afterSuccess(msg: string) {
        this.allCheckIs = false
        this.resetSelect()
        this.riccioPopUpRightService.setSubject({})
        this.riccioNotificationsService.setSubject({
            text: msg,
            status: 'success'
        })
        this.emitGetMsgList()
    }

    /**
     * 确认删除
     * @author GR-05
     */
    public confirmDel(e: MouseEvent) {
        this.riccioPboxService.setSubject({
            genre: 'delete',
            position: {
                left: e.clientX,
                top: e.clientY,
                width: 240
            },
            type: 'msgListDel',
            data: {
                title: '确定删除所选消息？',
                button: '删除'
            }
        })
    }

    /**
     * 确认标记已读
     * @author GR-05
     */
    public confirmRead(e: MouseEvent) {
        this.riccioPboxService.setSubject({
            genre: 'delete',
            position: {
                left: e.clientX,
                top: e.clientY,
                width: 240
            },
            type: 'msgListRead',
            data: {
                title: '确定标记所选消息为已读？',
                button: '已读'
            }
        })
    }

    /**
     * 确认标记全部已读
     * @author GR-05
     */
    public confirmAllRead(e: MouseEvent) {
        this.riccioPboxService.setSubject({
            genre: 'delete',
            position: {
                left: e.clientX,
                top: e.clientY,
                width: 240
            },
            type: 'msgListAllRead',
            data: {
                title: '确定标记所有消息为已读？',
                button: '已读'
            }
        })
    }

    /**
     * 分页动作
     * @param page 
     * @author GR-05 
     */
    public fnPageValue(page: any) {
        this.pageData.page = page.page
        this.pageData.rows = page.rows
        this.pageData.total = this.msgCommon.messageTotal
        this.emitGetMsgList()
    }

}
