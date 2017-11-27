import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { HttpHeadData }    from '../../../../HttpURL'
import { AppService } from '../../../../app.service'

@Injectable()
export class GrUserService {

    private httpURL = new HttpHeadData().SAASURL

    //------get--------//
    //应用成员列表
    private userList = this.httpURL + 'api/bsby/service/user/list'
    //场景-执行人员
    private excList = this.httpURL + 'api/bsby/service/user/executor'
    //场景-客服人员
    private serviceList = this.httpURL + 'api/bsby/service/user/service'
    
    constructor(
        private appService:AppService
    ){}

    /**
     * 获取应用成员列表
     * @param obj 
     * name 姓名
     * @author GR-05
     */
    public getUserList(obj:any):Observable<any>{
        return this.appService.interfaceJudg('get',this.userList,obj)
    }

    /**
     * 获取执行人员列表
     * @param obj 
     * name 姓名
     * type 类别
     * @author GR-05
     */
    public getExcUser(obj:any):Observable<any>{
        return this.appService.interfaceJudg('get',this.excList,obj)
    }

    /**
     * 获取客服人员列表
     * @param obj 
     * name 姓名
     * @author GR-05
     */
    public getServiceUser(obj:any):Observable<any>{
        return this.appService.interfaceJudg('get',this.serviceList,obj)
    }

}