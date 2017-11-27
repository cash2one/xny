import { Component, OnInit,OnDestroy,Output,EventEmitter,Input } from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot } from '@angular/router'

import { Subscription }  from 'rxjs/Subscription'
import { tableTitle }		from './table-title'
import { orderInfo }    from '../../pages/ruanwen-release/release-resource/orderInfo'

import { RiccioModalService }    from '@gr-public/riccio-modal/riccio-modal.service'
import { RiccioNotificationsService }  from '@gr-public/riccio-notifications/riccio-notifications.service'

import { ReleaseShoppingCartServices }  from '../release-shopping-cart/release-shopping-cart.services'
import { GrReleaseService }      from '../../services'
import { GrOrderService }      from '../../services'

import { CartItemListService }    from '../../storage/cartItemList.service'

@Component({
  selector: 'app-release-selected-resource',
  templateUrl: './release-selected-resource.component.html',
  styleUrls: ['../../../../Public/theme/apps-common/common.scss','../../../../Public/theme/apps-common/table.scss','./release-selected-resource.component.scss']
})
export class ReleaseSelectedResourceComponent implements OnInit {

  @Output() public emitOrderInfo:EventEmitter<orderInfo>
  @Output() public emitResourceInfo:EventEmitter<any>
  @Output() public emitTotalPrice:EventEmitter<string|number>

  /**
   * 表格头部标题
   * @type {tableTitle}
   */
  public tableTitle:string[]

  /**
   * loading效果的标志位
   * @type {string}
   */
  public spinnerType:string

  /**
   * 总价
   * @type {number}
   */
  public totalPrice:number

  /**
   * 订阅购物车列表数据subject对象
   * @type {Subscription}
   */
  public cartItemRX$:Subscription

  /**
   * 某条资源的详细数据
   * @type {any}
   */
  public resourceInfoData:any

  /**
   * 判断该页面是购物车进来的还是订单编辑进来的
   * @type {string}
   */
  public resourceViewType:string

  /**
   * [orderInfo description]
   * @type {orderInfo}
   */
  public orderInfo:orderInfo

  /**
   * 购物车列表里的数据
   * @type {any[]}
   */
  public cartItem:any[]

  constructor(
    public releaseShoppingCartServices:ReleaseShoppingCartServices,
    public grReleaseService:GrReleaseService,
    public grOrderService:GrOrderService,
    public cartItemListService:CartItemListService,
    public activatedRoute:ActivatedRoute,
    public router:Router,
    public riccioModalService:RiccioModalService,
    public riccioNotificationsService:RiccioNotificationsService
  ) {
    this.emitOrderInfo = new EventEmitter<orderInfo>()
    this.emitResourceInfo = new EventEmitter<any>()
    this.emitTotalPrice = new EventEmitter<number|string>()
    this.resourceViewType = 'init'
    this.spinnerType = 'show'
    this.totalPrice = 0
  	this.tableTitle = new tableTitle().data
    this.orderInfo = new orderInfo()
    this.cartItem = []


    this.cartItemRX$ = this.releaseShoppingCartServices.getCartItem().subscribe(res=>{
      this.cartItem = [...res]
    })

    this.activatedRoute.params.subscribe(res=>{
      // 区分是订单的媒体数据还是购物车里的媒体数据
      let type = Object.keys(res)

      type.length>0
      ?(()=>{
        this.orderInfo['info']['id'] = res['id']
        let orderID = res['id']
        this.resourceViewType = 'order'
        this.fnGetOrderInfo(orderID)    //获取订单信息
      })()    //获取对应订单的媒体数据
      :(()=>{
        this.resourceViewType = 'init'
        this.fnGetCartItemList()
      })()    //获取购物车里的媒体数据

    })

  }

  ngOnInit() {
    
  }

  ngOnDestroy(){
    this.cartItemRX$.unsubscribe()
  }

  /**
   * @author GR-03
   * @copyright 获取购物车列表里的数据
   * @param     [param]
   * @return    [return]
   */
  public fnGetCartItemList():void{
    this.spinnerType = 'show'
    this.grReleaseService.getRuanwenCartList().subscribe(res=>{
      this.spinnerType = 'hide'
      if(res.status===1){
        this.cartItem = [...res['data']['data']]

        this.orderInfo = new orderInfo([...this.cartItem],{})

        this.emitOrderInfo.emit(this.orderInfo)

        this.spinnerEmpty()

        this.handleTotalPrice()
      }
    },error=>{
      throw new Error(error)
    })
  }


