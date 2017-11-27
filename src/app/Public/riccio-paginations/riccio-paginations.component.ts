import { Component, OnInit,Input,ElementRef,OnChanges,SimpleChanges,ViewChild,OnDestroy,Output, EventEmitter } from '@angular/core';
import { Subscription }  from 'rxjs/Subscription'

import { RiccioPaginationsService }		from './riccio-paginations.service'
import { RiccioPboxService }		from '../riccio-pbox/riccio-pbox.service'


@Component({
  selector: 'app-riccio-paginations',
  templateUrl: './riccio-paginations.component.html',
  styleUrls: ['./riccio-paginations.component.scss']
})
export class RiccioPaginationsComponent implements OnInit {
  
  @ViewChild('pboxLine')  public pboxLine:ElementRef

  @Input() public parentText:any      //上一页显示的文字
  @Input() public nextText:any        //下一页显示的文字
  @Input() public total:any           //数据的总数,必传
  @Input() public limit?:any          //每一页显示的行数
  @Input() public pboxData?:any[]       //显示每一页有多少条行数可选择,需要传纯数字数组或纯字符串数字数组
  @Input() public page:number

  /**
   * @author GR-03
   * @copyright 返回的页数
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  @Output() public pageValue:EventEmitter<any>

  /**
   * 订阅pbox的可观察对象
   * @type {Subscription}
   */
  public pboxRX$:Subscription

  /**
   * 行数的范围,左侧
   * @type {[type]}
   */
  public limitTextLeft:any

  /**
   * 行数的范围,右侧
   * @type {[type]}
   */
  public limitTextRight:any

  constructor(
  	public riccioPaginationsService:RiccioPaginationsService,
  	public riccioPboxService:RiccioPboxService
  ) { 
    this.page = 1
    this.pageValue = new EventEmitter<any>()

  	/**
  	 * @author GR-03
  	 * @copyright 订阅pbox发射回来的数据流
  	 * @param     [param]
  	 * @return    [return]
  	 * @check     GR-05       GR-03
  	 * @param     {[type]}    ).subscribe(res=>{  	} [description]
  	 */
  	this.pboxRX$ = this.riccioPboxService.getEmit().subscribe(res=>{
  		if(res['type']==='line'){
	  		this.limit = res['data']['name']
        this.page = 1
        this.pageChangeLimitText()
        this.emitPageValue()
  		}
  	})
  }

  ngOnInit() {
    this.limit = this.limit?this.limit:'20'
    this.limitTextLeft = '1'
    this.limitTextRight = this.total<this.limit?this.total:this.limit
    this.pboxData = this.pboxData?this.pboxData:[20,50,100]

    this.total = this.total?this.total:0
    this.pageChangeLimitText()
  }

  ngOnChanges(change:SimpleChanges){
    this.page = this.page?this.page:1
    if(change['total']&&change['total']['firstChange']===false){
      this.pageChangeLimitText()
    }
  }

  ngOnDestroy(){
  	this.pboxRX$.unsubscribe()
  }

  /**
   * @author GR-03
   * @copyright 点击显示每一页显示多少条行数的pbox组件
   * @param     [param]
   * @return    [return]
   * @check     GR-05        GR-03
   * @param     {MouseEvent} event   [description]
   * @param     {ElementRef} dataEle [description]
   */
  public fnShowPbox(event:MouseEvent,dataEle:ElementRef):void{
  	if(this.pboxData.length>0){
  		let clientPosition = this.pboxLine.nativeElement.getBoundingClientRect()
  		let arr = []
  		this.pboxData.map(e=>{
  			arr.push({'name':e})
  		})

  		this.riccioPboxService.setSubject({
  			'genre':'option',
  			'data':[...arr],
  			'el':dataEle,
  			'type':'line',
  			'position':{
  				left:clientPosition.left,
  				top:clientPosition.top-150,
  				width:65
  			}
  		})
  	}
  }

  /**
   * @author GR-03
   * @copyright 点击上一页
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public fnParent():void{
    if(this.page>1){
      this.page--
      this.pageChangeLimitText()
      this.emitPageValue()
    }
  }

  /**
   * @author GR-03
   * @copyright 点击下一页
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public fnNext():void{
    this.page++
    this.pageChangeLimitText()
    this.emitPageValue()
  }

  /**
   * @author GR-03
   * @copyright 根据page的变化改变范围
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public pageChangeLimitText():void{
    this.total<=0
    ?(()=>{
      this.limitTextLeft = 0
      this.limitTextRight = 0
    })()
    :(()=>{
      if(this.limit*this.page>=this.total) this.page = Math.ceil(this.total/this.limit)
      
      this.limitTextRight = this.limit * this.page
      let right = this.limitTextRight
      this.limitTextLeft = right - this.limit + 1

      if(this.limitTextRight>this.total) this.limitTextRight = this.total

    })()

  }

  /**
   * @author GR-03
   * @copyright 返回page页数的事件
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public emitPageValue():void{
    if(this.total>0){
      this.pageValue.emit({
        'page':+this.page,
        'rows':this.limit
      }) 
    }
  }

}
