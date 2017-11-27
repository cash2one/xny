import { Component, OnInit,ElementRef,OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'

import { RiccioNotificationsService }      from '@gr-public/riccio-notifications/riccio-notifications.service'
    
import { RuanwenReleaseService }        from '../../ruanwen-release/ruanwen-release.service'
import { RiccioPboxService }      from '@gr-public/riccio-pbox/riccio-pbox.service'
import { OrderProcessService }    from '../order-process/order-process.service' 
import { GrOrderService }		from '../../../services'
import { tableTitle }		from './tableTitle'
import { orderRetrieval }		from './orderRetrieval'
import { searchStatus }    from './searchStatus'

@Component({
  selector: 'app-order-write',
  templateUrl: './order-write.component.html',
  styleUrls: ['../../../../../Public/theme/apps-common/common.scss','../../../../../Public/theme/apps-common/table.scss','../../../ruanwen.component.scss','./order-write.component.scss']
})
export class OrderWriteComponent implements OnInit {

 
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
   * 代写订单列表数据
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
   * pbox组件的可订阅对象
   * @type {Subscription}
   */
  public pboxRX$:Subscription

  constructor(
    public riccioNotificationsService:RiccioNotificationsService,
    public riccioPboxService:RiccioPboxService,
    public orderProcessService:OrderProcessService,
    public router:Router,
    public ruanwenReleaseService:RuanwenReleaseService,
  	public grOrderService:GrOrderService
  ) { 
  	this.totalPage = 0
  	this.tableTitle = new tableTitle().data
  	this.orderRetrieval = new orderRetrieval()
  	this.orderItem = []
    this.searchStatus = new searchStatus().data
    this.loadingType = 'show'


    this.pboxRX$ = this.riccioPboxService.getEmit().subscribe(res=>{

      if(res['type']==='delete'){

        this.handleDelete(res['data'])

      }

    })

  }

  ngOnInit() {
    this.getOrderListData()
  }

  ngOnDestroy(){
    this.pboxRX$.unsubscribe()
  }


  /**
   * @author GR-03
   * @copyright 获取代写订单列表的列表信息数据
   * @param     [param]
   * @return    [return]
   */
  public getOrderListData(page:number = 1):void{
    this.loadingType = 'show'
  	this.grOrderService.postOrderWriteList({
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
    this.getOrderListData()
  }


  /**
   * @author GR-03
   * @copyright 点击详情
   * @param     [param]
   * @return    [return]
   * @param     {any}       data [description]
   */
  public fnOrderInfo(data:any):void{
    this.orderProcessService.handleOrderStatusRouter(data['status'],data['id'])
  }

  /**
   * @author GR-03
   * @copyright 点击编辑按钮进入到投放活动页面
   * @param     [param]
   * @return    [return]
   * @param     {any}       data [description]
   */
  public fnEditOrder(data:any):void{
    
    // this.router.navigateByUrl("RuanwenClient/write/add/"+data['id'])
    this.orderProcessService.handleOrderStatusRouter(data['status'],data['id'])

  }

  /**
   * @author GR-03
   * @copyright 删除订单操作
   * @param     [param]
   * @return    [return]
   * @param     {any}       data [description]
   */
  public fnDelOrder(data:any,El:ElementRef,event:MouseEvent):void{

    this.riccioPboxService.setSubject({
      'genre':'delete',
      'el':El,
      'type':'delete',
      'position':{
        'left':event.clientX-150,
        'top':event.clientY,
        'width':300
      },
      'data':{
        'title':'删除提示',
        'content':"是否删除 "+data['order_name']+" 订单",
        'button':'确认',
        'delID':data
      }
    })

  }

  /**
   * @author GR-03
   * @copyright 处理删除操作的函数
   * @param     [param]
   * @return    [return]
   * @param     {any}       data [description]
   */
  public handleDelete(data:any):void{
   this.grOrderService.getOrderWriteDel({
      'id':data['id']
    }).subscribe(res=>{
      if(res.status===1){
        this.riccioNotificationsService.setSubject({
          text:'删除订单成功'
        })

        this.getOrderListData()
      }
    },error=>{
      throw new Error(error)
    })

  }

  /**
   * @author GR-03
   * @copyright 接收list-header点击右上角的按钮后发射回来的数据
   * @param     [param]
   * @return    [return]
   */
  public fnEmitListHeaderBtn(value:boolean):void{
    // this.router.navigateByUrl("RuanwenClient/order/write/article")
    this.router.navigateByUrl("RuanwenClient/write/add")
  }

  /**
   * @author GR-03
   * @copyright 分页
   * @param     [param]
   * @return    [return]
   * @param     {any}       page [description]
   */
  public fnEmitPage(page:any):void{
    this.getOrderListData(page['page'])
  }

}
