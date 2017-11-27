import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RiccioNotificationsService {

  private RXJS   = new Subject<any>();

  private unSubscribe   = new Subject<any>();

  constructor() {  }


  //传入数据
  public setSubject(mission: any) {
    this.RXJS.next(mission);
  }
  public getSubject():Observable<any>{
  	return this.RXJS.asObservable()
  }

  //传出数据
  public setCancel(value: boolean) {
    this.unSubscribe.next(value);
  }
  public getCancel():Observable<boolean>{
    return this.unSubscribe.asObservable()
  }

}
