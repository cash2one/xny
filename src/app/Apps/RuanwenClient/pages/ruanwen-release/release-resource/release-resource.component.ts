import { Component, OnInit ,OnDestroy} from '@angular/core';
import { Subscription }  from 'rxjs/Subscription'
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,NavigationEnd } from '@angular/router'
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { RiccioNotificationsService }		from '@gr-public/riccio-notifications/riccio-notifications.service'
import { RiccioModalService }    from '@gr-public/riccio-modal/riccio-modal.service'
import { RuanwenReleaseService }    from '../ruanwen-release.service'
import { ReleaseResourceServices }    from './release-resource.services'
import { ReleaseScreenResourceService }  from '../../../common/release-screen-resource/release-screen-resource.service'

import { GrOrderService }      from '../../../services'
import { GrReleaseService }		from '../../../services'

import { tableTitle }		from './tableTitle'
import { orderInfo }    from './orderInfo'
import { screenResourceData }    from '../../../common/release-screen-resource/screenResourceData'
import { sortObj }    from './sortObj'

@Component({
  selector: 'app-release-resource',
  templateUrl: './release-resource.component.html',
  styleUrls: ['../../../../../Public/theme/apps-common/common.scss','../../../../../Public/theme/apps-common/table.scss','../../../ruanwen.component.scss','./release-resource.component.scss']
})
export class ReleaseResourceComponent implements OnInit {

  /**
   * 所有媒体的列表
   * @type {any[]}
   */
  public mediaItem:any[]

  /**
   * 分页的总数
   * @type {number}
   */
  public total:number

  /**
   * 加载表格数据时候的动画显示
   * @type {string}
   */
  public spinnerType:string

  /**
   * 所展示的表格头部标题
   * @type {string[]}
   */
  public tableTitle:string[]


  /**
   * 该字段用来辨别是从订单编辑进来的还是用户一开始选择资源开始的
   * @type {string}
   */
  public screenViewType:string

  /**
   * 全选的标志位
   * @type {boolean}
   */
  public allIsCheck:boolean

  /**
   * tip提示的文字字段
   * @type {string}
   */
  public popoversText:string

  /**
   * 页数
   * @type {[type]}
   */
  public page:number

  /**
   * 需要排序的字段
   * @type {string}
   */
  public fieldName:string

  /**
   * 正序还是倒序
   * @type {string}
   */
  public sortName:string

  /**
   * 资源的详情
   * @type {any}
   */
  public resourceInfoData:any

  /**
   * 订单的信息
   * @type {orderInfo}
   */
  public orderInfo:orderInfo

  /**
   * 购物车的可订阅对象
   * @type {Subscription}
   */
  public shoppingRX$:Subscription

  /**
   * tag切换的标志位
   * @type {number}
   */
  public tagStatusType:number

  /**
   * 搜索的数据
   * @type {screenResourceData}
   */
  public searchData:screenResourceData

  /**
   * 关于排序的对象
   * @type {sortObj}
   */
  public sortObj:sortObj

  constructor(
  	public grReleaseService:GrReleaseService,
    public activatedRoute:ActivatedRoute,
    public router:Router,
    public grOrderService:GrOrderService,
    public ruanwenReleaseService:RuanwenReleaseService,
    public releaseResourceServices:ReleaseResourceServices,
    public releaseScreenResourceService:ReleaseScreenResourceService,
    public riccioModalService:RiccioModalService,
  	public riccioNotificationsService:RiccioNotificationsService
  ) {
    this.searchData = new screenResourceData()
    this.screenViewType = ''
    this.popoversText = ''
    this.page = 1
    this.allIsCheck = false
  	this.mediaItem = []
    this.sortObj = new sortObj()
  	this.total = 0
  	this.spinnerType = 'show'
  	this.tableTitle = new tableTitle().data
    this.orderInfo = new orderInfo()
    this.tagStatusType = 0

    /**
     * @author GR-03
     * @copyright 用来判断是从订单草稿过来的还是从头一开始进来的
     * @param     [param]
     * @return    [return]
     * @param     {[type]}    res=>{    } [description]
     */
    this.activatedRoute.params.subscribe(res=>{

      let type = Object.keys(res)
      type.length>0
      ?(()=>{
        this.screenViewType = 'order'
        this.orderInfo['info']['id'] = +res['id']
        let orderID = +res['id']

        this.getOrderInfo(orderID)

      })()    //获取该订单下的信息，同时需要隐藏购物车组件和修改部分样式
      :(()=>{
        this.screenViewType = 'init'
        this.getResourceTableList()
      })()    //获取购物车里的媒体信息

    })

    /*添加和删除的订阅事件*/
    this.releaseResourceSubject()

  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.shoppingRX$.unsubscribe()
  }


