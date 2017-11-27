import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AppService } from '../../../app.service'

import { HttpHeadData } from '../../../HttpURL'

@Injectable()
export class GrAccountsService {

    // 请求地址
    private httpURL = new HttpHeadData().SAASURL

    //资产概览
    private accountHome = this.httpURL + "api/console/account/home"
    //充值
    private accountRecharge = this.httpURL + "api/console/account/recharge"
    //收支明细
    private accountIncomeExpense = this.httpURL + "api/console/account/income_expense"
    //收支明细备注
    private accountNote = this.httpURL + "api/console/account/note"

    //获取企业信息
    private companyInfo = this.httpURL + "api/console/company/info"

    constructor(
        private appService: AppService
    ) { }

    /**
     * 获取资产概览
     */
    public getAccountHome(obj:any): Observable<any> {
        return this.appService.interfaceJudg('get', this.accountHome,obj)
    }

    /**
     * 充值
     * @param obj 
     * price	是	float	充值金额
     */
    public postAccountRecharge(obj:any):Observable<any>{
        return this.appService.interfaceJudg('post',this.accountRecharge,obj)
    }

    /**
     * 收支明细
     * @param obj
     * type	int	0充值 1退款 2提现 3消费
     * time	array	[‘2017-08-09’,’2017-08-20’] 
     */
    public postAccountIncomeExpense(obj:any):Observable<any>{
        return this.appService.interfaceJudg('post',this.accountIncomeExpense,obj)
    }

    /**
     * 获取企业信息
     */
    public getCompanyInfo():Observable<any>{
        return this.appService.interfaceJudg('get',this.companyInfo)
    }

    /**
     * 修改收支记录备注
     * @param obj 
     * id	是	int	id
     * note	是	string	备注
     */
    public postAccountNote(obj:any):Observable<any>{
        return this.appService.interfaceJudg('post',this.accountNote,obj)
    }
}
