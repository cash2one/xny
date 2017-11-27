import { Component, OnInit,OnDestroy } from '@angular/core';
import { Subscription }             from 'rxjs/Subscription'

import { GrAssistService }          from '../../../services'

import { RiccioPboxService }		    from '../../../../Public/riccio-pbox/riccio-pbox.service'
import { RiccioModalService }		    from '../../../../Public/riccio-modal/riccio-modal.service'
import { RiccioNotificationsService }  from '../../../../Public/riccio-notifications/riccio-notifications.service'

import { AssistMenuService }        from '../assist-menu/assist-menu.service'
import { AssistTableService }       from '../assist-table/assist-table.service'
import { ClassifyParentService }    from '../assist-add-edit-classify/classify-parent/classify-parent.service'
import { AssistMainService }        from '../assist-main/assist-main.service'

export type modalType     = 'DOC' | 'CLASSIFY' | 'DEL_DOC' | 'DEL_CLASSIFY' | ''
export type classifyType  = 'ADD' | 'EDIT' | ''
export type docType       = 'ADD' | 'EDIT' | ''
export type pboxOtherType = 'CLASSIFY_PARENT'

@Component({
  selector: 'app-assist-main',
  templateUrl: './assist-main.component.html',
  styleUrls: ['./assist-main.component.scss']
})
export class AssistMainComponent implements OnInit {
   
  public _modalType       : modalType
  public _classifyType    : classifyType
  public _docType         : docType
  public _pboxOtherType   : pboxOtherType

  public modalRX$ : Subscription
  public menuRX$ : Subscription

  public helpList : Array<any>
  public menuData : any // 选中的某一条分类数据
  public docId    : number // 选中的某一条分类数据的id
  public docData  : any  // 选中的某一条文档数据

  constructor(
  	private riccioModalService : RiccioModalService,
  	private riccioPboxService : RiccioPboxService,
    private grAssistService : GrAssistService,
    private assistMainService:AssistMainService,
    private assistMenuService:AssistMenuService,
    private classifyParentService:ClassifyParentService,
    private riccioNotificationsService:RiccioNotificationsService,
    private assistTableService : AssistTableService
  ) { 
  	this._modalType = ''
    this.helpList = []
    this.menuData = {}
    this.docData = {}
    this._classifyType = ''
    this._docType = ''
    this.docId = 0

  	this.modalRX$ = this.riccioModalService.getEmit().subscribe(res=>{
      switch (res['type']) {
        case "close":
          this._classifyType = ''
          this._docType = ''
          break;
        
        case "DEL_CLASSIFY":
          this.handleDelClassify(this.menuData['id'])
          break;

        case "DEL_DOC":
          this.handleDelDoc(res['data'])
          break;

        default:break;
      }

  	})

    this.menuRX$ = this.assistMenuService.getSubject().subscribe(res=>{
      console.log(res)
      this.menuData = {...res['data']}
    })

  }

  ngOnInit() {
    this.getAssistList()
  }

  ngOnDestroy() {
  	this.modalRX$ ? this.modalRX$.unsubscribe() : {}
    this.menuRX$.unsubscribe()
  }

  /*
  获取帮助分类列表的方法
   */
  public getAssistList() : void{
    this.grAssistService.getHelpcatList().subscribe( res=>{
      if( res.status === 1 ){

        this.helpList = Array.isArray( res['data'] ) == true ? [...res['data']] : []
        this.assistMainService.setHelpListData(this.helpList)

      }
    },error=>{
      throw new Error(error)
    })
  }

  /*
  接受menu组件的数据
  0代表添加子分类
  1代表编辑分类
  2代表删除分类
   */
  public acceptMenuEmit( id : number ) : void {
  	if( id == 0 ) {
      this._modalType = 'CLASSIFY'
  		this._classifyType = 'ADD'
      this.handleOpenModal( this._modalType )
  	}else if( id == 1 ) {
      this._modalType = 'CLASSIFY'
  		this._classifyType = 'EDIT'
      this.handleOpenModal( this._modalType )
  	}else if( id == 2 ) {
      this._modalType = 'DEL_CLASSIFY'
      this.handleOpenModal( this._modalType, id )
    }

  }

