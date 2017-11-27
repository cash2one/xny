import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { AppService } from '../../app.service'

import { HttpHeadData } from '../../HttpURL'

@Injectable()
export class GrCompanyInfoService {

    // 请求地址
    private httpURL = new HttpHeadData().SAASURL

    private getCompanyScaleURL = this.httpURL + "api/console/scale"; // get 获取公司规模列表
    private getIndustryURL = this.httpURL + "api/console/industry"; // get 获取行业列表
    private getCompanyAreaURL = this.httpURL + "api/console/area"; // get 获取地区列表

    private postCompanyListURL = this.httpURL + "api/app/company"; // 获取应用开启的企业列表

    constructor(
        private appService: AppService
    ) { }

    /**
     * 获取企业规模列表
     * @author GR-05
     */
    public getCompanyScaleList(): Observable<any> {
        return this.appService.interfaceJudg('get', this.getCompanyScaleURL)
    }



    /**
     * 获取行业列表
     * @author GR-05
     */
    public getIndustryList(): Observable<any> {
        return this.appService.interfaceJudg('get', this.getIndustryURL)
    }


    /**
     * 获取地区列表
     * @author GR-05
     */
    public getCompanyAreaList(id: string | number = 0): Observable<any> {
        let url = this.getCompanyAreaURL + '?parentid=' + id
        return this.appService.interfaceJudg('get', url)
    }


    /**
     * @author GR-03
     * @copyright 获取应用开启的企业列表
     * @param     [param]
     * model：string 应用模型
     * name：string 检索字段
     * @return    [return]
     * @param     {any}             obj [description]
     * @return    {Observable<any>}     [description]
     */
    public postCompanyList(obj:any): Observable<any> {
        return this.appService.interfaceJudg('post', this.postCompanyListURL,obj)
    }

}
