import { Injectable,ViewContainerRef } from '@angular/core'
import { Subject }    from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

import { SceneOb } from './scene.data'

@Injectable()
export class SceneService {
    private sceneSbj = new Subject<SceneOb>()
    public sceneObs = this.sceneSbj.asObservable()

    private emitSbj = new Subject<any>()
    public emitObs = this.emitSbj.asObservable()


    constructor(){}

    public setScene(data:SceneOb):void{
        this.sceneSbj.next(data)
    }

    public setEmit(data:any):void{
        this.emitSbj.next(data)
    }
}