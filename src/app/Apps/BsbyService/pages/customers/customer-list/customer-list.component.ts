import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    ElementRef,
    ViewContainerRef
} from '@angular/core'
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'

import { RiccioPboxService } from '@gr-public/riccio-pbox/riccio-pbox.service'
import { RiccioLoadingService } from '@gr-public/riccio-loading/riccio-loading.service'
import { RiccioModalService } from '@gr-public/riccio-modal/riccio-modal.service'

import { CustomerListData, CustomerListRequestParam } from './customer-list.data'
import { BsbyService } from '../../../bsbyService.service'
import { PageData } from '../../../bsbyService.data'
import { GrCustomerService } from '../../../services/grManagement/grCustomer.service'
import { GrSiteService } from '../../../services/grManagement/grSite.service'
import { ShowDetailService } from '../../../common/show-detail/show-detail.service'
import { ShowDetailConf } from '../../../common/show-detail/show-detail.data'
import { SiteOpService } from '../../../common/site-op/site-op.service'
import { OpTypes,IConf } from '../../../common/site-op/site-op.data'

import { CustomerOpService } from '../../../common/customer-op/customer-op.service'
import { CustomerOpTypes,ICustomerConf } from '../../../common/customer-op/customer-op.data'

import { GrDateToolService } from '../../../../../ApiServices/grDateTool/dateTool.service'


@Component({
    selector: 'app-bsby-service-customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls: [
        '../../../../../Public/theme/apps-common/common.scss',
        '../../../../../Public/theme/apps-common/table.scss',
        '../../../../BsbyService/bsbyService.common.scss',
        './customer-list.component.scss'
    ]
})
export class CustomerListComponent implements OnInit, OnDestroy {
    @ViewChild('sortBtn') sortBtn: ElementRef;
    @ViewChild('detailTB', { read: ViewContainerRef }) detailTB: ViewContainerRef;

    //表头
    public customerListTitles: any[]
    //客户列表
    public customerList: any[]
    //客户列表请求参数
    public customerListRequestParam: CustomerListRequestParam
    //表格loading 显示类型
    public loadingType: string
    //显示详情数据
    public showDetailData: ShowDetailConf
    //监听操作客户流
    public customerOpObj: Subscription
    //监听操作网站组件viewinit
    public siteViewInitObj:Subscription
    //监听操作网站成功
    public siteOpObj:Subscription
    //监听操作客户组件viewinit
    public customerViewInitObj:Subscription
    //监听pbox
    public pboxObj:Subscription
    //监听modal
    public modalObj:Subscription
    //监听关闭操作客户组件
    public customerOpCloseObj:Subscription
    //排序名称
    public rangeName:string

    //活动中的客户信息
    public activeCustomer:any

    //分页相关数据
    pageData: PageData
    //modal类型
    modalType:string

    constructor(
        private bsbyService: BsbyService,
        private riccioPboxService: RiccioPboxService,
        private riccioLoadingService: RiccioLoadingService,
        private grCustomerService: GrCustomerService,
        private grSiteService:GrSiteService,
        private customerOpService: CustomerOpService,
        private showDetailService: ShowDetailService,
        private router: Router,
        private grDateToolService:GrDateToolService,
        private riccioModalService:RiccioModalService,
        private siteOpService:SiteOpService
    ) {
        this.customerListTitles = new CustomerListData().customerListTitle
        this.customerListRequestParam = new CustomerListRequestParam()
        this.loadingType = 'show'
        this.pageData = new PageData()
    }

    ngOnInit() {
        this.getCustomerList()
        this.resolveCustomerOpEmit()
        this.pboxObj = this.riccioPboxService.getEmit().subscribe(res=>{
            this.resolvePbox(res)
        })
        this.modalObj = this.riccioModalService.getEmit().subscribe(res => {
            if(res.type == 'close'){
                this.modalType = ''
                this.siteViewInitObj ? this.siteViewInitObj.unsubscribe() : {}
                this.customerViewInitObj ? this.customerViewInitObj.unsubscribe() : {}
            }
        })
        this.siteOpObj = this.siteOpService.emitObs.subscribe(res => {
            this.resolveSiteOpObj(res)
        })
        this.customerOpCloseObj = this.customerOpService.closeObs.subscribe(res => {
            this.showDetailService.setClick()
        })
    }

    ngOnDestroy() {
        this.customerOpObj ? this.customerOpObj.unsubscribe() : {}
        this.pboxObj ? this.pboxObj.unsubscribe() : {}
        this.siteOpObj ? this.siteOpObj.unsubscribe() : {}
        this.customerOpCloseObj ? this.customerOpCloseObj.unsubscribe() : {}
    }

