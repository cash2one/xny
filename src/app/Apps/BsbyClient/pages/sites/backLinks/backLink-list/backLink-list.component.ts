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

import { BackLinkListData } from './backLink-list.data'
import { PageData } from '../../../../bsbyClient.data'
import { SitesService } from '../../sites.service'
import { BsbyService } from '../../../../bsbyClient.service'
import { GrBackLinkService } from '../../../../services/grManagement/grBackLink.service'
import { RiccioLoadingService } from '@gr-public/riccio-loading/riccio-loading.service'
import { RiccioNotificationsService } from '@gr-public/riccio-notifications/riccio-notifications.service'

@Component({
    selector: 'app-bsby-service-site-backLink-list',
    templateUrl: './backLink-list.component.html',
    styleUrls: [
        '../../../../../../Public/theme/apps-common/common.scss',
        '../../../../../../Public/theme/apps-common/table.scss',
        '../../../../../BsbyClient/bsbyClient.common.scss',
        '../backLinks.component.scss',
        './backLink-list.component.scss'
    ]
})
export class BackLinkListComponent implements OnInit,OnDestroy {

    //pbox监听
    public pboxObj:Subscription
    //网站详情（读取些许信息）
    public siteInfo: any
    //网站id
    public siteId: number
    //表头
    public backLinkListTitles: string[]
    //loading
    public siteLoadingType: string
    //表格loading
    public loadingType: string
    //文章列表
    public articleList: any[]
    //外链列表
    public backLinkList: any[]
    //外链总数
    public backLinkCount: number

    // 分页相关
    public pageData:PageData

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public sitesService: SitesService,
        public bsbyService: BsbyService,
        public grBackLinkService: GrBackLinkService,
        public riccioLoadingService: RiccioLoadingService,
        public riccioNotificationsService: RiccioNotificationsService
    ) {
        this.backLinkListTitles = new BackLinkListData().backLinkListTitles
        this.backLinkCount = 0
        this.pageData = new PageData()
    }

    ngOnInit() {
        this.siteId = this.bsbyService.siteInfo.siteId
        this.siteInfo = this.sitesService.getSiteInfo()
        if (this.siteInfo) {
            this.siteLoadingType = 'hide'
            this.getBackLinkList()
        } else {
            this.getSiteInfo()
        }
    }

    ngOnDestroy(){
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
                this.siteInfo = res.data
                this.sitesService.setSiteInfo(this.siteInfo)
                this.getBackLinkList()
            }
        })
    }

    /**
     * 获取外链列表
     * @author GR-05
     */
    public getBackLinkList() {
        this.loadingType = 'show'
        this.grBackLinkService.getBacklinkList({
            site_id: this.siteId,
            page:this.pageData.page,
            rows:this.pageData.rows
        }).subscribe(res => {
            this.loadingType = 'hide'
            if (res.status === 1) {
                this.backLinkList = res.data.data
                this.backLinkCount = res.data.total
                this.pageData.total = res.data.total
                res.data.total == 0 ?this.loadingType ='empty':{}
                this.resolveBackLink()
            }
        })
    }

    /**
     * 处理列表数据显示
     * @author GR-05
     */
    public resolveBackLink() {
        this.backLinkList.forEach(backlink => {
            backlink['showInputtime'] = this.bsbyService.resolveDate(backlink['inputtime'])
        })
    }

    /**
     * 处理分页
     * @param page 
     * @author GR-05 
     */
    public fnPagination(page:any){
        this.pageData.page = page.page
        this.pageData.rows = page.rows
        this.getBackLinkList()
    }
}