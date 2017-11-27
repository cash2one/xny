import { Component, OnInit, OnDestroy } from '@angular/core'
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router'

import 'rxjs/add/operator/filter'
import { Subscription } from 'rxjs/Subscription'
import { environment } from '../../environments/environment'

import { AppService } from '../app.service'
import { ConsolesService } from './Console.service'
import { MenuItems, MenuData } from './Console.menu'
import { GrConsolesService } from './services'
import { GrMembersService } from '@gr-api-service/grMembers/grMembers.service'
import { LoginService } from '../Public/Login/Login.service'
import { RiccioPboxService } from '../Public/riccio-pbox/riccio-pbox.service'
import { RiccioNotificationsService } from '../Public/riccio-notifications/riccio-notifications.service'
import { ILeftData } from '../Public/riccip-app-left-menu/riccio-app-left-menu.interface'

import { ConsoleInfo } from './ConsoleInfo'
import { topNavMenu } from './topMenuList'

@Component({
    selector: 'app-console',
    templateUrl: './Console.component.html',
    styleUrls: ['./Console.component.scss'],
    animations: [
        trigger('moveLeft', [
            state('in', style({ minWidth: '180px' })),
            state('out', style({ minWidth: '70px', maxWidth: '70px' })),
            transition('in => out', [
                style({ minWidth: '180px' }),
                animate(250, style({ minWidth: '70px', maxWidth: '70px' }))
            ]),
            transition('out => in', [
                style({ minWidth: '70px', maxWidth: '70px' }),
                animate(250, style({ minWidth: '180px' }))
            ])
        ])
    ]
})
export class ConsoleComponent implements OnInit {

    //logo监听
    public comLogoObj: Subscription
    //企业logo 地址
    public comLogo: string
    /**
     * 菜单数据
     * @type {any[]}
     */
    public MenuItems: any[]

    /**
     * 头部导航的标题栏
     * @type {any[]}
     */
    public topNavMenuData: any[]

    /**
     * 企业详情数据
     * @type {[type]}
     */
    public companyInfo: ConsoleInfo

    /**
     * 用户详细信息
     * @type {any}
     */
    public userInfo: any

    /**
     * 订阅pbox组件的对象
     * @type {Subscription}
     */
    public pboxRX$: Subscription

    /**
     * 展开和收起的标志位
     * @type {boolean}
     */
    public openShrink: boolean

    /**
     * 菜单tip提示的文本信息
     * @type {string}
     */
    public tipText: string

    /**
     * 判断是否是企业管理员
     * @type {boolean}
     */
    public is_administrator: boolean

    /**
     * 二级菜单数据
     * @type {any[]}
     */
    public secoundMenu: any[]

    //是否显示二级菜单
    public showSecoundMenu: boolean

    /**
     * 顶部菜单数据
     * @type {any[]}
     */
    public topMenu: any[]

    /**
     * 二级菜单需要显示的标题
     * @type {string}
     */
    public secoundMenuTitle: string

    /**
     * 顶部菜单标题数据
     * @type {string}
     */
    public topMenuTitle: string

    /**
     * 顶部菜单标题icon
     * @type {string}
     */
    public topMenuIcon: string

    public windowUrl: any

    //监听消息数量变化
    public notifyObj: Subscription
    //消息数量
    public notifyCount: number
    //用于标示功能模块
    public flagUrl: string

    // 企业名称
    public comNameRX$: Subscription

    //子菜单数组
    public childrenMenu: any[]

    //左侧菜单数据
    leftMenuData: ILeftData
    //企业下拉菜单数据
    comMenu: any[]

