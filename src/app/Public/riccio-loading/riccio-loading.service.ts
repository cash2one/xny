import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RiccioLoadingService {

  private loadingSbj  = new Subject<any>()
  public loadingObs = this.loadingSbj.asObservable()

  private closeSbj = new Subject<any>()
  public closeObs = this.closeSbj.asObservable()

  constructor() {  }

  public setLoading(mission: any) {
    this.loadingSbj.next(mission)
  }

  public closeLoading(){
    this.closeSbj.next('close')
  }
}