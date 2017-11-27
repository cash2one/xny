import { Component, OnInit,ViewChild,OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot } from '@angular/router'

import { RiccioModalService }         from '@gr-public/riccio-modal/riccio-modal.service'
import { RiccioNotificationsService }    from '@gr-public/riccio-notifications/riccio-notifications.service'
import { GrOrderService }        from '../../../services'
import { GrArticleServices }    from '../../../services'
import { RuanwenService }      from '../../../ruanwen.service'
import { RuanwenReleaseService }  from '../ruanwen-release.service'

import { orderInfo }    from '../release-resource/orderInfo'

import { postOrderAddDraft }    from './postOrderAddData'
import { mediaData }    from './postOrderAddData'
import { errorTipData }      from './errorTipData'
  
@Component({
  selector: 'app-release-activity',
  templateUrl: './release-activity.component.html',
  styleUrls: ['../../../../../Public/theme/apps-common/common.scss','./release-activity.component.scss']
})
export class ReleaseActivityComponent implements OnInit {

  @ViewChild('UedFull') public UedFull:any

  /**
   * 该字段是判断是由订单编辑进来的还是从选择资源进来的
   * @type {string}
   */
  public activityViewType:string

  /**
   * 实时保存文本编辑器的内容字段
   * @type {any}
   */
  public saveTimeOut:any

  /**
   * 显示不同的模态框的标志位
   * @type {string}
   */
  public modalType:string

  /**
   * 选中的某一条资源详细数据
   * @type {any}
   */
  public resourceInfoData:any

  /**
   * 必填字段的错误提示对象
   * @type {errorTipData}
   */
  public errorTipData:errorTipData

  /**
   * 需要post提交到添加订单的数据
   * @type {postOrderAddDraft}
   */
  public postOrderAddDraft:postOrderAddDraft

  /**
   * post提交数据的时候媒体数据里的具体对象
   * @type {mediaData}
   */
  public mediaData:mediaData

  /**
   * 订单详情数据
   * @type {orderInfo}
   */
  public orderInfo:orderInfo

  /**
   * 验证码按钮标志位
   * @type {boolean}
   */
  public codeBtnType:boolean

  /**
   * 是否关闭验证码弹窗
   * @type {boolean}
   */
  public codeClose:boolean

  /**
   * 需要传递ruanwen-ngxueditor组件的头部标题需要显示的何种类型字段
   * @type {string}
   */
  public uedConfigType:string

  /**
   * 防止多次刷新文本内容数据的字段
   * @type {string}
   */
  public uedContent:string

  /**
   * 是否勾选了协议
   * @type {boolean}
   */
  public isCheckAgreement:boolean

  /**
   * 保存订单的按钮标志位，显示启用状态还是禁用状态
   * @type {boolean}
   */
  public btnDraftType:boolean

  public totalPrice:any

  constructor(
    public activatedRoute:ActivatedRoute,
    public riccioModalService:RiccioModalService,
    public router:Router,
    public ruanwenReleaseService:RuanwenReleaseService,
    public grOrderService:GrOrderService,
    public ruanwenService:RuanwenService,
    public grArticleServices:GrArticleServices,
    public riccioNotificationsService:RiccioNotificationsService
  ) { 
    this.uedContent = ''
    this.activityViewType = ''
    this.postOrderAddDraft = new postOrderAddDraft()
    this.mediaData = new mediaData()
    this.orderInfo = new orderInfo()
    this.errorTipData = new errorTipData()
    this.uedConfigType = 'basic'
    this.modalType = ''
    this.btnDraftType = true
    this.codeClose = false
    this.codeBtnType = true
    this.isCheckAgreement = true

    this.activatedRoute.params.subscribe(res=>{

      let type = Object.keys(res)

      if(type.length>0){
        let orderID = res['id']
        this.orderInfo['info']['id'] = orderID
        this.activityViewType = 'order'
      }else {
        this.activityViewType = 'cart'
        this.handleArticleStorage()
      }

    })


  }

  ngOnInit() {
  }

  ngOnDestroy(){
    if(this.saveTimeOut) clearInterval(this.saveTimeOut)
  }

   
  /**
   * @author GR-03
   * @copyright 判断是否有本地的存储数据，如果有则请求文章详情
   * @param     [param]
   * @return    [return]
   */
  public handleArticleStorage():void{

    if(this.ruanwenService.isStorage('articleDraft')==true){

      let draftId = +this.ruanwenService.getStorage('articleDraft')

      this.grArticleServices.getArticleInfo({
        'id':draftId
      }).subscribe(res=>{
        if(res.status===1){
          let data = res['data']
          this.postOrderAddDraft = new postOrderAddDraft({
            'article_id':data['id'],
            'title':data['title'],
            'content':data['content']
          })

          this.uedContent = this.postOrderAddDraft['content']

        }
      },error=>{
        throw new Error(error)
      })

    }

  }


