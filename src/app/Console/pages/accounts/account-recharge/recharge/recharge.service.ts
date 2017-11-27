import { Injectable,ViewContainerRef } from '@angular/core'
import { Subject }    from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

import { RechargeData } from './recharge.data'

@Injectable()
export class RechargeService {
    private rechargeSbj = new Subject<any>()
    public rechargeObs = this.rechargeSbj.asObservable()

    private emitSbj = new Subject<any>()
    public emitObs = this.emitSbj.asObservable()


    constructor(){}

    public setRecharge(data:RechargeData):void{
        this.rechargeSbj.next(data)
    }

    public setEmit(data:any):void{
        this.emitSbj.next(data)
    }
}