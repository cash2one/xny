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
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/forkJoin'

import { BsbyService } from '../../../bsbyService.service'
import { SitesService } from '../../sites/sites.service'
import { GrSiteService } from '../../../services/grManagement/grSite.service'
import { GrKeywordService } from '../../../services/grManagement/grKeyword.service'
import { RiccioModalService } from '@gr-public/riccio-modal/riccio-modal.service'

@Component({
    selector: 'app-bsby-service-site-info',
    templateUrl: './siteInfo.component.html',
    styleUrls: [
        '../../../../../Public/theme/apps-common/common.scss',
        '../../../../../Public/theme/apps-common/table.scss',
        '../../../../BsbyService/bsbyService.common.scss',
        './siteInfo.component.scss'
    ]
})
export class SiteInfoComponent implements OnInit, OnDestroy {
    //路由流
    public routeObj: Subscription
    //modal类型监听
    public modalTypeObj:Subscription
    //modal监听
    public modalObj:Subscription
    //loading 类型
    public loadingType: string

    //基本信息块数据
    public baseInfo: any
    //数据变化块数据
    public datachangeInfo: any
    //讨论块数据
    public discussInfo: any
    //关键词信息块数据
    public keywordInfo: any
    //是否已预加载网站详情数据
    public isPreLoad:boolean 

    //modal显示类型
    modalType:{
        type:string,
        modalData:any,
        comData:any
    }

    constructor(
        private activatedRoute: ActivatedRoute,
        private bsbyService: BsbyService,
        private sitesService: SitesService,
        private grSiteService: GrSiteService,
        private grKeywordService:GrKeywordService,
        private riccioModalService:RiccioModalService
    ) {
        this.initData()
        this.loadingType = 'show'
    }

    ngOnInit() {
        this.baseInfo = this.sitesService.getSiteInfo()
        if(this.baseInfo){
            this.loadingType = 'hide'
            this.isPreLoad = true
            // this.resolveRoute(this.baseInfo.id)
        }else{
            this.routeObj = this.activatedRoute.params.subscribe(v => {
                this.resolveRoute(v.siteid)
            })
        }
        this.modalTypeObj = this.sitesService.modalTypeObj.subscribe(res=>{
            this.modalType = res
            this.riccioModalService.setSubject(this.modalType.modalData)
        })
        this.modalObj = this.riccioModalService.getEmit().subscribe(res=>{
            if(res.type == 'close'){
                this.modalType.type = ''
            }
        })
    }

    ngOnDestroy() {
        this.routeObj ? this.routeObj.unsubscribe() : {}
        this.modalTypeObj ? this.modalTypeObj.unsubscribe() : {}
    }

    /**
     * 重置数据
     * @author GR-05
     */
    initData() {
        this.baseInfo = {}
        this.datachangeInfo = {}
        this.discussInfo = {}
        this.keywordInfo = {}
        this.modalType = {
            type:'',
            modalData:null,
            comData:null
        }
    }

    /**
     * 处理路由监听
     * @param res 
     * @author GR-05
     */
    public resolveRoute(siteid: number) {
        this.loadingType = 'show'
        this.bsbyService.setSiteRouteInfo({
            siteId: siteid
        })
        this.sitesService.getSiteInfoDynamic(siteid).subscribe(res=>{
            this.loadingType = 'hide'
            if(res.status === 1){
                this.baseInfo = res.data
                this.sitesService.setSiteInfo(res.data)
            }
        })
    }
}