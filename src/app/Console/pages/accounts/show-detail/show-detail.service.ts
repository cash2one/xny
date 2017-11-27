import { Injectable,ViewContainerRef } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { ShowDetailConf } from './show-detail.data'

@Injectable()
export class ShowDetailService {
    private detailSbj = new Subject<ShowDetailConf>()

    constructor(){}

    public SetDetailConfSbj(config:ShowDetailConf):void{
        this.detailSbj.next(config)
    }

    public GetDetailConfOb():Observable<ShowDetailConf>{
        return this.detailSbj.asObservable()
    }
}