import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    ViewContainerRef,
    OnDestroy
} from '@angular/core'
import { Subscription } from 'rxjs/Subscription'

import { IncomeExpenseData, RequestParam } from './account-incomeExpense.data'
import { GrAccountsService } from '../../../services/grAccounts/grAccounts.service'
import { AccountService } from '../account.service'
import { RiccioPboxService } from '../../../../Public/riccio-pbox/riccio-pbox.service'
import { RiccioNotificationsService } from '../../../../Public/riccio-notifications/riccio-notifications.service'
import { ShowDetailService } from '../show-detail/show-detail.service'
import { ShowDetailConf } from '../show-detail/show-detail.data'
import { NoteService } from '../account-note/account-note.service'

@Component({
    selector: 'app-account-incomeExpense',
    templateUrl: './account-incomeExpense.component.html',
    styleUrls: [
        '../../../Console.component.scss',
        '../account.component.scss',
        './account-incomeExpense.component.scss'
    ]
})
export class AccountIncomeExpenseComponent implements OnInit, OnDestroy {
    @ViewChild('typeBtn') typeBtn: ElementRef;
    @ViewChild('startDate') startDate: ElementRef;
    @ViewChild('endDate') endDate: ElementRef;
    @ViewChild('clickTB', { read: ViewContainerRef }) clickTB: ViewContainerRef;

    //表头
    public incomeExpenseTitle: string[]
    //pbox监听
    public pboxObs: Subscription
    public loadingType: string
    //收支明细数据
    public incomeExps: any[]
    public processTypes: any
    //交易类别选项
    public processTypesOp: any[]
    //请求参数
    public requestParam: RequestParam
    //选项显示
    public requestShow: {
        type: string;
        startDate: string;
        endDate: string;
    }
    //分页相关
    public pageParam:{
        total:number
    }
    // 最近7天点击
    public sevenClick: boolean
    // 最近一个月点击
    public monthClick: boolean
    //日期组件入口类型
    public dateType: string
    //显示详情
    public showDetailData:ShowDetailConf

    //活动中的收支明细单项
    public activeItem:any

    constructor(
        public grAccountsService: GrAccountsService,
        public riccioPboxService: RiccioPboxService,
        public accountService: AccountService,
        public riccioNotificationsService: RiccioNotificationsService,
        public showDetailService:ShowDetailService,
        private noteService:NoteService
    ) {
        this.incomeExpenseTitle = new IncomeExpenseData().incomeExpenseTitle
        this.processTypes = new IncomeExpenseData().processTypes
        this.processTypesOp = new IncomeExpenseData().processTypesOp
        this.requestParam = new RequestParam()
        this.requestShow = {
            type: this.processTypesOp[0].name,
            startDate: this.accountService.getNowStart(7),
            endDate: new Date().toLocaleDateString()
        }
        this.pageParam = {
            total:0
        }
    }

    ngOnInit() {
        this.fnRecentThirty()
        this.getIncomeExp()
        this.pboxObs = this.riccioPboxService.getEmit().subscribe(res => {
            this.resolvePbox(res)
        })
    }

    ngOnDestroy() {
        this.pboxObs ? this.pboxObs.unsubscribe() : {}
    }

    /**
     * 获取收支明细
     * @author GR-05
     */
    public getIncomeExp() {
        this.loadingType = 'show'
        this.grAccountsService.postAccountIncomeExpense(this.requestParam).subscribe(res => {
            this.loadingType = 'hide'
            if (res.status === 1) {
                this.incomeExps = res.data.data
                this.pageParam.total = res.data.total
                if (!(this.incomeExps.length === 0)) {
                    this.resolveAccount()
                } else {
                    this.loadingType = 'empty'
                }
            }
        })
    }

    /**
     * 处理一下资产数据
     * @author GR-05
     */
    public resolveAccount() {
        this.incomeExps.forEach(income => {
            income['amount_type'] = income.amount > 0 ? true : false
            income['amount'] = income.amount > 0 ? `+ ¥ ${income.amount}` : `- ¥ ${income.amount.toString().replace('-','')}`
            income['amount_now'] = '¥ '+income['amount_now']
            income['processWord'] = this.processTypes[income.process_type]
        })
    }

    /**
     * 显示类别条件
     * @param el 点击元素
     * @author GR-05
     */
    public fnShowTypes(el: any) {
        let position = this.typeBtn.nativeElement.getBoundingClientRect()
        this.riccioPboxService.setSubject({
            genre: 'option',
            el: el,
            position: {
                top: position.top,
                left: position.left,
                width: position.width
            },
            type: 'accountIncomeType',
            data: this.processTypesOp
        })
    }

