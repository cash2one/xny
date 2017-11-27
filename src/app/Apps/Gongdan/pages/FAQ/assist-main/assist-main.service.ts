import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AssistMainService {

  private RXHelpData = new Subject<any>();
  private RXHelpDoc = new Subject<any>();

  constructor() { }

  //设置数据
  public setHelpListData(mission: any) {
    this.RXHelpData.next(mission);
  }
  public getHelpListData():Observable<any>{
  	return this.RXHelpData.asObservable()
  }

  //帮助文档的数据
  public setHelpDocData(mission: any) {
    this.RXHelpDoc.next(mission);
  }
  public getHelpDocData():Observable<any>{
  	return this.RXHelpDoc.asObservable()
  }


}
