import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { environment } from '../../../environments/environment'
import { AppService } from '../../app.service'

import { GrAppInfoService } from '../../ApiServices'
import { GrMembersService } from '@gr-api-service/grMembers/grMembers.service'
import { LoginService } from '@gr-public/Login/Login.service'
import { ILeftData } from '@gr-public/riccip-app-left-menu/riccio-app-left-menu.interface'

import { topNavMenu } from './topMenuList'

@Component({
    selector: 'app-ruanwen-service',
    templateUrl: './ruanwen-service.component.html',
    styleUrls: ['../../Public/theme/apps-common/common.scss', '../../Public/theme/apps-common/header.scss', './ruanwen-service.component.scss']
})
export class RuanwenServiceComponent implements OnInit {
    @ViewChild('tip') tip: any

    /**
     * 应用详细信息
     * @type {any}
     */
    public appInfo: any

    /**
     * 用户详细信息
     * @type {any}
     */
    public userInfo: any

    /**
     * 一级菜单列表
     * @type {any[]}
     */
    public menuList: any[]

    /**
     * 选中某一个一级菜单其下的二级菜单数据
     * @type {any[]}
     */
    public menuSecoundList: any[]

    /**
     * 二级菜单的标题
     * @type {string}
     */
    public menuSecoundTitle: string

    /**
     * 展开和收起的标志位
     * @type {boolean}
     */
    public openShrink: boolean

    /**
     * tip提示文本的提示
     * @type {string}
     */
    public popoversText: string

    /**
     * 头部导航栏的数组数据对象
     * @type {any[]}
     */
    public topNavMenuData: any[]

    /**
     * 二级菜单的标志位，如果是release则不显示二级菜单
     * @type {string}
     */
    public secoundType: string

    public windowUrl: any
    public comMenu:any[]
    public leftMenuData:ILeftData

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private loginService: LoginService,
        private grAppInfoService: GrAppInfoService,
        private appService: AppService,
        private grMembersService:GrMembersService
    ) {
        // this.windowUrl = this.appService.safeUrl(`${environment.iconUrl}iconfont/ruanwen/iconfont.css?v=${window['statics_version']}`) 
        this.windowUrl = this.appService.iconUrls.ruanwen
        this.secoundType = ''
        this.menuList = []
        this.openShrink = false
        this.appInfo = {
            'name': ''
        }
        this.leftMenuData = {
            title:'软文营销',
            logo:'',
            module:'ruanwen',
            menu:[]
        }
        this.popoversText = ''
        this.topNavMenuData = new topNavMenu().normal

        this.routerEvent()

        // this.handleActiveRouter()
        this.activatedRoute.data.subscribe(res => {
            if (res['UserInfo']) {
                const info = res['UserInfo']
                this.userInfo = { ...info['data'] }

                if (this.userInfo['is_administrator'] === true) this.topNavMenuData = new topNavMenu().is_admin

            }
        })


    }

    ngOnInit() {
        sessionStorage.setItem('loading', 'false')
        this.fnGetAppsInfo()
        this.getComMenu()
    }

    ngOnDestroy() {
    }


    /**
     * @author GR-03
     * @copyright 获取该应用的详细信息
     * @param     [param]
     * @return    [return]
     */
    public fnGetAppsInfo(): void {
        this.grAppInfoService.postAppInfo({
            'model': 'RuanwenService'
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


    /**
     * @author GR-03
     * @copyright 根据当前路由获取二级菜单
     * @param     [param]
     * @return    [return]
     */
    public handleActiveRouter(): void {

        this.activatedRoute.data.subscribe(res => {
            let Menu = res['Menu'].json()

            if (Menu.status === 1) {
                this.menuList = [...Menu['data']]

                this.leftMenuData.menu = this.menuList

                let arr = this.menuList.filter(e => this.secoundType.includes(e['url']))

                this.menuSecoundList = this.menuList.length > 0 ? arr.length > 0 ? [...arr[0]['chilren']] : [] : []

                this.menuSecoundTitle = this.menuList.length > 0 ? arr.length > 0 ? arr[0]['name'] : '' : ''

            }

        })

    }

    /**
     * @author GR-03
     * @copyright 监听路由变化
     * @param     [param]
     * @return    [return]
     */
    public routerEvent(): void {
        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .map(() => this.activatedRoute)
            .subscribe((event) => {
                event.firstChild.url.subscribe(res => {
                    this.secoundType = res[0]['path']
                    this.handleActiveRouter()
                })
            });
    }

    /**
     * @author GR-03
     * @copyright 展开菜单的动画效果和关闭
     * @param     [param]
     * @return    [return]
     */
    public moveAndClose(): void {
        this.openShrink = !this.openShrink
    }


    /**
     * @author GR-03
     * @copyright 鼠标hover菜单之后tip显示对应的文本信息
     * @param     [param]
     * @return    [return]
     * @param     {string}    name [description]
     */
    public setPopoverText(name: string): void {
        this.popoversText = name === 'openShrink' ? this.openShrink == true ? '收起' : '展开' : name
    }

    /**
     * @author GR-03
     * @copyright 退出登录
     * @param     [param]
     * @return    [return]
     */
    private logOut(): void {
        this.loginService.getLogout().subscribe(res => {

            if (res.status === 1) {
                this.router.navigateByUrl("login")
            }

        }, error => {
            throw new Error(error)
        })
    }

    /**
     * 处理一下文件路径
     * @param fileString 原文件路径
     * @author GR-05
     */
    public resolveFileString(fileString: string): string {
        return window['setting']['fileurl'] + fileString
    }

    public getComMenu(){
        this.grMembersService.getCurrentMenu().subscribe(res => {
            if(res.status === 1){
                this.comMenu = res.data
            }
        })
    }

}
