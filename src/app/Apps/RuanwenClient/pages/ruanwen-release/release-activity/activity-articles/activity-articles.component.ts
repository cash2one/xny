import { Component, OnInit,Output,EventEmitter } from '@angular/core';

import { tableTitle }		from './tableTitle'
import { postDraftData }		from './postDraftData'

import { RiccioModalService }    from '@gr-public/riccio-modal/riccio-modal.service'
import { GrArticleServices }		from '../../../../services'

@Component({
  selector: 'app-activity-articles',
  templateUrl: './activity-articles.component.html',
  styleUrls: ['../../../../../../Public/theme/apps-common/common.scss','../../../../../../Public/theme/apps-common/table.scss','./activity-articles.component.scss']
})
export class ActivityArticlesComponent implements OnInit {
  	
  @Output() public emitCheck:EventEmitter<any>

  /**
   * 表格标题
   * @type {tableTitle}
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
   * 搜索的字段对象
   * @type {postDraftData}
   */
  public postDraftData:postDraftData


  constructor(
  	public grArticleServices:GrArticleServices,
    public riccioModalService:RiccioModalService
  ) { 
  	this.tableTitle = new tableTitle().data
  	this.postDraftData = new postDraftData()
    this.emitCheck = new EventEmitter<any>()
    this.loadingType = 'show'
  	this.articleItem = []
  	this.totalPage = 0
  }

  ngOnInit() {
    this.fnGetDraftItem()
  }

  /**
   * @author GR-03
   * @copyright 获取文章草稿列表
   * @param     [param]
   * @return    [return]
   */
  public fnGetDraftItem(page:number = 1):void{
    this.loadingType = 'show'
  	this.grArticleServices.postArticleDraft({
  		...this.postDraftData,
      'page':page
  	}).subscribe(res=>{
      this.loadingType = 'hide'
  		if(res.status===1){

        this.articleItem = [...res['data']['data']]

        this.totalPage = res['data']['total']

        if(this.articleItem.length==0) this.loadingType = 'empty'

  		}
  	},error=>{
  		throw new Error(error)
  	})
  }


  /**
   * @author GR-03
   * @copyright 接受搜索条件的搜索数据
   * @param     [param]
   * @return    [return]
   * @param     {any}       data [description]
   */
  public fnEmitListHeader(data:any):void{
    this.postDraftData = new postDraftData(data)
    this.fnGetDraftItem()
  }

  /**
   * @author GR-03
   * @copyright 点击选择返回文章数据
   * @param     [param]
   * @return    [return]
   */
  public fnEmitData(data:any):void{
    this.emitCheck.emit(data)
    this.riccioModalService.setSubject({})
  }

  /**
   * @author GR-03
   * @copyright 分页
   * @param     [param]
   * @return    [return]
   * @param     {any}       page [description]
   */
  public fnEmitPage(page:any):void{
    this.fnGetDraftItem(page['page'])
  }


}
