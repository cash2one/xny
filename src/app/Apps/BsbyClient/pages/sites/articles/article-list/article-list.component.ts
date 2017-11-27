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

import { ArticleListData } from './article-list.data'
import { PageData } from '../../../../bsbyClient.data'
import { SitesService } from '../../sites.service'
import { BsbyService } from '../../../../bsbyClient.service'
import { GrArticleService } from '../../../../services/grManagement/grArticle.service'
import { RiccioLoadingService } from '@gr-public/riccio-loading/riccio-loading.service'
import { RiccioNotificationsService } from '@gr-public/riccio-notifications/riccio-notifications.service'

@Component({
    selector: 'app-bsby-service-site-article-list',
    templateUrl: './article-list.component.html',
    styleUrls: [
        '../../../../../../Public/theme/apps-common/common.scss',
        '../../../../../../Public/theme/apps-common/table.scss',
        '../../../../../BsbyClient/bsbyClient.common.scss',
        '../articles.component.scss',
        './article-list.component.scss'
    ]
})
export class ArticleListComponent implements OnInit {
    //网站详情（读取些许信息）
    public siteInfo: any
    //网站id
    public siteId: number
    //表头
    public articleListTitles: string[]
    //loading
    public siteLoadingType:string
    //表格loading
    public loadingType:string
    //文章列表
    public articleList:any[]
    //文章总数
    public articleCount:number

    //分页
    public pageData:PageData

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public sitesService: SitesService,
        public bsbyService: BsbyService,
        public riccioLoadingService: RiccioLoadingService,
        public riccioNotificationsService:RiccioNotificationsService,
        public grArticleService:GrArticleService
    ) {
        this.articleListTitles = new ArticleListData().articleListTitles
        this.articleCount = 0
        this.pageData = new PageData()
    }

    ngOnInit() {
        this.siteId = this.bsbyService.siteInfo.siteId
        this.siteInfo = this.sitesService.getSiteInfo()
        if (this.siteInfo) {
            this.siteLoadingType = 'hide'
            this.getArticleList()
        } else {
            this.getSiteInfo()
        }
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
                this.getArticleList()
            }
        })
    }

    /**
     * 获取文章列表
     * @author GR-05
     */
    public getArticleList(){
        this.loadingType = 'show'
        this.grArticleService.getArticleList({
            site_id:this.siteId,
            page:this.pageData.page,
            rows:this.pageData.rows
        }).subscribe(res=>{
            this.loadingType = 'hide'
            if(res.status === 1){
                this.articleList = res.data.data
                this.resolveArticleList()
                this.articleCount = res.data.total
                this.pageData.total = res.data.total
                res.data.total == 0? this.loadingType = 'empty':{}
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
        this.getArticleList()
    }

    /**
     * 处理过滤数据
     * @author GR-05
     */
    public resolveArticleList(){
        this.articleList.forEach(article=>{
            article['showInputtime'] = this.bsbyService.resolveDate(article['inputtime'])
        })
    }
}