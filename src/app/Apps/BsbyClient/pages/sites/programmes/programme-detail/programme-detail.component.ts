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

import { BsbyService } from '../../../../bsbyClient.service'
import { GrProgrammeService } from '../../../../services/grManagement/grProgramme.service'
import { SitesService } from '../../sites.service'

@Component({
    selector: 'app-bsby-service-site-programme-detail',
    templateUrl: './programme-detail.component.html',
    styleUrls: [
        '../../../../../../Public/theme/apps-common/common.scss',
        '../../../../../../Public/theme/apps-common/table.scss',
        '../../../../../BsbyClient/bsbyClient.common.scss',
        '../programmes.component.scss',
        './programme-detail.component.scss'
    ]
})
export class ProgrammeDetailComponent implements OnInit,OnDestroy {

    //路由监听
    public routeObj:Subscription
    //网站id
    public siteId:number
    //方案id
    public programmeId:number
    //网站详情
    public siteInfo:any
    //方案数据
    public programmeInfo:any
    //loading
    public loadingType:string
    //编辑器配置
    public ueditorConf:any

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public bsbyService:BsbyService,
        public sitesService:SitesService,
        public grProgrammeService:GrProgrammeService
    ) {
        this.ueditorConf = this.bsbyService.uedConf()
        this.ueditorConf.readonly = true
    }

    ngOnInit() {
        this.siteId = this.bsbyService.siteInfo.siteId
        this.siteInfo = this.sitesService.getSiteInfo()
        this.routeObj = this.route.params.subscribe(v => {
            this.programmeId = v.programmeid
        })
        if(this.siteInfo){
            this.getProgrammeInfo()
        }else{
            this.getSiteInfo()
        }
    }

    ngOnDestroy(){
        this.routeObj?this.routeObj.unsubscribe():{}
    }


    /**
     * 获取网站详情
     * @author GR-05
     */
    getSiteInfo(){
        this.sitesService.getSiteInfoDynamic(this.siteId).subscribe(res=>{
            if(res.status === 1){
                this.siteInfo = res.data
                this.getProgrammeInfo()
            }
        })
    }

    /**
     * 获取方案详情
     * @author GR-05
     */
    getProgrammeInfo(){
        this.loadingType = 'show'
        this.grProgrammeService.postProgrammeInfo({
            id:this.programmeId,
            site_id:this.siteId
        }).subscribe(res=>{
            this.loadingType = 'hide'
            if(res.status === 1){
                this.programmeInfo = res.data
                console.log(this.programmeInfo)
            }
        })
    }
}