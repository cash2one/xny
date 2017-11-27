import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class AddEditAppcenterService {

  public symbol:string;
  public data:any;

  private RXJS = new Subject<any>();
  $RXJS = this.RXJS.asObservable();

  private OkSbj = new Subject<boolean>();
  public OkObj = this.OkSbj.asObservable()
  

  constructor() { }
  setSubject(mission: any) {
    this.RXJS.next(mission);
  }

  okNotif(){
    this.OkSbj.next(true)
  }
}
