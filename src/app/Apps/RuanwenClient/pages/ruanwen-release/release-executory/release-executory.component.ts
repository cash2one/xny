import { Component, OnInit,ElementRef,OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot } from '@angular/router'
import { Subscription }   from 'rxjs/Subscription'

import { tableTitle }		from './tableTitle'
import { numberInfoStatus }		from './numberInfoStatus'
import { pboxData }		from './pboxData'

import { GrOrderService }		from '../../../services'
import { RiccioPboxService }		from '@gr-public/riccio-pbox/riccio-pbox.service'
import { RuanwenReleaseService }    from '../ruanwen-release.service'
import { RiccioNotificationsService }    from '@gr-public/riccio-notifications/riccio-notifications.service'
import { RuanwenWritingArticlesService }   from '../../../common/ruanwen-writing-articles/ruanwen-writing-articles.service'

@Component({
  selector: 'app-release-executory',
  templateUrl: './release-executory.component.html',
  styleUrls: ['../../../../../Public/theme/apps-common/common.scss','../../../../../Public/theme/apps-common/table.scss','../../../ruanwen.component.scss','./release-executory.component.scss']
})
export class ReleaseExecutoryComponent implements OnInit {

  /**
   * 表格头部的标题
   * @type {string[]}
   */
  public tableTitle:string[]

  /**
   * loading标志位
   * @type {string}
   */
  public spinnerType:string

  /**
   * 订单信息的列表
   * @type {any[]}
   */
  public orderInItem:any[]

  /**
   * 订单的详细信息
   * @type {orderInfo}
   */
  public orderInfo:any

  /**
   * 需要显示的pbox数据data
   * @type {any[]}
   */
  public pboxData:any[]

  /**
   * 订阅pbox组件的可观察对象
   * @type {Subscription}
   */
  public pboxRX$:Subscription

  /**
   * 判断该组件是保存草稿进来的还是订单支付成功后进来的
   * @type {string}
   */
  public executoryViewType:string

  /**
   * 订单的具体状态个数
   * @type {numberInfoStatus}
   */
  public numberInfoStatus:numberInfoStatus

  /**
   * tip提示的组件
   * @type {string}
   */
  public popoversText:string

  constructor(
  	public grOrderService:GrOrderService,
  	public riccioPboxService:RiccioPboxService,
  	public activatedRoute:ActivatedRoute,
    public ruanwenReleaseService:RuanwenReleaseService,
    public router:Router,
    public riccioNotificationsService:RiccioNotificationsService,
    public ruanwenWritingArticlesService:RuanwenWritingArticlesService
  ) {
  	this.spinnerType = 'show'
    this.popoversText = ''
    this.executoryViewType = ''
  	this.tableTitle = new tableTitle().data
  	this.orderInfo = {}
  	this.orderInItem = []
  	this.numberInfoStatus = new numberInfoStatus()
  	this.pboxData = new pboxData().data

    this.activatedRoute.url.subscribe(res=>{
      let type = res[0]['path']
      this.executoryViewType = type
    })

    this.activatedRoute.params.subscribe(res=>{
      let id = res['id']
      this.orderInfo['id'] = id
      this.getOrderList(id)
    })



  }

  ngOnInit() {
  }

  ngOnDestroy(){
  	// this.pboxRX$.unsubscribe()
  }


  /**
   * @author GR-03
   * @copyright 通过订单id获取到对应的订单信息
   * @param     [param]
   * @return    [return]
   */
  public getOrderList(id:number|string=0):void{
  	this.spinnerType = 'show'
  	this.grOrderService.getOrderInfo({
  		'id':id
  	}).subscribe(res=>{
  		this.spinnerType = 'hide'
  		if(res.status===1){
  			if(res['data']===''){
  				this.spinnerType = 'empty'
  			}else if(Object.keys(res['data']).length>0){
  				this.orderInItem = [...res['data']['article']]
  				this.orderInfo = {...res['data']['info']}

  				this.handleNumberStatus()

          // 判断是否该停留在该页面
          if(this.executoryViewType == 'executory')  this.ruanwenReleaseService.handleOrderStatusRouter(this.orderInfo['status'],this.orderInfo['id'])
  			}
  		}
  	},error=>{
  		throw new Error(error)
  	})
  }

