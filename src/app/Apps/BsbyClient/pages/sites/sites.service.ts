import { Injectable, ViewContainerRef, ElementRef } from '@angular/core'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

import { GrSiteService } from '../../services/grManagement/grSite.service'
import { BsbyService } from '../../bsbyClient.service'

@Injectable()
export class SitesService {

    //网站详情
    public siteInfo: any

    //网站列表缓存(用于下拉选择，不用于修改操作)
    public siteList:any[]

    //网站数据流
    private siteInfoSbj = new Subject<any>()
    public siteInfoObj = this.siteInfoSbj.asObservable()

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
     * 设置网站列表缓存
     * @param siteList 
     * @author GR-05
     */
    public setSiteList(siteList:any[]){
        this.siteList = JSON.parse(JSON.stringify(siteList))
    }

    /**
     * 获取网站列表
     * @author GR-05
     */
    public getSiteList():any[]{
        return JSON.parse(JSON.stringify(this.siteList))
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
}