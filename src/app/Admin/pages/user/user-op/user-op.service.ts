import { Injectable } from '@angular/core'
import { Subject }    from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class UserOpService {

  private uaSbj  = new Subject<any>()
  public uaObs = this.uaSbj.asObservable()

  private uaEmitSbj = new Subject<any>()
  public uaEmitObs = this.uaEmitSbj.asObservable()

  constructor() {  }

  public setUserOp(mission: any) {
    this.uaSbj.next(mission)
  }

  public emitUserOp(data:any){
    this.uaEmitSbj.next(data)
  }
}