import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

class MenuData{
  cid?:string;
  modelName?:string;
  menuType?:string;
}

@Injectable()
export class AddToService {

  public symbol:string;
  public editData:any;

  public modelName:string;
  public cid:string
  public menuType:string;

  private RXJS = new Subject<any>();

  constructor() {  }

  public setSubject(mission: any) {
    this.RXJS.next(mission);
  }
  public getSubject():Observable<any>{
  	return this.RXJS.asObservable()
  }

}
