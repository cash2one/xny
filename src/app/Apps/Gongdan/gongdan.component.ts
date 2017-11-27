import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router'

import { AppService }    from '../../app.service'
import { GrAppInfoService }  from '../../ApiServices'
import { GrMembersService }  from '@gr-api-service/grMembers/grMembers.service'

import { ILeftData } from '@gr-public/riccip-app-left-menu/riccio-app-left-menu.interface'
import { topMenuList }    from './topMenuList'

@Component({
  selector: 'app-gongdan',
  templateUrl: './gongdan.component.html',
  styleUrls: ['../../Public/theme/apps-common/common.scss','../../Public/theme/apps-common/header.scss','./gongdan.component.scss']
})
export class GongdanComponent implements OnInit {

  public windowUrl: any

  public appInfo: any  // 应用信息
  public userInfo: any // 用户详细信息
  public topNavMenuData: any[]   // 头部导航列表
  public comMenu: any[]  // 公司菜单 

  public leftMenuData: ILeftData  // 左侧菜单

  constructor(
    private activatedRoute: ActivatedRoute,
    private grMembersService: GrMembersService,
  	private appService: AppService,
    private grAppInfoService: GrAppInfoService
  ) {

  	this.windowUrl = this.appService.iconUrls.gongdan
    this.appInfo = { 'name': '' }
    this.userInfo = { }
    this.topNavMenuData = new topMenuList().data
    this.comMenu =[]
    this.leftMenuData = {
        title: '工单',
        logo: '',
        module: 'Gongdan',
        menu: []
    }

    /*
    获取登录的用户资料
     */
    this.activatedRoute.data.subscribe(res => {
        if (res['UserInfo']) {
            this.userInfo = res['UserInfo']['data']
        }
    })

  }

  ngOnInit() {
    sessionStorage.setItem('loading', 'false')
    this.fnGetAppsInfo()
    this.getComMenu()
  }

  /*
  获取应用详细信息
   */
  public fnGetAppsInfo(): void {
      this.grAppInfoService.postAppInfo({
          'model': 'Gongdan'
      }).subscribe(res => {
          if (res.status === 1) {
              this.appInfo = { ...res['data'] }
              this.leftMenuData.title = this.appInfo.name
              this.leftMenuData.logo = window['setting']['fileurl'] + this.appInfo.thumb
          }
      }, error => {
          throw new Error(error)
      })
  }

  /*
  获取公司菜单列表
   */
  public getComMenu(){
      this.grMembersService.getCurrentMenu().subscribe(res=>{
          if(res.status === 1){
              this.comMenu = Array.isArray( res['data'] ) == true ? [...res['data']] : []
          }
      })
  }


  /*
  处理一下文件路径
   */
  public resolveFileString(fileString: string): string {
      return window['setting']['fileurl'] + fileString
  }

}
