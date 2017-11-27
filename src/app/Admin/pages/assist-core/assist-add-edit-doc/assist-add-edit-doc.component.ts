import { Component, OnInit,OnDestroy,Input,Output,EventEmitter,OnChanges,SimpleChanges } from '@angular/core';
import { Subscription }  from 'rxjs/Subscription'

import { DocObj }		from './doc'
import { AdminService }		from '../../../Admin.service'
import { AssistTableService }    from '../assist-table/assist-table.service'
import { GrAssistService }    from '../../../services'
import { RiccioNotificationsService }    from '../../../../Public/riccio-notifications/riccio-notifications.service'
import { RiccioModalService }    from '../../../../Public/riccio-modal/riccio-modal.service'
import { AssistMenuService }    from '../assist-menu/assist-menu.service'

@Component({
  selector: 'app-assist-add-edit-doc',
  templateUrl: './assist-add-edit-doc.component.html',
  styleUrls: ['../../../../Public/theme/common/common.scss','./assist-add-edit-doc.component.scss']
})
export class AssistAddEditDocComponent implements OnInit {

  @Input() public docId : number
  @Input() public TYPE : any
  @Input() public docData : any

  public DocObj : DocObj // 文档对象数据
  public buttonType : boolean     // 按钮是否禁用
  public ueditorConf : any // ued配置
  public uedShow : boolean 

  public tableRX$ : Subscription

  // public TYPE : string = 'ADD'

  constructor(
  	private adminService:AdminService,
    private riccioNotificationsService:RiccioNotificationsService,
    private grAssistService:GrAssistService,
    private riccioModalService:RiccioModalService,
    private assistTableService:AssistTableService,
    private assistMenuService:AssistMenuService
  ) {
  	this.DocObj = new DocObj()
  	this.buttonType = true
  	this.uedShow = false
  	this.ueditorConf = this.adminService.uedConf()
    this.TYPE = 'ADD'

  }

  ngOnInit() {
  	setTimeout(()=>{
      this.uedShow = true
    },100)
  }

  ngOnDestroy(){
  	this.uedShow = false
    this.DocObj = new DocObj()
  }

  ngOnChanges(changes: SimpleChanges) {
    this.DocObj = new DocObj()
    this.DocObj['catid'] = this.docId
    if(this.TYPE == 'EDIT') {
        this.getDocInfo(this.docData['id'])
    }
  }

  /*
  获取文档详情
   */
  public getDocInfo( id:number | string ) : void {

    this.grAssistService.getHelpInfo({
      'id': id
    }).subscribe(res=>{
      if(res.status === 1 ){

        this.DocObj = new DocObj(res['data'])
        this.DocObj['id'] = res['data']['id']

      }
    },error=>{
      throw new Error(error)
    })

  }


  /*
  接受按钮提交
   */
  public acceptBtnEmit( value:boolean ) : void {
    console.log(this.TYPE)
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
    this.grAssistService.postHelpAdd({
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

    this.grAssistService.postHelpEdit({
      ...this.DocObj
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


  public Close() : void {
    this.riccioModalService.setSubject( {} )
  }


}