    /**
     * 分页动作
     * @param data 
     * @author GR-05
     */
    public fnPagination(data:any){
        this.requestParam.page = data.page
        this.requestParam.rows = data.rows
        this.getIncomeExp()
    }

    /**
     * 处理pbox
     * @param res 
     * @author GR-05
     */
    public resolvePbox(res: any) {
        switch (res.type) {
            case 'accountIncomeType':
                //类型
                this.resolveTypes(res.data)
                break
        }
    }

    /**
     * 点击最近7天
     * @author GR-05
     */
    public fnRecentSeven() {
        this.sevenClick = true
        this.monthClick = false
        this.resolveRecent(7)
    }

    /**
    * 点击最近30天
    * @author GR-05
    */
    public fnRecentThirty() {
        this.sevenClick = false
        this.monthClick = true
        this.resolveRecent(30)
    }

    /**
     * 最近时间公共部分
     * @param flag 天数
     * @author GR-05
     */
    public resolveRecent(flag:number){
        this.requestParam.time = []
        this.requestParam.time.push(this.accountService.getNowStart(flag))
        this.requestParam.time.push(this.accountService.getTimeLate(new Date().toLocaleDateString()))
        this.requestShow.startDate = this.requestParam.time[0]
        this.requestShow.endDate = this.requestParam.time[1]
    }

    /**
     * 收支类型选择
     * @param data 
     * @author GR-05
     */
    public resolveTypes(data: any) {
        this.requestParam.type = data.value
        this.requestShow.type = data.name
    }

    /**
     * 显示时间选择
     * @param el 
     * @author GR-05
     */
    public fnShowDate(el: any, type: string) {
        let position
        if (type === 'start') {
            position = this.startDate.nativeElement.getBoundingClientRect()
            this.dateType = 'incomeStartDate'
        } else if (type === 'end') {
            position = this.endDate.nativeElement.getBoundingClientRect()
            this.dateType = 'incomeEndDate'
        }
        this.riccioPboxService.setSubject({
            'genre': 'other',
            'el': el,
            'type': 'incomeDate',
            'data': {},
            'position': {
                'left': position.left,
                'top': position.top + position.height,
                'width': 350
            }
        })
    }

    /**
     * 处理日期组件回调数据
     * @param data 
     * @author GR-05
     */
    public fnEmitDataPicker(data: any) {
        let tempDate = data.TimeShow?data.date.toLocaleString('chinese',{hour12:false}):this.accountService.getTimeFirst(data.date.toLocaleDateString())
        if (data.type === 'incomeStartDate') {
            //起始时间
            let flag = this.accountService.compareStartEndDate(tempDate, this.requestParam.time[1])
            if (flag) {
                this.requestParam.time[0] = tempDate
                this.requestShow.startDate = this.requestParam.time[0]
            } else {
                this.riccioNotificationsService.setSubject({
                    text: '起始日期不能晚于结束日期',
                    status: 'danger'
                })
            }
        } else if (data.type === 'incomeEndDate') {
            //结束时间
            let flag = this.accountService.compareStartEndDate(tempDate, this.accountService.getTimeLate(new Date().toLocaleDateString()))
            let startFlag = this.accountService.compareStartEndDate(this.requestParam.time[0], tempDate)
            if (flag) {
                if (startFlag) {
                    this.requestParam.time[1] = tempDate
                    this.requestShow.endDate = this.requestParam.time[1]
                } else {
                    this.riccioNotificationsService.setSubject({
                        text: '结束日期不能早于起始日期',
                        status: 'danger'
                    })
                }
            } else {
                this.riccioNotificationsService.setSubject({
                    text: '结束日期不能晚于今天',
                    status: 'danger'
                })
            }
        }
        this.riccioPboxService.setSubject({})
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
            title: '收支明细详情',
            showList: this.resolveDetail(data),
            top: 52
        }
        this.showDetailService.SetDetailConfSbj(this.showDetailData)
    }

    /**
     * 显示备注修改组件
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

    /**
     * 输入处理
     * @author GR-05
     */
    resolveChargeInput(flag:number) {
        if (this.requestParam && !Number.isNaN(Number(this.requestParam.amount[flag]))) {
            if(this.requestParam.amount[flag].toString().replace(/(^\s+)|(\s+$)/g,"").length == 0){
                this.requestParam.amount[flag] = null
            }else{
                this.requestParam.amount[flag] = Number(this.requestParam.amount[flag])
            }
        } else {
            if(this.requestParam.amount[flag].toString() == '-' || this.requestParam.amount[flag].toString()=='+'){
                return
            }else{
                this.requestParam.amount[flag] = null
            }
        }
    }

}
