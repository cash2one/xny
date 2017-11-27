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
import { PageData } from '../../../../bsbyService.data'
import { SitesService } from '../../sites.service'
import { BsbyService } from '../../../../bsbyService.service'
import { FriendLinkOpService } from '../friendLink-op/friendLink-op.service'
import { GrFriendLinkService } from '../../../../services/grManagement/grFriendLink.service'
import { RiccioLoadingService } from '@gr-public/riccio-loading/riccio-loading.service'
import { RiccioPboxService } from '@gr-public/riccio-pbox/riccio-pbox.service'
import { RiccioNotificationsService } from '@gr-public/riccio-notifications/riccio-notifications.service'

@Component({
    selector: 'app-bsby-service-site-friendLink-list',
    templateUrl: './friendLink-list.component.html',
    styleUrls: [
        '../../../../../../Public/theme/apps-common/common.scss',
        '../../../../../../Public/theme/apps-common/table.scss',
        '../../../../../BsbyService/bsbyService.common.scss',
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
    //处于活动状态的友链数据
    public activeFriendLink: any
    //pbox监听
    public pboxObj: Subscription

    //分页
    public pageData: PageData

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public sitesService: SitesService,
        public bsbyService: BsbyService,
        public grFriendLinkService: GrFriendLinkService,
        public friendLinkOpService: FriendLinkOpService,
        public riccioLoadingService: RiccioLoadingService,
        public riccioPboxService: RiccioPboxService,
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
        this.pboxObj = this.riccioPboxService.getEmit().subscribe(res => {
            this.resolvePbox(res)
        })
    }

    ngOnDestroy() {
        this.pboxObj ? this.pboxObj.unsubscribe() : {}
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

    /**
     * 显示操作
     * @author GR-05
     */
    public fnShowOp(el: any, friendLink: any, e: MouseEvent) {
        this.activeFriendLink = friendLink
        this.riccioPboxService.setSubject({
            genre: 'option',
            el: el,
            position: {
                top: e.clientY,
                left: e.clientX - 80,
                width: 150
            },
            type: 'friendLinkOp',
            data: new FriendLinkListData().ops
        })
    }

    /**
     * 处理pbox
     * @param res 回传数据
     * @author GR-05
     */
    public resolvePbox(res: any) {
        switch (res.type) {
            case 'friendLinkOp':
                switch (res.data.value) {
                    case 1:
                        //编辑
                        this.showFriendLinkEdit()
                        break
                    case 2:
                        //删除
                        // this.delArticle()
                        break
                }
        }
    }

    /**
     * 删除友链
     * @author GR-05
     */
    public delFriendLink() {
        this.riccioLoadingService.setLoading({
            message: '删除友链中'
        })
        this.grFriendLinkService.postFriendlinkDel({
            id: this.activeFriendLink.id,
            site_id: this.siteId
        }).subscribe(res => {
            this.riccioLoadingService.closeLoading()
            if (res.status === 1) {
                this.riccioNotificationsService.setSubject({
                    text: '删除成功',
                    status: 'success'
                })
                this.getFriendLinksList()
            }
        })
    }

    /**
     * 显示添加友链组件
     * @author GR-05
     */
    public fnShowAddFriendLink() {
        this.friendLinkOpService.setFlOp({
            type: 'add',
            comType: 'friendLinkOpAdd'
        })
    }

    /**
     * 显示编辑友链组件
     * @author GR-05
     */
    public showFriendLinkEdit() {
        this.friendLinkOpService.setFlOp({
            type: 'edit',
            comType: 'friendLinkOpEdit',
            data: this.activeFriendLink
        })
    }

    /**
     * 监听操作友链组件
     * @param data 回传表单数据
     */
    public fnOpFriendLink(data: any) {
        if (data.type == 'add') {
            // 添加
            let postData = {
                cid: this.siteInfo.cid,
                site_id: this.siteId,
                ...data.data
            }
            this.grFriendLinkService.postFriendlinkAdd(postData).subscribe(res => {
                if (res.status === 1) {
                    this.riccioNotificationsService.setSubject({
                        text: '添加成功',
                        status: 'success'
                    })
                    this.friendLinkOpService.close()
                    this.getFriendLinksList()
                }
            })
        } else if (data.type == 'edit') {
            //更新
            let postData = {
                id: this.activeFriendLink.id,
                site_id: this.siteId,
                ...data.data
            }
            this.grFriendLinkService.postFriendlinkEdit(postData).subscribe(res => {
                if (res.status === 1) {
                    this.riccioNotificationsService.setSubject({
                        text: '更新成功',
                        status: 'success'
                    })
                    this.friendLinkOpService.close()
                    this.getFriendLinksList()
                }
            })
        }
    }
}