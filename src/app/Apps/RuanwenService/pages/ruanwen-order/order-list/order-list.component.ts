import { Component, OnInit,ElementRef,OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,NavigationEnd } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'

import { RiccioNotificationsService }      from '../../../../../Public/riccio-notifications/riccio-notifications.service'
    
import { RiccioPboxService }      from '../../../../../Public/riccio-pbox/riccio-pbox.service'

import { GrOrderService }		from '../../../services'
import { tableTitle }		from './tableTitle'
import { orderRetrieval }		from './orderRetrieval'
import { searchStatus }    from './searchStatus'

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['../../../../../Public/theme/apps-common/common.scss','../../../../../Public/theme/apps-common/table.scss','../../../ruanwen-service.component.scss','./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

 
  /**
   * 订单列表筛选的对象
   * @type {orderRetrieval}
   */
  public orderRetrieval:orderRetrieval

  /**
   * 表单loading效果的标志位
   * @type {string}
   */
  public loadingType:string

  /**
   * table列表标题
   * @type {string[]}
   */
  public tableTitle:string[]

  /**
   * 订单列表数据
   * @type {any[]}
   */
  public orderItem:any[]

  /**
   * 分页总数
   * @type {number}
   */
  public totalPage:number

  /**
   * 搜索订单状态的pbox列表option选项
   * @type {any[]}
   */
  public searchStatus:any[]

  /**
   * 路由type
   * @type {string}
   */
  public rootType:string

  public rootRX$:Subscription

  constructor(
    public riccioNotificationsService:RiccioNotificationsService,
    public riccioPboxService:RiccioPboxService,
    public router:Router,
    public activatedRoute:ActivatedRoute,
  	public grOrderService:GrOrderService
  ) { 
  	this.totalPage = 0
  	this.tableTitle = new tableTitle().data
  	this.orderRetrieval = new orderRetrieval()
  	this.orderItem = []
    this.searchStatus = new searchStatus('list').data
    this.loadingType = 'show'
    this.rootType = ""

    this.routerEvent()

  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.rootRX$.unsubscribe()
  }

  /**
   * @author GR-03
   * @copyright 监听路由变化
   * @param     [param]
   * @return    [return]
   */
  public routerEvent():void{
    this.rootRX$ = this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .subscribe((event) => {
        event.url.subscribe(res=>{
          this.rootType = res[0]['path']
          if(this.rootType==='list'){
            this.getOrderListData()
            this.searchStatus = new searchStatus('list').data
          }else if(this.rootType === 'write'){
            this.getOrderWriteListData()
            this.searchStatus = new searchStatus('write').data
          }
        })
      })
  }


  /**
   * @author GR-03
   * @copyright 获取订单列表的列表信息数据
   * @param     [param]
   * @return    [return]
   */
  public getOrderListData(page:string|number = 1):void{
    this.loadingType = 'show'
  	this.grOrderService.postAdminOrderList({
      ...this.orderRetrieval,
      'page':page
    }).subscribe(res=>{
      this.loadingType = 'hide'
  		if(res.status===1){
  			this.orderItem = [...res['data']['data']]
  			this.totalPage = res['data']['total']

        if(this.orderItem.length==0) this.loadingType = 'empty'

  		}
  	},error=>{
  		throw new Error(error)
  	})
  }

  /**
   * @author GR-03
   * @copyright 获取代写的订单列表数据
   * @param     [param]
   * @return    [return]
   */
  public getOrderWriteListData(page:string|number = 1):void{
    this.loadingType = 'show'
    this.grOrderService.postAdminOrderWriteList({
      ...this.orderRetrieval,
      'page':page
    }).subscribe(res=>{
      this.loadingType = 'hide'
      if(res.status===1){
        this.orderItem = [...res['data']['data']]
        this.totalPage = res['data']['total']

        if(this.orderItem.length==0) this.loadingType = 'empty'
      }
    },error=>{
      throw new Error(error)
    })
  }

  /**
   * @author GR-03
   * @copyright 接受搜索组件的数据
   * @param     [param]
   * @return    [return]
   */
  public fnEmitSearch(data:any):void{
    this.orderRetrieval = {...data}
    if(this.rootType==='list'){
      this.getOrderListData()
    }else if(this.rootType === 'write'){
      this.getOrderWriteListData()
    }
  }


  /**
   * @author GR-03
   * @copyright 接收分页组件的函数
   * @param     [param]
   * @return    [return]
   * @param     {any}       data [description]
   */
  public fnEmitPage(data:any):void{
    if(this.rootType==='list'){
      this.getOrderListData(data['page'])
    }else if(this.rootType === 'write'){
      this.getOrderWriteListData(data['page'])
    }
  }


}
