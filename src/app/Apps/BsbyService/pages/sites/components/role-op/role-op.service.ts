import { Injectable,ViewContainerRef } from '@angular/core'
import { Subject }    from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

import { RoleOpConf,RoleOpData } from './role-op.data'

@Injectable()
export class RoleOpService {
    private rOpSbj = new Subject<any>()
    public rOpObs = this.rOpSbj.asObservable()

    private emitSbj = new Subject<any>()
    public emitObs = this.emitSbj.asObservable()

    private addRoleSbj = new Subject<any>()
    public addRoleObs = this.addRoleSbj.asObservable()

    private closeAddRoleSbj = new Subject<any>()
    public closeAddRoleObs = this.closeAddRoleSbj.asObservable()


    constructor(){}

    public setROp(data:{
        config:RoleOpConf,
        data:RoleOpData
    }):void{
        this.rOpSbj.next(data)
    }

    public setAddRole(siteid:number){
        this.addRoleSbj.next(siteid)
    }

    public closeAddRole(){
        this.closeAddRoleSbj.next()
    }

    public setEmit(flag:boolean):void{
        this.emitSbj.next(flag)
    }
}