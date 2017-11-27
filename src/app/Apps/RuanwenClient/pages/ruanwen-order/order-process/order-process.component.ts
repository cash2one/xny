import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,NavigationEnd } from '@angular/router'

import { pathNavbar }		from './pathNavbar'

@Component({
  selector: 'app-order-process',
  templateUrl: './order-process.component.html',
  styleUrls: ['./order-process.component.scss']
})
export class OrderProcessComponent implements OnInit {

   public activeRouter:string

   public pathNavbar:any[]

  constructor(
  	public router:Router,
  	public activatedRoute:ActivatedRoute
  ) { 
  	this.routerEvent()
  	this.pathNavbar = new pathNavbar().data
  }

  ngOnInit() {
  }

  /**
   * @author GR-03
   * @copyright 监听路由变化
   * @param     [param]
   * @return    [return]
   */
  public routerEvent():void{
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .subscribe((event) => {
        if(event.firstChild){
          event.firstChild.url.subscribe(res=>{
            this.activeRouter = res[0]['path']
          })
        }
      })
   }


}
