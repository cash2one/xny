import { Injectable,ViewContainerRef } from '@angular/core'
import { Subject }    from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'


@Injectable()
export class KeywordOpService {
    private kwOpSbj = new Subject<any>()
    public kwOpObs = this.kwOpSbj.asObservable()

    private emitSbj = new Subject<any>()
    public emitObs = this.emitSbj.asObservable()

    private closeSbj = new Subject<any>()
    public closeObs = this.closeSbj.asObservable()


    constructor(){}

    public setKwOp(config:{
        type:string,
        comType:string,
        data?:any
    }):void{
        this.kwOpSbj.next(config)
    }

    public setEmit(data:{
        comType:string,
        form:any
    }):void{
        this.emitSbj.next(data)
    }

    public close(){
        this.closeSbj.next(true)
    }
}