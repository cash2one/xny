import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class AddEditCompanyService {

  public companybol:string;
  public data:any;

  private RXJS = new Subject<any>();
  $RXJS = this.RXJS.asObservable();
  setSubject(mission: any) {
    this.RXJS.next(mission);
  }
  

  constructor() { }

}
