import {
	Component,
	OnInit,
	OnDestroy,
	ViewEncapsulation,
	Input,
	ViewChild,
	ElementRef,
	Output,
	EventEmitter
} from '@angular/core'
import { Subscription } from 'rxjs/Subscription'
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations'

import { KeywordChartService } from './keyword-chart.service'
import { KeywordChartConf } from './keyword-chart.data'
import { DatePickerConfig } from '@gr-public/riccio-pop-datePicker/riccio-pop-datePicker.data'

import { GrDateToolService } from '../../../../../../ApiServices/grDateTool/dateTool.service'
import { RiccioPopDatePickerService } from '@gr-public/riccio-pop-datePicker/riccio-pop-datePicker.service'
import { RiccioNotificationsService } from '@gr-public/riccio-notifications/riccio-notifications.service'

let animations = {
	fade: trigger('fade', [
		state('in', style({ opacity: '1' })),
		transition('void => *', [
			animate(150, keyframes([
				style({ opacity: '0', offset: 0 }),
				style({ opacity: '1', offset: 1.0 })
			]))
		]),
		transition('* => void', [
			animate(150, keyframes([
				style({ opacity: '1', offset: 0 }),
				style({ opacity: '0', offset: 1.0 })
			]))
		])
	])
}

@Component({
	selector: 'app-bsby-service-keyword-chart',
	templateUrl: './keyword-chart.component.html',
	styleUrls: [
		'../../../../../../Public/theme/apps-common/common.scss',
		'../../../../bsbyClient.common.scss',
		'./keyword-chart.component.scss'
	],
	animations: [
		animations.fade
	]
})
export class KeywordChartComponent implements OnInit, OnDestroy {
	@ViewChild('startDateDiv') startDateDiv:ElementRef;
	@ViewChild('endDateDiv') endDateDiv:ElementRef;

	//搜索弹出
	@Output() searchEmit:EventEmitter<string[]> = new EventEmitter<string[]>()

	//监听日期组件
	datePickObj:Subscription
	//监听配置项
	kwConfObj: Subscription
	//配置
	kwConf: KeywordChartConf

	isShow: boolean
	//图表实例
	chartInstance: any
	//搜索参数
	searchParam:{
		time:string[]
	}

	constructor(
		private keywordChartService: KeywordChartService,
		private grDateToolService:GrDateToolService,
		private riccioPopDatePickerService:RiccioPopDatePickerService,
		private riccioNotificationsService:RiccioNotificationsService
	) {
		this.kwConf = new KeywordChartConf()
		this.kwConfObj = this.keywordChartService.kwChartConfigObj.subscribe(res => {
			this.kwConf = res
			this.isShow = true
		})
		//默认最近一周
		this.searchParam = {
			time:[
				this.grDateToolService.getNowStart(7).toLocaleDateString(),
				new Date().toLocaleDateString()
			]
		}
	}

	ngOnInit() {
		this.datePickObj = this.riccioPopDatePickerService.emitObs.subscribe(res=>{
			this.resolveDate(res)
		})
	}

	ngOnDestroy() {
		this.kwConfObj.unsubscribe()
		this.datePickObj ? this.datePickObj.unsubscribe() : {}
	}

	onChartInit(chartIns: any) {
		this.chartInstance = chartIns
	}

	fnClose() {
		this.chartInstance ? this.chartInstance.dispose() : {}
		this.isShow = false
		this.kwConf = new KeywordChartConf()
		this.searchParam = {
			time:[
				this.grDateToolService.getNowStart(7).toLocaleDateString(),
				new Date().toLocaleDateString()
			]
		}
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
                dateType = 'keywordChartStart'
                position = this.startDateDiv.nativeElement.getBoundingClientRect()
                expectClick = this.startDateDiv
                this.searchParam.time[0] ? date = new Date(this.searchParam.time[0]) : {}
                break
            case 'end':
                dateType = 'keywordChartEnd'
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
	 * 处理日期选择
	 * @param res 
	 * @author GR-05 
	 */
	resolveDate(res:any){
		!this.searchParam.time ? this.searchParam.time = [] : {}
        switch (res.type) {
            case 'keywordChartStart':
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
            case 'keywordChartEnd':
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
	 * 弹射搜索事件
	 * @author GR-05 
	 */
	fnEmitSearch(){
		this.searchEmit.emit(this.searchParam.time)
	}
}
