import { Component, OnInit,Input,ElementRef,ViewChild,OnDestroy,Output,EventEmitter } from '@angular/core'
import { Subscription }		from 'rxjs/Subscription'

import { RiccioPboxService }		from '@gr-public/riccio-pbox/riccio-pbox.service'
import { RiccioNotificationsService }    from '@gr-public/riccio-notifications/riccio-notifications.service'

import { searchData }		from './searchData'

@Component({
  selector: 'app-ruanwen-list-header',
  templateUrl: './ruanwen-list-header.component.html',
  styleUrls: ['../../../../Public/theme/apps-common/common.scss','./ruanwen-list-header.component.scss']
})
export class RuanwenListHeaderComponent implements OnInit {

  @ViewChild('statusEl')  public statusEl:ElementRef
  @ViewChild('startEl')  public startEl:ElementRef
  @ViewChild('endEl')  public endEl:ElementRef
  @Input() public header:string //头部左侧的标题
  @Input() public btnText:string //头部右侧按钮的名称
  @Input() public searchTitle:string //中间部分搜索字段的标题
  @Input() public statusTitle:string //发布状态的时候需要显示的文本提示
  @Input() public statusValue:any[] //点击发布状态时候需要显示的数组数据，需要包含字段name
  @Input() public config:string  //根据配置项选择显示哪个版本

  @Output() public emitSearch:EventEmitter<searchData>   //返回搜索的对象
  @Output() public emitBtn:EventEmitter<boolean>   //返回点击右上角按钮的事件 | true

  /**
   * 最终需要向父级传递的搜索数据对象
   * @type {searchData}
   */
  public searchData:searchData

  /**
   * 状态的input需要显示的文本内容
   * @type {string}
   */
  public statusName:string

  /**
   * 时间选择组件的标志位
   * @type {string}
   */
  public dateType:string

  /**
   * pbox组件的可订阅对象数据
   * @type {Subscription}
   */
  public pboxRX$:Subscription

  /**
   * 存储开始时间和结束时间的对象
   * @type {any}
   */
  public dateTime:any

  constructor(
  	public riccioPboxService:RiccioPboxService,
    public riccioNotificationsService:RiccioNotificationsService
  ) {
    this.dateType = 'start'
    this.emitSearch = new EventEmitter<searchData>()
  	this.emitBtn = new EventEmitter<boolean>()
  	this.searchData = new searchData()
  	this.header = '列表'
  	this.btnText = ''
  	this.searchTitle = '标题内容'
  	this.statusTitle = '状态'
  	this.statusValue = []
  	this.statusName = ''
    this.config = 'full'
    this.dateTime = {
      'start':0,
      'end':0
    }

  	this.pboxRX$ = this.riccioPboxService.getEmit().subscribe(res=>{
  		let type = res['type']
  		switch (type) {
  			case "status":
  				this.statusName = res['data']['name']
	  			this.searchData['status'] = res['data']['id']
  				break

  			default:break
  		}

  	})

  }

  ngOnInit() {
  }

  ngOnDestroy(){
  	this.pboxRX$.unsubscribe()
  }	

  /**
   * @author GR-03
   * @copyright 需要显示的对应的pbox组件数据
   * @param     [param]
   * @return    [return]
   * @param     {ElementRef} dataEl [description]
   * @param     {MouseEvent} event  [description]
   */
  public fnShowPbox(dataEl:ElementRef,event:MouseEvent):void{
  	let client = this.getClient(this.statusEl)

  	if(this.statusValue.length>0){
	  	this.riccioPboxService.setSubject({
	  		'genre':'option',
	  		'el':dataEl,
	  		'type':'status',
	  		'data':this.statusValue,
	  		'position':{
	  			'left':client.left,
	  			'top':client.top+50,
	  			'width':160
	  		}
	  	})
  	}

  }

