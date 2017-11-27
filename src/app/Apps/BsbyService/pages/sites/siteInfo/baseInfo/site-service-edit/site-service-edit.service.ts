import { Injectable,ViewContainerRef } from '@angular/core'
import { Subject }    from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'


@Injectable()
export class SiteServiceEditService {
    private saeSbj = new Subject<any>()
    public saeObs = this.saeSbj.asObservable()

    private emitSbj = new Subject<any>()
    public emitObs = this.emitSbj.asObservable()


    constructor(){}

    public setSaeOp(data:any):void{
        this.saeSbj.next(data)
    }

    public setEmit(data:any):void{
        this.emitSbj.next(data)
    }
}