import { Injectable,ViewContainerRef } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Conf } from './show-detail.data'

@Injectable()
export class ShowDetailService {
    private detailSbj = new Subject<Conf>()

    constructor(){}

    public SetDetailConfSbj(config:Conf):void{
        this.detailSbj.next(config)
    }

    public GetDetailConfOb():Observable<Conf>{
        return this.detailSbj.asObservable()
    }
}