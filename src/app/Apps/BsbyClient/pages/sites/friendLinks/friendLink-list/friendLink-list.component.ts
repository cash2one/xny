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

import { FriendLinkListData } from './friendLink-list.data'
import { PageData } from '../../../../bsbyClient.data'
import { SitesService } from '../../sites.service'
import { BsbyService } from '../../../../bsbyClient.service'
import { GrFriendLinkService } from '../../../../services/grManagement/grFriendLink.service'
import { RiccioLoadingService } from '@gr-public/riccio-loading/riccio-loading.service'
import { RiccioNotificationsService } from '@gr-public/riccio-notifications/riccio-notifications.service'

@Component({
    selector: 'app-bsby-service-site-friendLink-list',
    templateUrl: './friendLink-list.component.html',
    styleUrls: [
        '../../../../../../Public/theme/apps-common/common.scss',
        '../../../../../../Public/theme/apps-common/table.scss',
        '../../../../../BsbyClient/bsbyClient.common.scss',
        '../friendLinks.component.scss',
        './friendLink-list.component.scss'
    ]
})
export class FriendLinkListComponent implements OnInit, OnDestroy {

    //网站详情（读取些许信息）
    public siteInfo: any
    //网站id
    public siteId: number
    //表头
    public friendLinkListTitles: string[]
    //loading
    public siteLoadingType: string
    //表格加载
    public loadingType: string
    //友链列表
    public friendLinkList: any[]
    //友链总数
    public friendLinkCount: number

    //分页
    public pageData: PageData

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public sitesService: SitesService,
        public bsbyService: BsbyService,
        public grFriendLinkService: GrFriendLinkService,
        public riccioLoadingService: RiccioLoadingService,
        public riccioNotificationsService: RiccioNotificationsService
    ) {
        this.friendLinkListTitles = new FriendLinkListData().friendLinkListTitles
        this.friendLinkCount = 0
        this.pageData = new PageData()
    }

    ngOnInit() {
        this.siteId = this.bsbyService.siteInfo.siteId
        this.siteInfo = this.sitesService.getSiteInfo()
        if (this.siteInfo) {
            this.siteLoadingType = 'hide'
            this.getFriendLinksList()
        } else {
            this.getSiteInfo()
        }
    }

    ngOnDestroy() {
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
                this.getFriendLinksList()
            }
        })
    }

    /**
     * 获取友链列表
     * @author GR-05
     */
    public getFriendLinksList() {
        this.loadingType = 'show'
        this.grFriendLinkService.getFriendlinkList({
            site_id: this.siteId,
            page: this.pageData.page,
            rows: this.pageData.rows
        }).subscribe(res => {
            this.loadingType = 'hide'
            if (res.status === 1) {
                this.friendLinkList = res.data.data
                this.friendLinkCount = res.data.total
                this.pageData.total = res.data.total
                res.data.total == 0 ? this.loadingType = 'empty' : {}
                this.resolveFriendLinksList()
            }
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
        this.getFriendLinksList()
    }

    /**
     * 处理友链列表数据显示
     * @author GR-05
     */
    public resolveFriendLinksList() {
        this.friendLinkList.forEach(friendLink => {
            friendLink['showInputtime'] = this.bsbyService.resolveDate(friendLink['inputtime'])
        })
    }
}