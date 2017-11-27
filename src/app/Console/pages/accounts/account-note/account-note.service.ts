import { Injectable,ViewContainerRef } from '@angular/core'
import { Subject }    from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

import { NoteData } from './account-note.data'

@Injectable()
export class NoteService {
    private noteSbj = new Subject<any>()
    public noteObs = this.noteSbj.asObservable()

    private emitSbj = new Subject<any>()
    public emitObs = this.emitSbj.asObservable()


    constructor(){}

    public setNote(data:NoteData):void{
        this.noteSbj.next(data)
    }

    public setEmit(data:any):void{
        this.emitSbj.next(data)
    }
}