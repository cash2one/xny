import { Injectable,ViewContainerRef } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Conf } from './company-audit-detail.data'

@Injectable()
export class CompanyAuditDetailService {
    private detailSbj = new Subject<Conf>()

    private feedbackSub = new Subject<boolean>()
    public feedbackObj = this.feedbackSub.asObservable()

    constructor(){}

    public SetDetailConfSbj(config:Conf):void{
        this.detailSbj.next(config)
    }

    public GetDetailConfOb():Observable<Conf>{
        return this.detailSbj.asObservable()
    }

    public setFeedback(){
        this.feedbackSub.next(true)
    }
}