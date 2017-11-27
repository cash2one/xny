import {
	Component,
	OnInit,
	ViewChild,
	ViewContainerRef,
	ElementRef,
	OnDestroy,
	Input,
	Output,
	EventEmitter
} from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { animations } from '../../../../Public/Animations/index'

import { RiccioPboxService } from '../../../../Public/riccio-pbox/riccio-pbox.service'
import { RiccioNotificationsService } from '../../../../Public/riccio-notifications/riccio-notifications.service'
import { ComPanyData } from './comPanyData'
import { CompanyService } from '../company.service'
import { GrCompanyService } from '../../../services/grCompany/grCompany.service'
import { ConsumeShowDetailConf } from '../consume-show-detail/consume-show-detail.data'
import { ConsumeShowDetailService } from '../consume-show-detail/consume-show-detail.service'
import { RiccioPopDatePickerService } from '../../../../Public/riccio-pop-datePicker/riccio-pop-datePicker.service'
import { DatePickerConfig } from '../../../../Public/riccio-pop-datePicker/riccio-pop-datePicker.data'

@Component({
	selector: 'app-company-consume',
	templateUrl: './company-consume.component.html',
	styleUrls: [
		'../../../Admin.component.scss',
		'../../../pages/page.common.scss',
		'./company-consume.component.scss'
	],

	animations: [
		animations.flyTop
	]
})
export class CompanyConsumeComponent implements OnInit, OnDestroy {
	@ViewChild('typeBtn') typeBtn: ElementRef;
	@ViewChild('startDate') startDate: ElementRef;
	@ViewChild('endDate') endDate: ElementRef;
	@ViewChild('clickTb', { read: ViewContainerRef }) clickTb: ViewContainerRef;
	@ViewChild('datePicker', { read: ElementRef }) datePicker:ElementRef;

	//企业id
	@Input() comId: number
	//单企业还是总
	@Input() type: string
	@Output() backEmit: EventEmitter<any> = new EventEmitter<any>()

	public pboxObj: any
	public datePickObj:any
	// 表格标题
	public consumeTitles: string[]
	//表格loading
	public loadingType: string
	//分页相关
	public pageParam: {
		page: number;
		rows: number;
		total: number;
	}
	//总收支请求参数
	public allRequestParam: {
		type: number;
		time: string[];
	}
	//选项显示
	public requestShow: {
		type: string;
		startDate: string;
		endDate: string;
	}

	//筛选消费类型选项
	public processTypesOp: any[]

	// 消费类型
	public processTypes: any

	//消费记录列表
	public accountList: any[]

	//日期组件入口类型
	public dateType: string

	public sevenClick: boolean
	public monthClick: boolean

	public showDetailData:ConsumeShowDetailConf

	constructor(
		public activatedRoute: ActivatedRoute,
		public router: Router,
		public riccioPboxService: RiccioPboxService,
		private riccioNotificationsService: RiccioNotificationsService,
		private riccioPopDatePickerService:RiccioPopDatePickerService,
		public grCompanyService: GrCompanyService,
		private companyService: CompanyService,
		private consumeShowDetailService:ConsumeShowDetailService
	) {
		this.processTypes = new ComPanyData().processTypes
		this.processTypesOp = new ComPanyData().processTypesOp
		this.pageParam = {
			page: 1,
			rows: 20,
			total: 0
		}
		this.allRequestParam = {
			type: null,
			time: []
		}
		this.requestShow = {
			type: this.processTypesOp[0].name,
			startDate: this.companyService.getNowStart(7),
			endDate: new Date().toLocaleDateString()
		}
		this.accountList = []
		this.loadingType = 'empty'
		this.type = 'one'
	}

	ngOnInit() {
		this.fnRecentSeven()
		this.consumeTitles = this.type == 'one' ? new ComPanyData().titleOneData : new ComPanyData().titleAllData
		this.pboxObj = this.riccioPboxService.getEmit().subscribe(res => {
			this.resolvePbox(res)
		})
		this.datePickObj = this.riccioPopDatePickerService.emitObs.subscribe(res=>{
			this.fnEmitDataPicker(res)
		})
		this.getComAccountLog()
	}

	ngOnDestroy() {
		this.pboxObj ? this.pboxObj.unsubscribe() : {}
		this.datePickObj ? this.datePickObj.unsubscribe() : {}
	}

	/**
	 * 获取企业收支列表
	 * @author GR-05
	 */
	public getComAccountLog() {
		this.loadingType = 'show'
		let data = this.type == 'one' ? { cid: this.comId } :
			(this.allRequestParam.type ? this.allRequestParam : { time: this.allRequestParam.time })
		this.grCompanyService.getCompanyAccountLog({
			page: this.pageParam.page,
			rows: this.pageParam.rows,
			...data
		}).subscribe(res => {
			this.loadingType = 'hide'
			if (res.status === 1) {
				this.accountList = res.data.data
				this.pageParam.total = res.data.total
				if (res.data.total === 0) {
					this.loadingType = 'empty'
				} else {
					this.resolveAccount()
				}
			}
		})
	}

	/**
	   * 处理一下资产数据
	   * @author GR-05
	   */
	public resolveAccount() {
		this.accountList.forEach(account => {
			account['amount_type'] = account.amount > 0 ? true : false
			account['amount'] = account.amount > 0 ? `+ ¥ ${account.amount}` : `- ¥ ${account.amount.toString().replace('-', '')}`
			account['amount_now'] = '¥ ' + account['amount_now']
			account['processWord'] = this.processTypes[account.process_type]
		})
	}

