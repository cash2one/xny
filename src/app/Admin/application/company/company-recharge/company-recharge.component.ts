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

import { ComRechargeService } from './company-recharge.service'
import { ComRechargeData,PostData } from './company-recharge.data'
import { AdminService } from '../../../Admin.service'
import { GrCompanyService } from '../../../services/grCompany/grCompany.service'
import { RiccioLoadingService } from '../../../../Public/riccio-loading/riccio-loading.service'
import { RiccioNotificationsService } from '../../../../Public/riccio-notifications/riccio-notifications.service'

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
    selector: 'com-recharge',
    templateUrl: './company-recharge.component.html',
    styleUrls: [
        '../../../../Public/theme/apps-common/common.scss',
        './company-recharge.component.scss'
    ],
    animations: [smallBig]
})
export class ComRechargeComponent implements OnInit, OnDestroy {

    //服务监听
    public rechargeObj:Subscription
    public rechargeData:ComRechargeData
    //显示与否
    public isShow:boolean
    public postData:PostData

    @Output() rechargeEmit:EventEmitter<any> = new EventEmitter<any>()

    constructor(
        public comRechargeService:ComRechargeService,
        public riccioLoadingService:RiccioLoadingService,
        private riccioNotificationsService:RiccioNotificationsService,
        private grCompanyService:GrCompanyService,
        private adminService:AdminService
    ){
        this.postData = new PostData()
    }

    ngOnInit(){
        this.rechargeObj = this.comRechargeService.rechargeObs.subscribe(res=>{
            this.resolveRechargeObs(res)
        })
    }

    ngOnDestroy(){}

    /**
     * 处理服务监听
     * @param res 
     * @author GR-05
     */
    resolveRechargeObs(res:ComRechargeData){
        this.rechargeData = res
        this.postData.cid = res.cid
        this.isShow = true
    }

    /**
     * 关闭
     * @author GR-05
     */
    public fnClose() {
        this.isShow = false
    }

    /**
     * 输入处理
     * @author GR-05
     */
    resolveChargeInput() {
        if (this.postData && !Number.isNaN(Number(this.postData.amount))) {
            if(this.postData.amount){
                let temp = this.postData.amount.toString()
                let index = temp.indexOf('.')
                let result = 0
                if (index != -1) {
                    if (temp.length - 1 - index > 2) {
                        temp = temp.slice(0, index + 3)
                        result = Number(temp)
                        this.postData.amount = result
                    }
                }
            }
        } else {
            this.postData.amount = 0
        }
    }

    /**
     * 充值操作
     * @author GR-05 
     */
    public recharge(){
        if(!this.postData.amount || this.postData.amount <= 0){
            this.riccioNotificationsService.setSubject({
                text:'填写正确的金额或者大于0的金额',
                status:'danger'
            })
        }else if(!this.postData.desc || !this.adminService.validEmpty(this.postData.desc)){
            this.riccioNotificationsService.setSubject({
                text:'备注必填',
                status:'danger'
            })
        }else{
            this.riccioLoadingService.setLoading({
                message:'操作中'
            })
            this.grCompanyService.postCompanyRecharge(this.postData).subscribe(res=>{
                this.riccioLoadingService.closeLoading()
                if(res.status === 1){
                    this.rechargeEmit.emit(true)
                    this.isShow = false
                    this.postData = new PostData()
                    this.riccioNotificationsService.setSubject({
                        text:'操作成功',
                        status:'success'
                    })
                }
            })
        }
    }

}