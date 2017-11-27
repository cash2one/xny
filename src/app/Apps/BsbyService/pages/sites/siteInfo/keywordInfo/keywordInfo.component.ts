import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    ViewContainerRef,
    ElementRef,
    Input
} from '@angular/core'
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'

import { keywordInfoData } from './keywordInfo.data'
import { PageData } from '../../../../bsbyService.data'
import { BsbyService } from '../../../../bsbyService.service'
import { GrKeywordService } from '../../../../services/grManagement/grKeyword.service'
import { KeywordChartService } from '../../components/keyword-chart/keyword-chart.service'

import { RiccioLoadingService } from '@gr-public/riccio-loading/riccio-loading.service'
import { RiccioBrowseService } from '@gr-public/riccio-browse/riccio-browse.service'

@Component({
    selector: 'site-keyword-info',
    templateUrl: './keywordInfo.component.html',
    styleUrls: [
        '../../../../../../Public/theme/apps-common/common.scss',
        '../../../../../../Public/theme/apps-common/table.scss',
        // '../../../BsbyService/bsbyService.common.scss',
        './keywordInfo.component.scss'
    ]
})
export class KeywordInfoComponent implements OnInit {

    //表头数据
    public tableTitles: any[]
    //网站id
    public siteId: number
    //关键词列表
    public keywordList: any[]
    //loading
    public loadingType: string

    //分页相关
    public pageData: PageData
    //临时关键词数据
    public activeKeyword:any

    constructor(
        private bsbyService: BsbyService,
        private grKeywordService: GrKeywordService,
        private keywordChartService: KeywordChartService,
        private riccioLoadingService: RiccioLoadingService,
        private riccioBrowseService:RiccioBrowseService
    ) {
        this.tableTitles = new keywordInfoData().listTitles
        this.pageData = new PageData()
    }

    ngOnInit() {
        this.siteId = this.bsbyService.siteInfo.siteId
        this.getKeywordList()
    }

    /**
     * 获取关键词列表
     * @author GR-05
     */
    public getKeywordList() {
        this.loadingType = 'show'
        this.grKeywordService.getKeywordList({
            site_id: this.siteId,
            status: 1,
            page: this.pageData.page,
            rows: this.pageData.rows
        }).subscribe(res => {
            this.loadingType = 'hide'
            if (res.status === 1) {
                this.keywordList = res.data.data
                this.pageData.total = res.data.total
                res.data.total == 0 ? this.loadingType = 'empty' : {}
            }
        })
    }

    /**
     * 分页处理
     * @param page 
     * @author GR-05
     */
    public fnPagination(page: any) {
        this.pageData.page = page.page
        this.pageData.rows = page.rows
        this.getKeywordList()
    }

    /**
     * 显示关键词排名趋势图表
     * @param keyword 
     * @author GR-05
     */
    public fnShowChart(keyword: any,time?:string[]) {
        this.activeKeyword = keyword
        this.riccioLoadingService.setLoading({
            message: '获取关键词排名趋势中'
        })
        this.grKeywordService.postKeywordInfo({
            site_id: this.siteId,
            id: keyword.id,
            time: time?time:[null, null]
        }).subscribe(res=>{
            this.riccioLoadingService.closeLoading()
            if(res.status === 1){
                let chartOp = this.keywordChartService.getChartStyleConf({
                    title:`关键词排名报表`,
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
                    chartOption: chartOp
                })
            }
        })
    }

    /**
     * 搜索趋势
     * @param time 
     * @author GR-05
     */
    public fnSearchChart(time:string[]){
        this.fnShowChart(this.activeKeyword,time)
    }
    
    /**
     * 显示快照
     * @param data 
     * @author GR-05
     */
    public showImg(url:string){
        this.riccioBrowseService.setSubject({
            src:window['setting']['fileurl'] + url
        })
    }
}