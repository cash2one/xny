import {
    Component,
    OnInit,
    ViewChild,
    ViewContainerRef,
    ElementRef,
    OnDestroy
} from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

import { AccountHomeData } from './account-home.data'
import { GrAccountsService } from '../../../services/grAccounts/grAccounts.service'
import { AccountService } from '../account.service'
import { ShowDetailService } from '../show-detail/show-detail.service'
import { ShowDetailConf } from '../show-detail/show-detail.data'
import { NoteService } from '../account-note/account-note.service'
import { RiccioNotificationsService } from '../../../../Public/riccio-notifications/riccio-notifications.service'

@Component({
    selector: 'app-account-home',
    templateUrl: './account-home.component.html',
    styleUrls: [
        '../../../Console.component.scss',
        '../account.component.scss',
        './account-home.component.scss'
    ]
})
export class AccountHomeComponent implements OnInit {
    @ViewChild('clickTB', { read: ViewContainerRef }) clickTB: ViewContainerRef;

    //消费记录表title
    public consumeTitles: string[]
    //表格loading
    public loadingType: string
    //整体loading
    public mainLoadingType: string
    //消费记录
    public accountHome: any[]
    //消费类型
    public processTypes: any
    //企业信息
    public comInfo: any
    //详情
    public showDetailData: ShowDetailConf
    //活动中的收支明细单项数据
    public activeItem:any
    //tip显示
    public accountTipText:string

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public accountService: AccountService,
        public grAccountsService: GrAccountsService,
        public showDetailService: ShowDetailService,
        private noteService:NoteService,
        private riccioNotificationsService:RiccioNotificationsService
    ) {
        this.consumeTitles = new AccountHomeData().consumeTitle
        this.processTypes = new AccountHomeData().processTypes
        this.loadingType = 'hide'
    }

    ngOnInit() {
        this.resolveComInfo()
    }

    /**
     * 获取资产概览
     * @author GR-05
     */
    public getAccountHome() {
        this.loadingType = 'show'
        this.grAccountsService.getAccountHome({}).subscribe(res => {
            this.loadingType = 'hide'
            if (res.status === 1) {
                this.accountHome = res.data.data
                this.resolveAccount()
            }
        })
    }


    /**
     * 处理企业信息
     * @author GR-05
     */
    public resolveComInfo() {
        this.comInfo = this.accountService.getComInfo()
        if (!this.comInfo) {
            this.mainLoadingType = 'show'
            this.accountService.getComInfoDynamic().subscribe(res => {
                this.mainLoadingType = 'hide'
                if (res.status === 1) {
                    this.comInfo = res.data
                    this.accountService.setComInfo(this.comInfo)
                    this.getAccountHome()
                }
            })
        } else {
            this.mainLoadingType = 'hide'
            this.getAccountHome()
        }
    }

    /**
     * 处理一下资产数据
     * @author GR-05
     */
    public resolveAccount() {
        this.accountHome.forEach(account => {
            account['amount_type'] = account.amount > 0 ? true : false
            account['amount'] = account.amount > 0 ? `+ ¥ ${account.amount}` : `- ¥ ${account.amount.toString().replace('-','')}`
            account['amount_now'] = '¥ '+account['amount_now']
            account['processWord'] = this.processTypes[account.process_type]
        })
    }

    /**
     * 前往充值页面
     * @author GR-05
     */
    public fnGoRecharge() {
        this.router.navigate(['../recharge'], { relativeTo: this.activatedRoute })
    }

    /**
     * 处理给详情展示数据
     * @param data 记录数据 
     * @author GR-05
     */
    public resolveDetail(data: any): any[] {
        let result = [
            { name: '流水号', value: data['pay_num'] },
            { name: '支付事项', value: data['title'] },
            { name: '日期', value: data['created_at'] },
            { name: '操作类别', value: data['processWord'] },
            { name: '操作人', value: data['username'] },
            { name: '操作金额', value: data['amount'], class: data['amount_type'] },
            { name: '余额', value: data['amount_now'] },
            { name: '备注', value: data['user_note'] }
        ]
        return result
    }

    /**
     * 显示详情
     * @param data 
     * @author GR-05
     */
    public fnShowDetail(data: any) {
        this.showDetailData = {
            expectClick: this.clickTB,
            title: '消费记录详情',
            showList: this.resolveDetail(data),
            top: 52
        }
        this.showDetailService.SetDetailConfSbj(this.showDetailData)
    }

    /**
     * 显示备注修改
     * @param data 
     * @author GR-05
     */
    public fnShowMark(data:any){
        this.activeItem = data
        this.noteService.setNote({
            id:data.id,
            title:data.title,
            note:data.user_note
        })
    }

    /**
     * 成功修改备注
     * @param note 
     * @author GR-05
     */
    public noteSuccess(note:string){
        this.activeItem['user_note'] = note
    }

}
