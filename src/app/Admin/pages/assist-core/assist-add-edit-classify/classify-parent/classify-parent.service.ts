import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ClassifyParentService {

  private RXJS   = new Subject<any>();
  private RXHelpData = new Subject<any>();

  constructor() {  }

  //传入数据
  public setSubject(mission: any) {
    this.RXJS.next(mission);
  }
  public getSubject():Observable<any>{
  	return this.RXJS.asObservable()
  }

  //设置数据
  public setHelpListData(mission: any) {
    this.RXHelpData.next(mission);
  }
  public getHelpListData():Observable<any>{
  	return this.RXHelpData.asObservable()
  }

}
