import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RiccioSelectMembersService {

  private RXJS   = new Subject<any>();

  private Emit   = new Subject<any>();

  private isShow = new Subject<boolean>();

  constructor() {  }


  //传入数据
  public setSubject(mission: any) {
    this.RXJS.next(mission);
  }
  public getSubject():Observable<any>{
  	return this.RXJS.asObservable()
  }

  //传出数据
  public setEmit(mission: any) {
    this.Emit.next(mission);
  }
  public getEmit():Observable<any>{
    return this.Emit.asObservable()
  }


  //传入显示与否
  public setShowView(bool:boolean=false){
  	this.isShow.next(bool);
  }

  public getShowView():Observable<any>{
  	return this.isShow.asObservable()
  }

}