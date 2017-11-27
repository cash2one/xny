import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    ViewContainerRef,
    ElementRef,
    QueryList,
    ViewChildren,
    Renderer2
} from '@angular/core'
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'

import { RiccioPboxService } from '@gr-public/riccio-pbox/riccio-pbox.service'
import { RiccioLoadingService } from '@gr-public/riccio-loading/riccio-loading.service'
import { RiccioNotificationsService } from '@gr-public/riccio-notifications/riccio-notifications.service'
import { RiccioPopUpRightService } from '@gr-public/riccio-pop-up-right/riccio-pop-up-right.service'
import { RiccioModalService } from '@gr-public/riccio-modal/riccio-modal.service'

import { SiteListData, SiteListRequestParam } from './site-list.data'
import { PageData } from '../../../../bsbyService.data'
import { SceneOb, PostData } from '../../../../common/scene/scene.data'
import { RoleOpData } from '../role-op/role-op.data'
import { OpTypes } from '../../../../common/site-op/site-op.data'

import { GrSiteService } from '../../../../services/grManagement/grSite.service'
import { GrSceneService } from '../../../../services/grManagement/grScene.service'
import { BsbyService } from '../../../../bsbyService.service'
import { SitesService } from '../../sites.service'
// import { SiteOpService } from '../site-op/site-op.service'
import { SiteOpService } from '../../../../common/site-op/site-op.service'
import { SceneService } from '../../../../common/scene/scene.service'
import { RoleOpService } from '../role-op/role-op.service'


@Component({
    selector: 'app-bsby-service-site-list',
    templateUrl: './site-list.component.html',
    styleUrls: [
        '../../../../../../Public/theme/apps-common/common.scss',
        '../../../../../../Public/theme/apps-common/table.scss',
        '../../../../../BsbyService/bsbyService.common.scss',
        '../../sites.component.scss',
        './site-list.component.scss'
    ]
})
export class SiteListComponent implements OnInit, OnDestroy {
    @ViewChild('sortBtn') sortBtn: ElementRef;
    @ViewChild('findBtn') findBtn: ElementRef;
    @ViewChild('roleMgr') roleMgr: ElementRef;
    @ViewChildren('sceneEditBtn') sceneEditBtns: QueryList<ElementRef>;
    @ViewChild('detailTB', { read: ViewContainerRef }) detailTB: ViewContainerRef;

    //表头
    public siteListTitles: any[]
    //网站列表
    public siteList: any[]
    //网站列表请求参数
    public siteListRequestParam: SiteListRequestParam
    //表格loading 显示类型
    public loadingType: string
    //排序数据
    public siteListSort: any[]
    //监听操作网站流
    public siteOpObj: Subscription
    //监听操作网站组件viewinit
    public siteViewInitObj:Subscription
    //pbox监听
    public pboxObj: Subscription
    //modal监听
    public modalObj:Subscription
    //popup监听
    public popupObj: Subscription
    //切换状态数据
    public siteStatus: any[]
    //处于焦点的网站数据
    public activeSite: any
    public allCheck: boolean

    //场景列表
    public sceneList: any[]
    //场景‘全部按钮’
    public sceneAllBtn: {
        name: string;
        active: boolean
    }
    //显示所有场景操作
    public sceneOp: {
        active: boolean;
        name: string
    }
    //临时存储的场景数据
    public tempScene: any

    //分页相关
    public pageData: PageData
    //排序名称
    public rangeName: string
    //modal类型
    public modalType: string

