import { Injectable,ViewContainerRef } from '@angular/core'
import { Subject }    from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'


@Injectable()
export class SiteDescEditService {
    private sdeSbj = new Subject<any>()
    public sdeObs = this.sdeSbj.asObservable()

    private emitSbj = new Subject<any>()
    public emitObs = this.emitSbj.asObservable()


    constructor(){}

    public setSaeOp(data:any):void{
        this.sdeSbj.next(data)
    }

    public setEmit(data:any):void{
        this.emitSbj.next(data)
    }
}