import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { HttpHeadData }    from '../../../../HttpURL'
import { AppService } from '../../../../app.service'

@Injectable()
export class GrProgrammeService {

    private httpURL = new HttpHeadData().SAASURL

    // ---- get ---- //
    //方案列表
    private programmeList = this.httpURL + 'api/bsby/service/programme/list'
    //添加方案
    private programmeAdd = this.httpURL + 'api/bsby/service/programme/add'
    //编辑方案
    private programmeEdit = this.httpURL + 'api/bsby/service/programme/edit'
    //删除方案
    private programmeDel = this.httpURL + 'api/bsby/service/programme/del'
    //方案详情
    private programmeInfo = this.httpURL + 'api/bsby/service/programme/info'


    constructor(
        private appService:AppService
    ){}

    /**
     * 获取方案列表
     * @param obj 
     * site_id	是	int	网站id 传0查找所有
     */
    public getProgrammeList(obj:any):Observable<any>{
        return this.appService.interfaceJudg('get',this.programmeList,obj)
    }

    /**
     * 添加方案
     * @param obj 
     * site_id	是	int	网站id
     * user_id	是	int	用户id
     * name	是	string	名称
     * content	是	string	内容
     * file	否	string	附件
     * vote	否	string	备注
     */
    public postProgrammeAdd(obj:any):Observable<any>{
        return this.appService.interfaceJudg('post',this.programmeAdd,obj)
    }

    /**
     * 修改方案
     * @param obj 
     * id	是	int	方案id
     * site_id	是	int	网站id
     * name	是	string	名称
     * content	是	string	内容
     * file	否	string	附件
     * vote	否	string	备注
     */
    public postProgrammeEdit(obj:any):Observable<any>{
        return this.appService.interfaceJudg('post',this.programmeEdit,obj)
    }

    /**
     * 删除方案
     * @param obj 
     * id	是	int	方案id
     * site_id	是	int	网站id
     */
    public postProgrammeDel(obj:any):Observable<any>{
        return this.appService.interfaceJudg('post',this.programmeDel,obj)
    }

    /**
     * 获取方案详情
     * @param obj 
     * id	是	int	方案id
     * site_id	是	int	网站id
     */
    public postProgrammeInfo(obj:any):Observable<any>{
        return this.appService.interfaceJudg('post',this.programmeInfo,obj)
    }
}