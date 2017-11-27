import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Subject }    from 'rxjs/Subject'

import { GrMembersService } from '../../services'

export class RouterInfo{
    model:string;
    cid:string | number
}

@Injectable()
export class MembersService {
    private routerInfoSub:Subject<RouterInfo> = new Subject<RouterInfo>()
    public routerInfoObj:Observable<RouterInfo> = this.routerInfoSub.asObservable()

    constructor(
    ){}

    public setRouterInfo(routerInfo:RouterInfo){
        this.routerInfoSub.next(routerInfo)
    }
}