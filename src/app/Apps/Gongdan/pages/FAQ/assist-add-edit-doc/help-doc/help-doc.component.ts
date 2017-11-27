import { Component, OnInit, Output, EventEmitter,OnDestroy } from '@angular/core';
import { Subscription }  from 'rxjs/Subscription'

import { XnFaqServices }		from '../../../../services'
import { RiccioPboxService }		from '@gr-public/riccio-pbox/riccio-pbox.service'
import { HelpDocService }		from './help-doc.service'
import { AssistMainService }    from '../../assist-main/assist-main.service'
import { AssistMenuService }  from '../../assist-menu/assist-menu.service'

@Component({
  selector: 'app-help-doc',
  templateUrl: './help-doc.component.html',
  styleUrls: ['./help-doc.component.scss']
})
export class HelpDocComponent implements OnInit {

  public helpList : Array<any>

  public helpListRX$ : Subscription

  constructor(
  	private xnFaqServices : XnFaqServices,
  	private riccioPboxService : RiccioPboxService,
    private assistMainService:AssistMainService,
    private assistMenuService:AssistMenuService,
  	private helpDocService:HelpDocService
  ) { 
  	this.helpList = []

    this.helpListRX$ = this.assistMainService.getHelpDocData().subscribe(res=>{
      this.helpList = res
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
  获取帮助文档的函数
   */
  public getAssistList() : void {
  	this.xnFaqServices.postProblemHelpList().subscribe( res=>{
  		if( res.status === 1 ){
  			this.helpList = Array.isArray( res['data']['data'] ) == true ? [...res['data']['data']]: []
            this.assistMainService.setHelpListData(this.helpList)
  		}
  	},error=>{
  		throw new Error(error)
  	})
  }

  /*
  选中的文档
   */
  public fnAcceptData( data : any ) : void {
  	this.helpDocService.setSubject( data )
  	this.riccioPboxService.setSubject( {} )
  }

}