  /**
   * @author GR-03
   * @copyright 添加和删除的订阅事件
   * @param     [param]
   * @return    [return]
   */
  public releaseResourceSubject():void{

    this.shoppingRX$ = this.releaseResourceServices.getSubject().subscribe(res=>{

      let type = res['type']||''
      let data = res['data']||[]
      switch (type) {
        case "ADD":
          this.addCartManage(data)
          break;

        case "DELETE":
          this.deleteCartManage(data)
          break;

        case "ADD_MEDIA":
          this.addOrderMediaManage(data)
          break;

        case "DELETE_MEDIA":
          this.deleteOrderMediaManage(data)
          break;

        default:break;
      }

    })

  }


  /**
   * @author GR-03
   * @copyright 处理所有媒体资源的is_cart为0
   * @param     [param]
   * @return    [return]
   */
  public handleIsCart(data:any[]):void{
    data.map(e=>e['is_cart']=0)

    let articleArr = this.orderInfo['article']

    articleArr.map(art=>{

      data.map(media=>{
        if(media['media_id']==art['media_id']) media['is_cart'] = 1
      })

    })

  }


  /**
   * @author GR-03
   * @copyright 通过接口获取媒体表格列表的数据
   * @param     [param]
   * @return    [return]
   */
  public getResourceTableList(searchData:any={}):void{
  	this.spinnerType = 'show'
  	this.grReleaseService.postRuanwenMediaList({...searchData}).subscribe(res=>{
  		this.spinnerType = 'hide'
  		if(res.status===1){

  			this.mediaItem = [...res['data']['data']]
  			this.total = res['data']['total']

  			if(this.total==0) this.spinnerType = 'empty'

        if(this.screenViewType==='order')  this.handleIsCart(this.mediaItem)

        this.allIsCheck = this.mediaItem.length>0?this.mediaItem.filter(e=>e['is_cart']==0).length==0?true:false:false

  		}
  	},error=>{
  		throw new Error(error)
  	})
  }

  /**
   * @author GR-03
   * @copyright 根据id获取订单信息和媒体数据列表
   * @param     [param]
   * @return    [return]
   * @param     {number|string} ID [description]
   */
  public getOrderInfo(ID:number|string):void{
    this.grOrderService.getOrderInfo({
      'id':ID
    }).subscribe(res=>{

      if(res.status===1){

        if(res['data']!=''){
          this.orderInfo = new orderInfo([...res['data']['article']],{...res['data']['info']})
        }else if(res['data']=='') {
          this.riccioNotificationsService.setSubject({text:'暂无此订单信息',status:'danger'})
          this.router.navigateByUrl("RuanwenClient/article/release/screen/list")
        }

        if(res['data']['info']['status']!=3) this.ruanwenReleaseService.handleOrderStatusRouter(this.orderInfo['info']['status'],this.orderInfo['info']['id'])

        this.getResourceTableList()

      }

    },error=>{
      throw new Error(error)
    })
  }


  /**
   * @author GR-03
   * @copyright 点击执行收藏和取消收藏的操作
   * @param     [param]
   * @return    [return]
   * @param     {any}       list [description]
   */
  public fnIsCollect(list:any):void{
  	this.grReleaseService.postRuanwenMediaListCollection({
      'media_id':list['media_id'],
      'status':list.is_collect==1?0:1
  	}).subscribe(res=>{
      if(res.status===1){
        list.is_collect = list.is_collect == 1?0:1
        this.riccioNotificationsService.setSubject({
          'text':list.is_collect==1?'收藏成功':'取消收藏成功'
        })

        if(this.tagStatusType == 1) this.mediaItem = this.mediaItem.filter(e=>e['id']!==list['id'])
        // if(this.searchData['status']==1) this.getResourceTableList(this.searchData)

      }
  	},error=>{
  		throw new Error(error)
  	})
  }

