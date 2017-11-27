import { Injectable,ViewContainerRef } from '@angular/core'
import { Subject }    from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'


@Injectable()
export class DemandsService {
    private dOpSbj = new Subject<any>()
    public dOpObs = this.dOpSbj.asObservable()

    private emitSbj = new Subject<any>()
    public emitObs = this.emitSbj.asObservable()

    private closeAddSbj = new Subject<any>()
    public closeAddObs = this.closeAddSbj.asObservable()

    constructor(){}

    public setDOp(flag):void{
        this.dOpSbj.next(flag)
    }

    public setEmit(flag:boolean):void{
        this.emitSbj.next(flag)
    }

    public closeAdd(){
        this.closeAddSbj.next()
    }
}