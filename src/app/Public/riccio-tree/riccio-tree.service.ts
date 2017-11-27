import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RiccioTreeService {

  private RXJS   = new Subject<any>();

  private Emit   = new Subject<any>();

  constructor() {  }


  //传入数据
  public setOptions(mission: any) {
    this.RXJS.next(mission);
  }
  public getOptions():Observable<any>{
  	return this.RXJS.asObservable()
  }

  //传出数据
  public setEmit(mission: any) {
    this.Emit.next(mission);
  }
  public getEmit():Observable<any>{
    return this.Emit.asObservable()
  }

}
