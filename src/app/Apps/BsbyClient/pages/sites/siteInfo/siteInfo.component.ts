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
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/forkJoin'

import { RiccioLoadingService } from '@gr-public/riccio-loading/riccio-loading.service'
import { RiccioPboxService } from '@gr-public/riccio-pbox/riccio-pbox.service'
import { RiccioNotificationsService } from '@gr-public/riccio-notifications/riccio-notifications.service'

import { BsbyService } from '../../../bsbyClient.service'
import { SitesService } from '../../sites/sites.service'
import { GrSiteService } from '../../../services/grManagement/grSite.service'
import { GrKeywordService } from '../../../services/grManagement/grKeyword.service'

@Component({
    selector: 'app-bsby-service-site-info',
    templateUrl: './siteInfo.component.html',
    styleUrls: [
        '../../../../../Public/theme/apps-common/common.scss',
        '../../../../../Public/theme/apps-common/table.scss',
        '../../../../BsbyClient/bsbyClient.common.scss',
        './siteInfo.component.scss'
    ]
})
export class SiteInfoComponent implements OnInit, OnDestroy {
    @ViewChild('showSiteListEl') showSiteListEl: ElementRef;
    //路由流
    public routeObj: Subscription
    public pboxObj: Subscription
    //loading 类型
    public loadingType: string

    //基本信息块数据
    public baseInfo: any
    //数据变化块数据
    public datachangeInfo: any
    //讨论块数据
    public discussInfo: any
    //关键词信息块数据
    public keywordInfo: any

    //网站列表
    public siteList: any[]
    //当前下拉选择显示的域名
    public siteShowDomain: string

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private bsbyService: BsbyService,
        private sitesService: SitesService,
        private grSiteService: GrSiteService,
        private grKeywordService: GrKeywordService,
        private riccioLoadingService: RiccioLoadingService,
        private riccioPboxService: RiccioPboxService,
        private riccioNotificationsService:RiccioNotificationsService
    ) {
        this.initData()
        this.loadingType = 'show'
    }

    ngOnInit() {
        this.siteList = this.sitesService.siteList
        this.baseInfo = this.sitesService.getSiteInfo()
        this.resolveBaseInfo()

        this.pboxObj = this.riccioPboxService.getEmit().subscribe(res => {
            this.resolvePbox(res)
        })
    }

    ngOnDestroy() {
        this.routeObj ? this.routeObj.unsubscribe() : {}
        this.pboxObj ? this.pboxObj.unsubscribe() : {}
    }

    /**
     * 重置数据
     * @author GR-05
     */
    initData() {
        this.baseInfo = {}
        this.datachangeInfo = {}
        this.discussInfo = {}
        this.keywordInfo = {}
    }

    /**
     * 处理网站数据信息
     * @author GR-05
     */
    resolveBaseInfo() {
        //已有缓存
        if (this.baseInfo) {
            this.loadingType = 'hide'
            this.siteShowDomain = this.baseInfo.domain
        } else {
            this.routeObj = this.activatedRoute.params.subscribe(v => {
                this.resolveRoute(v.siteid)
            })
        }
    }

    /**
     * 处理路由监听
     * @param res 
     * @author GR-05
     */
    public resolveRoute(siteid: any) {
        //网站路由id非数字
        if (Number.isNaN(Number.parseInt(siteid))) {
            this.returnlist()
        }else{
            this.loadingType = 'show'
            this.bsbyService.setSiteRouteInfo({
                siteId: siteid
            })
            this.sitesService.getSiteInfoDynamic(siteid).subscribe(res => {
                this.loadingType = 'hide'
                if (res.status === 1) {
                    this.baseInfo = res.data
                    this.siteShowDomain = this.baseInfo.domain
                    this.sitesService.setSiteInfo(res.data)
                }
            },err => {
                this.returnlist()
            })
        }
    }

    /**
     * id无效返回列表并提示
     * @author GR-05
     */
    public returnlist(){
        this.riccioNotificationsService.setSubject({
            text:'无效的站点信息或者网络出错',
            status:'danger'
        })
        this.router.navigate(['../../list'], { relativeTo: this.activatedRoute })
    }

    /**
     * 处理获取显示网站列表
     * @author GR-05
     */
    public showSiteList(el: any) {
        if (this.siteList) {
            this.siteList.forEach((v, i, arr) => {
                arr[i]['name'] = arr[i]['domain']
            })
            this.bsbyService.showPbox(
                this.showSiteListEl,
                el,
                this.siteList,
                'siteInfoList'
            )
        } else {
            this.riccioLoadingService.setLoading({
                message: '获取网站列表中'
            })
            this.grSiteService.getSiteList({}).subscribe(res => {
                this.riccioLoadingService.closeLoading()
                if (res.status == 1) {
                    this.siteList = res.data.data
                    this.sitesService.setSiteList(this.siteList)
                    this.showSiteList(el)
                }
            })
        }
    }

    /**
     * 处理pbox 
     * @param res 
     * @author GR-05
     */
    public resolvePbox(res: any) {
        switch (res.type) {
            case 'siteInfoList':
                this.siteShowDomain = res.data.domain
                this.router.navigate([`/BsbyClient/site/info/${res.data.id}`])
                this.baseInfo.id != res.data.id ? this.resolveRoute(res.data.id) : {}
                break
        }
    }
}