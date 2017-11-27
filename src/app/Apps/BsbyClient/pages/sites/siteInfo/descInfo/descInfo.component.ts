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
import { GrSiteService } from '../../../../services/grManagement/grSite.service'
import { SitesService } from '../../sites.service'

@Component({
    selector: 'site-desc-info',
    templateUrl: './descInfo.component.html',
    styleUrls: [
        '../../../../../../Public/theme/apps-common/common.scss',
        '../../../../../../Public/theme/apps-common/table.scss',
        // '../../../BsbyClient/bsbyClient.common.scss',
        './descInfo.component.scss'
    ]
})
export class DescInfoComponent implements OnInit {
    //网站信息数据
    @Input() public descInfo:any

    //表头数据
    public tableTitles:any[]

    isRefresh:boolean

    constructor(
        private grSiteService:GrSiteService,
        private sitesService:SitesService,
        private riccioNotificationsService:RiccioNotificationsService
    ) {
        this.tableTitles = new DescInfoData().listTitles
    }

    ngOnInit() {
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