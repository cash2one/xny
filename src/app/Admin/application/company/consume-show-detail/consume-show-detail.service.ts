import { Injectable,ViewContainerRef } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { ConsumeShowDetailConf } from './consume-show-detail.data'

@Injectable()
export class ConsumeShowDetailService {
    private detailSbj = new Subject<ConsumeShowDetailConf>()

    constructor(){}

    public SetDetailConfSbj(config:ConsumeShowDetailConf):void{
        this.detailSbj.next(config)
    }

    public GetDetailConfOb():Observable<ConsumeShowDetailConf>{
        return this.detailSbj.asObservable()
    }
}