import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { HttpHeadData }    from '../../../../HttpURL'
import { AppService } from '../../../../app.service'

@Injectable()
export class GrDemandService {

    private httpURL = new HttpHeadData().SAASURL

    // ---- get ----- //
    //需求列表
    private demandList = this.httpURL + 'api/bsby/client/demand/list'

    // ---- post ---- //
    //添加需求
    private demandAdd = this.httpURL + 'api/bsby/client/demand/add'
    //删除需求
    private demandDel = this.httpURL + 'api/bsby/client/demand/del'

    constructor(
        private appService:AppService
    ){}

    /**
     * 获取需求列表
     * @param obj 
     * site_id	 否	int	网站id 不传查找所有
     */
    public getDemandList(obj:any):Observable<any>{
        return this.appService.interfaceJudg('get',this.demandList,obj)
    }

    /**
     * 添加需求
     * @param obj 
     * site_id	是	int	网站id
     * cid	是	int	用户id
     * content	是	string	内容
     */
    public postDemandAdd(obj:any):Observable<any>{
        return this.appService.interfaceJudg('post',this.demandAdd,obj)
    }

    /**
     * 删除需求
     * @param obj 
     * id	是	int	需求id
     * site_id	是	int	网站id
     */
    public postDemandDel(obj:any):Observable<any>{
        return this.appService.interfaceJudg('post',this.demandDel,obj)
    }

}