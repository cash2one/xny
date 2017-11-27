import { Component, OnInit,OnDestroy,ViewChild,ElementRef } from '@angular/core';
import { Subscription }  from 'rxjs/Subscription'

import { GrAccountServices }		from '../../../services'
import { RiccioPboxService }		from '../../../../../Public/riccio-pbox/riccio-pbox.service'
import { RiccioNotificationsService }		from '../../../../../Public/riccio-notifications/riccio-notifications.service'

import { tableTitle }		from './tableTitle'
import { searchData }		from './searchData'
import { pboxData }			from './pboxData'

@Component({
  selector: 'app-account-main',
  templateUrl: './account-main.component.html',
  styleUrls: ['../../../../../Public/theme/apps-common/common.scss','../../../../../Public/theme/apps-common/table.scss','./account-main.component.scss']
})
export class AccountMainComponent implements OnInit {

    @ViewChild('startDate') startDate: ElementRef;
    @ViewChild('endDate') endDate: ElementRef;

  public tableTitle:string[]

  /**
   * 表单loading效果的标志位
   * @type {string}
   */
  public loadingType:string

	//日期组件入口类型
	public dateType: string

  /**
   * 分页总数
   * @type {number}
   */
  public totalPage:number

  /**
   * 列表数据
   * @type {any[]}
   */
  public accountItem:any[]

    // 最近7天点击
    public sevenClick: boolean
    // 最近一个月点击
    public monthClick: boolean

  /**
   * 检索的字段
   * @type {searchData}
   */
  public searchData:searchData

  public pboxRX$:Subscription

  constructor(
  	public grAccountServices:GrAccountServices,
  	public riccioNotificationsService:RiccioNotificationsService,
  	public riccioPboxService:RiccioPboxService
  ) { 
    this.loadingType = 'show'
    this.totalPage = 0
    this.searchData = new searchData()
  	this.tableTitle = new tableTitle().data
  	this.dateType = ''
  	this.accountItem = []

  	this.pboxRX$ = this.riccioPboxService.getEmit().subscribe(res=>{
  		let type = res['type']
  		if(type==='extra'){
  			this.searchData['extra'] = res['data']['id']
  		}
  	})

  }


  ngOnInit() {
    this.fnRecentThirty()
  	this.fnGetAccountItem()
  }


  ngOnDestroy(){
  	this.pboxRX$.unsubscribe()
  }

  /**
   * @author GR-03
   * @copyright 获取消费记录的函数
   * @param     [param]
   * @return    [return]
   */
  public fnGetAccountItem(page:number|string = 1):void{
  	this.loadingType = 'show'
  	this.grAccountServices.postAdminAccountList({
  		...this.searchData,
      'page':page
  	}).subscribe(res=>{
  		this.loadingType = 'hide'
  		if(res.status==1){

  			this.accountItem = res['data']['data']

  			this.totalPage = res['data']['total']

  			if(this.totalPage===0) this.loadingType = 'empty'

  		}
  	},error=>{
  		throw new Error(error)
  	})
  }

  /**
   * @author GR-03
   * @copyright 接收分页组件
   * @param     [param]
   * @return    [return]
   */
  public fnEmitPage(data:any):void{
  	this.fnGetAccountItem(data['page'])
  }

  /**
   * @author GR-03
   * @copyright 显示pbox组件
   * @param     [param]
   * @return    [return]
   */
  public fnShowPbox(dataEl:any):void{

  	const client = dataEl.getBoundingClientRect()

  	this.riccioPboxService.setSubject({
  		'genre':'option',
  		'el':dataEl,
  		'type':'extra',
  		'position':{
  			'left':client.left,
  			'top':client.top+50,
  			'width':200
  		},
  		'data':new pboxData().data

  	})
  }

	/**
	 * 输入处理
	 * @author GR-05
	 */
	public resolveChargeInput(flag:number) {
	    if (this.searchData && !Number.isNaN(Number(this.searchData.amount[flag]))) {
	        if(this.searchData.amount[flag].toString().replace(/(^\s+)|(\s+$)/g,"").length == 0){
	            this.searchData.amount[flag] = null
	        }else{
	            this.searchData.amount[flag] = Number(this.searchData.amount[flag])
	        }
	    } else {
	        if(this.searchData.amount[flag].toString() == '-' || this.searchData.amount[flag].toString()=='+'){
	            return
	        }else{
	            this.searchData.amount[flag] = null
	        }
	    }
	}

	/**
	 * 显示时间选择
	 * @param el 
	 * @author GR-05
	 */
	public fnShowDate(el: any, type: string) {
	    let position
	    if (type === 'start') {
	        position = this.startDate.nativeElement.getBoundingClientRect()
	        this.dateType = 'incomeStartDate'
	    } else if (type === 'end') {
	        position = this.endDate.nativeElement.getBoundingClientRect()
	        this.dateType = 'incomeEndDate'
	    }
	    this.riccioPboxService.setSubject({
	        'genre': 'other',
	        'el': el,
	        'type': 'incomeDate',
	        'data': {},
	        'position': {
	            'left': position.left,
	            'top': position.top + position.height,
	            'width': 350
	        }
	    })
	}


    /**
     * 获取当天最早
     * @param dateString 1994-06-2 例
     * @author GR-05
     */
    public getTimeFirst(dateString:string):string{
        let date = dateString.replace(/\s/g,'T').replace(/-/g,'/')
        return new Date(new Date(date).getTime()).toLocaleString('chinese',{hour12:false})
    }

    /**
     * 获取当天最晚
     * @param dateString 1994-06-2 例
     * @author GR-05
     */
    public getTimeLate(dateString:string):string{
        let date = dateString.replace(/\s/g,'T').replace(/-/g,'/')
        return new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000 - 1).toLocaleString('chinese',{hour12:false})
    }

    /**
     * 获取时间对比
     * @param start 起始时间
     * @param end 结束时间
     * @author GR-05
     */
    public compareStartEndDate(start:string,end:string):boolean{


        let startDate = Date.parse(start)
        let endDate = Date.parse(end)
        
        return startDate - endDate <= 0
    }

    /**
     * 处理日期组件回调数据
     * @param data 
     * @author GR-05
     */
    public fnEmitDataPicker(data: any) {
        let tempDate = data.TimeShow?data.date.toLocaleString('chinese',{hour12:false}):this.getTimeFirst(data.date.toLocaleDateString())
        if (data.type === 'incomeStartDate') {
            //起始时间
            this.searchData.time[0] = tempDate
        } else if (data.type === 'incomeEndDate') {
            //结束时间
            this.searchData.time[1] = tempDate
        }
        this.riccioPboxService.setSubject({})
    }

    /**
     * 获取最近几天始日期
     * @author GR-05
     */
    public getNowStart(flag:number):string {
        let result: Date
        let now = Date.parse(new Date().toString())
        let para = 1000 * 60 * 60 * 24 * flag

        result = new Date(now - para);
        return result.toLocaleString('chinese',{hour12:false})
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
    public resolveRecent(flag:number){
        this.searchData.time = []
        this.searchData.time.push(this.getNowStart(flag))
        this.searchData.time.push(this.getTimeLate(new Date().toLocaleDateString()))
    }

}
