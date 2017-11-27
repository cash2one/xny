import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    OnDestroy
} from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { Subscription } from 'rxjs/Subscription'

import { RechargeFc, PostData } from './account-recharge.data'
import { AccountService } from '../account.service'
import { RechargeService } from './recharge/recharge.service'
import { RechargeData } from './recharge/recharge.data'

import { RiccioModalService } from '../../../../Public/riccio-modal/riccio-modal.service'
import { RiccioNotificationsService } from '../../../../Public/riccio-notifications/riccio-notifications.service'

@Component({
    selector: 'app-account-recharge',
    templateUrl: './account-recharge.component.html',
    styleUrls: [
        '../../../../Public/theme/apps-common/common.scss',
        '../../../Console.component.scss',
        '../account.component.scss',
        './account-recharge.component.scss'
    ]
})
export class AccountRechargeComponent implements OnInit {

    //充值表单控件
    public ctrlRecharge: RechargeFc
    //表单
    public rechargeForm: FormGroup
    //提交数据
    public rechargeData: PostData
    //企业信息
    public comInfo: any
    //loading
    public mainLoadingType: string

    constructor(
        public builder: FormBuilder,
        public accountService: AccountService,
        public rechargeService: RechargeService,
        public riccioModalService: RiccioModalService,
        private riccioNotificationsService:RiccioNotificationsService
    ) {
        this.rechargeData = new PostData()
        this.resolveCtrl()
    }

    ngOnInit() {
        this.resolveForm()
        this.resolveComInfo()
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
                }
            })
        } else {
            this.mainLoadingType = 'hide'
        }
    }

    /**
     * 处理表单控件
     * @author GR-05
     */
    resolveCtrl() {
        this.ctrlRecharge = {
            charge: new FormControl('', [
                Validators.required
            ])
        }
    }

    /**
     * 输入处理
     * @author GR-05
     */
    resolveChargeInput() {
        if (this.rechargeData && !Number.isNaN(Number(this.rechargeData.charge))) {
            if(this.rechargeData.charge){
                let temp = this.rechargeData.charge.toString()
                let index = temp.indexOf('.')
                let result = 0
                if (index != -1) {
                    if (temp.length - 1 - index > 2) {
                        temp = temp.slice(0, index + 3)
                        result = Number(temp)
                        this.rechargeForm.controls['charge'].setValue(result)
                    }
                }
            }
        } else {
            this.rechargeForm.controls['charge'].setValue(null)
        }
    }

    /**
     * 处理表单
     * @author GR-05
     */
    resolveForm() {
        this.rechargeForm = this.builder.group({
            charge: this.ctrlRecharge.charge
        })
    }

    /**
     * 显示充值组件
     * @author GR-05
     */
    public fnGoCharge() {
        if(this.rechargeData && !(this.rechargeData.charge > 0)) {
            this.riccioNotificationsService.setSubject({
                text:'充值金额必须大于 0 元',
                status:'danger'
            })
        }
        else if (this.rechargeForm.valid && this.rechargeData && !Number.isNaN(Number(this.rechargeData.charge))) {
            this.rechargeService.setRecharge({
                amountNow: this.comInfo.amount,
                amountCharge: this.rechargeData.charge
            })
        }
    }

    /**
     * 监听充值动作
     * @author GR-05
     */
    public fnRechargeEmit() {
        this.riccioModalService.setSubject({
            header: '充值',
            size: 400,
            noBtn: true
        })
    }

    /**
     * 成功支付刷新余额
     * @author  gr-05
     */
    public successPay() {
        this.riccioModalService.setSubject({})
        this.rechargeForm.reset(new RechargeData())
        this.mainLoadingType = 'show'
        this.accountService.getComInfoDynamic().subscribe(res => {
            this.mainLoadingType = 'hide'
            if (res.status === 1) {
                this.comInfo = res.data
                this.accountService.setComInfo(this.comInfo)
            }
        })
    }

    /**
     * 关闭
     */
    public fnClose(){
        this.riccioModalService.setSubject({})
    }
}
