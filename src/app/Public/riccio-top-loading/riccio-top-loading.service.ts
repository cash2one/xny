import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RiccioTopLoadingService {

  private RXJS   = new Subject<any>();

  constructor() {  }

  public setSubject(mission: any) {
    this.RXJS.next(mission);
  }

  
  public getSubject():Observable<any>{
  	return this.RXJS.asObservable()
  }

}