  /**
   * @author GR-03
   * @copyright 接收筛选组件所筛选出来的数据
   * @param     [param]
   * @return    [return]
   * @param     {any}       searchData [description]
   */
  public fnEmitSearchData(searchData:any):void{
    this.searchData = {...searchData}
    setTimeout(()=>{
     this.page = this.searchData['page']
    })
    this.getResourceTableList(searchData)
  }


  /**
   * @author GR-03
   * @copyright 点击是添加购物车还是删除购物车的事件判断
   * @copyright 如果是从订单进入的则切换不同的接口事件
   * @param     [param]
   * @return    [return]
   * @param     {any}       data [description]
   */
  public fnAddOrDelShoppingCart(data:any):void{

    if(data['is_cart']===1){

      if(this.screenViewType === 'init'){
        this.releaseResourceServices.handleDelCart([data])
      }else if(this.screenViewType === 'order'){
        this.releaseResourceServices.handleDelOrderMedia(this.orderInfo['info']['id'],[data])
      }

    }else if(data['is_cart']===0){

      if(this.screenViewType === 'init'){
        this.releaseResourceServices.handleAddCart([data])
      }else if(this.screenViewType === 'order'){
        this.releaseResourceServices.handleAddOrderMedia(this.orderInfo['info']['id'],[data])
      }
    }

  }

  /**
   * @author GR-03
   * @copyright 处理添加到购物车成功后的回调事件
   * @param     [param]
   * @return    [return]
   * @param     {string[]|number[]} list [description]
   */
  public addCartManage(data:any[]):void{
    data.map(e=>e['is_cart']=1)
    this.isAllCheckHandle()
    this.riccioNotificationsService.setSubject({text:'添加成功'})
  }

  /**
   * @author GR-03
   * @copyright 处理删除购物车成功后的回调事件
   * @param     [param]
   * @return    [return]
   * @param     {number|string} list [description]
   */
  public deleteCartManage(data:any[]):void{
    if(data[0]['media_id']===0){
      this.mediaItem.map(e=>e['is_cart']=0)
      this.allIsCheck = false
    }
    // console.log(data)
    data.map(res=>{
      res['is_cart']=0

      this.mediaItem.map(mediaData=>{
        if(res['media_id']===mediaData['media_id']){
          mediaData['is_cart'] = 0
        }
      })

    })

    this.isAllCheckHandle()
    this.riccioNotificationsService.setSubject({text:'删除成功'})
  }

  /**
   * @author GR-03
   * @copyright 处理添加订单媒体数据成功后的回调事件
   * @param     [param]
   * @return    [return]
   * @param     {any[]}     data [description]
   */
  public addOrderMediaManage(data:any[]):void{
    data.map(e=>e['is_cart']=1)
    this.isAllCheckHandle()
    this.riccioNotificationsService.setSubject({text:'添加成功'})
  }


  /**
   * @author GR-03
   * @copyright 处理删除订单媒体数据成功后的回调事件
   * @param     [param]
   * @return    [return]
   * @param     {any[]}     data [description]
   */
  public deleteOrderMediaManage(data:any[]):void{
    if(data[0]['media_id']===0){
      this.mediaItem.map(e=>e['is_cart']=0)
      this.allIsCheck = false
    }
    // console.log(data)
    data.map(res=>{
      res['is_cart']=0

      this.mediaItem.map(mediaData=>{
        if(res['media_id']===mediaData['media_id']){
          mediaData['is_cart'] = 0
        }
      })

    })

    this.isAllCheckHandle()
    this.riccioNotificationsService.setSubject({text:'删除成功'})
  }


  /**
   * @author GR-03
   * @copyright 判断是否全部都选中了显示全选的勾选状态
   * @param     [param]
   * @return    [return]
   */
  public isAllCheckHandle():void{
    let bool = false
    this.mediaItem.map(e=>{
      if(e['is_cart']===0){
        return bool = true
      }
    })

    if(bool===false){
      this.allIsCheck = true
    }else if(bool===true){
      this.allIsCheck = false
    }
  }

