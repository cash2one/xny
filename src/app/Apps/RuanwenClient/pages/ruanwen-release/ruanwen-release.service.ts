import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,NavigationEnd } from '@angular/router'

@Injectable()
export class RuanwenReleaseService {

  constructor(
  	private router:Router
  ) { }

  /**
   * @author GR-03
   * @copyright 根据订单状态决定进入到哪个组件页面
   * @param     [param]
   * @return    [return]
   * @param     {number}        status [description]
   * @param     {number|string} id     [description]
   */
  public handleOrderStatusRouter(status:number,id:number|string):boolean{

  	let bool = false

    switch (status) {
      case 1:
        this.router.navigateByUrl("RuanwenClient/article/release/executory/"+id)
        bool = true
        break;

      case 2:
        this.router.navigateByUrl("RuanwenClient/article/release/complete/"+id)
        bool = true
        break;

      case 3:
        this.router.navigateByUrl("RuanwenClient/article/release/delivery/"+id)
        bool = true
        break;
      
      default:break;
    }

    return bool
  }

}
