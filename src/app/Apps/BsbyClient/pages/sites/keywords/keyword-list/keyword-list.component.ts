import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    ViewContainerRef,
    ElementRef
} from '@angular/core'
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'

import { RiccioPboxService } from '@gr-public/riccio-pbox/riccio-pbox.service'
import { RiccioLoadingService } from '@gr-public/riccio-loading/riccio-loading.service'
import { RiccioNotificationsService } from '@gr-public/riccio-notifications/riccio-notifications.service'

import { KeywordListData, SearchParam, SearchShow } from './keyword-list.data'
import { PageData } from '../../../../bsbyClient.data'
import { GrKeywordService } from '../../../../services/grManagement/grKeyword.service'
import { SitesService } from '../../sites.service'
import { BsbyService } from '../../../../bsbyClient.service'
import { KeywordChartService } from '../../components/keyword-chart/keyword-chart.service'

@Component({
    selector: 'app-bsby-service-site-keyword-list',
    templateUrl: './keyword-list.component.html',
    styleUrls: [
        '../../../../../../Public/theme/apps-common/common.scss',
        '../../../../../../Public/theme/apps-common/table.scss',
        '../../../../../BsbyClient/bsbyClient.common.scss',
        '../keywords.component.scss',
        './keyword-list.component.scss'
    ]
})
export class KeywordListComponent implements OnInit, OnDestroy {
    /**
     * 几个筛选按钮元素
     */
    @ViewChild('typeBtn') typeBtn: ElementRef;
    @ViewChild('difficultBtn') difficultBtn: ElementRef;
    @ViewChild('statuBtn') statuBtn: ElementRef;

    //路由监听
    public routeObj: Subscription
    // pbox监听
    public pboxObj: Subscription
    //modal监听
    public modalObj: Subscription
    //表头
    public keywordListTitles: string[]
    //网站详情（读取些许信息）
    public siteInfo: any
    //网站id
    public siteId: number
    //获取网站详情loading标示
    public siteLoadingType: string
    //获取关键词列表loading标示
    public keywordLoadingType: string

    //筛选关键词类型数据
    public keywordTypeData: any[]
    //筛选关键词难易数据
    public keywordDifficultData: any[]
    //筛选关键词状态数据
    public keywordStatuData: any[]
    //活动的关键词
    public activeKeyword: any

    //分页相关
    public pageData: PageData
    //搜索参数
    public searchParam: SearchParam
    //搜索参数显示
    public searchShow: SearchShow

