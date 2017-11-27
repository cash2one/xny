import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RiccioTreeDepartmentService {

  private RXJS   = new Subject<any>();

  private isCheck   = new Subject<any>();

  private Emit   = new Subject<any>();

  constructor() {  }

  //传入数据
  public setSubject(mission: any) {
    this.RXJS.next(mission);
  }
  public getSubject():Observable<any>{
  	return this.RXJS.asObservable()
  }

  //传入右边数据来判断是否显示勾选图标
  public setIsCheck(mission: any) {
    this.isCheck.next(mission);
  }
  public getIsCheck():Observable<any>{
  	return this.isCheck.asObservable()
  }

  //传出数据
  public setEmit(mission: any) {
    this.Emit.next(mission);
  }
  public getEmit():Observable<any>{
    return this.Emit.asObservable()
  }

}
