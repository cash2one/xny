import { Injectable, ViewContainerRef, ElementRef } from '@angular/core'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

import { GrSiteService } from '../../services/grManagement/grSite.service'
import { BsbyService } from '../../bsbyService.service'

@Injectable()
export class SitesService {

    //网站详情
    private siteInfo: any

    //网站数据流
    private siteInfoSbj = new Subject<any>()
    public siteInfoObj = this.siteInfoSbj.asObservable()

    //modal标示
    private modalTypeSbj = new Subject<{
        type:string,
        modalData:any,
        comData:any
    }>()
    public modalTypeObj = this.modalTypeSbj.asObservable()

    constructor(
        private grSiteService:GrSiteService,
        private bsbyService:BsbyService
    ) {
        this.siteInfoObj.subscribe(siteInfo => {
            this.siteInfo = JSON.parse(JSON.stringify(siteInfo))
        })
        this.bsbyService.tempSiteInfoObj.subscribe(res=>{
            this.setSiteInfo(res)
        })
    }

    /**
     * 获取网站详情 observable
     * @param siteid 
     * @author GR-05
     */
    public getSiteInfoDynamic(siteid:number):Observable<any>{
        return this.grSiteService.getSiteInfo({
            id:siteid
        })
    }

    /**
     * 设置网站详情
     * @param siteInfo 
     * @author GR-05
     */
    public setSiteInfo(siteInfo:any){
        this.siteInfoSbj.next(siteInfo)
    }

    /**
     * 获取网站详情（缓存）
     * @author GR-05
     */
    public getSiteInfo():any{
        if(this.siteInfo){
            return JSON.parse(JSON.stringify(this.siteInfo))
        }else{
            return null
        }
    }

    /**
     * 设置modal组件类型
     * @param data 
     * @author GR-05
     */
    public setModalType(data:{
        type:string,
        modalData:any,
        comData:any
    }){
        this.modalTypeSbj.next(data)
    }
}