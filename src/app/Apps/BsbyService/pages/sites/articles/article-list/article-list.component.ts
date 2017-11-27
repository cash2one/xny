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
import { PageData } from '../../../../bsbyService.data'
import { SitesService } from '../../sites.service'
import { BsbyService } from '../../../../bsbyService.service'
import { GrArticleService } from '../../../../services/grManagement/grArticle.service'
import { RiccioLoadingService } from '@gr-public/riccio-loading/riccio-loading.service'
import { RiccioNotificationsService } from '@gr-public/riccio-notifications/riccio-notifications.service'
import { RiccioPboxService } from '@gr-public/riccio-pbox/riccio-pbox.service'
import { ArticleOpService } from '../article-op/article-op.service'

@Component({
    selector: 'app-bsby-service-site-article-list',
    templateUrl: './article-list.component.html',
    styleUrls: [
        '../../../../../../Public/theme/apps-common/common.scss',
        '../../../../../../Public/theme/apps-common/table.scss',
        '../../../../../BsbyService/bsbyService.common.scss',
        '../articles.component.scss',
        './article-list.component.scss'
    ]
})
export class ArticleListComponent implements OnInit {

    //pbox监听
    public pboxObj:Subscription
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
    //处于活动中的文章数据
    public activeArticle:any

    //分页
    public pageData:PageData

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public sitesService: SitesService,
        public bsbyService: BsbyService,
        public riccioLoadingService: RiccioLoadingService,
        public riccioNotificationsService:RiccioNotificationsService,
        public riccioPboxService:RiccioPboxService,
        public grArticleService:GrArticleService,
        public articleOpService:ArticleOpService
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
        this.pboxObj = this.riccioPboxService.getEmit().subscribe(res=>{
            this.resolvePbox(res)
        })
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

    /**
     * 显示添加文章组件
     * @author GR-05
     */
    public fnShowAddArticle(){
        this.articleOpService.setAOp({
            type:'add',
            comType:'articleListAdd'
        })
    }

    /**
     * 监听操作文章组件传回数据
     * @param data 
     * @author GR-05
     */
    public opArticleEmit(data:any){
        if(data.type === 'add'){
            let postData = {
                cid:this.siteInfo.cid,
                site_id:this.siteId,
                ...data.data
            }
            //添加文章
            this.grArticleService.postArticleAdd(postData).subscribe(res=>{
                this.articleOpService.close()
                if(res.status === 1){
                    this.riccioNotificationsService.setSubject({
                        text:'添加成功',
                        status:'success'
                    })
                    this.getArticleList()
                }
            })
        }else if(data.type === 'edit'){
            let postData = {
                id:this.activeArticle.id,
                site_id:this.siteId,
                ...data.data
            }
            //更新文章
            this.grArticleService.postArticleEdit(postData).subscribe(res=>{
                this.articleOpService.close()
                if(res.status === 1){
                    this.riccioNotificationsService.setSubject({
                        text:'更新成功',
                        status:'success'
                    })
                    this.getArticleList()
                }
            })
        }
    }

    /**
     * 显示操作
     * @author GR-05
     */
    public fnShowOp(el:any,article:any,e:MouseEvent){
        this.activeArticle = article
        this.riccioPboxService.setSubject({
            genre: 'option',
            el: el,
            position: {
                top: e.clientY,
                left: e.clientX - 75,
                width: 150
            },
            type: 'articleOp',
            data: new ArticleListData().ops
        })
    }

    /**
     * 处理pbox
     * @param res 回传数据
     * @author GR-05
     */
    public resolvePbox(res:any){
        switch(res.type){
            case 'articleOp':
                switch(res.data.value){
                    case 1:
                        //编辑
                        this.showArticleEdit()
                        break
                    case 2:
                        //删除
                        this.delArticle()
                        break
                }
        }
    }

    /**
     * 删除文章
     * @author GR-05
     */
    public delArticle(){
        this.riccioLoadingService.setLoading({
            message:'删除文章中'
        })
        this.grArticleService.postArticleDel({
            id:this.activeArticle.id,
            site_id:this.siteId
        }).subscribe(res=>{
            this.riccioLoadingService.closeLoading()
            if(res.status === 1){
                this.riccioNotificationsService.setSubject({
                     text:'删除成功',
                     status:'success'
                })
                this.getArticleList()
            }
        })
    }

    /**
     * 显示编辑文章组件
     * @author GR-05
     */
    public showArticleEdit(){
        this.articleOpService.setAOp({
            type:'edit',
            comType:'articleListEdit',
            data:this.activeArticle
        })
    }
}