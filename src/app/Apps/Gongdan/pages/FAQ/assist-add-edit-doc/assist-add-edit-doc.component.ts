import { Component, OnInit,OnDestroy,Input,Output,EventEmitter,OnChanges,SimpleChanges, ElementRef } from '@angular/core';
import { Subscription }  from 'rxjs/Subscription'

import { DocObj }		from './doc'
import { AssistTableService }    from '../assist-table/assist-table.service'
import { XnFaqServices }    from '../../../services'
import { RiccioNotificationsService }    from '@gr-public/riccio-notifications/riccio-notifications.service'
import { RiccioModalService }    from '@gr-public/riccio-modal/riccio-modal.service'
import { RiccioPboxService }    from '@gr-public/riccio-pbox/riccio-pbox.service'
import { AssistMenuService }    from '../assist-menu/assist-menu.service'

import { HelpDocService }  from './help-doc/help-doc.service'

@Component({
  selector: 'app-assist-add-edit-doc',
  templateUrl: './assist-add-edit-doc.component.html',
  styleUrls: ['../../../../../Public/theme/common/common.scss','./assist-add-edit-doc.component.scss']
})
export class AssistAddEditDocComponent implements OnInit {

  @Input() public docId : number
  @Input() public TYPE : any
  @Input() public docData : any

  @Output() public emitHelpDoc: EventEmitter<any> = new EventEmitter<any>()
  @Output() public removePboxType: EventEmitter<any> = new EventEmitter<any>()

  public DocObj : DocObj // 文档对象数据
  public buttonType : boolean     // 按钮是否禁用

  public pboxRX$: Subscription

  public helpName: string // 帮助文档的名称

  // public TYPE : string = 'ADD'

  constructor(
    private riccioNotificationsService: RiccioNotificationsService,
    private riccioPboxService:          RiccioPboxService,
    private xnFaqServices:              XnFaqServices,
    private riccioModalService:         RiccioModalService,
    private assistTableService:         AssistTableService,
    private assistMenuService:          AssistMenuService,
    private helpDocService:             HelpDocService
  ) {
  	this.DocObj = new DocObj()
  	this.buttonType = true
    this.TYPE = 'ADD'
    this.helpName = ''

    this.pboxRX$ = this.riccioPboxService.getEmit().subscribe(res=>{
        this.removePboxType.emit('')
       if(res['type']=="HELP_DOC") {
         let data = res['data']
         this.helpName = data['name']
         this.DocObj['item_id'] = data['id']
       }
    })

  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.DocObj = new DocObj()
    this.pboxRX$.unsubscribe()
  }

  ngOnChanges(changes: SimpleChanges) {
    this.DocObj = new DocObj()
    this.DocObj['cat_id'] = this.docId
    if(this.TYPE == 'EDIT') {
      this.DocObj = new DocObj(this.docData)
      this.helpName = this.docData['help_name']
    }
  }

  /*
  获取文档详情
   */
  // public getDocInfo( id:number | string ) : void {

  //   this.xnFaqServices.getHelpInfo({
  //     'id': id
  //   }).subscribe(res=>{
  //     if(res.status === 1 ){

  //       this.DocObj = new DocObj(res['data'])
  //       this.DocObj['id'] = res['data']['id']

  //     }
  //   },error=>{
  //     throw new Error(error)
  //   })

  // }


  /*
  接受按钮提交
   */
  public acceptBtnEmit( value:boolean ) : void {
    if(this.TYPE == 'ADD') {
      this.handleAddDoc()
    }else if(this.TYPE == 'EDIT') {
      this.handleEditDoc() 
    }

  }


  /*
  添加文档
   */
  public handleAddDoc() : void {
    console.log(this.DocObj)
    this.xnFaqServices.postProblemAdd({
      ...this.DocObj
    }).subscribe(res=>{

      if(res.status === 1) {

        this.riccioNotificationsService.setSubject({text:'添加成功'})
        this.assistTableService.setSuccess(true)
        this.Close()

      }

    },error=>{
      throw new Error(error)
    })

  }

  /*
  编辑文档
   */
  public handleEditDoc() : void {

    this.xnFaqServices.postProblemEdit({
      ...this.DocObj,
      'id': this.docData['id']
    }).subscribe(res=>{

      if(res.status === 1) {

        this.riccioNotificationsService.setSubject({text:'编辑成功'})
        this.assistTableService.setSuccess(true)
        this.Close()

      }

    },error=>{
      throw new Error(error)
    })

  }

  /*
  关闭窗口
   */
  public Close() : void {
    this.riccioModalService.setSubject( {} )
    this.removePboxType.emit('')
  }

  /*
  点击选择帮助文档
   */
  public fnShowDocHelpList( event: ElementRef ): void {
    this.emitHelpDoc.emit({
      'el': event
    })
  }

}
