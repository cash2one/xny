import { Injectable, ViewContainerRef, ElementRef } from '@angular/core'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

import { GrAccountsService } from '../../services/grAccounts/grAccounts.service'
@Injectable()
export class AccountService {

    //企业详情
    public comInfo: any

    //企业数据流
    private comInfoSbj = new Subject<any>()
    public comInfoObj = this.comInfoSbj.asObservable()

    constructor(
        private grAccountsService: GrAccountsService
    ) {
        this.comInfoObj.subscribe(siteInfo => {
            this.comInfo = JSON.parse(JSON.stringify(siteInfo))
        })
    }

    /**
     * 获取企业详情 observable
     * @author GR-05
     */
    public getComInfoDynamic(): Observable<any> {
        return this.grAccountsService.getCompanyInfo()
    }

    /**
     * 设置企业详情
     * @param comInfo 
     * @author GR-05
     */
    public setComInfo(comInfo: any) {
        this.comInfoSbj.next(comInfo)
    }

    /**
     * 获取企业详情（缓存）
     * @author GR-05
     */
    public getComInfo(): any {
        if (this.comInfo) {
            return JSON.parse(JSON.stringify(this.comInfo))
        } else {
            return null
        }
    }

    /**
     * 获取最近几天始日期
     * @author GR-05
     */
    public getNowStart(flag:number):string {
        let result: Date
        let now = Date.parse(new Date().toString())
        let para = 1000 * 60 * 60 * 24 * flag

        result = new Date(now - para);
        return result.toLocaleString('chinese',{hour12:false})
    }

    /**
     * 获取时间对比
     * @param start 起始时间
     * @param end 结束时间
     * @author GR-05
     */
    public compareStartEndDate(start:string,end:string):boolean{

        let startDate = Date.parse(start)
        let endDate = Date.parse(end)
        
        return startDate - endDate <= 0
    }

    /**
     * 获取当天最晚
     * @param dateString 1994-06-2 例
     * @author GR-05
     */
    public getTimeLate(dateString:string):string{
        let date = dateString.replace(/\s/g,'T').replace(/-/g,'/')
        return new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000 - 1).toLocaleString('chinese',{hour12:false})
    }

    /**
     * 获取当天最早
     * @param dateString 1994-06-2 例
     * @author GR-05
     */
    public getTimeFirst(dateString:string):string{
        let date = dateString.replace(/\s/g,'T').replace(/-/g,'/')
        return new Date(new Date(date).getTime()).toLocaleString('chinese',{hour12:false})
    }
}