import {
    Component,
    OnInit,
    OnDestroy,
    OnChanges,
    ViewChild,
    ViewContainerRef,
    ElementRef,
    Input,
    SimpleChanges,
    EventEmitter
} from '@angular/core'
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'

import { BsbyService } from '../../../../bsbyService.service'
import { RoleOpService } from '../../components/role-op/role-op.service'
import { RoleOpData } from '../../components/role-op/role-op.data'
import { SitesService } from '../../sites.service'
import { SiteAccountEditService } from './site-account-edit/site-account-edit.service'
import { SiteServiceEditService } from './site-service-edit/site-service-edit.service'
import { RiccioLoadingService } from '@gr-public/riccio-loading/riccio-loading.service'
import { RiccioPboxService } from '@gr-public/riccio-pbox/riccio-pbox.service'
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
    @ViewChild('excMgr') excMgr: ElementRef;

    //网站基本信息
    @Input() baseInfo: any

    //pbox监听
    public pboxObs: Subscription
    //监听账户信息修改
    public siteAccountEditObj: Subscription
    //监听服务信息修改
    public siteServiceEditObj:Subscription
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
        private roleOpService: RoleOpService,
        private riccioLoadingService: RiccioLoadingService,
        private riccioPboxService: RiccioPboxService,
        private grSiteService: GrSiteService,
        private sitesService: SitesService,
        private siteAccountEditService: SiteAccountEditService,
        private siteServiceEditService:SiteServiceEditService,
        private grDateToolService:GrDateToolService
    ) {
    }

    ngOnInit() {
        this.resolveBaseInfo()
        this.pboxObs = this.riccioPboxService.getEmit().subscribe(res => {
            this.resolvePbox(res)
        })
        this.siteAccountEditObj = this.siteAccountEditService.emitObs.subscribe(res => {
            this.resolveEditAccount(res)
        })
        this.siteServiceEditObj = this.siteServiceEditService.emitObs.subscribe(res=>{
            this.resolveEditAccount(res)
        })
        this.sitesService.siteInfoObj.subscribe(res => {
            this.baseInfo = res
            this.resolveBaseInfo()
        })
        this.getRoleInfo()
    }

    ngOnDestroy() {
        this.pboxObs ? this.pboxObs.unsubscribe() : {}
    }

    /**
     * 处理pbox监听
     * @param res 
     * @author GR-05
     */
    public resolvePbox(res: any) {
        
        switch (res.type) {
            case 'baseInfoEditAccount':
                //编辑账户信息
                (()=>{
                    let modalData = {
                        header: '编辑账号信息',
                        size: 600,
                        noBtn: true
                    }
                    this.sitesService.setModalType({
                        type:'accountEdit',
                        modalData:modalData,
                        comData:this.baseInfo
                    })
                })()
                break
            case 'baseInfoEditService':
                //编辑账户信息
                (()=>{
                    let modalData = {
                        header: '编辑服务信息',
                        size: 600,
                        noBtn: true
                    }
                    this.sitesService.setModalType({
                        type:'serviceEdit',
                        modalData:modalData,
                        comData:this.baseInfo
                    })
                })()
                break
        }
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
     * 处理编辑账户信息成功后的数据
     * @param res 
     * @author GR-05
     */
    resolveEditAccount(res: any) {
        this.baseInfo = Object.assign(this.baseInfo, res)
        this.sitesService.setSiteInfo(this.baseInfo)
    }

    /**
     * 弹出角色管理组件
     * @author GR-05
     */
    public fnRoleMgr() {
        let data: RoleOpData = {
            site_id: this.baseInfo['id'],
            roleInfo: this.roleInfo,
            serviceInfo: {
                service_user: this.baseInfo['service_user'],
            }
        }
        this.roleOpService.setROp({
            config: {
                expectClick: this.excMgr
            },
            data: data
        })
    }

    /**
     * 监听角色添加成功
     * @author GR-05
     */
    public fnOpRoleEmit() {
        this.roleLoadingType = 'show'
        this.riccioLoadingService.setLoading({
            message: '获取角色信息中'
        })
        this.grSiteService.getSiteRoleList({
            site_id: this.baseInfo['id']
        }).subscribe(res => {
            this.roleLoadingType = 'hide'
            if (res.status === 1) {
                this.roleInfo = res.data
                this.riccioLoadingService.setLoading({
                    message: '获取客服人员中'
                })
                this.sitesService.getSiteInfoDynamic(this.baseInfo['id']).subscribe(res => {
                    this.riccioLoadingService.closeLoading()
                    if (res.status == 1) {
                        this.sitesService.setSiteInfo(res.data)
                        this.baseInfo = this.sitesService.getSiteInfo()
                        this.resolveBaseInfo()
                        this.fnRoleMgr()
                    }
                })
            }
        })
    }

    /**
     * 弹出修改信息（账户、服务）组件
     * @author GR-05
     */
    public fnEdit(ele: any, e: MouseEvent,type:string) {
        this.riccioPboxService.setSubject({
            genre: 'option',
            el: ele,
            position: {
                top: e.clientY,
                left: e.clientX - 140,
                width: 150
            },
            type: type,
            data: [
                {
                    name: '编辑',
                    value: 0
                }
            ]
        })
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