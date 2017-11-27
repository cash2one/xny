import {
    Component,
    OnInit,
    OnDestroy,
    ElementRef,
    ViewChild,
    Output,
    EventEmitter
} from '@angular/core'
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations'
import { Subscription } from 'rxjs/Subscription'

import { RechargeService } from './recharge.service'
import { RechargeData } from './recharge.data'
import { GrAccountsService } from '../../../../services/grAccounts/grAccounts.service'
import { RiccioLoadingService } from '../../../../../Public/riccio-loading/riccio-loading.service'

const smallBig = trigger('smallBig', [
    state('in', style({ transform: 'translateY(0) scale(1)' })),
    transition('void => *', [
        animate(800, keyframes([
            style({ opacity: 0.7, transform: 'scale(0.8)', offset: 0 }),
            style({ opacity: 0.9, transform: 'scale(1.1)', offset: 0.2 }),
            style({ opacity: 1, transform: 'scale(1)', offset: 0.5 })
        ]))
    ]),
    transition('* => void', [
        animate(300, keyframes([
            style({ opacity: 1, transform: 'scale(1.1)', offset: 0 }),
            style({ opacity: 0.9, transform: 'scale(1)', offset: 0.2 }),
            style({ opacity: 0, transform: 'scale(0.8)', offset: 0.5 })
        ]))
    ])
])

@Component({
    selector: 'conosle-recharge',
    templateUrl: './recharge.component.html',
    styleUrls: [
        '../../../../../Public/theme/apps-common/common.scss',
        './recharge.component.scss'
    ],
    animations: [smallBig]
})
export class RechargeComponent implements OnInit, OnDestroy {

    //服务监听
    public rechargeObj:Subscription
    public rechargeData:RechargeData
    //显示与否
    public isShow:boolean
    //充值链接
    public rechargeLink:string

    @Output() rechargeEmit:EventEmitter<any> = new EventEmitter<any>()

    constructor(
        public rechargeService:RechargeService,
        public grAccountsService:GrAccountsService,
        public riccioLoadingService:RiccioLoadingService
    ){

    }

    ngOnInit(){
        this.rechargeObj = this.rechargeService.rechargeObs.subscribe(res=>{
            this.resolveRechargeObs(res)
        })
    }

    ngOnDestroy(){}

    /**
     * 处理服务监听
     * @param res 
     * @author GR-05
     */
    resolveRechargeObs(res:RechargeData){
        this.rechargeData = res
        this.rechargeData.type = 1
        this.isShow = true
        this.resolveRechargeLink()
    }

    /**
     * 提前获取充值链接
     * @author GR-05
     */
    resolveRechargeLink(){
        this.grAccountsService.postAccountRecharge({
            price:this.rechargeData.amountCharge
        }).subscribe(res=>{
            this.riccioLoadingService.closeLoading()
            if(res.status === 1){
                this.rechargeLink = res.data
            }
        })
    }

    /**
     * 前往充值链接
     * @author GR-05
     */
    public fnGoRecharge(){
        window.open(this.rechargeLink,'_blank')
        this.rechargeEmit.emit()
        this.fnClose()
    }

    /**
     * 关闭
     * @author GR-05
     */
    public fnClose() {
        this.isShow = false
    }

    /**
     * 点击充值
     * @author GR-05
     */
    public fnEmitData(){
        this.riccioLoadingService.setLoading({
            message:'获取支付链接中'
        })
        this.grAccountsService.postAccountRecharge({
            price:this.rechargeData.amountCharge
        }).subscribe(res=>{
            this.riccioLoadingService.closeLoading()
            if(res.status === 1){
                // window.open(res.data,'_blank')
                this.rechargeEmit.emit()
                this.fnClose()
            }
        })
    }
}