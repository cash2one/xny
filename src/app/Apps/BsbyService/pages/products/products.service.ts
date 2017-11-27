import { Injectable,ViewContainerRef } from '@angular/core'
import { Subject }    from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

import { OpConfig } from './product-op/product-op.data'

@Injectable()
export class ProductsService {
    private pOpSbj = new Subject<any>()
    public pOpObs = this.pOpSbj.asObservable()

    private emitSbj = new Subject<any>()
    public emitObs = this.emitSbj.asObservable()

    private closeSbj = new Subject<any>()
    public closeObs = this.closeSbj.asObservable()


    constructor(){}

    public setPOp(data:OpConfig):void{
        this.pOpSbj.next(data)
    }

    public setEmit(flag:boolean):void{
        this.emitSbj.next(flag)
    }

    public close(){
        this.closeSbj.next()
    }
}