import {
    Component,
    OnInit,
    OnDestroy,
    AfterViewChecked,
    ChangeDetectorRef,
    ElementRef,
    ViewChild
} from '@angular/core'
import { Location } from '@angular/common'
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import 'rxjs/add/operator/filter'
import { environment } from '../../../environments/environment'

import { AppService } from '../../app.service'
import { GrAppInfoService } from '@gr-api-service/grAppInfo/grAppInfo.service'
import { GrMembersService } from '@gr-api-service/grMembers/grMembers.service'
import { BsbyService, SiteRouteInfo } from './bsbyService.service'
import { MenusData } from './bsbyService.data'

import { ILeftData } from '@gr-public/riccip-app-left-menu/riccio-app-left-menu.interface'

@Component({
    selector: 'app-bsby-service',
    templateUrl: './bsbyService.component.html',
    styleUrls: [
        '../../Public/theme/apps-common/common.scss',
        '../../Public/theme//apps-common/header.scss',
        './bsbyService.common.scss',
        './bsbyService.component.scss'
    ]
})
export class BsbyServiceComponent implements OnInit, AfterViewChecked {
    //路由、菜单相关数据
    menuData: MenusData
    //app详情
    appInfo: any = {}
    //当前用户信息
    userInfo: any = {}
    //当前企业菜单
    comMenu:any
    //是否二级导航伸缩
    openShrink: boolean
    //二级菜单宽度
    secMenuWidth: string
    //提示模块文字
    moduleName: string

    windowUrl: any

    //存储网站信息（二级菜单所用）
    siteRouteInfo: SiteRouteInfo

    //是否显示返回路由
    showReturn: boolean
    //存储历史路由（自定义二级菜单所用）
    previousUrl: string

    leftMenuData:ILeftData

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private location: Location,
        private changeDetectorRef: ChangeDetectorRef,
        private appService: AppService,
        private bsbyService: BsbyService,
        private grAppInfoService: GrAppInfoService,
        private grMembersService:GrMembersService
    ) {
        this.menuData = new MenusData()
        this.secMenuWidth = '180px'
        this.openShrink = true
        this.windowUrl = this.appService.iconUrls.bsby
        this.showReturn = false
        this.siteRouteInfo = {
            siteId: null
        }
        this.resolveRouteMenus()
    }

    ngOnInit() {
        sessionStorage.setItem('loading', 'false')
        this.activatedRoute.data.subscribe(res => {
            this.resolveUserInfo(res.userInfo)
        })
        this.bsbyService.siteRouteInfoObj.subscribe(info => {
            this.siteRouteInfo = info
            this.showReturn ? this.resolveRefreshSecMenu() : {}
        })
        this.getAppInfo()
        this.getComMenu()
    }

    ngAfterViewChecked() {
        this.changeDetectorRef.detectChanges()
    }

    /**
     * 处理用户数据
     * @param userInfo 
     * @author GR-05
     */
    public resolveUserInfo(userInfo:any){
        if (userInfo) {
            this.userInfo = userInfo.data
            this.userInfo.company_userinfo.logo = this.appService.resolveFileString(this.userInfo.company_userinfo.logo)
            this.bsbyService.setUserInfo(this.userInfo)
            if (this.userInfo.is_administrator === true) {
                //管理员
            }
        }
    }

    /**
     * 获取处理路由菜单和当前二级菜单
     * @author GR-05
     */
    public resolveRouteMenus() {
        this.bsbyService.bsbyMenus = this.activatedRoute.snapshot.data['menus']['data']
        this.menuData.menus = this.bsbyService.bsbyMenus
        this.leftMenuData = {
            title:'百搜百应',
            logo:'',
            module:'bsby',
            menu:this.bsbyService.bsbyMenus
        }
        //获取二级路由菜单
        this.router.events
            .filter(e => e instanceof NavigationEnd)
            .subscribe(e => {
                //模块路由标示
                let module = e['urlAfterRedirects'].toString().split('/')[2]
                //模块子功能标示
                let feature = e['urlAfterRedirects'].toString().split('/')[3]

                if (module == 'site' && this.resolveFeature(feature)) {
                    //网站详情需使用自定义菜单
                    // this.menuData.secMenus = this.menuData.siteMgrMenus
                    this.resolveRefreshSecMenu()
                    this.showReturn = true
                } else {
                    this.showReturn = false
                    this.menuData.secMenusTitle = this.menuData.secMenuTitleData[module]
                    this.menuData.menus.every((menu) => {
                        if (menu['url'] === module) {
                            this.menuData.secMenus = menu['chilren']
                            return false
                        } else {
                            return true
                        }
                    })
                }
            })
    }

    /**
     * 判断是不是需要自定义菜单
     * @param url 
     * @author GR-05
     */
    public resolveFeature(url: string) {
        return url == 'info' || url == 'keyword' ||
            url == 'programme' || url == 'demand' ||
            url == 'article' || url == 'friendLink' || url == 'backLink'
    }

    /**
     * 处理二级菜单url  确保刷新能正确使用active效果
     * @author GR-05
     */
    public resolveRefreshSecMenu() {
        this.menuData.secMenus = JSON.parse(JSON.stringify(this.menuData.siteMgrMenus))
        this.siteRouteInfo.siteId ? this.menuData.secMenus.forEach(menu => {
            !menu.notId ? menu['url'] += `/${this.siteRouteInfo.siteId}` : {}
        }) : {}
    }

    /**
     * 返回历史记录路由
     * @author GR-05
     */
    public fnBack() {
        if (this.showReturn) {
            this.router.navigate([`BsbyService/site/list/${this.bsbyService.siteInfo.type}`])
        }
    }

    /**
     * 获取当前菜单
     */
    public getComMenu(){
        this.grMembersService.getCurrentMenu().subscribe(res=>{
            if(res.status === 1){
                this.comMenu = res.data
            }
        })
    }

    /**
     * 获取此应用详情
     * @author GR-05
     */
    public getAppInfo() {
        this.grAppInfoService.postAppInfo({
            model: 'BsbyService'
        }).subscribe(res => {
            if (res.status === 1) {
                this.appInfo = { ...res['data'] }
                this.bsbyService.setAppInfo(this.appInfo)
                this.leftMenuData.title = this.appInfo.name
                this.leftMenuData.logo = window['setting']['fileurl'] + this.appInfo.thumb
            }
        })
    }

    /**
     * 二级导航伸缩
     * @author GR-05
     */
    public fnNavber(): void {
        this.openShrink ? this.secMenuWidth = '0px' : this.secMenuWidth = '180px'
        setTimeout(() => {
            this.openShrink = !this.openShrink
        }, 200)
    }
}