    public chartOp: any

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private grKeywordService: GrKeywordService,
        private sitesService: SitesService,
        private bsbyService: BsbyService,
        private keywordChartService: KeywordChartService,
        private riccioPboxService: RiccioPboxService,
        private riccioLoadingService: RiccioLoadingService,
        private riccioNotificationsService: RiccioNotificationsService
    ) {
        this.siteLoadingType = 'show'
        this.keywordLoadingType = 'show'
        this.keywordTypeData = new KeywordListData().keywordTypeData
        this.keywordDifficultData = new KeywordListData().keywordDifficultData
        this.keywordStatuData = new KeywordListData().keywordStatuData
        this.keywordListTitles = new KeywordListData().keywordListTitles
        this.pageData = new PageData()
        this.searchParam = {
            name: ''
        }
        this.searchShow = new SearchShow()
    }

    ngOnInit() {
        this.siteId = this.bsbyService.siteInfo.siteId
        this.siteInfo = this.sitesService.getSiteInfo()
        if (this.siteInfo) {
            this.siteLoadingType = 'hide'
            this.getKeywordList()
        } else {
            this.getSiteInfo()
        }
        this.pboxObj = this.riccioPboxService.getEmit().subscribe(v => {
            this.resolvePbox(v)
        })
    }

    ngOnDestroy() {
        this.pboxObj ? this.pboxObj.unsubscribe : {}
        this.modalObj ? this.modalObj.unsubscribe : {}
    }

    /**
     * 跳转至明细
     * @author GR-05
     */
    public fnGoDetail() {
        this.router.navigate(['../detail', 'all'], { relativeTo: this.activatedRoute })
    }

    /**
     * 获取网站详情（无预加载情况下）
     * @author GR-05
     */
    public getSiteInfo() {
        this.siteLoadingType = 'show'
        this.sitesService.getSiteInfoDynamic(this.siteId).subscribe(res => {
            if (res.status === 1) {
                this.siteLoadingType = 'hide'
                this.siteInfo = res.data
                this.sitesService.setSiteInfo(this.siteInfo)
                this.getKeywordList()
            }
        })
    }

    /**
     * 获取关键词列表(无预加载情况下)
     * @author GR-05
     */
    public getKeywordList() {
        this.keywordLoadingType = 'show'
        this.grKeywordService.getKeywordList({
            site_id: this.siteId,
            page: this.pageData.page,
            rows: this.pageData.rows,
            ...this.searchParam
        }).subscribe(res => {
            this.keywordLoadingType = 'hide'
            if (res.status === 1) {
                this.siteInfo['keywordInfo'] = res.data
                this.pageData.total = res.data.total
                res.data.total == 0 ? this.keywordLoadingType = 'empty' : {}
            }
        })
    }

    /**
     * 处理pbox
     * @param e 
     * @author GR-05
     */
    public resolvePbox(e: any) {
        switch (e.type) {
            case 'keywordRangeType':
                //关键词类型筛选
                this.searchParam.type = e.data.value
                this.searchShow.type = e.data.name
                this.getKeywordList()
                break
            case 'keywordRangeDiff':
                //关键词难易筛选
                this.searchParam.difficult = e.data.value
                this.searchShow.difficult = e.data.name
                this.getKeywordList()
                break
            case 'keywordRangeStatus':
                //关键词状态筛选
                this.searchParam.status = e.data.value
                this.searchShow.status = e.data.name
                this.getKeywordList()
                break
        }
    }

    /**
     * 关键词类型筛选
     * @author GR-05
     */
    public fnRangeType(el: any) {
        this.bsbyService.showPbox(
            this.typeBtn,
            el,
            this.keywordTypeData,
            'keywordRangeType'
        )
    }

    /**
     * 关键词难易筛选
     * @author GR-05
     */
    public fnRangeDiff(el: any) {
        this.bsbyService.showPbox(
            this.difficultBtn,
            el,
            this.keywordDifficultData,
            'keywordRangeDiff'
        )
    }

    /**
     * 关键词状态筛选
     * @author GR-05
     */
    public fnRangeStatus(el: any) {
        this.bsbyService.showPbox(
            this.statuBtn,
            el,
            this.keywordStatuData,
            'keywordRangeStatus'
        )
    }

    /**
     * 处理分页
     * @param page 
     * @author GR-05 
     */
    public fnPagination(page: any) {
        this.pageData.page = page.page
        this.pageData.rows = page.rows
        this.getKeywordList()
    }

    /**
     * 显示关键词排名趋势
     * @param name 
     * @author GR-05
     */
    public fnShowChart(keyword: any, time?: string[]) {
        this.activeKeyword = keyword
        this.riccioLoadingService.setLoading({
            message: '获取关键词趋势中'
        })
        this.grKeywordService.postKeywordInfo({
            site_id: this.siteId,
            id: keyword.id,
            time: time ? time : [null, null]
        }).subscribe(res => {
            this.riccioLoadingService.closeLoading()
            if (res.status === 1) {
                this.chartOp = this.keywordChartService.getChartStyleConf({
                    title: '关键词排名报表',
                    legend: ['百度排名', '360排名', '搜狗排名'],
                    xAxis: res.data.date,
                    series: [{
                        name: '百度排名',
                        type: 'line',
                        data: res.data.baidu
                    },
                    {
                        name: '360排名',
                        type: 'line',
                        data: res.data.s360
                    },
                    {
                        name: '搜狗排名',
                        type: 'line',
                        data: res.data.sougou
                    }]
                })
                this.keywordChartService.setkwChartConfig({
                    title: `【${keyword.name}】 关键词排名曲线`,
                    width: 800,
                    height: 400,
                    chartOption: this.chartOp
                })
            }
        })
    }

    /**
     * 搜索趋势
     * @param time 
     * @author GR-05
     */
    public fnSearchChart(time: string[]) {
        if(!time || time[0] == null || time[1] == null){
            this.riccioNotificationsService.setSubject({
                text:'时间选择错误',
                status:'danger'
            })
        }else{
            this.fnShowChart(this.activeKeyword,time)
        }
    }
}