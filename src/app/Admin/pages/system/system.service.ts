import { Injectable } from '@angular/core';
import { Http, Response ,Headers,RequestOptions}          from '@angular/http';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,RouterStateSnapshot }  from '@angular/router';

import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SystemService {
 
  public aa:string
  private breadSub = new Subject<string>()
  public breadObj = this.breadSub.asObservable()
  constructor() { }

  public setBread(title:string){
    this.breadSub.next(title)
  }
}
