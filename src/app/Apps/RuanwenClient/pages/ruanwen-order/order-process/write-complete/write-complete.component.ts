import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,NavigationEnd } from '@angular/router'

import { GrOrderService }		from '../../../../services'
import { RiccioModalService }		from '@gr-public/riccio-modal/riccio-modal.service'  
import { OrderProcessService }    from '../order-process.service'
import { ruanwenInfo }    from '../../../../common/order-write-ruanwen-info/ruanwenInfo'

@Component({
  selector: 'app-write-complete',
  templateUrl: './write-complete.component.html',
  styleUrls: ['./write-complete.component.scss']
})
export class WriteCompleteComponent implements OnInit {

  /**
   * 代写订单的详情数据content
   * @type {string}
   */
  public orderInfoContent:string

  /**
   * 代写订单软文信息列表
   * @type {any[]}
   */
  public orderWriteRuanwenList:any[]

  /**
   * 某一条代谢订单里面的软文详细信息
   * @type {ruanwenInfo}
   */
  public orderRuanwenInfo:ruanwenInfo

  /**
   * 订单id
   * @type {[type]}
   */
  public orderId:string|number

  constructor(
  	public grOrderService:GrOrderService,
  	public activatedRoute:ActivatedRoute,
  	public riccioModalService:RiccioModalService,
    public orderProcessService:OrderProcessService
  ) { 
    this.orderRuanwenInfo = new ruanwenInfo()
    this.orderWriteRuanwenList = []
    this.orderInfoContent = ''

  	this.activatedRoute.params.subscribe(res=>{
      this.orderId = res['id']
  		this.fnGetOrderInfo(this.orderId)

  	})

  }

  ngOnInit() {
  }

  /**
   * @author GR-03
   * @copyright 获取代写订单详情数据
   * @param     [param]
   * @return    [return]
   */
  public fnGetOrderInfo(id:number|string):void{
  	this.grOrderService.getOrderWriteInfo({
  		'id':id
  	}).subscribe(res=>{
  		if(res.status===1){
  			this.orderWriteRuanwenList = [...res['data']['write_article']]
  			this.orderInfoContent = res['data']['write_info']['content']

        this.orderProcessService.handleOrderStatusRouter(res['data']['write_info']['status'],id)

  		}
  	},error=>{
  		throw new Error(error)
  	})
  }


  /**
   * @author GR-03
   * @copyright 接收代写软文列表点击查看后返回回来的数据
   * @param     [param]
   * @return    [return]
   * @param     {any}       data [description]
   */
  public fnEmitRuanwenInfo(data:any):void{
    this.orderRuanwenInfo = new ruanwenInfo({
      ...data
    })
    console.log(this.orderRuanwenInfo)
  	this.riccioModalService.setSubject({
  		'data':data,
  		'header':'查看代写软文',
      'size':700,
      'noBtn':true,
      'type':'ruanwenInfo'
  	})


  }

}
