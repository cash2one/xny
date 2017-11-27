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

import { ProgrammeListData } from './programme-list.data'
import { PageData } from '../../../../bsbyService.data'
import { SitesService } from '../../sites.service'
import { BsbyService } from '../../../../bsbyService.service'
import { GrProgrammeService } from '../../../../services/grManagement/grProgramme.service'
import { RiccioLoadingService } from '@gr-public/riccio-loading/riccio-loading.service'
import { RiccioPboxService } from '@gr-public/riccio-pbox/riccio-pbox.service'
import { RiccioNotificationsService } from '@gr-public/riccio-notifications/riccio-notifications.service'
import { ShowDetailService } from '../../../../common/show-detail/show-detail.service'
import { ShowDetailConf } from '../../../../common/show-detail/show-detail.data'

@Component({
    selector: 'app-bsby-service-site-programme-list',
    templateUrl: './programme-list.component.html',
    styleUrls: [
        '../../../../../../Public/theme/apps-common/common.scss',
        '../../../../../../Public/theme/apps-common/table.scss',
        '../../../../../BsbyService/bsbyService.common.scss',
        '../programmes.component.scss',
        './programme-list.component.scss'
    ]
})
export class ProgrammeListComponent implements OnInit,OnDestroy {

    //pbox监听
    public pboxObj:Subscription
    //网站详情（读取些许信息）
    public siteInfo: any
    //网站id
    public siteId: number
    //表头
    public programmeListTitles: string[]
    //方案列表数据
    public programmeList: any[]
    //方案详情
    public programmeInfo: any
    //loading
    public loadingType: string
    //整块loading
    public siteLoadingType: string
    //详情组件数据
    public showDetailData: ShowDetailConf
    //分页相关
    public pageData: PageData

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private sitesService: SitesService,
        private bsbyService: BsbyService,
        private grProgrammeService: GrProgrammeService,
        private riccioLoadingService: RiccioLoadingService,
        private riccioPboxService: RiccioPboxService,
        private riccioNotificationsService:RiccioNotificationsService,
        private showDetailService: ShowDetailService
    ) {
        this.siteLoadingType = 'show'
        this.loadingType = 'show'
        this.programmeListTitles = new ProgrammeListData().programmeListTitles
        this.pageData = new PageData()
    }

    ngOnInit() {
        this.siteId = this.bsbyService.siteInfo.siteId
        this.siteInfo = this.sitesService.getSiteInfo()
        if (this.siteInfo) {
            this.siteLoadingType = 'hide'
            this.getProgrammeList()
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
     * 跳转至 添加或编辑
     * @author GR-05
     */
    public fnGoOp(type: string, programmeId?: number) {
        if (type === 'add') {
            this.router.navigate(['../op', 'add'], { relativeTo: this.route })
        } else if (type === 'edit') {
            this.router.navigate(['../op', 'edit', programmeId], { relativeTo: this.route })
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
                this.getProgrammeList()
            }
        })
    }

    /**
     * 获取方案列表
     * @author GR-05
     */
    public getProgrammeList() {
        this.loadingType = 'show'
        this.grProgrammeService.getProgrammeList({
            site_id: this.siteId,
            page: this.pageData.page,
            rows: this.pageData.rows
        }).subscribe(res => {
            this.loadingType = 'hide'
            if (res.status === 1) {
                this.programmeList = res.data.data
                this.pageData.total = res.data.total
                res.data.total == 0 ? this.loadingType = 'empty' : {}
                this.resolveProgrammeList()
            }
        })
    }

    /**
     * 处理一下方案列表数据
     * @author GR-05
     */
    public resolveProgrammeList() {
        this.programmeList.forEach(programme => {
            let date = new Date(programme['created_at'])
            programme['created_at'] = date.toLocaleDateString()
            programme['month'] = date.getMonth() + 1 + '月'
        })
    }

    /**
     * 查看方案详情
     * @author GR-05
     */
    public fnShowDetail(programmeId: number) {
        this.router.navigate(['../detail', programmeId], { relativeTo: this.route })
    }

    /**
     * 处理给详情展示数据
     * @param data 方案数据 
     */
    public resolveDetail(): any[] {
        let result = [
            {
                data: [
                    { name: '创建时间', value: this.programmeInfo['created_at'] },
                    { name: '方案内容', value: this.programmeInfo['content'] }
                ]
            }
        ]
        return result
    }

    /**
     * 处理分页
     * @param page 
     * @author GR-05 
     */
    public fnPagination(page: any) {
        this.pageData.page = page.page
        this.pageData.rows = page.rows
        this.getProgrammeList()
    }

    /**
     * 显示删除方案
     * @param id 
     * @author GR-05 
     */
    public fnShowDel(id: number, el: any, e: MouseEvent) {
        this.riccioPboxService.setSubject({
            genre: 'delete',
            el: el,
            position: {
                left: e.clientX - 200,
                top: e.clientY,
                width: 220
            },
            type: 'siteProgrammeDel',
            data: {
                title: `确定删除此方案？`,
                button: '删除',
                delID: id
            }
        })
    }

    /**
     * 处理pbox
     * @param res 
     * @author GR-05 
     */
    public resolvePbox(res:any){
        switch(res.type){
            case 'siteProgrammeDel':
                this.delProgramme(res.data)
                break
        }
    }

    /**
     * 删除方案
     * @param id 
     * @author GR-05 
     */
    public delProgramme(id:number){
        this.riccioLoadingService.setLoading({
            message:'删除方案中'
        })
        this.grProgrammeService.postProgrammeDel({
            site_id:this.siteId,
            id:id
        }).subscribe(res=>{
            this.riccioLoadingService.closeLoading()
            if(res.status === 1){
                this.riccioNotificationsService.setSubject({
                    text:'删除成功',
                    status:'success'
                })
                this.getProgrammeList()
            }
        })
    }
}