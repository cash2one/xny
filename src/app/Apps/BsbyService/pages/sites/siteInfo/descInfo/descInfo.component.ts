import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    ViewContainerRef,
    ElementRef,
    Input
} from '@angular/core'
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'

import { RiccioNotificationsService } from '@gr-public/riccio-notifications/riccio-notifications.service'

import { DescInfoData } from './descInfo.data'
import { SiteDescEditService } from './site-desc-edit/site-desc-edit.service'
import { SitesService } from '../../sites.service'
import { GrSiteService } from '../../../../services/grManagement/grSite.service'

@Component({
    selector: 'site-desc-info',
    templateUrl: './descInfo.component.html',
    styleUrls: [
        '../../../../../../Public/theme/apps-common/common.scss',
        '../../../../../../Public/theme/apps-common/table.scss',
        // '../../../BsbyService/bsbyService.common.scss',
        './descInfo.component.scss'
    ]
})
export class DescInfoComponent implements OnInit {
    //网站信息数据
    @Input() public descInfo: any

    //监听操作网站信息组件
    public siteDescEditObj: Subscription

    //是否刷新
    isRefresh:boolean

    //表头数据
    public tableTitles: any[]

    constructor(
        private siteDescEditService: SiteDescEditService,
        private sitesService: SitesService,
        private grSiteService:GrSiteService,
        private riccioNotificationsService:RiccioNotificationsService
    ) {
        this.tableTitles = new DescInfoData().listTitles
    }

    ngOnInit() {
        this.siteDescEditObj = this.siteDescEditService.emitObs.subscribe(res => {
            this.resolveEditDesc(res)
        })
    }

    /**
     * 显示编辑网站信息组件
     * @author GR-05
     */
    public fnEdit() {
        let modalData = {
            header: '编辑网站信息',
            size: 600,
            noBtn: true
        }
        this.sitesService.setModalType({
            type: 'descEdit',
            modalData: modalData,
            comData: this.descInfo
        })
    }

    /**
     * 处理编辑网站信息成功后的数据
     * @param res 
     * @author GR-05
     */
    resolveEditDesc(res: any) {
        this.descInfo = Object.assign(this.descInfo, res)
        this.sitesService.setSiteInfo(this.descInfo)
    }

    /**
     * 刷新信息
     * @author GR-05
     */
    fnRefresh() {
        this.isRefresh = true
        this.grSiteService.getSiteDesc({
            id:this.descInfo.id
        }).subscribe(res=>{
            this.isRefresh = false
            if(res.status === 1){
                this.descInfo = Object.assign(this.descInfo,res.data)
                this.sitesService.setSiteInfo(this.descInfo)
                this.riccioNotificationsService.setSubject({
                    text:'同步更新完成',
                    status:'success'
                })
            }
        })
    }
}