  /**
   * @author GR-03
   * @copyright 处理点击全选后面的操作
   * @param     [param]
   * @return    [return]
   */
  public fnAllIsCart(type:string="shut"):void{
    let bool = false
    let data = []
    this.mediaItem.map(e=>{
      if(e['is_cart']===0){
        return bool = true
      }
    })

    if(bool===false){
      this.allIsCheck = false

      /*
      如果是点击的全选按钮就进行请求
       */
      if(type==='open'){
        this.mediaItem.map(e=>{
          if(e['is_cart']==1){
            data.push(e)
            e['is_cart']=0
          }
        })
        if(data.length>0){

          if(this.screenViewType==='init'){
            this.releaseResourceServices.handleDelCart(data)
          }else if(this.screenViewType==='order'){
            this.releaseResourceServices.handleDelOrderMedia(this.orderInfo['info']['id'],data)
          }

        }
      }

    }else if(bool===true){
      this.allIsCheck = true
      if(type==='open'){
        this.mediaItem.map(e=>{
          if(e['is_cart']==0){
            data.push(e)
            e['is_cart']=1
          }
        })
        if(data.length>0){

          if(this.screenViewType==='init'){
            this.releaseResourceServices.handleAddCart(data)
          }else if(this.screenViewType==='order'){
            this.releaseResourceServices.handleAddOrderMedia(this.orderInfo['info']['id'],data)
          }

        }

      }

    }

  }

  /**
   * @author GR-03
   * @copyright 接收分页组件发射回来的数据
   * @param     [param]
   * @return    [return]
   * @param     {any}       value [description]
   */
  public fnEmitPage(value:any):void{
    this.page = +value['page']
  }

  /**
   * @author GR-03
   * @copyright 点击显示该资源的详细信息
   * @param     [param]
   * @return    [return]
   */
  public fnShowInfo(list:any):void{
    this.riccioModalService.setSubject({
      'header':'资源详情',
      'size':700,
      'noBtn':true,
      'type':'info',
      'data':list
    })
    this.resourceInfoData = {...list}
  }

  /**
   * @author GR-03
   * @copyright 拉黑操作
   * @param     [param]
   * @return    [return]
   */
  public fnBlack(list:any):void{
    this.grReleaseService.postRuanwenMediaListPullBlack({
      'media_id':list['media_id'],
      'status':list['is_back']===0?1:0
    }).subscribe(res=>{
      if(res.status===1){
       list['is_back'] = list['is_back']===0?1:0

       if(this.tagStatusType==0||this.tagStatusType==2) this.mediaItem = this.mediaItem.filter(e=>e['id']!==list['id'])

       this.riccioNotificationsService.setSubject({
         text:list['is_back']==1?'拉黑成功':'取消拉黑成功'
       })
      }
    },error=>{
      throw new Error(error)
    })
  }

  /**
   * @author GR-03
   * @copyright 接收screen-type-header的组件数据
   * @param     [param]
   * @return    [return]
   * @param     {number}    num [description]
   */
  public fnEmitTag(num:number):void{
    this.tagStatusType = num
    this.releaseScreenResourceService.setSubject({
      'status':num
    })
  }

  /**
   * @author GR-03
   * @copyright 接收头部header的搜索数据
   * @param     [param]
   * @return    [return]
   * @param     {string}    name [description]
   */
  public fnEmitSearch(name:string):void{
    this.releaseScreenResourceService.setSubject({
      'media_name':name
    })
  }

  /**
   * @author GR-03
   * @copyright 点击完成进入到投放活动页面
   * @param     [param]
   * @return    [return]
   */
  public fnGoToDelivery():void{
    this.router.navigateByUrl("RuanwenClient/article/release/delivery/"+this.orderInfo['info']['id'])
  }


  /**
   *
   * @author GR-03
   * @copyright 价格排序
   * @param     [param]
   * @return    [return]
   */
  public handleSort(name:string):void{
    // media_price

    switch (name) {
      case "会员价":
        this.sortObj.price = !this.sortObj.price
        this.fieldName = 'media_price'
        this.sortName = this.sortObj.price==true?'desc':'asc'
        break;
      case "入口类型":
        this.sortObj.genre = !this.sortObj.genre
        this.fieldName = 'media_inlevel'
        this.sortName = this.sortObj.genre==true?'desc':'asc'
        break;
      case "连接分类":
        this.sortObj.connect = !this.sortObj.connect
        this.fieldName = 'media_link'
        this.sortName = this.sortObj.connect==true?'desc':'asc'
        break;
      case "新闻源":
        this.sortObj.news = !this.sortObj.news
        this.fieldName = 'media_news'
        this.sortName = this.sortObj.news==true?'desc':'asc'
        break;
      default:break;
    }


  }

}
