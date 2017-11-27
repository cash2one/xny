import { Injectable,ViewContainerRef } from '@angular/core'
import { Subject }    from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

import { IConf } from './site-op.data'
@Injectable()
export class SiteOpService {
    private sOpSbj = new Subject<IConf>()
    public sOpObs = this.sOpSbj.asObservable()

    private emitSbj = new Subject<any>()
    public emitObs = this.emitSbj.asObservable()

    private viewInitSbj = new Subject<any>()
    public viewInitObs = this.viewInitSbj.asObservable()


    constructor(){}

    public setSOp(config:IConf):void{
        this.sOpSbj.next(config)
    }

    public setEmit(flag:number):void{
        this.emitSbj.next(flag)
    }

    public setViewInit(){
        this.viewInitSbj.next(true)
    }
}