import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,NavigationEnd }  from '@angular/router';

import { GrAppsService }		from '../../../../services'
import { RiccioNotificationsService }    from '../../../../../Public/riccio-notifications/riccio-notifications.service'
import { GrMembersService }    from '../../../../services'

import { infoData }			from './infoData'

@Component({
  selector: 'app-apps-info',
  templateUrl: './apps-info.component.html',
  styleUrls: ['../../../../Console.component.scss','../../../setting/setting.component.scss','./apps-info.component.scss']
})
export class AppsInfoComponent implements OnInit {

  /**
   * 应用详情信息
   * @type {infoData}
   */
  public appsInfoData:infoData

  /**
   * 应用table切换标题的列表
   * @type {any[]}
   */
  public appsTableData:any[]

  /**
   * tab切换标志位
   * @type {[type]}
   */
  public tableSymbol:string

  /**
   * 按钮标志位
   * @type {boolean}
   */
  public btnOpen:boolean

  constructor(
  	public activatedRoute:ActivatedRoute,
    public router:Router,
    public riccioNotificationsService:RiccioNotificationsService,
  	public grAppsService:GrAppsService,
    public grMembersService:GrMembersService
  ) {
    this.btnOpen = true
  	this.appsInfoData = new infoData()
  	this.appsTableData = []
    this.tableSymbol = 'info'
  	this.activatedRoute.params.subscribe(res=>{
  		if(res['model']){
       this.appsInfoData['model'] = res['model']
		   this.fnGetAppsInfo(res['model'])	
       this.fnGetAppsTable(res['model'])

        this.grMembersService.setModel(this.appsInfoData['model'])
        this.grAppsService.setModel(this.appsInfoData['model'])
  		}
  	})
  }

  ngOnInit() {
  }

  /**
   * @author GR-03
   * @copyright 根据id获取对应的应用详情数据
   * @param     [param]
   * @return    [return]
   * @param     {number|string} id    [description]
   */
  public fnGetAppsInfo(name:string):void{
  	this.grAppsService.getAppInfo({
  		'model':name
  	}).subscribe(res=>{
  		if(res.status===1){
  			this.appsInfoData = {...res['data']}
  		}
  	},error=>{
  		throw new Error(error)
  	})
  }

  /**
   * @author GR-03
   * @copyright 根据model获取对应的应用选项卡列表
   * @param     [param]
   * @return    [return]
   * @param     {string}    model [description]
   */
  public fnGetAppsTable(model:string):void{
    this.grAppsService.getAppTabList({
      'model':model,
      'type':'tab'
    }).subscribe(res=>{
      if(res.status===1){
        // this.appsTableData = [...res['data']].filter(e=>e['name']!='权限设置').filter(e=>e['name']!='成员管理').filter(e=>e['name']!='应用详情')
        this.appsTableData = [...res['data']]
        if(this.appsTableData.length!=0) this.tableSymbol = 'info'
      }
    },error=>{
      throw new Error(error)
    })
  }

  /**
   * @author GR-03
   * @copyright 点击按钮判断是进入还是开通
   * @param     [param]
   * @return    [return]
   * @param     {string}    type  [description]
   * @param     {boolean}   value [description]
   */
  public fnOutputBtn(type:string,value:boolean):void{
    if(type==='openApps'&&this.appsInfoData['id']!='undefined'){
      this.btnOpen = false
      this.grAppsService.postAppOpen({
        'app_id':this.appsInfoData['id']
      }).subscribe(res=>{
        this.btnOpen = true
        if(res.status===1){
          this.riccioNotificationsService.setSubject({text:'开通成功'})
          this.appsInfoData.appStatus = 1
        }
      },error=>{
        throw new Error(error)
      })

    }else if(type==='goToApps'){
      window.open(`${window['setting']['siteurl']}home/#/${this.appsInfoData['path']}`)
      // this.router.navigateByUrl(this.appsInfoData['path'])
    }
  }


  /**
   * @author GR-03
   * @copyright 选中的table标签
   * @param     [param]
   * @return    [return]
   * @param     {any}       list [description]
   */
  public selectTableSymbol(list:any):void{

    this.tableSymbol = list['url']

  }

}