  public acceptTableDocEmit( Data : any ) : void {

    this.docData = Data['data']
    if( Data['type'] == 'ADD' ) {
      this._docType = 'ADD'
      this._modalType = 'DOC'
      this.handleOpenModal( this._modalType )
    }else if( Data['type'] == 'EDIT' ) {
      this._docType = 'EDIT'
      this._modalType = 'DOC'
      this.handleOpenModal( this._modalType )
    }else if( Data['type'] == 'DEL' ) {
      this._modalType = 'DEL_DOC'
      this.handleOpenModal( this._modalType,Data['data']['id'] )
    }


  }

  /*
  处理要显示哪个modal的函数
   */
  public handleOpenModal( type : modalType ,data:any = {}) : void {

  	switch (type) {
  		case "DOC":
  			(() => {
  				
  				this.riccioModalService.setSubject({
  					'header': this._docType == 'ADD' ? '添加文档' : this._docType == 'EDIT' ? '编辑文档' : '',
  					'size': 700,
  					'noBtn': true,
  					'type': 'DOC'
  				})

  			})()
  			break;
  		
  		case "CLASSIFY":
  			(() => {

  				this.riccioModalService.setSubject({
  					'header': this._classifyType == 'ADD' ? '添加子分类' : this._classifyType == 'EDIT' ? '编辑分类' : '',
  					'size': 700,
  					'noBtn': true,
  					'type': 'CLASSIFY'
  				})

  			})()
  			break;

      case "DEL_CLASSIFY":
        (() => {

          this.riccioModalService.setSubject({
            'header': '删除提示',
            'size': 700,
            'data': data,
            'btn' : {
              'name' : '确认',
              'status' : 'danger'
            },
            'type': 'DEL_CLASSIFY'
          })

        })()
        break;

      case "DEL_DOC":
        (() => {

          this.riccioModalService.setSubject({
            'header': '删除提示',
            'size': 700,
            'data': data,
            'btn' : {
              'name' : '确认',
              'status' : 'danger'
            },
            'type': 'DEL_DOC'
          })

        })()
        break;

  		default:break;
  	}

  }

  /*
  处理要显示哪个pbox组件的函数
   */
  public handleOpenPbox( type : string, data : any ) : void {

  	switch (type) {
  		case "CLASSIFY_PARENT":
  			
  			(() => {

  				let client = this.handleElementPosition( data['el'] )

  				this.riccioPboxService.setSubject({
  					'genre': 'other',
  					'type': 'CLASSIFY_PARENT',
  					'position': {
  						'left': client.left,
  						'top': client.top + 50,
  						'width': 500
  					},
  					...data
  				})
  			})()

  			break;
  		
  		default:break;
  	}

  }

  /*
  获取元素的位置
   */
  public handleElementPosition( data : any ) : any {
  	return data.getBoundingClientRect()
  }

  /*
  分类组件点击选择父级名称的时候
   */
  public acceptParentClassifyData(data: any) : void {	
  		console.log(data)
  		this._pboxOtherType = 'CLASSIFY_PARENT'
  		this.handleOpenPbox( 'CLASSIFY_PARENT' , data )
  }

  /*
  删除分类
   */
  public handleDelClassify( id:number | string ) : void {

    this.grAssistService.postHelpcatDel({
      'id': id
    }).subscribe(res=>{

      if(res.status===1){
        this.riccioNotificationsService.setSubject({text:'删除成功'})
        this.getAssistList()
      }

    },error=>{
      throw new Error(error)
    })

  }

  /*
  删除文档
   */
  public handleDelDoc( id : number ) : void {

    this.grAssistService.postHelpDel({
      'id': id
    }).subscribe(res=>{

      if(res.status===1){
        this.riccioNotificationsService.setSubject({text:'删除成功'})
        this.assistTableService.setSuccess(true)
      }

    },error=>{
      throw new Error(error)
    })

  }

}
