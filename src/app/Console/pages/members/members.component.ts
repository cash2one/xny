import { Component, OnInit,ViewChild,Renderer } from '@angular/core'
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,NavigationEnd }  from '@angular/router'

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['../../Console.component.scss','./members.component.scss']
})
export class MembersComponent implements OnInit {
  public RouterActive:string

  constructor(
    public activatedRoute:ActivatedRoute
  ) {
    this.RouterActive = ''
  }

  ngOnInit() {
    
    /**
     * @author GR-03
     * @copyright 根据当前的路由来判断需要在哪一个菜单显示选中样式
     * @param     [param]
     * @return    [return]
     * @check     GR-05       GR-03
     */
    this.activatedRoute.children[0].url.subscribe(res=>{
      this.RouterActive = res.length>0?res[0]['path']:''
    })

    /**
     * @author GR-03
     * @copyright 订阅获取到最根组件的菜单列表来判断是否显示右上角的tab菜单
     * @param     [param]
     * @return    [return]
     * @check     GR-05       GR-03
     * @param     {[type]}
     */
    this.activatedRoute.parent.parent.data.subscribe(res=>{
      let Menu = res.Menu.json()
      // console.log(Menu)
    })

    /**
     * @author GR-03
     * @copyright 清空RouterActive字段
     * @param     [param]
     * @return    [return]
     * @check     GR-05       GR-03
     * @param     {[type]}
     */
    this.activatedRoute.parent.url.subscribe(res=>{
      this.RouterActive = ''
    })
  }

}
