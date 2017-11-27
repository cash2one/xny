import { Injectable} from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs/Observable'

import { HttpHeadData } from '../../HttpURL'
import { AppService } from '../../app.service' 

/**
 * bsby服务端菜单预加载服务
 */
@Injectable()
export class BsbyServiceResolve implements Resolve<any>{

    private menuUrl = new HttpHeadData().SAASURL + 'api/app/menu'
    constructor(
        private appService:AppService
    ){}

    /**
     * 获取对应菜单
     */
    public getMenus():Observable<any>{
        return this.appService.interfaceJudg('get',this.menuUrl,{
            model:'BsbyService'
        })
    }

    resolve(ars: ActivatedRouteSnapshot, rss: RouterStateSnapshot){
        return this.getMenus()
    }
}
