import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { HttpHeadData }    from '../../../../HttpURL'
import { AppService } from '../../../../app.service'

@Injectable()
export class GrCustomerService {

    private httpURL = new HttpHeadData().SAASURL

    //-------post--------//
    //添加客户
    private customerAdd = this.httpURL + 'api/bsby/service/customer/add'
    //修改客户
    private customerEdit = this.httpURL + 'api/bsby/service/customer/edit'
    //删除客户
    private customerDel = this.httpURL + 'api/bsby/service/customer/del'

    //------get--------//
    //客户列表
    private customerList = this.httpURL + 'api/bsby/service/customer/list'
    //客户信息
    private customerInfo = this.httpURL + 'api/bsby/service/customer/info'
    //已有企业列表
    private customerAllList = this.httpURL + 'api/bsby/service/customer/all'
    
    constructor(
        private appService:AppService
    ){}

    /**
     * 获取客户列表
     * @param obj username 客户名
     */
    public getCustomerList(obj:any):Observable<any>{
        return this.appService.interfaceJudg('get',this.customerList,obj)
    }

    /**
     * 获取客户信息
     * @param obj cid 企业id
     */
    public getCustomerInfo(obj:any):Observable<any>{
        return this.appService.interfaceJudg('get',this.customerInfo,obj)
    }

    /**
     * 获取已有企业列表接口
     * @param obj 
     */
    public getCustomerAllList(obj:any):Observable<any>{
        return this.appService.interfaceJudg('get',this.customerAllList,obj)
    }

    /**
     * 添加客户
     * @param obj 
     * mobile	是	string	手机号
     * name	是	string	用户名
     * real_name	是	string	密码
     * real_name	是	string	真实姓名
     * sex	是	int	性别
     * qq	否	int	QQ
     * email	否	int	邮箱
     * company_name	是	string	公司名称
     * industry	否	int	行业id
     * scale	否	int	规模id
     * location	否	array	{“province”:440000,”city”:440300,”area”:440321}
     */
    public postCustomerAdd(obj:any):Observable<any>{
        return this.appService.interfaceJudg('post',this.customerAdd,obj)
    }

    /**
     * x修改客户
     * @param obj 
     * cid	是	int	企业id
     * name	是	string	用户名
     * real_name	是	string	真实姓名
     * mobile	是	string	手机
     * real_name	否	sting	密码
     * sex	否	int	性别
     * thumb	否	string	缩略图
     * qq	否	string	qq
     * email	否	string	邮箱
     * company_name	是	string	企业名称
     * industry	否	int	行业id
     * scale	否	int	规模id
     * location	否	array	{“province”:440000,”city”:440300,”area”:440321}
     */
    public postCustomerEdit(obj:any):Observable<any>{
        return this.appService.interfaceJudg('post',this.customerEdit,obj)
    }

    /**
     * 删除客户
     * @param obj  cid 客户id
     */
    public postCustomerDel(obj:any):Observable<any>{
        return this.appService.interfaceJudg('post',this.customerDel,obj)
    }
}