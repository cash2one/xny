import { Component, OnInit,ElementRef,OnDestroy,ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot } from '@angular/router'
import { Subscription }   from 'rxjs/Subscription'

import { RiccioModalService }    from '@gr-public/riccio-modal/riccio-modal.service'

import { postWriteData }			from './postWriteData'
import { normalUedContent }		from './normalUedContent'
import { GrOrderService }			from '../../services'	
import { pricePboxData }		from './pricePboxData'

import { OrderProcessService }  from '../../pages/ruanwen-order/order-process/order-process.service'

import { RiccioNotificationsService }		from '@gr-public/riccio-notifications/riccio-notifications.service'
import { RiccioPboxService }		from '@gr-public/riccio-pbox/riccio-pbox.service'
		
@Component({
  selector: 'app-ruanwen-write-order',
  templateUrl: './ruanwen-write-order.component.html',
  styleUrls: ['../../../../Public/theme/apps-common/common.scss','./ruanwen-write-order.component.scss']
})
export class RuanwenWriteOrderComponent implements OnInit {

  @ViewChild('priceEl')  public priceEl:ElementRef

  /**
   * 按钮的标志位
   * @type {boolean}
   */
  public btnDraftType:boolean

  /**
   * 点击下一步选择资源时的按钮的标志位
   * @type {boolean}
   */
  public btnNextType:boolean

  /**
   * 验证码弹窗按钮标志位
   * @type {boolean}
   */
  public codeBtnType:boolean

  /**
   * 是否要关闭验证码弹窗
   * @type {boolean}
   */
  public codeClose:boolean

  /**
   * 文本编辑器默认内容
   * @type {string}
   */
  public uedContent:string

  /**
   * 代写文章的规格与对应的价格
   * @type {any[]}
   */
  public writePrice:any[]

  /**
   * 保存草稿和提交订单的时候需要提交的数据
   * @type {postWriteData}
   */
  public postWriteData:postWriteData

  /**
   * 显示代写几篇的条数数据
   * @type {any[]}
   */
  public pricePboxData:any

  /**
   * pbox组件的可订阅对象
   * @type {Subscription}
   */
  public pboxRX$:Subscription

  constructor(
  	public grOrderService:GrOrderService,
    public activatedRoute:ActivatedRoute,
    public router:Router,
    public orderProcessService:OrderProcessService,
    public riccioModalService:RiccioModalService,
  	public riccioNotificationsService:RiccioNotificationsService,
  	public riccioPboxService:RiccioPboxService
  ) { 
  	this.writePrice = []
  	this.uedContent = new normalUedContent().text
  	this.postWriteData = new postWriteData(this.uedContent)
  	this.pricePboxData = new pricePboxData()
  	this.btnDraftType = true
  	this.btnNextType = true
    this.codeClose = false
    this.codeBtnType = true


    this.activatedRoute.params.subscribe(res=>{

      if(Object.keys(res).length>0){
        let id = res['id']
        this.fnGetWriteInfo(id)
      }else{

      }

    })

  	this.pboxRX$ = this.riccioPboxService.getEmit().subscribe(res=>{

  		if(res['type']==='price'){
  			this.postWriteData['total_count'] = res['data']['id']
  			this.pricePboxData['selectData'] = res['data']['name'] 
  			this.postWriteData['final_amount'] = this.writePrice.filter(e=>e['type']==this.postWriteData['article_type'])[0]['price']*+this.postWriteData['total_count']
  		}

  	})

  }

  ngOnInit() {
  	this.fnGetWritePrice()
  }

  ngOnDestroy(){
  	this.pboxRX$.unsubscribe()
  }

  /**
   * @author GR-03
   * @copyright 获取某条代写订单的内容详情
   * @param     [param]
   * @return    [return]
   * @param     {string}    id [description]
   */
  public fnGetWriteInfo(id:string):void{

    this.grOrderService.getOrderWriteInfo({
      'id':id
    }).subscribe(res=>{
      if(res.status===1){

        let obj = res['data']['write_info']

        for(let e in this.postWriteData){
          if(e!='final_amount') this.postWriteData[e] = obj[e]
        }

        this.orderProcessService.handleOrderStatusRouter(obj['status'],id)

        this.uedContent = this.postWriteData['content']

        this.handlePricePboxShow()

      }
    },error=>{
      throw new Error(error)
    })

  }