  public fnShowDataPickers(type:string,dataEl:ElementRef):void{

  	let startClient = this.getClient(this.startEl)
  	let endClient = this.getClient(this.endEl)

    this.dateType = type

  	switch (type) {
  		case "start":
  			this.riccioPboxService.setSubject({
		  		'genre':'other',
		  		'el':dataEl,
		  		'type':'start',
		  		'data':{},
		  		'position':{
		  			'left':startClient.left-2,
		  			'top':startClient.top+50,
		  			'width':350
		  		}
		  	})
  			break
  		
  		case "end":
  			this.riccioPboxService.setSubject({
		  		'genre':'other',
		  		'el':dataEl,
		  		'type':'end',
		  		'data':{},
		  		'position':{
		  			'left':endClient.left-2,
		  			'top':endClient.top+50,
		  			'width':350
		  		}
		  	})
  			break

  		default:break
  	}

  }


  /**
   * @author GR-03
   * @copyright 点击搜索时返回searchData数据给父级
   * @param     [param]
   * @return    [return]
   */
  public fnEmitSearchData():void{
  	this.emitSearch.emit(this.searchData)
  }

  /**
   * @author GR-03
   * @copyright 点击右上角的按钮返回时间
   * @param     [param]
   * @return    [return]
   */
  public fnEmitBtn():void{
    this.emitBtn.emit(true)
  }

  /**
   * @author GR-03
   * @copyright 获取某个元素相对于浏览器的位置和边距
   * @param     [param]
   * @return    [return]
   * @param     {ElementRef} client [description]
   */
  public getClient(client:ElementRef):ClientRect{

  	return client.nativeElement.getBoundingClientRect()

  }


  /**
   * @author GR-03
   * @copyright 接受选择时间组件的方法
   * @param     [param]
   * @return    [return]
   * @param     {any}       data [description]
   */
  public fnEmitDataPicker(data:any):void{

    if(data['date']==''){
      let type = data['type']
      if(type==='start'){
        this.searchData['start'] = ''
        this.dateTime['start'] = 0
      }else if(type==='end'){
        this.searchData['end'] = ''
        this.dateTime['end'] = 0
      }

      this.riccioPboxService.setSubject({})
    }else {
      let dataTime = data['date'].getTime()
      let type = data['type']
      if(type==='start'){
        this.searchData['start'] = this.handleTime(dataTime)
        this.dateTime['start'] = dataTime
      }else if(type==='end'){
        this.searchData['end'] = this.handleTime(dataTime)
        this.dateTime['end'] = dataTime
      }

      this.handleDateTimeThan(type)

    }

    console.log(this.dateTime)

  }

  /**
   * @author GR-03
   * @copyright 处理开始时间和结束时间的函数
   * @param     [param]
   * @return    [return]
   */
  public handleDateTimeThan(type:string):void{
    
    if(this.dateTime['start']!=0&&this.dateTime['end']!=0){

      if(this.dateTime['start']>this.dateTime['end']){
        this.riccioNotificationsService.setSubject({text:'开始时间不能大于结束时间',status:'danger'})
        this.searchData[type] = ''
      }else {
        this.riccioPboxService.setSubject({})
      }

    }else {
      this.riccioPboxService.setSubject({})
    }

  }

  /**
   * @author GR-03
   * @copyright 清空搜索条件
   * @param     [param]
   * @return    [return]
   */
  public fnRemoveSearch():void{
    this.statusName = ''
    this.searchData = new searchData()
    this.emitSearch.emit(this.searchData)
  }


  /**
   * @author GR-03
   * @copyright 处理时间搓的方法
   * @param     [param]
   * @return    [return]
   */
  public handleTime(time:string):string{

    let _time = new Date(time)

    let Y = _time.getFullYear() + '-'
    let M = (_time.getMonth()+1 < 10 ? '0'+(_time.getMonth()+1) : _time.getMonth()+1) + '-'
    let D = (_time.getDate()<10 ? '0' + _time.getDate() : _time.getDate()) + ' '
    let h = (_time.getHours()<10 ? '0' + _time.getHours() : _time.getHours()) + ':'
    let m = (_time.getMinutes()<10 ? '0' + _time.getMinutes() : _time.getMinutes()) + ':'
    let s = (_time.getSeconds()<10 ? '0' + _time.getSeconds() : _time.getSeconds())

    return Y+M+D+h+m+s

  }

}