  /**
   * @author GR-03
   * @copyright 获取订单详细信息
   * @param     [param]
   * @return    [return]
   */
  public fnGetOrderInfo(ID:number|string):void{
    this.spinnerType = 'show'
    this.grOrderService.getOrderInfo({
      'id':ID
    }).subscribe(res=>{
      this.spinnerType = 'hide'
      if(res.status===1){

        if(res['data']==''){

          this.cartItem.length = 0

          this.emitOrderInfo.emit(new orderInfo())

          this.router.navigateByUrl('RuanwenClient/article/release/screen/list')

        }else {

          this.cartItem = [...res['data']['article']]

          this.orderInfo = new orderInfo([...res['data']['article']],{...res['data']['info']})

          this.emitOrderInfo.emit(this.orderInfo)

          this.handleTotalPrice()

        }

        this.spinnerEmpty()

      }
    },error=>{
      throw new Error(error)
    })
  }


  /**
   * @author GR-03
   * @copyright 点击继续添加资源跳到选择资源组件，同时不显示购物车效果
   * @param     [param]
   * @return    [return]
   */
  public fnGoOnAddResource():void{
    if(this.resourceViewType==='init'){
      this.router.navigateByUrl('RuanwenClient/article/release/screen/list')
    }else if(this.resourceViewType==='order'){
      this.router.navigateByUrl('RuanwenClient/article/release/screen/list/'+this.orderInfo['info']['id'])
    }
  }

  /**
   * @author GR-03
   * @copyright 计算总价
   * @param     [param]
   * @return    [return]
   */
  public handleTotalPrice():void{

    this.totalPrice = 0

    let priceArr = this.cartItem.map(e=>+e['media_price'])

    for(let i = 0;i<priceArr.length;i++){
      this.totalPrice += priceArr[i]
    }

    this.totalPrice = Math.round( this.totalPrice*100 )/100

    this.emitTotalPrice.emit(this.totalPrice)

  }

  /**
   * @author GR-03
   * @copyright 点击显示媒体信息
   * @param     [param]
   * @return    [return]
   * @param     {any}       data [description]
   */
  public fnShowInfo(data:any):void{
    this.resourceInfoData = {...data}

    this.emitResourceInfo.emit({...this.resourceInfoData})
  }

  /**
   * @author GR-03
   * @copyright 点击删除按钮确认是否删除操作
   * @param     [param]
   * @return    [return]
   * @param     {any}       data [description]
   */
  public fnDelete(data:any):void{

    if(this.resourceViewType == 'order'){
      this.grOrderService.postOrderDelMedia({
        'id':this.orderInfo['info']['id'],
        'media_ids':[data['media_id']]
      }).subscribe(res=>{
        if(res.status===1){

          this.cartItem = this.cartItem.filter(e=>e['media_id']!=data['media_id'])

          this.orderInfo['article'] = this.orderInfo['article'].filter(e=>e['media_id']!=data['media_id'])

          this.spinnerEmpty()

          this.handleTotalPrice()

          this.emitOrderInfo.emit(this.orderInfo)

          this.riccioNotificationsService.setSubject({
            text:'删除成功'
          })
        }
      },error=>{
        throw new Error(error)
      })
    }else if(this.resourceViewType == 'init'){
      this.grReleaseService.postRuanwenCartDel({
        'ids':data['media_id']
      }).subscribe(res=>{
        if(res.status===1){

          this.cartItem = this.cartItem.filter(e=>e['media_id']!=data['media_id'])

          this.orderInfo['article'] = [...this.cartItem]

          this.spinnerEmpty()

          this.handleTotalPrice()

          this.emitOrderInfo.emit(this.orderInfo)

          this.riccioNotificationsService.setSubject({text:'删除成功'})

        }
      },error=>{
        throw new Error(error)
      })
    }


  }

  /**
   * @author GR-03
   * @copyright 数据为空时候的显示提示的方法
   * @param     [param]
   * @return    [return]
   */
  public spinnerEmpty(data:any[] = this.cartItem):void{
    if(data.length==0) this.spinnerType = 'empty'
  }


}
