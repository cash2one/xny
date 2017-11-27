import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { GrReleaseService }		from '../../services'

@Injectable()
export class ReleaseScreenResourceService {

  private SearchData   = new Subject<any>()

  public noChoose = new Subject<any>()

  constructor(
  	private grReleaseService:GrReleaseService
  ) { }

  //传入数据
  public setSubject(mission: any) {
    this.SearchData.next(mission);
  }
  public getSubject():Observable<any>{
  	return this.SearchData.asObservable()
  }

  public setNoChoose(mission: any) {
    this.noChoose.next(mission);
  }
  public getNoChoose():Observable<any>{
    return this.noChoose.asObservable()
  }
}