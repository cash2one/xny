import { Component, OnInit,Input,OnChanges,SimpleChanges,Output,EventEmitter } from '@angular/core';

import { tableTitle }		from './tableTitle'
import { numberInfoStatus }		from './numberInfoStatus'

import { GrOrderService }		from '../../services'

@Component({
  selector: 'app-order-write-ruanwen-list',
  templateUrl: './order-write-ruanwen-list.component.html',
  styleUrls: ['../../../../Public/theme/apps-common/common.scss','../../../../Public/theme/apps-common/table.scss','../../ruanwen.component.scss','./order-write-ruanwen-list.component.scss']
})
export class OrderWriteRuanwenListComponent implements OnInit {
  	
  @Input() public writeRuanwenItem:any[]
  @Input() public orderId:number|string
  @Output() public emitData:EventEmitter<any>

  /**
   * 表格标题数据
   * @type {string[]}
   */
  public tableTitle:string[]

  /**
   * 计算头部的资源数字，和总消费金额和发布中个数
   * @type {numberInfoStatus}
   */
  public numberInfoStatus:numberInfoStatus

  constructor(
  	public grOrderService:GrOrderService
  ) { 
  	this.tableTitle = new tableTitle().data
  	this.emitData = new EventEmitter<any>()
  	this.numberInfoStatus = new numberInfoStatus()
  }

  ngOnInit() {
	this.handleNumberStatus(this.writeRuanwenItem)
  }

  ngOnChanges(changes:SimpleChanges){
  	if(changes['writeRuanwenItem']){
      this.handleNumberStatus(this.writeRuanwenItem)
  	}
  }

  /**
   * @author GR-03
   * @copyright 处理表格列表头部的数量信息
   * @param     [param]
   * @return    [return]
   * @param     {any[]}     data [description]
   */
  public handleNumberStatus(data:any[]):void{
  	this.numberInfoStatus = new numberInfoStatus({
  		'resourceCount':data.length,
  		'writingCount':data.filter(e=>e['status']==0).length,
  		'completeCount':data.filter(e=>e['status']==1).length,
      'cancelCount':data.filter(e=>e['status']==2).length
  	})

  	this.writeRuanwenItem.map(e=>e['is_refres']=false)

  }

  /**
   * @author GR-03
   * @copyright 点击查看按钮向上返回软文数据
   * @param     [param]
   * @return    [return]
   * @param     {any}       data [description]
   */
  public fnEmitRuanwenInfo(data:any):void{
  	this.emitData.emit(data)
  }


  /**
   * @author GR-03
   * @copyright 刷新订单状态事件
   * @param     [param]
   * @return    [return]
   * @param     {string}    type [description]
   * @param     {any    =    {}}        data [description]
   */
  public fnRefreshOrderStatus(type:string,data:any = {}):void{

  	let postObjData = {
  		"article_keys":[],
  		'id':this.orderId
  	}

  	// 批量请求刷新接口的方法变量
  	let fnOrderRefresh = (postObj:any,_data:any)=>{
  		_data['is_refres'] = true
		this.grOrderService.postOrderWriteRefresh({...postObj}).subscribe(res=>{
	  		_data['is_refres'] = false
			if(res.status===1){
        _data.status = res['data']['status']
			}
		},error=>{
			throw new Error(error)
		})
  	}

  	if(type==='all'){

  		let statusZero = this.writeRuanwenItem.filter(e=>e['status']==0)
      console.log(statusZero)
  		
  		if(Array.isArray(statusZero)===true){
  			for(let i = 0;i<statusZero.length;i++){
  				fnOrderRefresh({
  					...postObjData,
  					'article_keys':[statusZero[i]['article_id']]
  				},statusZero[i])
  			}

  		}

  	}else if(type==='list'){
  		fnOrderRefresh({
  			...postObjData,
  			'article_keys':[data['article_id']]
  		},data)
  	}


  }



}
