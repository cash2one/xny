import { Component, OnInit, Output, EventEmitter,OnDestroy } from '@angular/core';
import { Subscription }  from 'rxjs/Subscription'

import { XnFaqServices }		from '../../../../services'
import { RiccioPboxService }		from '@gr-public/riccio-pbox/riccio-pbox.service'
import { ClassifyParentService }		from './classify-parent.service'
import { AssistMainService }    from '../../assist-main/assist-main.service'
import { AssistMenuService }  from '../../assist-menu/assist-menu.service'

@Component({
  selector: 'app-classify-parent',
  templateUrl: './classify-parent.component.html',
  styleUrls: ['./classify-parent.component.scss']
})
export class ClassifyParentComponent implements OnInit {

  public helpList : Array<any>

  public helpListRX$ : Subscription

  constructor(
  	private xnFaqServices : XnFaqServices,
  	private riccioPboxService : RiccioPboxService,
    private assistMainService:AssistMainService,
    private assistMenuService:AssistMenuService,
  	private classifyParentService:ClassifyParentService
  ) { 
  	this.helpList = []

    this.helpListRX$ = this.assistMainService.getHelpListData().subscribe(res=>{
      this.helpList = this.handleTreeList( res )
    })

  }

  ngOnInit() {
  	this.getAssistList()
  }

  ngOnDestroy() {
    this.helpListRX$.unsubscribe()
    this.getAssistList()
  }

  /*
  获取分类列表的函数
   */
  public getAssistList() : void {
  	this.xnFaqServices.getProblemcateList().subscribe( res=>{
  		if( res.status === 1 ){
  			this.helpList = Array.isArray( res['data'] ) == true ? this.handleTreeList( res['data'] ) : []
        this.assistMainService.setHelpListData(this.helpList)
  		}
  	},error=>{
  		throw new Error(error)
  	})
  }

  /*
  选中的分类
   */
  public fnAcceptData( data : any ) : void {
  	this.classifyParentService.setSubject( data )
  	this.riccioPboxService.setSubject( {} )
  }

  /*
  处理树形结构数据
   */
  public handleTreeList( data: Array<any>[] ) : Array<any> {

    return [
      {
        'name': '作为一级菜单',
        'id': 0,
        'chilren': data[0]['name'] == '作为一级菜单' ? data[0]['chilren'] : [...data] 
      }
    ]


  }

}
