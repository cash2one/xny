import { Injectable,ViewContainerRef } from '@angular/core'
import { Subject }    from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'


@Injectable()
export class CompanyOpService {
    private copSbj = new Subject<any>()
    public copObs = this.copSbj.asObservable()

    private emitSbj = new Subject<any>()
    public emitObs = this.emitSbj.asObservable()


    constructor(){}

    public setCOP(config:any):void{
        this.copSbj.next(config)
    }

    public setEmit(flag:boolean):void{
        this.emitSbj.next(flag)
    }
}