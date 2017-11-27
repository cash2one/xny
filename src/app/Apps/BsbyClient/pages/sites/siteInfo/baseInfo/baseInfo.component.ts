import {
    Component,
    OnInit,
    OnDestroy,
    OnChanges,
    ViewChild,
    ViewContainerRef,
    ElementRef,
    Input,
    EventEmitter
} from '@angular/core'
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'

import { BsbyService } from '../../../../bsbyClient.service'
import { SitesService } from '../../sites.service'
import { RiccioLoadingService } from '@gr-public/riccio-loading/riccio-loading.service'
import { GrSiteService } from '../../../../services/grManagement/grSite.service'
import { GrDateToolService } from '../../../../../../ApiServices/grDateTool/dateTool.service'

@Component({
    selector: 'site-base-info',
    templateUrl: './baseinfo.component.html',
    styleUrls: [
        './baseInfo.component.scss'
    ]
})
export class BaseInfoComponent implements OnInit, OnDestroy {

    //网站基本信息
    @Input() baseInfo: any

    //角色loading
    public roleLoadingType: string
    //角色信息
    public roleInfo: any[]
    //是否显示密码
    public showDomainPassword: boolean
    //是否显示ftp密码
    public showFtpPassword: boolean

    daysChangeEvent = new EventEmitter<number>()
    keywordChangeEvent = new EventEmitter<number>()

    constructor(
        private bsbyService: BsbyService,
        private riccioLoadingService: RiccioLoadingService,
        private grSiteService: GrSiteService,
        private sitesService: SitesService,
        private grDateToolService:GrDateToolService
    ) {
    }

    ngOnInit() {
        this.resolveBaseInfo()
        this.sitesService.siteInfoObj.subscribe(res => {
            this.baseInfo = res
            this.resolveBaseInfo()
        })
        this.getRoleInfo()
    }

    ngOnDestroy() {
    }

    /**
     * 处理数据
     * @author GR-05
     */
    resolveBaseInfo() {
        this.baseInfo['starttime'] = this.bsbyService.resolveDate(this.baseInfo['starttime'])
        this.baseInfo['endtime'] = this.bsbyService.resolveDate(this.baseInfo['endtime'])
        if(this.baseInfo['keyword_run']){
            this.keywordChangeEvent.subscribe(res => {
                this.baseInfo['keyword_run'] = res
            })
            this.numberChange(this.baseInfo['keyword_run'],this.keywordChangeEvent,1000)
        }
        if(this.grDateToolService.compareStartEndDate(this.baseInfo['starttime'],new Date().toString())){
            this.baseInfo['stilltime'] = this.grDateToolService.stillDate(this.baseInfo['starttime'],new Date().toString())
            this.daysChangeEvent.subscribe(res => {
                this.baseInfo['stilltime'] = res
            })
            this.numberChange(this.baseInfo['stilltime'],this.daysChangeEvent,1000)
        }else{
            this.baseInfo['stilltime'] = this.grDateToolService.stillDate(this.baseInfo['starttime'],this.baseInfo['endtime'])
            this.daysChangeEvent.subscribe(res => {
                this.baseInfo['stilltime'] = res
            })
            this.numberChange(this.baseInfo['stilltime'],this.daysChangeEvent,1000)
        }
    }

    /**
     * 获取角色信息
     * @author GR-05
     */
    public getRoleInfo() {
        this.roleLoadingType = 'show'
        this.grSiteService.getSiteRoleList({
            site_id: this.baseInfo.id
        }).subscribe(res => {
            this.roleLoadingType = 'hide'
            if (res.status === 1) {
                this.roleInfo = res.data
            }
        })
    }

    /**
     * 数字变化
     * @param num 顶值
     * @param ev 监听体
     * @param time 变化到顶值的时间  毫秒
     * @author GR-05
     */
    public numberChange(num:number,ev:EventEmitter<number>,time:number){
        let oneTime = time / num
        let temp = num
        num = 0
        ev.emit(num)
        let interval = setInterval(()=>{
            ev.emit(num ++)
            if(num == temp + 1){
                clearInterval(interval)
            }
        },oneTime)
    }
}