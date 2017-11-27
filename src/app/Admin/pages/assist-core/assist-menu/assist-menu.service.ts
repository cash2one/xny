import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AssistMenuService {

  private RXJS   = new Subject<any>();

  private DOCID   = new Subject<any>();

  private HELP_LIST = new Subject<any>();

  constructor() {  }

  //传入数据
  public setSubject(mission: any) {
    this.RXJS.next(mission);
  }
  public getSubject():Observable<any>{
  	return this.RXJS.asObservable()
  }

  //文档id
  public setDocId(mission: any) {
    this.DOCID.next(mission);
  }
  public getDocId():Observable<any>{
    return this.DOCID.asObservable()
  }

  //帮助分类列表
  public setHelpList(mission: any) {
    this.HELP_LIST.next(mission);
  }
  public getHelpList():Observable<any>{
    return this.HELP_LIST.asObservable()
  }

}
