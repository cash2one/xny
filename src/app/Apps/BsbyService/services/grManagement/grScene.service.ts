import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { HttpHeadData }    from '../../../../HttpURL'
import { AppService } from '../../../../app.service'

@Injectable()
export class GrSceneService {

    private httpURL = new HttpHeadData().SAASURL

    //------get--------//
    //场景列表
    private sceneList = this.httpURL + 'api/bsby/service/scene/list'
    //场景信息
    private sceneInfo = this.httpURL + 'api/bsby/service/scene/info'

    // -----post------//
    //添加场景
    private sceneAdd = this.httpURL + 'api/bsby/service/scene/add'
    //编辑场景
    private sceneEdit = this.httpURL + 'api/bsby/service/scene/edit'
    //删除场景
    private sceneDel = this.httpURL + 'api/bsby/service/scene/del'
    
    constructor(
        private appService:AppService
    ){}

    /**
     * 获取场景列表（目前只网站列表）
     * type 3
     * action 权限
     */
    public getSceneList(obj:any):Observable<any>{
        obj.type = 3
        return this.appService.interfaceJudg('get',this.sceneList,obj)
    }

    /**
     * 获取场景里条件信息
     * @param id 
     */
    public getSceneInfo(id:number):Observable<any>{
        return this.appService.interfaceJudg('get',this.sceneInfo,{
            id:id
        })
    }

    /**
     * 添加场景
     * @param obj 
     * type	是	int	3站点列表
     * action 是 模式
     * name	是	string	场景名称
     * status	否	int	状态 1执行中 2已停止 3待执行
     * product_id	否	int	产品id
     * executor_userid	否	int	执行人员id
     * service_userid	否	int	服务人员id
     * starttime	否	array	开始时间[2017-07-01,2017-08-01]
     * endtime	否	array	结束时间[2017-07-01,2017-08-01]
     */
    public postSceneAdd(obj:any):Observable<any>{
        return this.appService.interfaceJudg('post',this.sceneAdd,obj)
    }

    /**
     * 编辑场景
     * @param obj 
     * id	是	int	场景id
     * name	是	string	场景名称
     * status	否	int	状态 1执行中 2已停止 3待执行
     * product_id	否	int	产品id
     * executor_userid	否	int	执行人员id
     * service_userid	否	int	服务人员id
     * starttime	否	array	开始时间[2017-07-01,2017-08-01]
     * endtime	否	array	结束时间[2017-07-01,2017-08-01]
     */
    public postSceneEdit(obj:any):Observable<any>{
        return this.appService.interfaceJudg('post',this.sceneEdit,obj)
    }

    /**
     * 删除场景
     * @param obj 
     * id	是	int	场景id
     */
    public postSceneDel(obj:any):Observable<any>{
        return this.appService.interfaceJudg('post',this.sceneDel,obj)
    }

}