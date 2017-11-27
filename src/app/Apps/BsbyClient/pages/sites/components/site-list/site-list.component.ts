import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    ViewContainerRef,
    ElementRef,
    QueryList,
    ViewChildren,
    Renderer2
} from '@angular/core'
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'

import { RiccioPboxService } from '@gr-public/riccio-pbox/riccio-pbox.service'
import { RiccioLoadingService } from '@gr-public/riccio-loading/riccio-loading.service'
import { RiccioNotificationsService } from '@gr-public/riccio-notifications/riccio-notifications.service'
import { RiccioPopUpRightService } from '@gr-public/riccio-pop-up-right/riccio-pop-up-right.service'

import { SiteListData, SiteListRequestParam } from './site-list.data'
import { PageData } from '../../../../bsbyClient.data'

import { GrSiteService } from '../../../../services/grManagement/grSite.service'
import { GrSceneService } from '../../../../services/grManagement/grScene.service'
import { BsbyService } from '../../../../bsbyClient.service'
import { SitesService } from '../../sites.service'


@Component({
    selector: 'app-bsby-service-site-list',
    templateUrl: './site-list.component.html',
    styleUrls: [
        '../../../../../../Public/theme/apps-common/common.scss',
        '../../../../../../Public/theme/apps-common/table.scss',
        '../../../../../BsbyClient/bsbyClient.common.scss',
        '../../sites.component.scss',
        './site-list.component.scss'
    ]
})
export class SiteListComponent implements OnInit, OnDestroy {
    @ViewChild('sortBtn') sortBtn: ElementRef;
    @ViewChild('findBtn') findBtn: ElementRef;
    @ViewChild('roleMgr') roleMgr: ElementRef;
    @ViewChildren('sceneEditBtn') sceneEditBtns: QueryList<ElementRef>;
    @ViewChild('detailTB', { read: ViewContainerRef }) detailTB: ViewContainerRef;

    //表头
    public siteListTitles: any[]
    //网站列表
    public siteList: any[]
    //网站列表请求参数
    public siteListRequestParam: SiteListRequestParam
    //表格loading 显示类型
    public loadingType: string
    //排序数据
    public siteListSort: any[]
    //pbox监听
    public pboxObj: Subscription

    //分页相关
    public pageData: PageData
    //排序名称
    public rangeName: string


    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private renderer: Renderer2,
        private riccioPboxService: RiccioPboxService,
        private riccioLoadingService: RiccioLoadingService,
        private riccioNotificationsService: RiccioNotificationsService,
        private riccioPopUpRightService: RiccioPopUpRightService,
        private grSiteService: GrSiteService,
        private grSceneService: GrSceneService,
        private bsbyService: BsbyService,
        private sitesService: SitesService
    ) {
        this.siteListTitles = new SiteListData().siteListTitle
        this.siteListRequestParam = new SiteListRequestParam()
        this.siteListSort = new SiteListData().siteListSorter
        this.pageData = new PageData()
    }

    ngOnInit() {
        this.getSiteList()
        this.pboxObj = this.riccioPboxService.getEmit().subscribe(res => {
            this.resolvePbox(res)
        })
    }

    ngOnDestroy() {
        this.pboxObj ? this.pboxObj.unsubscribe() : {}
    }

    /**
     * 获取网站列表
     * @author GR-05
     */
    public getSiteList() {
        this.loadingType = 'show'
        this.grSiteService.getSiteList({
            page: this.pageData.page,
            rows: this.pageData.rows,
            ...this.siteListRequestParam
        }).subscribe(res => {
            this.loadingType = 'hide'
            if (res.status === 1) {
                this.riccioPopUpRightService.setSubject({})
                this.pageData.total = res.data.total
                if(res.data.total == 0){
                    this.loadingType = 'empty'
                }else{
                    this.siteList = this.resolveSiteList(res.data.data)
                    this.sitesService.setSiteList(this.siteList)
                }
            }
        })
    }

    /**
     * 处理网站列表
     * @param siteList 
     * @author GR-05
     */
    public resolveSiteList(siteList: any[]) {
        siteList.forEach(site => {
            site['starttime'] = this.bsbyService.resolveDate(site['starttime'])
            site['endtime'] = this.bsbyService.resolveDate(site['endtime'])
        })
        return siteList
    }

    /**
     * 显示排序条件
     * @param el 点击元素
     * @author GR-05
     */
    public fnShowSort(el: any) {
        let position = this.sortBtn.nativeElement.getBoundingClientRect()
        this.riccioPboxService.setSubject({
            genre: 'option',
            el: el,
            position: {
                top: position.top + this.sortBtn.nativeElement.offsetHeight + 5,
                left: position.left,
                width: 200
            },
            type: 'siteRange',
            data: this.siteListSort
        })
    }

    /**
     * 前往网站详情
     * @param site 
     * @author GR-05
     */
    public fnToInfo(site: any) {
        this.bsbyService.setSiteRouteInfo({
            siteId: site.id
        })
        this.riccioLoadingService.setLoading({
            message: '获取网站详情中'
        })
        this.grSiteService.getSiteInfo({
            id: site.id
        }).subscribe(res => {
            this.riccioLoadingService.closeLoading()
            if (res.status === 1) {
                this.sitesService.setSiteInfo(res.data)
                this.router.navigate(['../info', site.id], { relativeTo: this.route })
            }
        })
    }

    /**
     * 处理pbox
     * @param res 
     * @author GR-05
     */
    public resolvePbox(res: any) {
        switch (res.type) {
            case 'siteRange':
                //筛选排序
                this.resolveRange(res.data)
                break
        }
    }

    /**
     * 处理排序条件
     * @param data 
     * @author GR-05
     */
    public resolveRange(data: any) {
        this.rangeName = data.name
        this.siteListRequestParam.listorder = data.value
        this.getSiteList()
    }

    /**
     * 处理分页
     * @param page 
     * @author GR-05 
     */
    public fnPagination(page: any) {
        this.pageData.page = page.page
        this.pageData.rows = page.rows
        this.getSiteList()
    }
}