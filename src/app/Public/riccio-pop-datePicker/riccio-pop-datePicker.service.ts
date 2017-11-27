import { Injectable,ViewContainerRef } from '@angular/core'
import { Subject }    from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

import { DatePickerConfig } from './riccio-pop-datePicker.data'
@Injectable()
export class RiccioPopDatePickerService {
    private dpSbj = new Subject<any>()
    public dpObs = this.dpSbj.asObservable()

    private emitSbj = new Subject<any>()
    public emitObs = this.emitSbj.asObservable()

    private closeSub = new Subject<boolean>()
    public closeObj = this.closeSub.asObservable()


    constructor(){}

    public setDp(config:DatePickerConfig):void{
        this.dpSbj.next(config)
    }

    public close(){
        this.closeSub.next(true)
    }

    public setEmit(data:{
        type:string;
        date:Date;
    }):void{
        this.emitSbj.next(data)
    }
}