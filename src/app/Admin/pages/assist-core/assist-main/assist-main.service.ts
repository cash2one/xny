import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AssistMainService {

  private RXHelpData = new Subject<any>();

  constructor() { }

  //设置数据
  public setHelpListData(mission: any) {
    this.RXHelpData.next(mission);
  }
  public getHelpListData():Observable<any>{
  	return this.RXHelpData.asObservable()
  }

}