    //请求网站列表类型
    public siteType: string
    //登录数据
    public userInfo: any


    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private renderer: Renderer2,
        private riccioPboxService: RiccioPboxService,
        private riccioLoadingService: RiccioLoadingService,
        private riccioNotificationsService: RiccioNotificationsService,
        private riccioPopUpRightService: RiccioPopUpRightService,
        private riccioModalService: RiccioModalService,
        private grSiteService: GrSiteService,
        private grSceneService: GrSceneService,
        private bsbyService: BsbyService,
        private sitesService: SitesService,
        private siteOpService: SiteOpService,
        private sceneService: SceneService,
        private roleOpService: RoleOpService
    ) {
        this.siteListTitles = new SiteListData().siteListTitle
        this.siteListRequestParam = new SiteListRequestParam()
        this.siteListSort = new SiteListData().siteListSorter
        this.siteStatus = new SiteListData().siteStatus
        this.pageData = new PageData()
        this.allCheck = false
        this.sceneAllBtn = {
            name: '全部',
            active: true
        }
        this.sceneOp = {
            active: false,
            name: '场景管理'
        }
        this.modalType = ''
        this.route.params.subscribe(res => {
            this.resolveSiteType(res.type)
        })
    }

    ngOnInit() {
        this.getSceneList()
        this.userInfo = this.bsbyService.getUserInfo()
        this.siteOpObj = this.siteOpService.emitObs.subscribe(res => {
            this.resolveSiteOpObj(res)
        })
        this.modalObj = this.riccioModalService.getEmit().subscribe(res =>{
            if(res.type == 'close'){
                this.modalType = ''
                this.siteViewInitObj ? this.siteViewInitObj.unsubscribe() : {}
            }
        })
        this.pboxObj = this.riccioPboxService.getEmit().subscribe(res => {
            this.resolvePbox(res)
        })
        this.popupObj = this.riccioPopUpRightService.getEmit().subscribe(res => {
            this.resolvePopup(res)
        })
    }

    ngOnDestroy() {
        this.siteOpObj ? this.siteOpObj.unsubscribe() : {}
        this.pboxObj ? this.pboxObj.unsubscribe() : {}
        this.popupObj ? this.popupObj.unsubscribe() : {}
    }

    /**
     * 处理网站列表类型
     * @param type 
     * @author GR-05
     */
    public resolveSiteType(type: string) {
        //跳转
        if (!(type == 'my' || type == 'answer' || type == 'mydepartment')) {
            this.router.navigate(['../my'], { relativeTo: this.route })
        } else {
            this.siteType = type
            this.bsbyService.setSiteRouteInfo({
                type: type
            })
            this.getSiteList()
            this.getSceneList()
        }
    }

    /**
     * 处理添加网站结果
     * @param flag 成功、失败
     */
    public resolveSiteOpObj(site_id:number) {
        if (site_id) {
            this.router.navigate([`BsbyService/site/info/${site_id}`])
        }
    }

    /**
     * 获取网站列表
     * @author GR-05
     */
    public getSiteList() {
        this.loadingType = 'show'
        this.grSiteService.getSiteList({
            page: this.pageData.page,
            rows: this.pageData.rows,
            ...this.siteListRequestParam
        }, this.siteType).subscribe(res => {
            this.loadingType = 'hide'
            if (res.status === 1) {
                this.siteList = this.resolveSiteList(res.data.data)
                this.allCheck = false
                this.riccioPopUpRightService.setSubject({})
                this.pageData.total = res.data.total
                res.data.total == 0 ? this.loadingType = 'empty' : {}
            }
        })
    }

    /**
     * 处理网站列表
     * @param siteList 
     * @author GR-05
     */
    public resolveSiteList(siteList: any[]) {
        siteList.forEach(site => {
            site['isCheck'] = false
            site['starttime'] = this.bsbyService.resolveDate(site['starttime'])
            site['endtime'] = this.bsbyService.resolveDate(site['endtime'])
        })
        return siteList
    }

    /**
     * 获取场景列表
     * @author GR-05
     */
    public getSceneList() {
        this.grSceneService.getSceneList({
            action: this.siteType
        }).subscribe(res => {
            if (res.status === 1) {
                this.sceneList = res.data
                this.resolveScenelist()
            }
        })
    }

    /**
     * 处理场景列表
     * @author GR-05
     */
    public resolveScenelist() {
        this.sceneList.forEach(scene => {
            scene['active'] = false
        })
    }

    /**
     * 点击了一个场景
     * @param scene 
     * @author GR-05
     */
    public fnSelectScene(scene: any) {
        this.resolveScenelist()
        scene['active'] = true
        this.sceneAllBtn.active = false
        this.riccioLoadingService.setLoading({
            message: '获取场景条件中'
        })
        this.grSceneService.getSceneInfo(scene['id']).subscribe(res => {
            this.riccioLoadingService.closeLoading()
            if (res.status === 1) {
                this.tempScene = {
                    id: res.data.id,
                    name: res.data.name,
                    ...res.data.field
                }
                this.siteListRequestParam = {
                    listorder: this.siteListRequestParam.listorder,
                    page: this.siteListRequestParam.page,
                    rows: this.siteListRequestParam.rows,
                    ...this.tempScene
                }
                delete this.siteListRequestParam['name']
                this.getSiteList()
            }
        })
    }

    /**
     * 点击’全部场景‘按钮
     * @author GR-05
     */
    public fnAllScene() {
        this.sceneAllBtn.active = true
        this.resolveScenelist()
        this.siteListRequestParam = {
            listorder: this.siteListRequestParam.listorder,
            page: this.siteListRequestParam.page,
            rows: this.siteListRequestParam.rows
        }
        this.getSiteList()
    }

    /**
     * 显示排序条件
     * @param el 点击元素
     * @author GR-05
     */
    public fnShowSort(el: any) {
        let position = this.sortBtn.nativeElement.getBoundingClientRect()
        this.riccioPboxService.setSubject({
            genre: 'option',
            el: el,
            position: {
                top: position.top + this.sortBtn.nativeElement.offsetHeight + 5,
                left: position.left,
                width: 200
            },
            type: 'siteRange',
            data: this.siteListSort
        })
    }

    /**
     * 显示切换状态
     * @param el 点击元素
     * @param e 点击事件
     */
    public fnShowStatus(site: any, el: any, e: MouseEvent) {
        this.activeSite = site
        this.riccioPboxService.setSubject({
            genre: 'option',
            el: el,
            position: {
                top: e.clientY,
                left: e.clientX - 50,
                width: 100
            },
            type: 'siteStatus',
            data: this.siteStatus
        })
    }

    /**
     * 显示添加网站组件
     * @author GR-05
     */
    public fnAddSite() {
        this.modalType = 'siteOp'
        let modalData = {
            header: '添加网站',
            size: 600,
            noBtn: true
        }
        this.riccioModalService.setSubject(modalData)
        //在组件加载完成后调用服务
        this.siteViewInitObj = this.siteOpService.viewInitObs.subscribe(res => {
            this.siteOpService.setSOp({
                type:OpTypes.ADD,
                data:{
                    cid:this.userInfo.company_userinfo.id,
                    name:this.userInfo.company_userinfo.name
                }
             })
        })
    }

    /**
     * 前往网站详情
     * @param site 
     * @author GR-05
     */
    public fnToInfo(site: any) {
        this.bsbyService.setSiteRouteInfo({
            siteId: site.id
        })
        this.riccioLoadingService.setLoading({
            message: '获取网站详情中'
        })
        this.grSiteService.getSiteInfo({
            id: site.id
        }).subscribe(res => {
            this.riccioLoadingService.closeLoading()
            if (res.status === 1) {
                this.sitesService.setSiteInfo(res.data)
                this.router.navigate(['../../info', site.id], { relativeTo: this.route })
            }
        })
    }

    /**
     * 处理pbox
     * @param res 
     * @author GR-05
     */
    public resolvePbox(res: any) {
        switch (res.type) {
            case 'siteStatus':
                //切换状态
                if (res.data.value == 4) {
                    this.showSiteDel()
                } else {
                    this.changeSitesStatus([this.activeSite.id], res.data.value)
                }

                break
            case 'siteRange':
                //筛选排序
                this.resolveRange(res.data)
                break
            case 'siteSceneDel':
                //删除场景
                this.delScene(res.data)
                break
            case 'siteStatusChange':
                //切换网站状态
                this.changeSitesStatus(res.data.ids, res.data.status)
                break

        }
    }

    /**
     * 处理排序条件
     * @param data 
     * @author GR-05
     */
    public resolveRange(data: any) {
        this.rangeName = data.name
        this.siteListRequestParam.listorder = data.value
        this.getSiteList()
    }

    /**
     * 显示删除提示
     * @author GR-05
     */
    public showSiteDel() {
        this.modalType = 'siteDel'
        let modalData = {
            header: '删除网站',
            size: 500,
            noBtn: true
        }
        this.riccioModalService.setSubject(modalData)
    }

    /**
     * 批量设置网站状态
     * @param ids 
     * @author GR-05
     */
    public changeSitesStatus(ids: number[], statu: number) {
        this.riccioLoadingService.setLoading({
            message: '切换状态中'
        })
        this.grSiteService.postSiteStatus({
            id: ids,
            status: statu
        }).subscribe(res => {
            this.riccioLoadingService.closeLoading()
            if (res.status === 1) {
                this.riccioNotificationsService.setSubject({
                    text: '切换成功',
                    status: 'success'
                })
                this.getSiteList()
            }
        })
    }

    /**
     * 处理分页
     * @param page 
     * @author GR-05 
     */
    public fnPagination(page: any) {
        this.pageData.page = page.page
        this.pageData.rows = page.rows
        this.getSiteList()
    }

    public fnCheckAll(flag: boolean) {

    }

    /**
     * 显示场景筛选组件
     * @author GR-05 
     */
    public fnShowScene() {
        let conf: SceneOb = {
            expectClick: this.findBtn,
            type: 'add',
            action: this.siteType
        }
        switch (this.siteType) {
            case 'my':
                conf.showExc = false
                conf.excName = this.userInfo.user_info.real_name
                break
        }
        this.sceneService.setScene(conf)
    }

    /**
     * 场景组件弹射的搜索公司域名请求
     * @param data 
     * @author GR-05
     */
    public fnSearchSite(data: PostData) {
        this.siteListRequestParam = Object.assign(this.siteListRequestParam, data)
        this.getSiteList()
    }

    /**
     * 监听场景组件添加或编辑的结果
     * @param isSuccess 
     * @author GR-05
     */
    public fnEmitScene(event: any) {
        if (event.type == 'add') {
            this.getSceneList()
        } else if (event.type == 'edit') {
            this.tempScene = event.data
        }
    }

    /**
     * 显示所有场景操作
     * @author GR-05
     */
    public fnShowSceneOp() {
        this.sceneOp.active = !this.sceneOp.active
        this.sceneOp.active ? this.sceneOp.name = '取消编辑' : this.sceneOp.name = '场景管理'
    }

    /**
     * 编辑场景
     * @param id 
     * @author GR-05 
     */
    public fnSceneEdit(id: number) {
        let btn: ElementRef
        btn = this.sceneEditBtns.toArray().filter(btn => {
            return btn.nativeElement.getAttribute('id') == id
        })[0]
        let conf: SceneOb = {
            expectClick: btn,
            type: 'edit',
            action: this.siteType
        }
        if (this.tempScene && this.tempScene.id == id) {
            conf.sceneData = this.tempScene
            this.sceneService.setScene(conf)
        } else {
            this.riccioLoadingService.setLoading({
                message: '获取场景条件中'
            })
            this.grSceneService.getSceneInfo(id).subscribe(res => {
                this.riccioLoadingService.closeLoading()
                if (res.status == 1) {
                    conf.sceneData = {
                        id: res.data.id,
                        name: res.data.name,
                        ...res.data.field
                    }
                    this.sceneService.setScene(conf)
                }
            })
        }
    }

    /**
     * 删除场景提示
     * @param id 场景id
     * @param ele 点击元素
     * @author GR-05 
     */
    public fnSceneDel(scene: any, ele: any, e: MouseEvent) {
        this.riccioPboxService.setSubject({
            genre: 'delete',
            el: ele,
            position: {
                left: e.clientX,
                top: e.clientY,
                width: 240
            },
            type: 'siteSceneDel',
            data: {
                title: `确定删除场景 “${scene.name}” ？`,
                button: '删除',
                delID: scene.id
            }
        })
    }

    /**
     * 删除场景
     * @param id 场景id
     * @author GR-05 
     */
    public delScene(id: number) {
        this.riccioLoadingService.setLoading({
            message: '删除场景中'
        })
        this.grSceneService.postSceneDel({
            id: id
        }).subscribe(res => {
            this.riccioLoadingService.closeLoading()
            if (res.status === 1) {
                this.riccioNotificationsService.setSubject({
                    text: '删除成功',
                    status: 'success'
                })
                this.getSceneList()
                if (this.tempScene && id == this.tempScene.id) {
                    this.fnAllScene()
                }
            }
        })
    }

    /**
     * 弹出角色管理组件
     * @author GR-05
     */
    public fnRoleMgr(site?: any) {
        site ? this.activeSite = site : {}
        if (this.activeSite) {
            this.riccioLoadingService.setLoading({
                message: '获取网站成员列表中'
            })
            this.grSiteService.getSiteRoleList({
                site_id: this.activeSite.id
            }).subscribe(res => {
                if (res.status === 1) {
                    let data: RoleOpData = {
                        site_id: this.activeSite.id,
                        roleInfo: res.data,
                        serviceInfo: {
                            service_user: this.activeSite['service_user']
                        }
                    }
                    this.grSiteService.getSiteInfo({
                        id: this.activeSite.id
                    }).subscribe(res => {
                        this.riccioLoadingService.closeLoading()
                        if (res.status === 1) {
                            this.sitesService.setSiteInfo(res.data)
                            data.serviceInfo = {
                                service_user: res.data['service_user']
                            }
                            this.roleOpService.setROp({
                                config: {
                                    expectClick: this.roleMgr
                                },
                                data: data
                            })
                        }
                    })
                }
            })
        }
    }

    /**
     * 显示顶部多选组件
     * @param product 产品数据
     * @param flag 多选单选标示
     * @author GR-05
     */
    public fnShowPopUp(flag: string = "one", site: any = null): void {
        let obj = {
            'data': [...this.siteList],
            'viewText': [
                { id: 1, name: '执行中' },
                { id: 2, name: '已停止' },
                { id: 3, name: '待执行' }
            ]
        }
        if (flag === 'one') {
            site.isCheck = !site.isCheck;
            this.allCheck = this.siteList.filter(e => e['isCheck'] == false).length == 0 ? true : false

        } else if (flag === 'all') {
            this.allCheck = !this.allCheck;
            this.siteList.map(e => e['isCheck'] = this.allCheck)
        }

        this.riccioPopUpRightService.setSubject(obj)
    }

    /**
     * 重置全选单选
     * @author GR-05 
     * 
     */
    public resetCheck() {
        this.allCheck = false
        this.siteList.map(product => product['isCheck'] = false)
    }

    /**
     * 处理popup监听
     * @param res
     * @author GR-05 
     */
    public resolvePopup(res: any) {
        if (res.type === 0) {
            //清空
            this.resetCheck()
        } else {
            let ids = []
            res.data.forEach(v => {
                ids.push(v['id'])
            })
            switch (res.type.id) {
                case 1:
                    //执行中
                    this.showPbox(
                        res.event,
                        '是否将所选网站切换为“执行中”',
                        '切换',
                        ids,
                        1
                    )
                    break
                case 2:
                    //已停止
                    this.showPbox(
                        res.event,
                        '是否将所选网站切换为“已停止”',
                        '切换',
                        ids,
                        2
                    )
                    break
                case 3:
                    //待执行
                    this.showPbox(
                        res.event,
                        '是否将所选网站切换为“待执行”',
                        '切换',
                        ids,
                        3
                    )
                    break
            }
        }
    }

    /**
     * 顶部选项显示pbox
     * @param event 点击事件
     * @param type 标记类型
     * @param title 标题
     * @param btn 按钮文字
     * @param id 操作的id
     * @author GR-05 
     */
    public showPbox(event: MouseEvent, title: string, btn: string, ids: number[], status: number) {
        this.riccioPboxService.setSubject({
            genre: 'delete',
            position: {
                left: event.clientX - 140,
                top: event.clientY,
                width: 280
            },
            type: 'siteStatusChange',
            data: {
                title: title,
                button: btn,
                delID: {
                    status: status,
                    ids: ids
                }
            }
        })
    }

    /**
     * 处理角色操作组件的响应
     * @author GR-05 
     */
    public fnOpRoleEmit() {
        this.fnRoleMgr()
    }

    /**
     * 删除网站成功
     * @author GR-05 
     */
    public delSite(){
        this.getSiteList()
        this.modalType = ''
    }
}