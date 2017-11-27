import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AssistTableService {

  private RXJS   = new Subject<any>();

  private success = new Subject<any>();

  constructor() {  }

  //传入数据
  public setSubject(mission: any) {
    this.RXJS.next(mission);
  }
  public getSubject():Observable<any>{
  	return this.RXJS.asObservable()
  }

  //添加或编辑成功的提示
  public setSuccess(mission: any) {
    this.success.next(mission);
  }
  public getSuccess():Observable<any>{
  	return this.success.asObservable()
  }

}
