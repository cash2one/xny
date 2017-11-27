import { Component, OnInit,ElementRef,OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot } from '@angular/router'
import { Subscription }   from 'rxjs/Subscription'

import { tableTitle }		from '../release-executory/tableTitle'
import { numberInfoStatus }		from '../release-executory/numberInfoStatus'
import { pboxData }		from '../release-executory/pboxData'

import { GrOrderService }		from '../../../services'
import { RiccioPboxService }		from '@gr-public/riccio-pbox/riccio-pbox.service'
import { RuanwenReleaseService }    from '../ruanwen-release.service'
import { RuanwenWritingArticlesService }    from '../../../common/ruanwen-writing-articles/ruanwen-writing-articles.service'

@Component({
  selector: 'app-release-complete',
  templateUrl: './release-complete.component.html',
  styleUrls: ['../../../../../Public/theme/apps-common/common.scss','../../../../../Public/theme/apps-common/table.scss','../../../ruanwen.component.scss','./release-complete.component.scss']
})
export class ReleaseCompleteComponent implements OnInit {


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
   * 订单的具体状态个数
   * @type {numberInfoStatus}
   */
  public numberInfoStatus:numberInfoStatus

  constructor(
  	public grOrderService:GrOrderService,
  	public riccioPboxService:RiccioPboxService,
  	public activatedRoute:ActivatedRoute,
    public ruanwenReleaseService:RuanwenReleaseService,
    public router:Router,
    public ruanwenWritingArticlesService:RuanwenWritingArticlesService
  ) {
  	this.spinnerType = 'show'
  	this.tableTitle = new tableTitle().data
  	this.orderInfo = {}
  	this.orderInItem = []
  	this.numberInfoStatus = new numberInfoStatus()
  	this.pboxData = new pboxData().data

    // this.activatedRoute.url.subscribe(res=>{
    //   let type = res[0]['path']
    // })

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
          this.ruanwenReleaseService.handleOrderStatusRouter(this.orderInfo['status'],this.orderInfo['id'])
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

  }

  /**
   * @author GR-03
   * @copyright 点击重发的操作
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


}
