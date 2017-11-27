import { Component, OnInit, ViewChild, OnDestroy, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { environment } from '../../../environments/environment'
import { AppService } from '../../app.service'

import { GrAppInfoService } from '../../ApiServices'
import { GrMembersService } from '@gr-api-service/grMembers/grMembers.service'
import { RiccioPboxService } from '@gr-public/riccio-pbox/riccio-pbox.service'
import { ILeftData } from '@gr-public/riccip-app-left-menu/riccio-app-left-menu.interface'
import { LoginService } from '../../Public/Login/Login.service'

import { topNavMenu } from './topMenuList'

@Component({
    selector: 'app-ruanwen',
    templateUrl: './ruanwen.component.html',
    styleUrls: ['../../Public/theme/apps-common/common.scss', '../../Public/theme/apps-common/header.scss', './ruanwen.component.scss']
})
export class RuanwenComponent implements OnInit {

    @ViewChild('tip') tip: any;

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
     * 二级菜单的标志位，如果是release则不显示二级菜单
     * @type {string}
     */
    public secoundType: string

    /**
     * pbox
     * @type {Subscription}
     */
    public pboxRX$: Subscription

    /**
     * 头部导航列表
     * @type {any[]}
     */
    public topNavMenuData: any[]

    public windowUrl: any

    leftMenuData: ILeftData
    comMenu:any[]

    constructor(
        public activatedRoute: ActivatedRoute,
        public router: Router,
        private changeDetectorRef: ChangeDetectorRef,
        public loginService: LoginService,
        public riccioPboxService: RiccioPboxService,
        public grAppInfoService: GrAppInfoService,
        public appService: AppService,
        private grMembersService:GrMembersService
    ) {
        // this.windowUrl = this.appService.safeUrl(`${environment.iconUrl}iconfont/ruanwen/iconfont.css?v=${window['statics_version']}`) 
        this.windowUrl = this.appService.iconUrls.ruanwen
        this.secoundType = ''
        this.menuList = []
        this.userInfo = {}
        this.openShrink = false
        this.appInfo = {
            'name': ''
        }
        this.leftMenuData = {
            title: '软文营销',
            logo: '',
            module: 'ruanwen',
            menu: []
        }
        this.topNavMenuData = new topNavMenu().normal

        this.popoversText = ''

        this.routerEvent()

        // this.handleActiveRouter()

        this.activatedRoute.data.subscribe(res => {
            if (res['UserInfo']) {
                this.userInfo = res['UserInfo']['data']
                if (this.userInfo['is_administrator'] === true) this.topNavMenuData = new topNavMenu().is_admin
            }
        })


        /**
         * 订阅pbox组件
         * @type {[type]}
         */
        this.pboxRX$ = this.riccioPboxService.getEmit().subscribe(res => {
            //

        })


    }

    ngOnInit() {
        sessionStorage.setItem('loading', 'false')
        this.fnGetAppsInfo()
        this.getComMenu()
    }

    ngAfterViewChecked() {
        this.changeDetectorRef.detectChanges()
    }

    ngOnDestroy() {
        this.pboxRX$.unsubscribe()
    }

    /**
     * @author GR-03
     * @copyright 获取该应用的详细信息
     * @param     [param]
     * @return    [return]
     */
    public fnGetAppsInfo(): void {
        this.grAppInfoService.postAppInfo({
            'model': 'RuanwenClient'
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
                    let two = res.length > 1 ? res[1]['path'] : ''
                    this.secoundType = res[0]['path'] + '/' + two
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
    public logOut(): void {
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

    /*
    获取公司菜单
     */
    public getComMenu(){
        this.grMembersService.getCurrentMenu().subscribe(res=>{
            if(res.status === 1){
                this.comMenu = res.data
            }
        })
    }

}
