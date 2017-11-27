import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot } from '@angular/router'
import { Title } from '@angular/platform-browser'
import { Subscription } from 'rxjs/Subscription'

import { AppService } from '../app.service'
import { GrMembersService } from '../ApiServices/grMembers/grMembers.service'
import { LoginService } from '../Public/Login/Login.service'

import { RiccioModalService } from '../Public/riccio-modal/riccio-modal.service'
import { RiccioLoadingService } from '../Public/riccio-loading/riccio-loading.service'
import { MemberService } from './member.service'
import { ILeftData,IMenu } from '../Public/riccip-app-left-menu/riccio-app-left-menu.interface'

import { SettingData, LeftData} from './settingData'

@Component({
    selector: 'app-members',
    templateUrl: './member.component.html',
    styleUrls: ['../Public/theme/common/common.scss', './member.component.scss']
})
export class MemberComponent implements OnInit {

    /**
     * 当前登陆的用户详细信息
     * @type {any}
     */
    userInfo: SettingData

    //当前登录信息
    loginInfo:any

    //左侧菜单数据
    leftMenuData:ILeftData

    //流监听者
    userInfoObj:Subscription
    routeObj:Subscription

    //当前单项菜单
    nowMenu:IMenu

    comMenu:any[]


    constructor(
        public appService: AppService,
        public router: Router,
        public riccioLoadingService: RiccioLoadingService,
        public riccioModalService: RiccioModalService,
        public grMembersService: GrMembersService,
        public loginService: LoginService,
        public activatedRoute: ActivatedRoute,
        public membersService: MemberService,
        private title: Title
    ) {
        this.nowMenu = {
            name:'',
            url:'',
            fonticon:''
        }
        this.comMenu = []
        this.userInfo = this.membersService.getTempUserInfo()
        this.leftMenuData = new LeftData().data
        this.leftMenuData.module = 'common'
        this.userInfoObj = this.membersService.userInfoObj.subscribe(res => {
            this.userInfo = res
            this.resolveUserInfoChange()
        })
        this.routeObj = this.activatedRoute.data.subscribe(res => {
            this.loginInfo = res.info.data
            this.userInfo = { ...res.info.data.user_info }
            this.membersService.setTempUserInfo(this.userInfo)
        })
    }

    ngOnInit() {
        sessionStorage.setItem('loading', 'false')
        this.title.setTitle(window['setting']['sitename'])
        this.getComMenu()
    }
    ngOnDestroy() {
        this.userInfoObj.unsubscribe()
        this.routeObj.unsubscribe()
    }

    /**
     * 处理用户数据变化
     * @author GR-05
     */
    resolveUserInfoChange(){
        this.resolveLeftData({
            title:this.userInfo.name,
            logo:window['setting']['fileurl'] + this.userInfo.thumb
        })
    }

    /**
     * 处理左侧菜单数据
     * @param data 
     * @author GR-05
     */
    resolveLeftData(data:any){
        this.leftMenuData = Object.assign(this.leftMenuData,data)
    }

    /**
     * 监听左侧菜单组件点击事件
     * @param menu 
     * @author GR-05
     */
    fnGetMenu(menu:IMenu){
        this.nowMenu = menu
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
