import { Component, OnInit,OnDestroy,Output,EventEmitter,Input,OnChanges,SimpleChanges } from '@angular/core';
import { Subscription }    from 'rxjs/Subscription'

import { XnFaqServices }		from '../../../services'
import { pboxOption }		from './pbox-option'
import { RiccioPboxService }    from '@gr-public/riccio-pbox/riccio-pbox.service'
import { AssistMenuService }    from './assist-menu.service'

@Component({
  selector: 'app-assist-menu',
  templateUrl: './assist-menu.component.html',
  styleUrls: ['./assist-menu.component.scss']
})
export class AssistMenuComponent implements OnInit {

  public activeData : any    // 选中的某一条分类
  public pboxOption : Array<any> // 下拉框的选项
 
  public pboxRX$:Subscription

  @Output() public treePoboxEmit : EventEmitter<number>
  @Output() public docId : EventEmitter<number>
  @Input() public helpList : Array<any>

  constructor(
  	private xnFaqServices:XnFaqServices,
    private riccioPboxService:RiccioPboxService,
    private assistMenuService:AssistMenuService
  ) { 
  	this.helpList = []
    this.activeData = {}
  	this.pboxOption = new pboxOption().data
    this.treePoboxEmit = new EventEmitter<number>()
    this.docId = new EventEmitter<number>()

    this.pboxRX$ = this.riccioPboxService.getEmit().subscribe(res => {
      if( res['type'] === 'tree' ) {
        let _id = res['data']['id']
        this.treePoboxEmit.emit( res['data']['id'] )
        this.assistMenuService.setSubject({
          'type': _id == 0 ? 'ADD': _id == 1?'EDIT': _id == 2?'DEL':'',
          'data': this.activeData
        })

      }
    })

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.pboxRX$.unsubscribe()
  }

  ngOnChanges( changes: SimpleChanges ) { 
    if(this.helpList) {
      this.assistMenuService.setHelpList(this.helpList)
    }
  }

  /*
  选中pbox组件的人一条数据返回对应的详情
   */
  public pboxActive(event : any) : void{
    if( event['chilren'].length>0 ) {
      this.pboxOption = new pboxOption().noDel
    }else {
      this.pboxOption = new pboxOption().data
    }
    this.activeData = {...event}
  }


  /*
  选中的pbox数据
   */
  public acceptEmitData( data : any ) : void {
    this.docId.emit( data['id'] )
    this.assistMenuService.setDocId( data )
  }

  /*
  添加一级的分类菜单列表
   */
  public addParentMenu() : void {
    this.treePoboxEmit.emit( 0 )
    this.assistMenuService.setSubject({
      'type': 'ADD',
      'data': { id: 0}
    })
  }  

}
