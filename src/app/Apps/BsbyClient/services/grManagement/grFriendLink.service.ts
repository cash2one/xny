import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { HttpHeadData }    from '../../../../HttpURL'
import { AppService } from '../../../../app.service'

@Injectable()
export class GrFriendLinkService {

    private httpURL = new HttpHeadData().SAASURL

    //-------post--------//
    //添加友链
    private friendlinkAdd = this.httpURL + '/api/bsby/client/friendlink/add'
    //修改友链
    private friendlinkEdit = this.httpURL + '/api/bsby/client/friendlink/edit'
    //删除友链
    private friendlinkDel = this.httpURL + 'api/bsby/client/friendlink/del'

    //------get--------//
    //友链列表
    private friendlinkList = this.httpURL + '/api/bsby/client/friendlink/list'
    
    constructor(
        private appService:AppService
    ){}

    /**
     * 获取友链列表
     * @param obj site_id  网站id
     */
    public getFriendlinkList(obj:any):Observable<any>{
        return this.appService.interfaceJudg('get',this.friendlinkList,obj)
    }

    /**
     * 添加友链
     * @param obj 
     * cid	是	int	客户公司id
     * site_id	是	int	网站id
     * mykey	是	string	我方关键词
     * otherkey	是	string	对方关键词
     * url	是	string	链接地址
     * pr	是	string	权重
     * included	是	string	收录
     * islink	是	int	反链 1有，2 无
     * status	是	int	1有效 2无效
     * inputtime	是	time	时间
     */
    public postFriendlinkAdd(obj:any):Observable<any>{
        return this.appService.interfaceJudg('post',this.friendlinkAdd,obj)
    }

    /**
     * 修改文章
     * @param obj 
     * id	是	int	友链id
     * site_id	是	int	网站id
     * mykey	是	string	我方关键词
     * otherkey	是	string	对方关键词
     * url	是	string	链接地址
     * pr	是	string	权重
     * included	是	string	收录
     * islink	是	int	反链 1有，2 无
     * status	是	int	1有效 2无效
     * inputtime	是	time	时间
     */
    public postFriendlinkEdit(obj:any):Observable<any>{
        return this.appService.interfaceJudg('post',this.friendlinkEdit,obj)
    }

    /**
     * 删除文章
     * @param obj
     * id	是	int	友链id
     * site_id	是	int	站点id
     */
    public postFriendlinkDel(obj:any):Observable<any>{
        return this.appService.interfaceJudg('post',this.friendlinkDel,obj)
    }
}