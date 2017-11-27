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

import { RiccioPopDatePickerService } from '@gr-public/riccio-pop-datePicker/riccio-pop-datePicker.service'
import { RiccioNotificationsService } from '@gr-public/riccio-notifications/riccio-notifications.service'
import { RiccioBrowseService } from '@gr-public/riccio-browse/riccio-browse.service'
import { DatePickerConfig } from '@gr-public/riccio-pop-datePicker/riccio-pop-datePicker.data'

import { KeywordDetailData, SearchParam } from './keyword-detail.data'
import { PageData } from '../../../../bsbyService.data'
import { GrKeywordService } from '../../../../services/grManagement/grKeyword.service'
import { BsbyService } from '../../../../bsbyService.service'
import { GrDateToolService } from '../../../../../../ApiServices/grDateTool/dateTool.service'

@Component({
    selector: 'app-bsby-service-site-keyword-detail',
    templateUrl: './keyword-detail.component.html',
    styleUrls: [
        '../../../../../../Public/theme/apps-common/common.scss',
        '../../../../../../Public/theme/apps-common/table.scss',
        '../../../../../BsbyService/bsbyService.common.scss',
        '../keywords.component.scss',
        './keyword-detail.component.scss'
    ]
})
export class KeywordDetailComponent implements OnInit, OnDestroy {

    //控件
    @ViewChild('startDateDiv') startDateDiv: ElementRef;
    @ViewChild('endDateDiv') endDateDiv: ElementRef;

    //路由监听
    public routeObj: Subscription
    //日期组件监听
    public datePickObj: Subscription
    //表头
    public keywordDetailTitles: string[]
    //网站id
    public siteId: number
    //关键词明细列表
    public keywordList: any
    // loading
    public loadingType: string

    // 分页相关
    public pageData: PageData
    //搜索参数
    public searchParam: SearchParam

    constructor(
        private riccioPopDatePickerService: RiccioPopDatePickerService,
        private riccioNotificationsService:RiccioNotificationsService,
        private riccioBrowseService:RiccioBrowseService,
        private grKeywordService: GrKeywordService,
        private bsbyService: BsbyService,
        private grDateToolService:GrDateToolService,
        private route: ActivatedRoute
    ) {
        this.keywordDetailTitles = new KeywordDetailData().keywordDetailTitles
        this.pageData = new PageData()
        this.searchParam = new SearchParam()
    }

    ngOnInit() {
        this.siteId = this.bsbyService.siteInfo.siteId
        this.routeObj = this.route.params.subscribe(v => {
            if (v.name == 'all') {
                this.searchParam.name = ''
            } else {
                this.searchParam.name = v.name
            }
        })
        this.datePickObj = this.riccioPopDatePickerService.emitObs.subscribe(res => {
            this.resolveDate(res)
        })
        this.getkeywordDetailList()
    }

    ngOnDestroy() {
        this.datePickObj ? this.datePickObj.unsubscribe() : {}
    }

    /**
     * 获取关键词明细列表
     * @author GR-05
     */
    public getkeywordDetailList() {
        this.loadingType = 'show'
        this.grKeywordService.postKeywordLog({
            site_id: this.siteId,
            page: this.pageData.page,
            rows: this.pageData.rows,
            ...this.searchParam
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
     * 显示时间选择组件
     * @param type 
     * @param el 
     * @author GR-05 
     */
    public fnShowDate(type: string) {
        let dateType: string
        let position: any
        let expectClick: ElementRef
        let date: Date
        switch (type) {
            case 'start':
                dateType = 'keywordDetailStart'
                position = this.startDateDiv.nativeElement.getBoundingClientRect()
                expectClick = this.startDateDiv
                this.searchParam.time[0] ? date = new Date(this.searchParam.time[0]) : {}
                break
            case 'end':
                dateType = 'keywordDetailEnd'
                position = this.endDateDiv.nativeElement.getBoundingClientRect()
                expectClick = this.endDateDiv
                this.searchParam.time[1] ? date = new Date(this.searchParam.time[1]) : {}
                break
        }
        let dateConfig: DatePickerConfig = {
            style: {
                left: position.left,
                top: position.top + position.height,
                width: 400
            },
            date: date,
            type: dateType,
            expectClick: expectClick
        }
        this.riccioPopDatePickerService.setDp(dateConfig)
    }

    /**
     * 处理日期组件选择
     * @param res 
     * @author GR-05 
     */
    public resolveDate(res: any) {
        !this.searchParam.time ? this.searchParam.time = [] : {}
        switch (res.type) {
            case 'keywordDetailStart':
                if(res.date != ''){
                    let dateString = (res.date as Date).toLocaleDateString()
                    if(this.searchParam.time[1]){
                        if(this.grDateToolService.compareStartEndDate(dateString,this.searchParam.time[1])){
                            this.searchParam.time[0] = dateString
                        }else{
                            this.riccioNotificationsService.setSubject({
                                text:'起始日期不要晚于结束日期',
                                status:'danger'
                            })
                        }
                    }else{
                        this.searchParam.time[0] = dateString
                    }
                }else{
                    this.searchParam.time[0] = null
                }
                break
            case 'keywordDetailEnd':
                if(res.date != ''){
                    let dateString = (res.date as Date).toLocaleDateString()
                    if(this.searchParam.time[0]){
                        if(this.grDateToolService.compareStartEndDate(this.searchParam.time[0],dateString)){
                            this.searchParam.time[1] = dateString
                        }else{
                            this.riccioNotificationsService.setSubject({
                                text:'结束日期不要早于起始日期',
                                status:'danger'
                            })
                        }
                    }else{
                        this.searchParam.time[1] = dateString
                    }
                }else{
                    this.searchParam.time[1] = null
                }
                break
        }
    }

    /**
     * 处理分页
     * @param page 
     * @author GR-05 
     */
    public fnPagination(page: any) {
        this.pageData.page = page.page
        this.pageData.rows = page.rows
        this.getkeywordDetailList()
    }

    /**
     * 显示图片
     * @param src 
     * @author GR-05 
     */
    public showImg(src:string){
        this.riccioBrowseService.setSubject({
            src:window['setting']['fileurl'] + src
        })
    }
}