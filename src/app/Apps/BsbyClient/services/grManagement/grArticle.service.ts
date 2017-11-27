import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { HttpHeadData }    from '../../../../HttpURL'
import { AppService } from '../../../../app.service'

@Injectable()
export class GrArticleService {

    private httpURL = new HttpHeadData().SAASURL

    //-------post--------//
    //添加文章
    private articleAdd = this.httpURL + '/api/bsby/client/article/add'
    //修改 文章
    private articleEdit = this.httpURL + '/api/bsby/client/article/edit'
    //删除 文章
    private articleDel = this.httpURL + 'api/bsby/client/article/del'

    //------get--------//
    //文章列表
    private articleList = this.httpURL + '/api/bsby/client/article/list'
    
    constructor(
        private appService:AppService
    ){}

    /**
     * 获取文章列表
     * @param obj site_id  网站id
     */
    public getArticleList(obj:any):Observable<any>{
        return this.appService.interfaceJudg('get',this.articleList,obj)
    }

    /**
     * 添加文章
     * @param obj 
     * cid	是	int	客户公司id
     * site_id	是	int	网站id
     * title	是	string	名称
     * url	是	string	链接地址
     * type	是	int	类型
     * inputtime	是	time	时间
     */
    public postArticleAdd(obj:any):Observable<any>{
        return this.appService.interfaceJudg('post',this.articleAdd,obj)
    }

    /**
     * 修改文章
     * @param obj 
     * id	是	int	文章id
     * site_id	是	int	网站id
     * title	是	string	名称
     * url	是	string	链接地址
     * type	是	int	类型
     * inputtime	是	time	时间
     */
    public postArticleEdit(obj:any):Observable<any>{
        return this.appService.interfaceJudg('post',this.articleEdit,obj)
    }

    /**
     * 删除文章
     * @param obj
     * id	是	int	文章id
     * site_id	是	int	站点id
     */
    public postArticleDel(obj:any):Observable<any>{
        return this.appService.interfaceJudg('post',this.articleDel,obj)
    }
}