import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { HttpHeadData }    from '../../../../HttpURL'
import { AppService } from '../../../../app.service'

@Injectable()
export class GrSiteService {

    private httpURL = new HttpHeadData().SAASURL

    // ----- get ------ //
    //网站列表
    private siteList = this.httpURL + 'api/bsby/service/site/list'
    //网站详情
    private siteInfo = this.httpURL + 'api/bsby/service/site/info'
    //网站角色列表
    private siteRoleList = this.httpURL + 'api/bsby/service/site/role_list'
    //网站描述信息更新
    private siteDescInfo = this.httpURL + 'api/bsby/service/site/basic_auto'

    // ----- post ----- //
    //添加网站
    private siteAdd = this.httpURL + 'api/bsby/service/site/add'
    //添加角色
    private siteRoleAdd = this.httpURL + 'api/bsby/service/site/role_add'
    //删除角色
    private siteRoleDel = this.httpURL + 'api/bsby/service/site/role_del'
    //角色排序
    private siteRoleOrder = this.httpURL + 'api/bsby/service/site/role_order'
    //角色设置
    private siteRoleSet = this.httpURL + 'api/bsby/service/site/role_set'
    //编辑账号信息
    private siteAccount = this.httpURL + 'api/bsby/service/site/account'
    //编辑服务信息
    private siteService = this.httpURL + 'api/bsby/service/site/service'
    //修改网站状态
    private siteStatus = this.httpURL + 'api/bsby/service/site/status'
    //修改描述信息
    private siteBasic = this.httpURL + 'api/bsby/service/site/basic'
    //删除网站
    private siteDel = this.httpURL + 'api/bsby/service/site/del'
    


    //本企业员工
    private siteUsers = this.httpURL + 'api/console/app/user_list/BsbyService'

    constructor(
        private appService:AppService
    ){}

    /**
     * 获取网站列表
     * @param obj 
     * @param type 网站列表类型
     * competition	int	竞争程度，1.普通竞争行业 2.激烈竞争行业
     * status	int	1执行中 2已停止 3待执行
     * service_type	int	服务方式：1首次开通 2续费
     */
    public getSiteList(obj:any,type:string):Observable<any>{
        return this.appService.interfaceJudg('post',`${this.siteList}/${type}`,obj)
    }

    /**
     * 获取网站详情
     * @param obj 
     * id	是	int	网站id
     */
    public getSiteInfo(obj:any):Observable<any>{
        return this.appService.interfaceJudg('get',this.siteInfo,obj)
    }

    /**
     * 获取网站角色列表
     * @param obj 
     * site_id	是	网站id
     */
    public getSiteRoleList(obj:any):Observable<any>{
        return this.appService.interfaceJudg('get',this.siteRoleList,obj)
    }

    /**
     * 刷新获取网站描述信息
     * @param obj 
     * id  网站id
     */
    public getSiteDesc(obj:any):Observable<any>{
        return this.appService.interfaceJudg('get',this.siteDescInfo,obj)
    }

    /**
     * 添加网站
     * @param obj 
     * domain	是	string	域名
     * competition	是	int	竞争程度，1.普通竞争行业 2.激烈竞争行业
     * cid	是	int	企业id
     * product_id	是	int	产品id
     * starttime	是	string	开始时间
     * endtime	是	string	结束时间
     * domain_admin	是	string	后台地址
     * domain_user	是	string	后台用户
     * domain_password	是	string	后台密码
     * ftp_address	否	string	FTP地址
     * ftp_port	否	int	FTP端口
     * ftp_user	否	int	FTP帐号
     * ftp_password	否	int	FTP密码
     */
    public postSiteAdd(obj:any):Observable<any>{
        return this.appService.interfaceJudg('post',this.siteAdd,obj)
    }

    /**
     * 添加角色
     * @param obj 
     * site_id	是	int	网站id
     * name	是	string	角色名称
     * user_id	否	string	用户id
     */
    public postSiteRoleAdd(obj:any):Observable<any>{
        return this.appService.interfaceJudg('post',this.siteRoleAdd,obj)
    }

    /**
     * 删除角色
     * @param obj 
     * id	是	是	角色id
     * site_id	是	int	网站id
     */
    public postSiteRoleDel(obj:any):Observable<any>{
        return this.appService.interfaceJudg('post',this.siteRoleDel,obj)
    }

    /**
     * 角色排序
     * @param obj 
     * site_id	是	int	网站id
     * ids	是	array	角色id数组
     */
    public postSiteRoleOrder(obj:any):Observable<any>{
        return this.appService.interfaceJudg('post',this.siteRoleOrder,obj)
    }

    /**
     * 设置角色
     * @param obj 
     * id	是	int	角色id
     * site_id	是	int	角色id
     * user_id	是	int	用户id
     * type	是	int	1:设置执行人员 2:设置服务人员
     */
    public postSiteRoleSet(obj:any):Observable<any>{
        return this.appService.interfaceJudg('post',this.siteRoleSet,obj)
    }

    /**
     * 设置账户信息
     * @param obj 
     * id	是	int	网站id
     * domain_admin	是	string	后台地址
     * domain_user	是	string	后台用户
     * domain_password	是	string	后台密码
     * ftp_address	否	string	FTP地址
     * ftp_port	否	int	FTP端口
     * ftp_user	否	int	FTP帐号
     * ftp_password	否	int	FTP密码
     */
    public postSiteAccount(obj:any):Observable<any>{
        return this.appService.interfaceJudg('post',this.siteAccount,obj)
    }

    /**
     * 编辑服务信息
     * @param obj 
     * id	是	int	网站id
     * starttime	是	string	开始时间
     * endtime	是	string	结束时间
     * service_type	是	int	服务方式：1首次开通 2续费
     */
    public postSiteService(obj:any):Observable<any>{
        return this.appService.interfaceJudg('post',this.siteService,obj)
    }

    /**
     * 获取企业成员列表
     * @param obj 
     * app_id  应用id
      name	否	string	姓名
     */
    public getSiteUsers(obj:any):Observable<any>{
        return this.appService.interfaceJudg('get',this.siteUsers,obj)
    }

    /**
     * 修改网站状态
     * @param obj 
     * id	是	int	站点id
        status
     */
    public postSiteStatus(obj:any):Observable<any>{
        return this.appService.interfaceJudg('post',this.siteStatus,obj)
    }

    /**
     * 修改网站描述信息
     * @param obj 
     * id	是	int	网站id
     * title	是	string	网站标题
     * keyword	是	string	关键词
     * description	是	int	描述
     */
    public postSiteBasic(obj:any):Observable<any>{
        return this.appService.interfaceJudg('post',this.siteBasic,obj)
    }

    /**
     * 删除网站
     * @param obj  
     * id   网站id
     */
    public postSiteDel(obj:any):Observable<any>{
        return this.appService.interfaceJudg('post',this.siteDel,obj)
    }
}