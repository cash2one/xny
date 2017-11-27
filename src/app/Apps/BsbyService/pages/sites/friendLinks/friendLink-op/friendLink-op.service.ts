import { Injectable,ViewContainerRef } from '@angular/core'
import { Subject }    from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'


@Injectable()
export class FriendLinkOpService {
    private flOpSbj = new Subject<any>()
    public flOpObs = this.flOpSbj.asObservable()

    private emitSbj = new Subject<any>()
    public emitObs = this.emitSbj.asObservable()

    private closeSbj = new Subject<any>()
    public closeObs = this.closeSbj.asObservable()


    constructor(){}

    public setFlOp(config:{
        //类型  添加或编辑
        type:string,
        //用于时间组件识别
        comType:string,
        //编辑模式下的数据
        data?:any
    }):void{
        this.flOpSbj.next(config)
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