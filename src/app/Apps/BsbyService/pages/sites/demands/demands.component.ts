import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    ViewContainerRef,
    ElementRef
} from '@angular/core'
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'

import { DemandsService } from './demands.service'
import { PageData } from '../../../bsbyService.data'
import { RiccioNotificationsService } from '@gr-public/riccio-notifications/riccio-notifications.service'
import { RiccioLoadingService } from '@gr-public/riccio-loading/riccio-loading.service'
import { RiccioModalService } from '@gr-public/riccio-modal/riccio-modal.service'
import { RiccioPboxService } from '@gr-public/riccio-pbox/riccio-pbox.service'
import { BsbyService } from '../../../bsbyService.service'
import { SitesService } from '../sites.service'
import { GrDemandService } from '../../../services/grManagement/grDemand.service'
import { GrSiteService } from '../../../services/grManagement/grSite.service'

@Component({
    selector: 'app-bsby-service-site-demands',
    templateUrl: './demands.component.html',
    styleUrls: [
        '../../../../../Public/theme/apps-common/common.scss',
        '../../../../../Public/theme/apps-common/table.scss',
        '../../../../BsbyService/bsbyService.common.scss',
        './demands.component.scss'
    ]
})
export class DemandsComponent implements OnInit,OnDestroy {
    //路由监听
    routeObj: Subscription
    //modal监听
    modalObj: Subscription
    //pbox监听
    pboxObj:Subscription

    //整体loading
    siteLoadingType: string
    //角色loading
    roleLoadingType: string
    //需求loading
    demandLoadingType: string
    //网站详情数据
    siteInfo: any
    //角色信息
    roleInfo: any
    //需求列表
    demandInfo: any
    //网站id
    siteId: number

    //分页
    pageData: PageData
    //是否显示添加需求
    showAdd: boolean

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private demandsService: DemandsService,
        private bsbyService: BsbyService,
        private sitesService: SitesService,
        private grDemandService: GrDemandService,
        private grSiteService: GrSiteService,
        private riccioNotificationsService: RiccioNotificationsService,
        private riccioLoadingService: RiccioLoadingService,
        private riccioModalService: RiccioModalService,
        private riccioPboxService: RiccioPboxService
    ) {
        this.siteLoadingType = 'hide'
        this.pageData = new PageData()
    }

    ngOnInit() {
        this.routeObj = this.route.params.subscribe(v => {
            this.siteId = v.siteid
            this.bsbyService.setSiteRouteInfo({
                siteId: v.siteid
            })
        })
        this.modalObj = this.riccioModalService.getEmit().subscribe(res => {
            if (res.type == 'close') {
                this.showAdd = false
            }
        })
        this.pboxObj = this.riccioPboxService.getEmit().subscribe(res => {
            if(res.type == 'siteDemandDel'){
                this.delDemand(res.data)
            }
        })
        this.siteInfo = this.sitesService.getSiteInfo()
        if (!this.siteInfo) {
            this.getSiteInfo()
        } else {
            this.getRoleList()
            this.getDemandList()
        }
    }

    ngOnDestroy(){
        this.routeObj ? this.routeObj.unsubscribe() : {}
        this.modalObj ? this.modalObj.unsubscribe() : {}
        this.pboxObj ? this.pboxObj.unsubscribe() : {}
    }
    
    /**
     * 添加需求显示
     * @author GR-05
     */
    public fnAddDemand() {
        let modalData: any
        modalData = {
            header: '提交需求',
            size: 550,
            noBtn: true
        }
        this.showAdd = true
        this.riccioModalService.setSubject(modalData)
        // this.demandsService.setDOp(true)
    }

    /**
     * 获取网站详情
     * @author GR-05
     */
    public getSiteInfo() {
        this.siteLoadingType = 'show'
        this.sitesService.getSiteInfoDynamic(this.siteId).subscribe(res => {
            this.siteLoadingType = 'hide'
            if (res.status === 1) {
                this.sitesService.setSiteInfo(res.data)
                this.siteInfo = res.data
                this.getRoleList()
                this.getDemandList()
            }
        })
    }

    /**
     * 获取角色信息
     * @author GR-05
     */
    public getRoleList() {
        this.roleLoadingType = 'show'
        this.grSiteService.getSiteRoleList({
            site_id: this.siteId
        }).subscribe(res => {
            this.roleLoadingType = 'hide'
            if (res.status === 1) {
                this.roleInfo = res.data
            }
        })
    }

    /**
     * 获取需求列表
     * @author GR-05
     */
    public getDemandList() {
        this.demandLoadingType = 'show'
        this.grDemandService.getDemandList({
            site_id: this.siteId,
            page: this.pageData.page,
            rows: this.pageData.rows
        }, 'my').subscribe(res => {
            this.demandLoadingType = 'hide'
            if (res.status === 1) {
                this.demandInfo = res.data.data
                this.pageData.total = res.data.total
                res.data.total == 0 ? this.demandLoadingType = 'empty' : {}
            }
        })
    }

    /**
     * 添加需求
     * @param demand 
     */
    public addDemand(demand: any) {
        let data = {
            site_id: this.siteId,
            cid: this.siteInfo.cid,
            content: demand.content,
            images: demand.images
        }
        this.grDemandService.postDemandAdd(data).subscribe(res => {
            this.demandsService.closeAdd()
            if (res.status === 1) {
                this.riccioNotificationsService.setSubject({
                    text: '提交成功',
                    status: 'success'
                })
                this.showAdd = false
                this.getDemandList()
            }
        })
    }

    /**
     * 显示删除确认
     * @author GR-05
     */
    public fnShowDel(demandId: number, el: any, e: MouseEvent) {
        this.riccioPboxService.setSubject({
            genre: 'delete',
            el: el,
            position: {
                left: e.clientX - 200,
                top: e.clientY,
                width: 240
            },
            type: 'siteDemandDel',
            data: {
                title: '删除此条记录',
                button: '删除',
                delID: demandId
            }
        })
    }

    /**
     * 删除需求
     * @param demandId 需求id
     */
    public delDemand(demandId: number) {
        this.riccioLoadingService.setLoading({
            message: '删除需求中'
        })
        this.grDemandService.postDemandDel({
            id: demandId,
            site_id: this.siteId
        }).subscribe(res => {
            this.riccioLoadingService.closeLoading()
            if (res.status === 1) {
                this.riccioNotificationsService.setSubject({
                    text: '删除成功',
                    status: 'success'
                })
                this.getDemandList()
            }
        })
    }

    /**
     * 处理分页
     * @param page 
     * @author GR-05 
     */
    public fnPagination(page: any) {
        this.pageData.page = page.page
        this.pageData.rows = page.rows
        this.getDemandList()
    }

    download(url: string) {
        window.open(window['setting']['fileurl'] + url)
    }
}