	/**
	  * 处理分页
	  * @param data 
	  * @author GR-05
	  */
	public fnPagination(data: any) {
		this.pageParam.page = data.page
		this.pageParam.rows = data.rows
		this.getComAccountLog()
	}

	public fnBack() {
		this.backEmit.emit(true)
	}

	/**
	   * 显示类别条件
	   * @param el 点击元素
	   * @author GR-05
	   */
	public fnShowTypes(el: any) {
		let position = this.typeBtn.nativeElement.getBoundingClientRect()
		this.riccioPboxService.setSubject({
			genre: 'option',
			el: el,
			position: {
				top: position.top,
				left: position.left,
				width: position.width
			},
			type: 'comConsumeAllType',
			data: this.processTypesOp
		})
	}

	/**
	 * 显示时间选择
	 * @param el 
	 * @author GR-05
	 */
	public fnShowDate(type: string) {
		let position
		let el:ElementRef
		if (type === 'start') {
			position = this.startDate.nativeElement.getBoundingClientRect()
			el = this.startDate
			this.dateType = 'comStartDate'
		} else if (type === 'end') {
			position = this.endDate.nativeElement.getBoundingClientRect()
			el = this.endDate
			this.dateType = 'comEndDate'
		}
        let dateConfig: DatePickerConfig = {
            style: {
                left: position.left,
                top: position.top + position.height,
                width: 400
            },
            type: this.dateType,
            expectClick:el
        }
        this.riccioPopDatePickerService.setDp(dateConfig)
	}

	/**
	   * 处理日期组件回调数据
	   * @param data 
	   * @author GR-05
	   */
	public fnEmitDataPicker(data: any) {
		if (data.type === 'comStartDate') {
			//起始时间
			let flag = this.companyService.compareStartEndDate(data.date.toLocaleDateString(), this.requestShow.endDate)
			if (flag) {
				this.allRequestParam.time[0] = data.date.toLocaleDateString()
				this.requestShow.startDate = this.allRequestParam.time[0]
			} else {
				this.riccioNotificationsService.setSubject({
					text: '起始日期不能晚于结束日期',
					status: 'danger'
				})
			}
		} else if (data.type === 'comEndDate') {
			//结束时间
			let flag = this.companyService.compareStartEndDate(data.date.toLocaleDateString(), new Date().toLocaleDateString())
			let startFlag = this.companyService.compareStartEndDate(this.allRequestParam.time[0], data.date.toLocaleDateString())
			if (flag) {
				if (startFlag) {
					this.allRequestParam.time[1] = this.companyService.getTimeLate(data.date.toLocaleDateString())
					this.requestShow.endDate = new Date(data.date.toLocaleDateString()).toLocaleDateString()
				} else {
					this.riccioNotificationsService.setSubject({
						text: '结束日期不能早于起始日期',
						status: 'danger'
					})
				}
			} else {
				this.riccioNotificationsService.setSubject({
					text: '结束日期不能晚于今天',
					status: 'danger'
				})
			}
		}
		this.riccioPboxService.setSubject({})
	}

	/**
     * 点击最近7天
     * @author GR-05
     */
	public fnRecentSeven() {
		this.sevenClick = true
		this.monthClick = false
		this.resolveRecent(7)
	}

    /**
    * 点击最近30天
    * @author GR-05
    */
	public fnRecentThirty() {
		this.sevenClick = false
		this.monthClick = true
		this.resolveRecent(30)
	}

    /**
     * 最近时间公共部分
     * @param flag 天数
     * @author GR-05
     */
	public resolveRecent(flag: number) {
		this.allRequestParam.time = []
		this.allRequestParam.time.push(this.companyService.getNowStart(flag))
		this.allRequestParam.time.push(this.companyService.getTimeLate(new Date().toLocaleDateString()))
		this.requestShow.startDate = this.allRequestParam.time[0]
		this.requestShow.endDate = new Date().toLocaleDateString()
	}

	/**
     * 处理pbox
     * @param res 
     * @author GR-05
     */
	public resolvePbox(res: any) {
		switch (res.type) {
			case 'comConsumeAllType':
				//类型
				this.resolveTypes(res.data)
				break
		}
	}

	/**
     * 收支类型选择
     * @param data 
     * @author GR-05
     */
	public resolveTypes(data: any) {
		this.allRequestParam.type = data.value
		this.requestShow.type = data.name
	}

	/**
     * 显示详情
     * @param data 
     * @author GR-05
     */
	public fnShowDetail(data: any) {
		this.showDetailData = {
			expectClick: this.clickTb,
			title: '收支明细详情',
			showList: this.resolveDetail(data),
			top: 52
		}
		this.consumeShowDetailService.SetDetailConfSbj(this.showDetailData)
	}

	/**
     * 处理给详情展示数据
     * @param data 记录数据 
     * @author GR-05
     */
    public resolveDetail(data: any): any[] {
        let result = [
            { name: '流水号', value: data['pay_num'] },
            { name: '支付事项', value: data['title'] },
            { name: '日期', value: data['created_at'] },
            { name: '操作类别', value: data['processWord'] },
            { name: '操作人', value: data['username'] },
            { name: '操作金额', value: data['amount'], class: data['amount_type'] },
            { name: '余额', value: data['amount_now'] },
            { name: '用户备注', value: data['user_note'] }
        ]
        return result
    }
}