  /**
   * @author GR-03
   * @copyright 处理根据订单详情更改默认显示的篇数pbox数据
   * @param     [param]
   * @return    [return]
   */
  public handlePricePboxShow():void{
    this.pricePboxData['selectData'] = this.pricePboxData['data'].filter(e=>e['id']==this.postWriteData['total_count'])[0]['name']
  }

  /**
   * @author GR-03
   * @copyright 通过接口获取文章规则价格
   * @param     [param]
   * @return    [return]
   */
  public fnGetWritePrice():void{
  	this.grOrderService.getOrderWritePrice().subscribe(res=>{
  		if(res.status===1){
        // 
  			this.writePrice = [...res['data']]
        let writeType = this.writePrice.filter(e=>e['type']==this.postWriteData['article_type'])[0]['price']
        this.postWriteData['final_amount'] = writeType?this.postWriteData['total_count']*writeType:'0'
  		}
  	},error=>{
  		throw new Error(error)
  	})
  }


  /**
   * @author GR-03
   * @copyright 获取某个元素相对于浏览器的位置和边距
   * @param     [param]
   * @return    [return]
   * @param     {ElementRef} client [description]
   */
  public getClient(client:ElementRef):ClientRect{

  	return client.nativeElement.getBoundingClientRect()

  }

  /**
   * @author GR-03
   * @copyright 选择价格的时候弹出代写几篇的选项
   * @param     [param]
   * @return    [return]
   * @param     {ElementRef} dataEl [description]
   * @param     {MouseEvent} event  [description]
   */
  public fnShowPboxPrice(dataEl:ElementRef,event:MouseEvent):void{

  	let client = this.getClient(this.priceEl)

  	this.riccioPboxService.setSubject({
  		'genre':'option',
  		'el':dataEl,
  		'type':'price',
  		'data':this.pricePboxData['data'],
  		'position':{
  			'left':client.left,
  			'top':client.top,
  			'width':120
  		}
  	})
  }


  /**
   * @author GR-03
   * @copyright 接受文本编辑器的文本变化
   * @param     [param]
   * @return    [return]
   * @param     {string}    content [description]
   */
  public fnEmitUeditor(content:string):void{
  	this.postWriteData['content'] = content
  }


  /**
   * @author GR-03
   * @copyright 点击保存按钮的函数
   * @param     [param]
   * @return    [return]
   * @param     {boolean}   value [description]
   * @param     {string}    type  [description]
   */
  public fnBtnSave(value:boolean,type:string):void{

  	if(type==='draft'){
  		this.btnDraftType = false
  		this.grOrderService.postOrderWriteAddDraft({
  			...this.postWriteData
  		}).subscribe(res=>{
  			this.btnDraftType = true
  			if(res.status===1){
  				this.riccioNotificationsService.setSubject({text:'保存草稿成功'})
  			}
  		},error=>{
  			throw new Error(error)
  		})

  	}else if(type==='order'){
  		
      this.codeModal()

  	}

  }

  /**
   * @author GR-03
   * @copyright 显示验证码弹窗
   * @param     [param]
   * @return    [return]
   */
  public codeModal():void{
      this.riccioModalService.setSubject({
        'header':'请输入验证码',
        'size':500,
        'noBtn':true,
        'type':'code'
      })
  }

  /**
   * @author GR-03
   * @copyright 接受验证码返回的数据
   * @param     [param]
   * @return    [return]
   * @param     {string}    code [description]
   */
  public fnEmitCode(code:string):void{

    this.codeBtnType = false
    this.grOrderService.postOrderWriteAddOrder({
      ...this.postWriteData,
      'code':code
    }).subscribe(res=>{
      this.codeBtnType = true
      if(res.status===1){
        this.codeClose = true
        this.riccioNotificationsService.setSubject({text:'验证成功,等待支付确认'})
        this.router.navigateByUrl('RuanwenClient/write/process/writing/'+res['data'])
      }
    },error=>{
      throw new Error(error)
    })

  }



}
