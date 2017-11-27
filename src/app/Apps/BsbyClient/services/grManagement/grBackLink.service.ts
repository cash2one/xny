import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { HttpHeadData }    from '../../../../HttpURL'
import { AppService } from '../../../../app.service'

@Injectable()
export class GrBackLinkService {

    private httpURL = new HttpHeadData().SAASURL

    //-------post--------//
    //添加外链
    private backlinkAdd = this.httpURL + '/api/bsby/client/backlink/add'
    //修改外链
    private backlinkEdit = this.httpURL + '/api/bsby/client/backlink/edit'
    //删除外链
    private backlinkDel = this.httpURL + 'api/bsby/client/backlink/del'

    //------get--------//
    //外链列表
    private backlinkList = this.httpURL + '/api/bsby/client/backlink/list'
    
    constructor(
        private appService:AppService
    ){}

    /**
     * 获取外链列表
     * @param obj site_id  网站id
     */
    public getBacklinkList(obj:any):Observable<any>{
        return this.appService.interfaceJudg('get',this.backlinkList,obj)
    }

    /**
     * 添加外链
     * @param obj 
     * cid	是	int	客户公司id
     * site_id	是	int	网站id
     * title	是	string	名称
     * url	是	string	链接地址
     * platform	是	string	发布平台
     * inputtime	是	time	时间
     */
    public postBacklinkAdd(obj:any):Observable<any>{
        return this.appService.interfaceJudg('post',this.backlinkAdd,obj)
    }

    /**
     * 修改外链
     * @param obj 
     * id	是	int	客户公司id
     * site_id	是	int	网站id
     * title	是	string	名称
     * url	是	string	链接地址
     * platform	是	string	发布平台
     * inputtime	是	time	时间
     */
    public postBacklinkEdit(obj:any):Observable<any>{
        return this.appService.interfaceJudg('post',this.backlinkEdit,obj)
    }

    /**
     * 删除外链
     * @param obj
     * id	是	int	外链id
     * site_id	是	int	站点id
     */
    public postBacklinkDel(obj:any):Observable<any>{
        return this.appService.interfaceJudg('post',this.backlinkDel,obj)
    }
}