import { Injectable,ViewContainerRef } from '@angular/core'
import { Subject }    from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'


@Injectable()
export class BackLinkOpService {
    private blOpSbj = new Subject<any>()
    public blOpObs = this.blOpSbj.asObservable()

    private emitSbj = new Subject<any>()
    public emitObs = this.emitSbj.asObservable()

    private closeSbj = new Subject<any>()
    public closeObs = this.closeSbj.asObservable()


    constructor(){}

    public setBlOp(config:{
        //类型  添加或编辑
        type:string,
        //用于时间组件识别
        comType:string,
        //编辑模式下的数据
        data?:any
    }):void{
        this.blOpSbj.next(config)
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