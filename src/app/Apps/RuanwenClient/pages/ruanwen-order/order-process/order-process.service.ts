import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,NavigationEnd } from '@angular/router'

@Injectable()
export class OrderProcessService {

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
        this.router.navigateByUrl("RuanwenClient/write/process/add/article/"+id)
        bool = true
        break;

      case 4:
        this.router.navigateByUrl("RuanwenClient/write/process/writing/"+id)
        bool = true
        break;

      case 5:
        this.router.navigateByUrl("RuanwenClient/write/process/complete/"+id)
        bool = true
        break;
      
      default:break;
    }

    return bool
  }

}