    constructor(
        public grConsolesService: GrConsolesService,
        public activatedRoute: ActivatedRoute,
        public riccioNotificationsService: RiccioNotificationsService,
        public loginService: LoginService,
        public router: Router,
        public riccioPboxService: RiccioPboxService,
        public appService: AppService,
        private consolesService: ConsolesService,
        private grMembersService: GrMembersService
    ) {
        // this.windowUrl = this.appService.safeUrl(`${environment.iconUrl}iconfont/console/iconfont.css?v=${window['statics_version']}`)
        this.windowUrl = this.appService.iconUrls.console
        this.secoundMenuTitle = ''
        this.secoundMenu = []
        this.childrenMenu = []
        this.is_administrator = false
        this.tipText = ''
        this.openShrink = true
        this.MenuItems = []
        this.companyInfo = new ConsoleInfo()
        this.topNavMenuData = new topNavMenu().normal
        this.leftMenuData = {
            title: '管理控制台',
            logo: '',
            module: 'console',
            menu: []
        }
        this.flagUrl = 'index'

        this.activatedRoute.data.subscribe(res => {
            if (res.Menu.error) {

            } else {
                let Menu = res.Menu.json().data
                let UserInfo = res.UserInfo.data
                this.companyInfo = UserInfo.company_userinfo ? { ...UserInfo.company_userinfo } : new ConsoleInfo()
                this.comLogo = this.resolveFileString(this.companyInfo.logo)
                this.leftMenuData.logo = this.comLogo
                this.userInfo = UserInfo
                this.is_administrator = UserInfo.is_administrator
                this.notifyCount = UserInfo.notify

                if (this.is_administrator) this.topNavMenuData = new topNavMenu().is_admin

                /*
                没有企业信息说明还没有选择任何一个企业，跳转到选择企业页面
                  */
                if (this.companyInfo.id == '') {
                    this.riccioNotificationsService.setSubject({ text: '请选择企业', status: 'danger' })
                    this.router.navigateByUrl("Members")
                }


                this.MenuItems = Array.isArray(Menu) ? [...Menu] : []
                this.leftMenuData.menu = this.MenuItems

                if (this.MenuItems.length == 0) {
                    // this.riccioNotificationsService.setSubject({ text: '您没有权限', status: 'danger' })
                    this.router.navigateByUrl("Member")
                }

                /**
                 * 监听路由变化
                 */

                this.router.events
                    .filter(event => event instanceof NavigationEnd)
                    .map(() => this.activatedRoute)
                    .subscribe((event) => {
                        event.firstChild.url.subscribe(res => {
                            let childrenUrl = res[0]['path']
                            this.flagUrl = childrenUrl
                            this.childrenMenu = this.MenuItems.filter(e => e['url'] == childrenUrl)[0]
                            this.secoundMenu = this.childrenMenu ? [...this.childrenMenu['chilren']].filter(e => e['is_left'] == 1) : []
                            this.secoundMenuTitle = this.childrenMenu ? this.childrenMenu['name'] : ''

                            this.topMenu = this.childrenMenu ? (() => {
                                return [...this.childrenMenu['chilren']].filter(e => e['is_left'] == 2)
                            })() : []
                            this.topMenuTitle = this.childrenMenu ? this.childrenMenu['name'] : ''
                            this.topMenuIcon = this.childrenMenu ? this.childrenMenu['fonticon'] : ''

                            this.resolveSecoundMenu(childrenUrl)
                        })
                    })

                // 点击二级菜单相关动作（）
                this.router.events
                    .filter(event => event instanceof NavigationEnd)
                    .subscribe(event => {
                        let routeWord = event['urlAfterRedirects'].replace('/Console/', '')
                        if (this.secoundMenu.length > 0) {
                            this.secoundMenu.forEach(menu => {
                                if (menu['url'] === routeWord) {
                                    this.topMenuTitle = menu['name']
                                    this.topMenuIcon = menu['fonticon']
                                }
                                this.topMenu = menu['name'] == this.topMenuTitle ? menu['chilren'].filter(e => e['is_left'] == 2) : this.topMenu
                            })
                        }
                    })
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
        this.getComMenu()
        this.comLogoObj = this.consolesService.comLogObj.subscribe(logo => {
            this.comLogo = logo
            this.leftMenuData.logo = this.comLogo
        })
        this.notifyObj = this.consolesService.nofityObj.subscribe(count => {
            this.notifyCount = count
            if (this.flagUrl == 'message') {
                this.secoundMenu[1].count = count
            }
        })

        this.comNameRX$ = this.consolesService.comNameObj.subscribe(res => {
            this.companyInfo.name = res
        })
    }


    ngOnDestroy() {
        if (sessionStorage.getItem('isAuth') != null) sessionStorage.removeItem('isAuth')
        this.pboxRX$ ? this.pboxRX$.unsubscribe() : {}
        this.comLogoObj ? this.comLogoObj.unsubscribe() : {}
        this.comNameRX$ ? this.comNameRX$.unsubscribe() : {}
    }

    /**
       * 处理二级菜单
       * @author GR-05
       */
    public resolveSecoundMenu(url: string) {
        if (this.secoundMenu.length > 0) {
            this.showSecoundMenu = true
        } else if (url == 'message') {
            this.secoundMenu = new MenuData().msgMenu
            this.secoundMenuTitle = this.secoundMenu[0].app_name
            this.showSecoundMenu = true
            this.topMenuTitle ? {} : this.topMenuTitle = '消息内容'
            this.secoundMenu[1]['count'] = this.notifyCount
        } else {
            this.showSecoundMenu = false
        }
    }

    /**
     * @author GR-03
     * @copyright 退出登陆成功后跳转到登陆页
     * @param     [param]
     * @return    [return]
     * @check     GR-05       GR-03
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
     * @author GR-03
     * @copyright 点击启用展开和关闭效果
     * @param     [param]
     * @return    [return]
     * @check     GR-05       GR-03
     */
    public FnNavber(): void {
        this.openShrink = !this.openShrink
    }

    /**
     * @author GR-03
     * @copyright enter事件的时候触发tip
     * @param     [param]
     * @return    [return]
     * @check     GR-05       GR-03
     * @param     {string}    name  [description]
     */
    public fnEnterTip(name: string): void {
        this.tipText = name
    }

    /**
     * 处理一下文件路径
     * @param fileString 原文件路径
     * @author GR-05
     */
    public resolveFileString(fileString: string): string {
        return window['setting']['fileurl'] + fileString
    }

    /**
     * 获取企业菜单
     * @author GR-05
     */
    public getComMenu() {
        this.grMembersService.getCurrentMenu().subscribe(res => {
            if (res.status === 1) {
                this.comMenu = res.data
            }
        })
    }

}
