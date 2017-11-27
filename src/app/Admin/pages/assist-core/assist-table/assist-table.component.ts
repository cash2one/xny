import { Component, OnInit,Input,OnDestroy,Output,EventEmitter } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription'

import { tableTitle }		from './table-title'
import { RiccioModalService }		from '../../../../Public/riccio-modal/riccio-modal.service'
import { AssistMenuService }    from '../assist-menu/assist-menu.service'
import { GrAssistService }  from '../../../services' 
import { AssistTableService }    from './assist-table.service'
import { RiccioNotificationsService }    from '../../../../Public/riccio-notifications/riccio-notifications.service'

export type SPINNERTYPE = 'show' | 'empty' | 'hide'

@Component({
  selector: 'app-assist-table',
  templateUrl: './assist-table.component.html',
  styleUrls: ['../../../Admin.component.scss','../../../../Public/theme/common/common.scss','./assist-table.component.scss']
})
export class AssistTableComponent implements OnInit {

  public tableTitle:string[]  // 表格标题
  public helpDocList : Array<any>

  public docIdRX$ : Subscription
  public successRX$ : Subscription

  public spinnerType : SPINNERTYPE

  public docId : number

  public checkMenuName : string  // 选中的分类数据

  public total : number //分页总数
  public page : number | string //当前页数

  public isSort : number | string // 是否显示排序字段
  public autoSort : number | string // 验证是否和上一次排序值相同

  @Output() public docDataEmit : EventEmitter<{type:string,data:any}>

  constructor(
  	private riccioModalService : RiccioModalService,
    private assistMenuService  : AssistMenuService,
    private grAssistService    : GrAssistService,
    private assistTableService : AssistTableService,
    private riccioNotificationsService : RiccioNotificationsService
  ) {
  	this.tableTitle = new tableTitle().data
    this.helpDocList = []
    this.checkMenuName = ''
    this.isSort = -1
    this.autoSort = -1
    this.spinnerType = 'empty'
    this.docDataEmit = new EventEmitter<{type:string,data:any}>()

    this.docIdRX$ = this.assistMenuService.getDocId().subscribe(res=>{
      this.docId = res['id']
      this.checkMenuName = res['name']
      this.getHelpDocList( res['id'] )
    })

    this.successRX$ = this.assistTableService.getSuccess().subscribe(res=>{

      if(res == true) {
        this.getHelpDocList(this.docId)
        
      }

    })


  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.docIdRX$.unsubscribe()
    this.successRX$.unsubscribe()
  }

  /*
  添加文档
   */
  public addModalDoc() : void {

    console.log(this.docId)
    if(this.docId) {
      let obj = {
        'type': 'ADD',
        'data': null
      }

      this.docDataEmit.emit(obj)
      this.assistTableService.setSubject(obj)
    }else {
      this.riccioNotificationsService.setSubject({text:'请先选择分类',status:'danger'})
    }

  }

  /*
  编辑文档
   */
  public editModalDoc( data : any ) : void {

    let obj = {
      'type': 'EDIT',
      'data': data
    }

    this.docDataEmit.emit(obj)
    this.assistTableService.setSubject(obj)

  }

  public delModalDoc( data : any ) : void {

    let obj = {
      'type': 'DEL',
      'data': data
    }

    this.docDataEmit.emit(obj)
    this.assistTableService.setSubject(obj)


  }

  /*
  获取表格列表数据
   */
  public getHelpDocList( id : number, page : number | string = 1 ) : void{

    this.spinnerType = 'show'

    this.grAssistService.getHelpList({
      'catid': id,
      'name': '',
      'page': page
    }).subscribe(res=>{
      this.spinnerType = 'hide'
      if(res.status === 1) {
        this.helpDocList = [...res['data']['data']]
        this.total = res['data']['total']
        if( this.helpDocList.length == 0 ) this.spinnerType = 'empty'
      }
    },error=>{
      throw new Error(error)
    })

  }

  /*
  排序方法
   */
  public sortListorder( data: any ) : void {

    if(this.autoSort != data['listorder']) {
      
      this.grAssistService.getHelpSort({
        'id': data['id'],
        'sort': data['listorder']
      }).subscribe(res=>{
        if(res.status===1){

        }
      },error=>{
        throw new Error(error)
      })
    }
    

  }

}
