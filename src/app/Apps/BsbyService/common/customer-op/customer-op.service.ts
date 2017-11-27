import { Injectable,ViewContainerRef } from '@angular/core'
import { Subject }    from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

import { ICustomerConf } from './customer-op.data'

@Injectable()
export class CustomerOpService {
    private cOpSbj = new Subject<any>()
    public cOpObs = this.cOpSbj.asObservable()

    private emitSbj = new Subject<any>()
    public emitObs = this.emitSbj.asObservable()

    private viewInitSbj = new Subject<any>()
    public viewInitObs = this.viewInitSbj.asObservable()

    private closeSbj = new Subject<any>()
    public closeObs = this.closeSbj.asObservable()


    constructor(){}

    public setCOp(config:ICustomerConf):void{
        this.cOpSbj.next(config)
    }

    public setEmit(flag:boolean):void{
        this.emitSbj.next(flag)
    }

    public setViewInit(){
        this.viewInitSbj.next(true)
    }

    public close(){
        this.closeSbj.next(true)
    }
}