import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,NavigationEnd }  from '@angular/router';

import { GrAppsService }		from '../../../services'

@Component({
  selector: 'app-apps-my',
  templateUrl: './apps-my.component.html',
  styleUrls: ['../../../Console.component.scss','../../setting/setting.component.scss','./apps-my.component.scss']
})
export class AppsMyComponent implements OnInit {

  /**
   * 应用列表数据
   */
  public itemList:any[]

  /**
   * loading效果字段
   * @type {string}
   */
  public loadingType:string

  constructor(
  	public grAppsService:GrAppsService,
    public router:Router
  ) { 
  	this.itemList = []
  	this.loadingType = 'show'
  }

  ngOnInit() {
  	this.fnGetList()
  }

  /**
   * @author GR-03
   * @copyright 获取应用列表
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public fnGetList():void{
  	this.loadingType = 'show'
  	this.grAppsService.getAppMyApp('').subscribe(res=>{
  		this.loadingType = 'hide'
  		if(res.status===1){
  			this.itemList = [...res['data']]
  			if(this.itemList.length==0){
  				this.loadingType = 'empty'
  			}else{
          this.itemList.forEach(item=>{
            item['thumb'] = window['setting']['fileurl'] + item['thumb']
          })
        }
  		}
  	},error=>{
  		throw new Error(error)
  	})
  }

  /**
   * @author GR-03
   * @copyright 点击跳转到详情页面
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public fnGoInfo(list:any):void{
    if(list['id']&&list['status']!=2){
      this.router.navigateByUrl('Console/apps/info/'+list['model'])
    }
  }

  /**
   * 图片加载失败事件
   * @param item 
   * @author GR-05
   */
  public noImg(item:any){
    item.noImg = true
  }

}
