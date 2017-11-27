import { Injectable,ViewContainerRef } from '@angular/core'
import { Subject }    from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'


@Injectable()
export class ProgrammesService {
    private pTitleSbj = new Subject<any>()
    public pTitleObs = this.pTitleSbj.asObservable()


    constructor(){}

    public setPTitle(title:string):void{
        this.pTitleSbj.next(title)
    }
}