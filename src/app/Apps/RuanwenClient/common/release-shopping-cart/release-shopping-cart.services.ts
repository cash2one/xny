import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ReleaseShoppingCartServices {

  private RXJS   = new Subject<any>();

  constructor() {  }

  //传入购物车列表数据
  public setCartItem(mission: any) {
    this.RXJS.next(mission);
  }
  public getCartItem():Observable<any>{
  	return this.RXJS.asObservable()
  }

}