    /**
     * 监听处理pbox
     * @param res
     * @author GR-05 
     */
    public resolvePbox(res:any){
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
     * 获取客户列表
     * @author GR-05
     */
    public getCustomerList() {
        this.loadingType = 'show'
        this.grCustomerService.getCustomerList({
            page: this.pageData.page,
            rows: this.pageData.rows,
            ...this.customerListRequestParam
        }).subscribe(res => {
            this.loadingType = 'hide'
            if (res.status === 1) {
                this.customerList = this.resolveComList(res.data.data)
                this.pageData.total = res.data.total
                res.data.total == 0 ? this.loadingType = 'empty' : {}
            }
        })
    }

    /**
     * 处理获取的客户列表
     * @param list 响应
     * @author GR-05
     */
    public resolveComList(list: any[]): any[] {
        let tempList = []
        list.forEach(item => {
            tempList.push(item)
            if (item.site.length >= 1) {
                item.site.forEach(site => {
                    site['cname'] = item['name']
                    site['starttime'] ? site['starttime'] = this.bsbyService.resolveDate(site['starttime']) : {}
                    site['endtime'] ? site['endtime'] = this.bsbyService.resolveDate(site['endtime']) : {}
                    if(this.grDateToolService.compareStartEndDate(new Date().toString(),site['endtime'])){
                        site['stilltime'] = this.grDateToolService.stillDate(site['starttime'],new Date().toString())
                    }else{
                        site['stilltime'] = this.grDateToolService.stillDate(site['starttime'],site['endtime'])
                    }
                    site['amounttime'] = this.grDateToolService.stillDate(site['starttime'],site['endtime'])
                })
                let temp = JSON.parse(JSON.stringify(item.site))
                temp.splice(0, 1)
                tempList = tempList.concat(temp)
            }
        })
        return tempList
    }

    /**
     * 显示添加客户组件
     * @author GR-05
     */
    public fnAddCustomer() {
        this.customerOpService.setCOp({
            type:CustomerOpTypes.ADD
        })
    }

    /**
     * 监听编辑或添加客户结果
     * @author GR-05
     */
    public resolveCustomerOpEmit() {
        this.customerOpObj = this.customerOpService.emitObs.subscribe(res => {
            if (res) {
                //添加或编辑客户成功
                this.getCustomerList()
                if(this.activeCustomer){
                    //编辑模式下
                    this.fnShowDetail(this.activeCustomer)
                }
            }
        })
    }

    /**
     * 显示详情组件
     * @param customer 客户数据
     */
    public fnShowDetail(customer: any) {
        this.riccioLoadingService.setLoading({
            message: '获取客户信息中'
        })
        this.activeCustomer = customer
        this.grCustomerService.getCustomerInfo({
            cid: customer['cid']
        }).subscribe(res => {
            this.riccioLoadingService.closeLoading()
            if (res.status === 1) {
                this.showDetailData = {
                    expectClick: this.detailTB,
                    title: customer['name'],
                    showList: this.resolveDetail(res.data),
                    activeList: res.data,
                    headBtn: true
                }
                this.showDetailService.SetDetailConfSbj(this.showDetailData)
            }
        })
    }

    /**
     * 处理给详情展示数据
     * @param data 客户数据 
     */
    public resolveDetail(data: any): any[] {
        let company = data['company_info']
        let user = data['user_info']
        let result = [
            {
                title: '企业信息',
                data: [
                    { name: '企业ID', value: company['id'] },
                    { name: '企业认证', value: company['is_auth'] == 1 ? '已认证' : '未认证' },
                    { name: '企业行业', value: company['industry_data']['name'] },
                    { name: '企业规模', value: company['scale_data']['name'] },
                    {
                        name: '企业地址',
                        value: company['location_data'] ? `${company['location_data']['province']['name']} 
                                ${company['location_data']['city']['name']} 
                                 ${company['location_data']['area']['name']}` : ''
                    }
                ]
            },
            {
                title: '企业负责人信息',
                data: [
                    { name: '用户头像', value: user['thumb'], img: true },
                    { name: '用户姓名', value: user['real_name'] },
                    { name: '用户名称', value: user['name'] },
                    { name: '手机', value: user['mobile'] },
                    { name: 'qq', value: user['qq'] },
                    { name: '邮箱', value: user['email'] },
                    { name: '性别', value: user['sex'] == 1 ? '男' : '女' }
                ]
            }
        ]
        return result
    }

    /**
     * 添加还是编辑客户
     * @param e 详情组件数据
     */
    fnEditOrAdd(e: {
        flag: number,
        main: any,
        event: any
    }) {
        if (e.flag === 1) {
            //编辑
            this.customerOpService.setCOp({
                type: CustomerOpTypes.EDIT,
                data: e.main
            })
        }
    }

    /**
     * 网站管理
     * @param customer  
     * @author GR-05
     */
    public fnToInfo(customer: any) {
        this.bsbyService.setSiteRouteInfo({
            siteId: customer.id
        })
        this.riccioLoadingService.setLoading({
            message:'获取网站详情中'
        })
        this.grSiteService.getSiteInfo({
            id:customer.id
        }).subscribe(res=>{
            this.riccioLoadingService.closeLoading()
            if(res.status === 1){
                this.bsbyService.setTempSiteInfo(res.data)
                this.router.navigate(['BsbyService/site/info', customer.id])
            }
        })
    }

    /**
     * 处理分页
     * @author GR-05
     */
    public fnPagination(page: any) {
        this.pageData.page = page.page
        this.pageData.rows = page.rows
        this.getCustomerList()
    }

    /**
     * 显示添加网站组件
     * @author GR-05
     */
    public fnAddSite(com:any) {
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
                type:OpTypes.ADDFORCOM,
                data:com
             })
        })
    }
}