  /**
   * @author GR-03
   * @copyright 处理订单媒体列表里的各种状态数量
   * @param     [param]
   * @return    [return]
   */
  public handleNumberStatus():void{
  	this.numberInfoStatus['release'] = this.orderInItem.filter(e=>e['article_status']==0).length
  	this.numberInfoStatus['complete']= this.orderInItem.filter(e=>e['article_status']==1).length
    this.numberInfoStatus['refuse']  = this.orderInItem.filter(e=>e['article_status']==2).length
  	this.numberInfoStatus['cancel']  = this.orderInItem.filter(e=>e['article_status']==3).length

  	// 未每一个媒体列表增加refres字段
  	this.orderInItem.map(e=>e['is_refres']=false)

  }

	/**
	 * @author GR-03
	 * @copyright 订阅pbox组件
	 * @param     [param]
	 * @return    [return]
	 * @param     {[type]}    ).subscribe(res=>{  		console.log(res)  	} [description]
	 */
  public fnPboxDataSubject(data:any):void{

  	this.pboxRX$ = this.riccioPboxService.getEmit().subscribe(res=>{


  		let type = res['type']
  		let dataId = res['data']?res['data']['id']:''

  		if(type==='more'){
  			switch (dataId) {
  				case 0:
  					this.handleCancel(data)
  					break;
  				
  				default:break;
  			}
  		}


	  	this.pboxRX$.unsubscribe()

  	})

  }


  /**
   * @author GR-03
   * @copyright 点击下拉框显示pbox组件选项
   * @param     [param]
   * @return    [return]
   * @param     {ElementRef} dataEl [description]
   * @param     {MouseEvent} event  [description]
   * @param     {any}        data   [description]
   */
  public fnShowPboxMore(dataEl:ElementRef,event:MouseEvent,data:any):void{
  	this.riccioPboxService.setSubject({
  		'genre':'option',
  		'el':dataEl,
  		'type':'more',
  		'position':{
  			'left':event.clientX-50,
  			'top':event.clientY,
  			'width':100
  		},
  		'data':this.pboxData
  	})

  	this.fnPboxDataSubject(data)

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
  		'id':this.orderInfo['id']
  	}

  	// 批量请求刷新接口的方法变量
  	let fnOrderRefresh = (postObj:any,_data:any)=>{
  		_data['is_refres'] = true
		this.grOrderService.postOrderRefresh({...postObj}).subscribe(res=>{
	  		_data['is_refres'] = false
			if(res.status===1){
        for(let e in _data){
          _data[e] = res['data'][e]?res['data'][e]:_data[e]
        }
			}
		},error=>{
			throw new Error(error)
		})
  	}

  	if(type==='all'){
  		let statusZero = this.orderInItem.filter(e=>e['article_status']==0)
  		
  		if(Array.isArray(statusZero)===true){
  			for(let i = 0;i<statusZero.length;i++){
  				fnOrderRefresh({
  					...postObjData,
  					'article_keys':[statusZero[i]['article_key']]
  				},statusZero[i])
  			}

  		}

  	}else if(type==='list'){
  		fnOrderRefresh({
  			...postObjData,
  			'article_keys':[data['article_key']]
  		},data)
  	}


  }


  /**
   * @author GR-03
   * @copyright 点击修改资源并支付返回投放活动页面
   * @param     [param]
   * @return    [return]
   */
  public fnGoToExecutory():void{
    this.router.navigateByUrl('RuanwenClient/article/release/delivery/'+this.orderInfo['id'])
  }

  /**
   * @author GR-03
   * @copyright 点击重发操作
   * @param     [param]
   * @return    [return]
   * @param     {any}       data [description]
   */
  public fnAgainRelease(data:any):void{

    this.ruanwenWritingArticlesService.articleData = {
      'id':0,
      'title':this.orderInfo['title'],
      'content':this.orderInfo['content']
    }
    
    this.router.navigateByUrl("RuanwenClient/article/writing")

  }

  /**
   * @author GR-03
   * @copyright 处理取消发布的函数
   * @param     [param]
   * @return    [return]
   */
  public handleCancel(data:any):void{
    this.grOrderService.postOrderCancel({
      'id':this.orderInfo['id'],
      'article_key':data['article_key']
    }).subscribe(res=>{
      if(res.status===1){
        this.riccioNotificationsService.setSubject({text:'取消成功'})
        data['article_status'] = 3
      }
    },error=>{
      throw new Error(error)
    })
  }


}
