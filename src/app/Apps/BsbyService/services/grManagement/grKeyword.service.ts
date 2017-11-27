import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { HttpHeadData }    from '../../../../HttpURL'
import { AppService } from '../../../../app.service'

@Injectable()
export class GrKeywordService {

    private httpURL = new HttpHeadData().SAASURL

    // ----- get ----- //
    //关键字列表
    private keywordList = this.httpURL + 'api/bsby/service/keyword/list'
    // ----- post ---- //
    //添加关键字
    private keywordAdd = this.httpURL + 'api/bsby/service/keyword/add'
    //修改关键字
    private keywordEdit = this.httpURL + 'api/bsby/service/keyword/edit'
    //删除关键字
    private keywordDel = this.httpURL + 'api/bsby/service/keyword/del'
    //修改关键字状态
    private keywordStatus = this.httpURL + 'api/bsby/service/keyword/status'
    //关键词明细
    private keywordLog = this.httpURL + 'api/bsby/service/keyword/log'
    //关键字趋势
    private keywordInfo = this.httpURL + 'api/bsby/service/keyword/info'

    constructor(
        private appService:AppService
    ){ }

    /**
     * 获取关键词列表
     * @param obj 
     * site_id  int 网站id
     * name	否	string	关键词名称
     * difficult	否	int	难易程度:1正常 2简单 3困难
     * type	否	int	1精准核心词 2精准长尾词 3品牌词 4区域词
     * status	否	int	1优化中 2已停止
     */
    public getKeywordList(obj:any):Observable<any>{
        return this.appService.interfaceJudg('get',this.keywordList,obj)
    }

    /**
     * 添加关键词
     * @param obj 
     * site_id	是	int	网站id
     * name	是	string	关键词
     * difficult	是	int	难易程度:1正常 2简单 3困难
     * type	是	int	1精准核心词 2精准长尾词 3品牌词 4区域词
     * starttime	是	timestamp	开始时间
     */
    public postKeywordAdd(obj:any):Observable<any>{
        return this.appService.interfaceJudg('post',this.keywordAdd,obj)
    }

    /**
     * 编辑关键词
     * @param obj 
     * id	是	int	关键词id
     * site_id	是	int	网站id
     * name	是	string	关键词
     * difficult	是	int	难易程度:1正常 2简单 3困难
     * type	是	int	1精准核心词 2精准长尾词 3品牌词 4区域词
     * starttime	是	timestamp	开始时间
     */
    public postKeywordEdit(obj:any):Observable<any>{
        return this.appService.interfaceJudg('post',this.keywordEdit,obj)
    }

    /**
     * 删除关键词
     * @param obj 
     * id	是	int	关键词id     
     * site_id	是	int	网站id
     */
    public postKeywordDel(obj:any):Observable<any>{
        return this.appService.interfaceJudg('post',this.keywordDel,obj)
    }

    /**
     * 切换关键词状态
     * @param obj 
     * id	是	int	关键词id
     * site_id	是	int	网站id
     * status	是	int	1优化中 2已停止
     */
    public postKeywordStatus(obj:any):Observable<any>{
        return this.appService.interfaceJudg('post',this.keywordStatus,obj)
    }

    /**
     * 获取关键词明细
     * @param obj
     * site_id	是	int	网站id
     * name	否	string	关键词
     * time	否	array	[2017-05-15,2017-07-25] 
     */
    public postKeywordLog(obj:any):Observable<any>{
        return this.appService.interfaceJudg('post',this.keywordLog,obj)
    }

    /**
     * 获取关键词趋势
     * @param obj 
     * site_id	是	int	网站id
     * id	是	int	关键词id
     * time	是	array	[2017-05-15,2017-07-25] 最近一周
     */
    public postKeywordInfo(obj:any):Observable<any>{
        return this.appService.interfaceJudg('post',this.keywordInfo,obj)
    }

}