  /**
   * @author GR-03
   * @copyright 接收release-select-resource组件的订单详情数据方法
   * @param     [param]
   * @return    [return]
   * @param     {any}       data [description]
   */
  public fnEmitOrderInfo(data:any):void{
    // console.log(data)
    if(this.activityViewType == 'order'){

      this.orderInfo = new orderInfo([...data['article']],{...data['info']})

      this.ruanwenReleaseService.handleOrderStatusRouter(this.orderInfo['info']['status'],this.orderInfo['info']['id'])

      for(let e in this.postOrderAddDraft){
        this.postOrderAddDraft[e] = this.orderInfo['info'][e]
      }

      this.uedContent = this.postOrderAddDraft['content']

    }else if(this.activityViewType == 'cart'){

      this.orderInfo = new orderInfo([...data['article']],{...data['info']})

    }

  }


  /**
   * @author GR-03
   * @copyright 处理mediaIdArr的数据，赋值于postOrderAddDraft数据
   * @param     [param]
   * @return    [return]
   * @return    {any[]}     [description]
   */
  public handleEmediaIdArr(data:any[]):any[]{
    let arr = []
    for(let i = 0 ;i<data.length;i++){
      arr.push(new mediaData(data[i]))
    }
    return arr
  }

  /**
   * @author GR-03
   * @copyright 接收百度ueditor编辑器的文本内容变化并实时发送请求保存草稿
   * @param     [param]
   * @return    [return]
   * @param     {string}    content [description]
   */
  public fnEmitUeditor(content:string):void{

    this.postOrderAddDraft['content'] = content

    if(this.saveTimeOut) clearInterval(this.saveTimeOut)

    this.saveTimeOut = setTimeout(()=>{

      if(content.trim()!=''){
        this.grArticleServices.postArticleOperate({
          'id':this.postOrderAddDraft['article_id'],
          'title':this.postOrderAddDraft['title'],
          'content':this.postOrderAddDraft['content']
        }).subscribe(res=>{
          if(res.status===1){
              this.riccioNotificationsService.setSubject({text:'内容已自动保存成功'})
              this.postOrderAddDraft['article_id'] = res['data']
          }
        },error=>{
          throw new Error(error)
        })
      }

    },3000)

  }


  /**
   * @author GR-03
   * @copyright 点击保存订单按钮后触发的事件
   * @param     [param]
   * @return    [return]
   */
  public saveRuanwen(type:string):void{
     this.postOrderAddDraft['media_idarr'] = [...this.handleEmediaIdArr([...this.orderInfo['article']])]
    
     let matterModal = ()=>{
         this.modalType = ''
         setTimeout(()=>{
           this.modalType = 'matter'
         })

          this.riccioModalService.setSubject({
            'header':'注意事项',
            'size':600,
            'noBtn':true,
            'type':'matter'
          })
     }


     if(this.handleIsSuccess()===true){

       if(type==='draft'){

         if(this.postOrderAddDraft['article_id']!=0) this.postSaveDraft(this.postOrderAddDraft)

       }else if(type=='order'){

         if(this.handleIsMatter()===false){
           matterModal()
         }else{              // 如果matter提示过则显示验证码弹窗

           this.codeModal()

         }

       }

     }

  }

  /**
   * @author GR-03
   * @copyright 显示验证码弹窗
   * @param     [param]
   * @return    [return]
   */
  public codeModal():void{
     this.modalType = ''
     setTimeout(()=>{
       this.modalType = 'code'
     })

      this.riccioModalService.setSubject({
        'header':'请输入验证码',
        'size':500,
        'noBtn':true,
        'type':'code'
      })
  }


  /**
   * @author GR-03
   * @copyright 保存订单草稿后提交数据
   * @param     [param]
   * @return    [return]
   * @param     {postOrderAddDraft} data [description]
   */
  public postSaveDraft(data:postOrderAddDraft):void{
    this.btnDraftType = false
    this.grOrderService.postOrderAddDraft(data).subscribe(res=>{
      this.btnDraftType = true
      if(res.status===1){
        this.orderInfo['info']['id'] = res['data']
        this.riccioNotificationsService.setSubject({text:'保存草稿成功'})

        //保存成功之后清楚文章的id
        this.ruanwenService.removeStorage('articleDraft')

        this.router.navigateByUrl('RuanwenClient/article/release/executoryDraft/'+this.orderInfo['info']['id'])
      }
    },error=>{
      throw new Error(error)
    })

  }

