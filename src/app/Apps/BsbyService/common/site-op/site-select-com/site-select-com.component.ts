import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core'
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations'

import { RiccioNotificationsService } from '@gr-public/riccio-notifications/riccio-notifications.service'

import { BsbyService } from '../../../bsbyService.service'
import { SiteSelectComService } from './site-select-com.service'
import { GrCompanyInfoService } from '@gr-api-service/grCompanyInfo/grCompanyInfo.service'
import { GrCustomerService } from '../../../services/grManagement/grCustomer.service'
import { GrDateToolService } from '@gr-api-service/grDateTool/dateTool.service'
import { CustomerOpService } from '../../customer-op/customer-op.service'
import { CustomerOpTypes } from '../../customer-op/customer-op.data'

import { SelectComData, ComListRequestParam } from './site-select-com.data'

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
    selector: 'bsby-site-select-com',
    templateUrl: './site-select-com.component.html',
    styleUrls: [
        '../../../../../Public/theme/apps-common/common.scss',
        '../../../bsbyService.common.scss',
        '../../../../../Public/theme/apps-common/table.scss',
        './site-select-com.component.scss'
    ],
    animations: [smallBig]
})
export class SiteSelectComComponent implements OnInit, OnDestroy {

    //服务监听
    sscObs: any
    //操作客户组件监听
    customerOpObj: any
    //显示组件是否
    show: boolean
    //表头数据
    tableTitles: any[]
    //加载类型
    loadingType: string
    //公司列表
    comList: any[]
    //请求参数
    comListRequestPara: ComListRequestParam
    //选中回传数据
    emitData: {
        id: number;
        name: string
    }
    //总数
    total: number
    constructor(
        private riccioNotificationsService: RiccioNotificationsService,
        private siteSelectComService: SiteSelectComService,
        private grCustomerService: GrCustomerService,
        private bsbyService: BsbyService,
        private grDateToolService: GrDateToolService,
        private customerOpService: CustomerOpService
    ) {
        this.loadingType = 'show'
        this.comInit()
    }

    ngOnInit() {
        this.sscObs = this.siteSelectComService.sscOpObs.subscribe(res => {
            this.resolveSscObs(res)
        })
        this.resolveCustomerOpEmit()
    }

    ngOnDestroy() {
        this.sscObs ? this.sscObs.unsubscribe() : {}
        this.customerOpObj ? this.customerOpObj.unsubscribe() : {}
    }

    /**
     * 组件所有数据初始化
     * @author GR-05
     */
    comInit() {
        this.total = 0
        this.tableTitles = new SelectComData().comTitle
        this.comListRequestPara = new ComListRequestParam()
        this.comList = []
        this.emitData = {
            id: null,
            name: ''
        }
    }

    resolveSscObs(isShow: boolean) {
        this.show = isShow
        if (isShow) {
            this.getComList()
        }
    }

    fnClose() {
        this.show = false
        this.comInit()
    }

    /**
     * 获取公司列表
     * @author GR-05
     */
    getComList() {
        this.loadingType = 'show'
        this.grCustomerService.getCustomerList(this.comListRequestPara).subscribe(res => {
            if (res.status === 1) {
                this.total = res.data.total
                if (res.data.data.length > 0) {
                    this.loadingType = 'hide'
                    this.comList = this.resolveCustomerList(res.data.data)
                } else {
                    this.loadingType = 'empty'
                }
            }
        })
    }

    /**
     * 监听编辑或添加客户结果
     * @author GR-05
     */
    public resolveCustomerOpEmit() {
        this.customerOpObj = this.customerOpService.emitObs.subscribe(res => {
            if (res) {
                //添加或编辑客户成功
                this.getComList()
            }
        })
    }

    /**
     * 分页动作
     * @param data 
     */
    public fnPagination(data: any) {
        this.comListRequestPara.page = data.page
        this.comListRequestPara.rows = data.rows
        this.getComList()
    }

    /**
     * 处理获取的客户列表
     * @param list 响应
     * @author GR-05
     */
    public resolveCustomerList(list: any[]): any[] {
        let tempList = []
        list.forEach(item => {
            tempList.push(item)
            if (item.site) {
                item['select'] = false
            }
            if (item.site.length > 1) {
                item.site.forEach(site => {
                    site['cname'] = item['name']
                    site['starttime'] ? site['starttime'] = this.bsbyService.resolveDate(site['starttime']) : {}
                    site['endtime'] ? site['endtime'] = this.bsbyService.resolveDate(site['endtime']) : {}
                    if (this.grDateToolService.compareStartEndDate(new Date().toString(), site['endtime'])) {
                        site['stilltime'] = this.grDateToolService.stillDate(site['starttime'], new Date().toString())
                    } else {
                        site['stilltime'] = this.grDateToolService.stillDate(site['starttime'], site['endtime'])
                    }
                    site['amounttime'] = this.grDateToolService.stillDate(site['starttime'], site['endtime'])
                })
                let temp = JSON.parse(JSON.stringify(item.site))
                temp.splice(0, 1)
                tempList = tempList.concat(temp)
            }
        })
        return tempList
    }

    /**
     * 选中某个公司
     * @param com 公司数据
     * @author GR-05
     */
    public fnSelectCom(com: any) {
        this.emitData.id = com.cid
        this.emitData.name = com.name
    }

    /**
     * 回传数据
     * @author GR-05
     */
    public fnEmitData() {
        if (this.emitData.id) {
            this.siteSelectComService.setEmit(this.emitData)
            this.show = false
            this.comInit()
        } else {
            this.riccioNotificationsService.setSubject({
                text: '还没有选中公司',
                status: 'danger'
            })
        }
    }

    /**
     * 显示添加客户组件
     * @author GR-05
     */
    public fnAddCustomer() {
        this.customerOpService.setCOp({
            type: CustomerOpTypes.ADD
        })
    }
}