import { Component, OnInit,Input,OnDestroy,HostListener,ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot } from '@angular/router'
import { Subscription }  from 'rxjs/Subscription'

import { GrReleaseService }		from '../../services'
import { itemListInfo }			from './itemListInfo'

import { ReleaseResourceServices }  from '../../pages/ruanwen-release/release-resource/release-resource.services'
import { ReleaseShoppingCartServices }    from './release-shopping-cart.services'

import { CartItemListService }    from '../../storage/cartItemList.service'


@Component({
  selector: 'app-release-shopping-cart',
  templateUrl: './release-shopping-cart.component.html',
  styleUrls: ['../../../../Public/theme/apps-common/common.scss','./release-shopping-cart.component.scss']
})
export class ReleaseShoppingCartComponent implements OnInit {
 
  @Input() public mediaInfo:any   //新加入的媒体详细信息
  @ViewChild('cartEl') public cartEl:any

  /**
   * 购物车里的列表数据
   */
  public cartItem:Array<itemListInfo>[]

  /**
   * 购物车列表里的某一条详细数据
   * @type {itemListInfo}
   */
  public cartItemOneInfo:itemListInfo

  /**
   * 总价
   * @type {number}
   */
  public totalPirce:number

  /**
   * loading效果图的标志位
   * @type {string}
   */
  public spinnerType:string

  /**
   * 订阅resource的可观察对象
   * @type {Subscription}
   */
  public resourceRX$:Subscription

  /**
   * 处理展开还是收缩的标志位
   * @type {boolean}
   */
  public moveout:boolean

  /**
   * riccio-button的状态
   * @type {boolean}
   */
  public btnType:boolean

  /**
   * 判断是否进行一键清空的操作
   * @type {boolean}
   */
  public deleteAll:boolean

  constructor(
  	public grReleaseService:GrReleaseService,
    public router:Router,
    public cartItemListService:CartItemListService,
    public releaseShoppingCartServices:ReleaseShoppingCartServices,
  	public releaseResourceServices:ReleaseResourceServices
  ) { 
    this.deleteAll = false
    this.moveout = false
    this.btnType = true
  	this.spinnerType = 'hide'
  	this.cartItem = []
  	this.cartItemOneInfo = new itemListInfo()
  	this.totalPirce = 0

  	this.resourceRX$ = this.releaseResourceServices.getSubject().subscribe(res=>{

        let type = res['type']||''
        let data = res['data']||[]

        switch (type) {
          case "ADD":
            this.fnAddCart(data)
            break;

          case "DELETE":
            this.fnDeleteCart(data)
            break;
          
          default:break;
        }
  	})
  }

  ngOnInit() {
  	this.fnGetCartItemData()
  }

  ngOnDestroy(){
    this.resourceRX$.unsubscribe()
  }

  /**
   * @author GR-03
   * @copyright 存储购物车列表里的数据放在服务里面
   * @param     [param]
   * @return    [return]
   */
  public subjectCartItem():void{
    this.releaseShoppingCartServices.setCartItem(this.cartItem)
  }

  /**
   * @author GR-03
   * @copyright 通过接口获取购物车内的订单列表
   * @param     [param]
   * @return    [return]
   */
  public fnGetCartItemData():void{
  	this.spinnerType = 'show'
  	this.grReleaseService.getRuanwenCartList().subscribe(res=>{
  		this.spinnerType = 'hide'
  		if(res.status===1){
  			this.cartItem = [...res['data']['data']]
  			this.totalPirce = Math.round( res['data']['total_price']*100 )/100
        this.subjectCartItem()
  			this.isSpinnerType()
  		}
  	},error=>{
  		throw new Error(error)
  	})
  }

  /**
   * @author GR-03
   * @copyright 处理添加到购物车的操作
   * @param     [param]
   * @return    [return]
   */
  public fnAddCart(data:any[]):void{
    // this.moveout = true
    data.map(res=>{
      this.cartItem = this.cartItem.filter(e=>e['media_id']!=res['media_id'])
    })
    this.cartItem = [...this.cartItem,...data]

    this.subjectCartItem()
    this.isSpinnerType()
    this.fnCountPrice()
  }

  /**
   * @author GR-03
   * @copyright 处理删除的操作
   * @param     [param]
   * @return    [return]
   * @param     {any}       data [description]
   */
  public fnDeleteCart(data:any[]):void{
    // this.moveout = true
    this.btnType = true
    data.map((res,index)=>{
      this.cartItem =  this.cartItem.filter(e=>e['media_id']!=res['media_id'])
    })

    if(this.deleteAll===true){
        this.cartItem.length = 0
        this.deleteAll = false
    }

    if(this.isCartItemNull())  this.moveout = false

    this.subjectCartItem()
    this.isSpinnerType()
    this.fnCountPrice()
  }

  /**
   * @author GR-03
   * @copyright 处理点击单个删除的时候发送接口数据
   * @param     [param]
   * @return    [return]
   * @param     {any}       list [description]
   */
  public fnPostDeleteCart(list:any):void{
    this.releaseResourceServices.handleDelCart([list])
  }

  /**
   * @author GR-03
   * @copyright 计算价格的函数
   * @param     [param]
   * @return    [return]
   */
  public fnCountPrice():void{
    let arrPrice = this.cartItem.map(e=>+(e['media_price']))
    let total = 0
    for(let i = 0 ;i<arrPrice.length;i++){
      total += arrPrice[i]
    }
    this.totalPirce = +Math.round( total*100 )/100
  }

  /**
   * @author GR-03
   * @copyright riccio-button的返回事件
   * @param     [param]
   * @return    [return]
   * @param     {boolean}   value [description]
   */
  public fnEmitBtn(value:boolean):void{
    if(value===true&&this.cartItem.length>0){
      this.btnType = false
      this.releaseResourceServices.handleDelCart([{'media_id':0}])
      this.deleteAll = true
    }
  }

  /**
   * @author GR-03
   * @copyright 用来判断是否隐藏loadinhg效果的函数
   * @param     [param]
   * @return    [return]
   */
  public isSpinnerType():void{
    if(this.isCartItemNull()){
      this.spinnerType = 'empty'
    }else if(this.cartItem.length>0){
      this.spinnerType = 'hide'
    }
  }

  /**
   * @author GR-03
   * @copyright 点击立即投放进入投放页面
   * @param     [param]
   * @return    [return]
   */
  public fnGotoDelivery():void{
    if(!this.isCartItemNull()){
      this.router.navigateByUrl('RuanwenClient/article/release/delivery')
    }
  }

  /**
   * @author GR-03
   * @copyright 判断购物车列表的长度是否不为零
   * @param     [param]
   * @return    [return]
   * @return    {boolean}   [description]
   */
  public isCartItemNull():boolean{

    return this.cartItem.length==0?true:false

  }


  @HostListener('document:click', ['$event'])
  OnClick(event): void {
    const path = event.path || (event.composedPath && event.composedPath())
    let bool = true

    for( let i = 0 ; i < path.length ; i++ ){
      if(path[i]['outerHTML']==this.cartEl.nativeElement['outerHTML']){
        bool = false
        break
      }
    }

    if(bool===true){
      this.moveout = false
    }else {
      this.moveout = true
    }

  }

}
