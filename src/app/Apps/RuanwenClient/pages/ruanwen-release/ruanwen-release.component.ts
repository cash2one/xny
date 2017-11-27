import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,NavigationEnd } from '@angular/router'

import { animations }    from '../../../../Public/Animations'

import { pathNavbar }    from './pathNavbar'

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-ruanwen-release',
  templateUrl: './ruanwen-release.component.html',
  styleUrls: ['./ruanwen-release.component.scss'],
  animations: [
    animations.flyIn
  ]
})
export class RuanwenReleaseComponent implements OnInit {

  /**
   * 需要高亮的路由导航
   * @type {string}
   */
  public activeRouter:string

  /**
   * 头部导航数据
   * @type {any[]}
   */
  public pathNavbar:any[]

  constructor(
  	public activatedRoute:ActivatedRoute,
  	public router:Router
  ) { 
  	this.activeRouter = 'screen'
    this.pathNavbar = new pathNavbar().data

    this.routerEvent()

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
        event.firstChild.url.subscribe(res=>{
          this.activeRouter = res[0]['path']
        })
      });
  }

}
