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
import { PageData } from '../../../../bsbyService.data'
import { SitesService } from '../../sites.service'
import { BsbyService } from '../../../../bsbyService.service'
import { GrBackLinkService } from '../../../../services/grManagement/grBackLink.service'
import { BackLinkOpService } from '../backLink-op/backLink-op.service'
import { RiccioLoadingService } from '@gr-public/riccio-loading/riccio-loading.service'
import { RiccioNotificationsService } from '@gr-public/riccio-notifications/riccio-notifications.service'
import { RiccioPboxService } from '@gr-public/riccio-pbox/riccio-pbox.service'

@Component({
    selector: 'app-bsby-service-site-backLink-list',
    templateUrl: './backLink-list.component.html',
    styleUrls: [
        '../../../../../../Public/theme/apps-common/common.scss',
        '../../../../../../Public/theme/apps-common/table.scss',
        '../../../../../BsbyService/bsbyService.common.scss',
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
    //处于活动状态的外链（用于编辑）
    public activeBackLink: any

    // 分页相关
    public pageData:PageData

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public sitesService: SitesService,
        public bsbyService: BsbyService,
        public grBackLinkService: GrBackLinkService,
        public backLinkOpService: BackLinkOpService,
        public riccioLoadingService: RiccioLoadingService,
        public riccioNotificationsService: RiccioNotificationsService,
        public riccioPboxService: RiccioPboxService
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
        this.pboxObj = this.riccioPboxService.getEmit().subscribe(res=>{
            this.resolvePbox(res)
        })
    }

    ngOnDestroy(){
        this.pboxObj?this.pboxObj.unsubscribe():{}
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
     * 显示操作
     * @author GR-05
     */
    public fnShowOp(el: any, backlink: any, e: MouseEvent) {
        this.activeBackLink = backlink
        this.riccioPboxService.setSubject({
            genre: 'option',
            el: el,
            position: {
                top: e.clientY,
                left: e.clientX - 80,
                width: 150
            },
            type: 'backlinkOp',
            data: new BackLinkListData().ops
        })
    }

    /**
     * 处理pbox
     * @param res 回传数据
     * @author GR-05
     */
    public resolvePbox(res: any) {
        switch (res.type) {
            case 'backlinkOp':
                switch (res.data.value) {
                    case 1:
                        //编辑
                        this.fnShowEditBackLink()
                        break
                    case 2:
                        //删除
                        this.delBackLink()
                        break
                }
        }
    }
    /**
     * 显示添加外链组件
     * @author GR-05
     */
    public fnShowAddBackLink() {
        this.backLinkOpService.setBlOp({
            type: 'add',
            comType: 'opBackLinkListAdd'
        })
    }

    /**
     * 显示编辑外链组件
     * @author GR-05
     */
    public fnShowEditBackLink(){
        this.backLinkOpService.setBlOp({
            type:'edit',
            comType:'opBackLinkListEdit',
            data:this.activeBackLink
        })
    }

    /**
     * 删除外链
     * @author GR-05
     */
    public delBackLink(){
        this.riccioLoadingService.setLoading({
            message:'删除外链中'
        })
        this.grBackLinkService.postBacklinkDel({
            id:this.activeBackLink.id,
            site_id:this.siteId
        }).subscribe(res=>{
            this.riccioLoadingService.closeLoading()
            if(res.status === 1){
                this.riccioNotificationsService.setSubject({
                    text:'删除成功',
                    status:'success'
                })
                this.getBackLinkList()
            }
        })
    }

    /**
     * 监听操作外链组件
     * @param data 组件回传数据
     */
    public fnOpBackLinkEmit(data: any) {
        console.log(data)
        if (data.type == 'add') {
            //添加
            let postData = {
                cid: this.siteInfo.cid,
                site_id: this.siteId,
                ...data.data
            }
            this.grBackLinkService.postBacklinkAdd(postData).subscribe(res => {
                if (res.status === 1) {
                    this.backLinkOpService.close()
                    this.riccioNotificationsService.setSubject({
                        text: '添加成功',
                        status: 'success'
                    })
                    this.getBackLinkList()
                }
            })
        } else if (data.type == 'edit') {
            //编辑更新
            let postData = {
                id: this.activeBackLink.id,
                site_id: this.siteId,
                ...data.data
            }
            this.grBackLinkService.postBacklinkEdit(postData).subscribe(res => {
                if (res.status === 1) {
                    this.backLinkOpService.close()
                    this.riccioNotificationsService.setSubject({
                        text: '更新成功',
                        status: 'success'
                    })
                    this.getBackLinkList()
                }
            })
        }
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