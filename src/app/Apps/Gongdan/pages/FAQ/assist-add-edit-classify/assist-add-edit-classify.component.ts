import { Component,
         OnInit,
         Input,
         OnChanges,
         SimpleChanges,
         Output,
         EventEmitter,
         ElementRef,
         OnDestroy } from '@angular/core';
import { Subscription }  from 'rxjs/Subscription'

import { classifyObj }		from './classify'
import { XnFaqServices }		from '../../../services'
import { AssistMenuService }    from '../assist-menu/assist-menu.service'
import { RiccioPboxService }    from '@gr-public/riccio-pbox/riccio-pbox.service'
import { ClassifyParentService }  from './classify-parent/classify-parent.service'
import { RiccioNotificationsService }  from '@gr-public/riccio-notifications/riccio-notifications.service'
import { RiccioModalService }    from '@gr-public/riccio-modal/riccio-modal.service'
import { AssistMainService }  from '../assist-main/assist-main.service'

export type classifyType = 'ADD' | 'EDIT'

@Component({
  selector: 'app-assist-add-edit-classify',
  templateUrl: './assist-add-edit-classify.component.html',
  styleUrls: ['../../../../../Public/theme/common/common.scss','./assist-add-edit-classify.component.scss']
})
export class AssistAddEditClassifyComponent implements OnInit {
  
  @Input() public TYPE : classifyType
  @Input() public menuEditData : any
  @Input() public helpList : Array<any>
  @Output() public parentPbox : EventEmitter<any>
  @Output() public successNotifications : EventEmitter<boolean>

  // public TYPE : classifyType
  public classifyObj : classifyObj // 添加的分类对象类
  public buttonType : boolean     // 按钮是否禁用

  public parentRX$ : Subscription

  public levelHelpList : any[]  // 平级的帮助分类列表    
  public parentName : string   // 父级名称

  constructor(
  	private xnFaqServices : XnFaqServices,
    private assistMenuService : AssistMenuService,
    private riccioPboxService : RiccioPboxService,
    private classifyParentService : ClassifyParentService,
    private assistMainService:AssistMainService,
    private riccioModalService : RiccioModalService,
    private riccioNotificationsService : RiccioNotificationsService
  ) {
  	this.classifyObj = new classifyObj()
    this.levelHelpList = []
    this.parentPbox = new EventEmitter<any>()
    this.successNotifications = new EventEmitter<boolean>()
  	this.buttonType = true
    this.parentName = ''

    this.parentRX$ = this.classifyParentService.getSubject().subscribe(res=>{
      this.parentName = res['name']
      this.classifyObj['parent_id'] = res['id']
    })

  }

  ngOnInit() {
    this.getAssistList()
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.TYPE) {
      this.classifyObj = this.TYPE == 'EDIT' ? (()=>{
        return {
          ...(new classifyObj(this.menuEditData)),
          'id': this.menuEditData['id']
        }
      })() : (()=>{
        this.parentName = this.handleFindParentData(this.menuEditData['id'])
        return {
          ...(new classifyObj()),
          'parent_id': this.menuEditData['id']
        }
      })()
      this.parentName = this.handleFindParentData(this.classifyObj['parent_id'])
    }
    if(this.helpList.length) {
      this.levelHelpList = [...this.handleHelpList(this.helpList)]
    }
  }

  ngOnDestroy() {
    this.parentRX$.unsubscribe()
  }

  /*
  获取帮助分类列表的方法
   */
  public getAssistList() : void{
    this.xnFaqServices.getProblemcateList().subscribe( res=>{
      if( res.status === 1 ){

        this.helpList = Array.isArray( res['data'] ) == true ? [...res['data']] : []
        this.levelHelpList = [...this.handleHelpList(this.helpList)]
        this.parentName = this.handleFindParentData(this.classifyObj['parent_id'])

      }
    },error=>{
      throw new Error(error)
    })
  }

  /*
  发射数据给父级
   */
  public parentEmitData(event: ElementRef) : void{
    this.parentPbox.emit({
      'el': event,
      'data': this.classifyObj['parent_id']
    })
  }


  /*
  接收按钮事件
   */
  public fnButtonEmit(value: boolean) : void {
    if( this.handleError( this.classifyObj ) == true ) {

      switch (this.TYPE) {
        case "ADD":
          this.postAddClassify()
          break;
        
        case "EDIT":
          this.postEditClassify()
          break;

        default:break;
      }

    }

  }

  /*
  添加分类的函数
   */
  public postAddClassify() : void{

    this.xnFaqServices.postProblemcateAdd( {...this.classifyObj} ).subscribe( res=> {  

      if( res.status === 1 ) {
        this.riccioNotificationsService.setSubject( {text: '添加成功'} )
        this.successNotifications.emit( true )
        this.Close()
      }

    }, error => {
      throw new Error(error)
    })

  }

  /*
  编辑分类的函数
   */
  public postEditClassify() : void{

    this.xnFaqServices.postProblemcateEdit( {...this.classifyObj} ).subscribe( res=> {  

      if( res.status === 1 ) {
        this.riccioNotificationsService.setSubject( {text: '修改成功'} )
        this.successNotifications.emit( true )
        this.Close()
      }

    }, error => {
      throw new Error(error)
    })

  }

  /*
  数据对象验证
   */
  public handleError( data : classifyObj ) : boolean {

    let bool : boolean = true

    switch ('') {
      case data['name']:
        this.riccioNotificationsService.setSubject( {text: '请填写分类名称', status:'danger'} )
        bool = false
        break;
      
      case this.parentName:
        this.riccioNotificationsService.setSubject( {text: '请选择父级', status:'danger'} )
        bool = false
        break;

      default:break;
    }

    return bool

  }

  /*
  关闭视图
   */
  public Close() : void {
    this.riccioModalService.setSubject( {} )
  }

  /*
  根据平级的分类列表找到父级名称和ID
   */
  public handleFindParentData( id: number ) : string {

    let arr: any[] = this.levelHelpList.filter(_e=>_e['id'] == id)

    return Array.isArray(arr) == true && arr.length>0 ? arr[0]['name'] : ''

  }

  /*
  处理平级的帮助分类列表
   */
  public handleHelpList( data: any[] ) : any[] {
    let result: any[] = []
    let fn = (_data) => {

      _data.map((_e,_i)=>{
        result.push(_e)
        if(Array.isArray(_data[_i]['chilren']) == true && _data[_i]['chilren'].length>0) {
          fn(_data[_i]['chilren'])
        }
      })
      
    }
    fn( data )
    return result

  }

}
