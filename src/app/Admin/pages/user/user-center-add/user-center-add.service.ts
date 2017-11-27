import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserCenterAddService {

  public symbol:string;
  public editData:any;

  public modelName:string;
  public cid:string

  private RXJS = new Subject<any>();
  constructor() {  }

  public setSubject(mission: any) {
    this.RXJS.next(mission);
  }
  public getSubject():Observable<any>{
  	return this.RXJS.asObservable()
  }

}