  /**
   * @author GR-03
   * @copyright 提交订单数据
   * @param     [param]
   * @return    [return]
   */
  public postSaveOrder():void{
    this.codeBtnType = false
    this.grOrderService.postOrderAddOrder({
      ...this.postOrderAddDraft
    }).subscribe(res=>{
      this.codeBtnType = true
      if(res.status===1){
        this.codeClose = true
        this.riccioNotificationsService.setSubject({text:'验证成功,等待支付确认'})

        //支付成功之后清楚文章id
        this.ruanwenService.removeStorage('articleDraft')

        this.router.navigateByUrl('RuanwenClient/article/release/executory/'+res['data'])
      }
    },error=>{
      throw new Error(error)
    })

  }

  /**
   * @author GR-03
   * @copyright 用来验证必填字段是否有输入并返回布尔值
   * @param     [param]
   * @return    [return]
   * @return    {boolean}   [description]
   */
  public handleIsSuccess():boolean{
    console.log(this.postOrderAddDraft)
    let bool = true

    switch ('') {
      case this.postOrderAddDraft['order_name']:
        this.errorTipData['order_name'] = true
        bool = false
        this.riccioNotificationsService.setSubject({text:'请填写订单名称',status:'danger'})
        break;
      
      case this.postOrderAddDraft['title']:
        this.errorTipData['title'] = true
        bool = false
        this.riccioNotificationsService.setSubject({text:'请填写文章标题',status:'danger'})
        break;

      case this.postOrderAddDraft['content']:
        bool = false
        this.riccioNotificationsService.setSubject({text:'请填写文章内容',status:'danger'})
        break;

      default:break;
    }

    if(this.postOrderAddDraft['media_idarr'].length==0){
        bool = false
        this.riccioNotificationsService.setSubject({text:'请选择媒体资源',status:'danger'})
    }

    if(this.isCheckAgreement==false){
      bool = false
      this.riccioNotificationsService.setSubject({text:'请勾选并同意国人在线服务协议',status:'danger'})
    }

    return bool 

  }

  /**
   * @author GR-03
   * @copyright 点击查看资源详情事件
   * @param     [param]
   * @return    [return]
   * @param     {any}       data [description]
   */
  public fnEmitResourceInfo(data:any):void{

    this.modalType = ''
    setTimeout(()=>{
      this.modalType = 'resourceInfo'
    })
    this.resourceInfoData = {...data}

    this.riccioModalService.setSubject({
      'header':'媒体资源详情',
      'size':600,
      'noBtn':true,
      'type':'resourceInfo'
    })

  }

  /**
   * @author GR-03
   * @copyright 接收matter组件的数据
   * @param     [param]
   * @return    [return]
   * @param     {string}    type [description]
   */
  public fnEmitMatter(type:string):void{
    this.codeModal()
  } 


  /**
   * @author GR-03
   * @copyright 处理本地存储的方法
   * @param     [param]
   * @return    [return]
   */
  public handleIsMatter():boolean{

    let local = window.localStorage
    if(local.getItem('matter')=='true'){
      return true
    }else{
      local.setItem('matter','true') 
      return false
    }

  }

  /**
   * @author GR-03
   * @copyright 点击选择文章弹出选择文章列表
   * @param     [param]
   * @return    [return]
   */
  public fnSelectArticle():void{

    this.modalType = ''
    setTimeout(()=>{
      this.modalType = 'article'
    })

    this.riccioModalService.setSubject({
      'header':'选择文章',
      'size':1000,
      'noBtn':true,
      'type':'article'
    })

  }

  /**
   * @author GR-03
   * @copyright 接收选择草稿文章列表的数据,同时覆盖掉原来的文章id
   * @param     [param]
   * @return    [return]
   * @param     {any}       data [description]
   */
  public fnEmitDraftArticle(data:any):void{
    this.postOrderAddDraft = new postOrderAddDraft({
      'article_id':data['id'],
      'title':data['title'],
      'content':data['content']
    })

    this.uedContent = this.postOrderAddDraft['content']

    this.ruanwenService.setStorage('articleDraft',data['id'])

  }

  /**
   * @author GR-03
   * @copyright 显示服务协议或者广告法
   * @param     [param]
   * @return    [return]
   * @param     {string}    type [description]
   */
  public fnShowModal(type:string):void{

    this.modalType = ''
    setTimeout(()=>{
      this.modalType = type
    })

    this.riccioModalService.setSubject({
      'header':type=='ad'?'广告法':'国人在线服务协议',
      'size':600,
      'btn':{
        'name':'确认',
        'status':'success'
      },
      'type':type
    })

  }

}

