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

import { GrDemandService } from '../../../services/grManagement/grDemand.service'
import { PageData } from '../../../bsbyService.data'
import { RiccioPboxService } from '@gr-public/riccio-pbox/riccio-pbox.service'
import { RiccioLoadingService } from '@gr-public/riccio-loading/riccio-loading.service'
import { RiccioNotificationsService } from '@gr-public/riccio-notifications/riccio-notifications.service'

@Component({
    selector: 'app-bsby-service-demands',
    templateUrl: './demand-list.component.html',
    styleUrls: [
        '../../../../../Public/theme/apps-common/common.scss',
        '../../../../../Public/theme/apps-common/table.scss',
        '../../../../BsbyService/bsbyService.common.scss',
        './demand-list.component.scss'
    ]
})
export class DemandListComponent implements OnInit,OnDestroy {

    //监听pbox
    public pboxObj:Subscription
    //loading
    public loadingType:string
    //需求列表
    public demandList:any[]

    // 分页
    public pageData:PageData
    //搜索参数
    public searchParam:{
        name:string
    }

    //需求类别
    demandType:string

    constructor(
        public router:Router,
        public route:ActivatedRoute,
        public grDemandService:GrDemandService,
        public riccioPboxService:RiccioPboxService,
        public riccioLoadingService:RiccioLoadingService,
        public riccioNotificationsService:RiccioNotificationsService
    ) {
        this.pageData = new PageData()
        this.searchParam = {
            name:''
        }
        this.route.params.subscribe(res => {
            this.resolveSiteType(res.type)
        })
    }

    ngOnInit() {
        this.getDemandList()
        this.pboxObj = this.riccioPboxService.getEmit().subscribe(res=>{
            this.resolvePbox(res)
        })
    }

    ngOnDestroy(){
        this.pboxObj?this.pboxObj.unsubscribe():{}
    }

    /**
     * 处理需求类型
     * @param type 
     * @author GR-05
     */
    public resolveSiteType(type:string){
        //跳转
        if (!(type == 'my' || type == 'answer' || type == 'mydepartment')) {
            this.router.navigate(['../my'], { relativeTo: this.route })
        }else{
            this.demandType = type
            this.getDemandList()
        }
    }

    /**
     * 获取需求总列表
     * @author GR-05
     */
    public getDemandList(){
        this.loadingType = 'show'
        this.grDemandService.getDemandList({
            page:this.pageData.page,
            rows:this.pageData.rows,
            ...this.searchParam
        },this.demandType).subscribe(res=>{
            this.loadingType = 'hide'
            if(res.status === 1){
                this.demandList = res.data.data
                this.pageData.total = res.data.total
                res.data.total == 0 ? this.loadingType = 'empty':{}
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
        this.getDemandList()
    }


    /**
     * 显示删除确认
     * @param demand 需求数据
     * @param el 点击元素
     * @param e 点击事件
     * @author GR-05
     */
    public fnShowDelConfirm(demand:any,el:any,e:MouseEvent){
        this.riccioPboxService.setSubject({
            genre: 'delete',
            position: {
                left: e.clientX,
                top: e.clientY,
                width: 240
            },
            type: 'demandAllListDel',
            data: {
                title: '确定删除此需求数据？',
                button: '删除',
                delID: demand
            }
        })
    }

    /**
     * 处理pbox
     * @param res 
     */
    public resolvePbox(res:any){
        switch(res.type){
            case 'demandAllListDel':
                //删除
                this.delDemand(res.data.id,res.data.site_id)
                break
        }
    }

    /**
     * 删除需求
     * @param id 需求id
     */
    public delDemand(id:number,siteid:number){
        this.riccioLoadingService.setLoading({
            message:'删除需求中'
        })
        this.grDemandService.postDemandDel({
            id:id,
            site_id:siteid
        }).subscribe(res=>{
            this.riccioLoadingService.closeLoading()
            if(res.status === 1){
                this.riccioNotificationsService.setSubject({
                    text:'删除成功',
                    status:'success'
                })
                this.getDemandList()
            }
        })
    }

    download(url:string){
        window.open(window['setting']['fileurl'] + url)
    }
}