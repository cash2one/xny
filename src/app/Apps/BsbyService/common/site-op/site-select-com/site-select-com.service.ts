import { Injectable,ViewContainerRef } from '@angular/core'
import { Subject }    from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'


@Injectable()
export class SiteSelectComService {
    private sscOpSbj = new Subject<any>()
    public sscOpObs = this.sscOpSbj.asObservable()

    private emitSbj = new Subject<any>()
    public emitObs = this.emitSbj.asObservable()


    constructor(){}

    public setSscOp(isShow:boolean):void{
        this.sscOpSbj.next(isShow)
    }

    public setEmit(data:{
        id:number,
        name:string
    }):void{
        this.emitSbj.next(data)
    }
}