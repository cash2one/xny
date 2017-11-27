import { Component, OnInit,ElementRef,OnDestroy,AfterViewChecked,ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot } from '@angular/router'
import { Subscription }  from 'rxjs/Subscription'

import { GrArticleServices }		from '../../../services'
import { RuanwenService }   from '../../../ruanwen.service'
import { RiccioNotificationsService }    from '@gr-public/riccio-notifications/riccio-notifications.service'
import { RiccioPboxService }      from '@gr-public/riccio-pbox/riccio-pbox.service'

import { RuanwenWritingArticlesService }    from '../../../common/ruanwen-writing-articles/ruanwen-writing-articles.service'
    
import { tableTitle }		from './tableTitle'

import { statusValue }		from './articleComponentData' 
import { postSearchData }    from './postSearchData'

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['../../../../../Public/theme/apps-common/common.scss','../../../../../Public/theme/apps-common/table.scss','../../../ruanwen.component.scss','./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  /**
   * 文章列表表格的标题数组
   * @type {string[]}
   */
  public tableTitle:string[]

  /**
   * 文章列表数据
   * @type {any[]}
   */
  public articleItem:any[]

  /**
   * 文章列表的总页数
   * @type {number}
   */
  public totalPage:number

  /**
   * loading效果标志位
   * @type {string}
   */
  public loadingType:string

  /**
   * 文章列表筛选发布状态
   * @type {statusValue}
   */
  public statusValue:Array<statusValue>[]

  /**
   * 筛选的数据对象
   * @type {postSearchData}
   */
  public postSearchData:postSearchData

  /**
   * pbox可订阅对象
   * @type {Subscription}
   */
  public pboxRX$:Subscription

  /**
   * 页数
   * @type {number}
   */
  public page:number

  constructor(
  	public grArticleServices:GrArticleServices,
    public riccioNotificationsService:RiccioNotificationsService,
    public router:Router,
    private changeDetectorRef:ChangeDetectorRef,
    public riccioPboxService:RiccioPboxService,
    public ruanwenWritingArticlesService:RuanwenWritingArticlesService,
    public ruanwenService:RuanwenService
  ) {
    this.loadingType = 'show'
  	this.tableTitle = new tableTitle().data
  	this.statusValue = new statusValue().data
    this.postSearchData = new postSearchData()
  	this.articleItem = []
  	this.totalPage = 0
    this.page = 1



    this.pboxRX$ = this.riccioPboxService.getEmit().subscribe(res=>{

      if(res['type']==='delete'){

        this.handleDelete(res['data'])

      }

    })

  }

  ngOnInit() {
  	this.fnGetArticleList()
  }

  ngAfterViewChecked() {
      this.changeDetectorRef.detectChanges()
  }

  ngOnDestroy(){
    this.pboxRX$.unsubscribe()
  }

  /**
   * @author GR-03
   * @copyright 接口获取文章列表数据
   * @param     [param]
   * @return    [return]
   */
  public fnGetArticleList(page:number = 1):void{
    this.loadingType = 'show'
  	this.grArticleServices.getArticleList({
      ...this.postSearchData,
      'page':page
    }).subscribe(res=>{
      this.loadingType = 'hide'
  		if(res.status===1){
  			this.articleItem = [...res['data']['data']]
  			this.totalPage = res['data']['total']
        if(this.articleItem.length==0)  this.loadingType = 'empty'
  		}
  	},error=>{
  		throw new Error(error)
  	})
  }

  /**
   * @author GR-03
   * @copyright 接收ruanwen-list-header的检索对象用来检索列表数据
   * @param     [param]
   * @return    [return]
   * @param     {any}       data [description]
   */
  public fnEmitListHeader(data:any):void{
    this.postSearchData = {...this.postSearchData,...data}
    this.fnGetArticleList(1)
    this.page = 1
  }

  /**
   * @author GR-03
   * @copyright 接收ruanwen-list-header的按钮事件
   * @param     [param]
   * @return    [return]
   */
  public fnEmitListHeaderBtn(value:boolean):void{
    if(value===true){
      this.router.navigateByUrl("RuanwenClient/article/writing")
    }
  }


  /**
   * @author GR-03
   * @copyright 发布文章
   * @param     [param]
   * @return    [return]
   * @param     {any}       data [description]
   */
  public fnRelease(data:any):void{

    this.ruanwenService.setStorage('articleDraft',data['id'])

    if(data['order_id']==0){
      this.router.navigateByUrl("RuanwenClient/article/release/screen/list")
    }else {
      this.router.navigateByUrl("RuanwenClient/article/release/delivery/"+data['order_id'])
    }

  }

  /**
   * @author GR-03
   * @copyright 编辑文章
   * @param     [param]
   * @return    [return]
   * @param     {any}       data [description]
   */
  public fnEdit(data:any):void{

    this.ruanwenWritingArticlesService.articleData = {...data}

    this.router.navigateByUrl("RuanwenClient/article/writing")

  }  

  /**
   * @author GR-03
   * @copyright 删除文章
   * @param     [param]
   * @return    [return]
   * @param     {any}       data [description]
   */
  public fnDel(data:any,El:ElementRef,event:MouseEvent):void{

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
        'content':"是否删除 "+data['title']+" 文章",
        'button':'确认',
        'delID':data
      }

    })

  }

  /**
   * @author GR-03
   * @copyright 执行删除操作的函数
   * @param     [param]
   * @return    [return]
   */
  public handleDelete(data:any):void{
    this.grArticleServices.postArticleDel({
      'id':data['id']
    }).subscribe(res=>{
      if(res.status===1){

        this.riccioNotificationsService.setSubject({text:'删除成功'})

        this.fnGetArticleList()
      }
    },error=>{
      throw new Error(error)
    })
  }

  /**
   * @author GR-03
   * @copyright 返回页数
   * @param     [param]
   * @return    [return]
   * @param     {string|number} page [description]
   */
  public fnEmitPage(page:string|number):void{
    this.fnGetArticleList(page['page'])
  }


}
