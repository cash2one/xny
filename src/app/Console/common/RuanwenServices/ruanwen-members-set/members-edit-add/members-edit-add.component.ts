import { Component, OnInit,Input,OnChanges,SimpleChanges,Output,EventEmitter } from '@angular/core';

import { memberData }		from './memberData'
import { write_price }    from './memberData'
import { GrRuanwenServices }	from '../../services'
import { RiccioNotificationsService }	from '../../../../../Public/riccio-notifications/riccio-notifications.service'

@Component({
  selector: 'app-members-edit-add',
  templateUrl: './members-edit-add.component.html',
  styleUrls: ['../../../../../Public/theme/common/common.scss','./members-edit-add.component.scss']
})
export class MembersEditAddComponent implements OnInit {

  @Input() public memberId:number|string
  @Input() public memberData:memberData
  @Input() public type:string
  @Input() public write_price:any[]
  @Output() public emitClose:EventEmitter<string>
  @Output() public emitSuccess:EventEmitter<string>

  public btnType:boolean

  public mediaInfoData:any

  constructor(
  	public grRuanwenServices:GrRuanwenServices,
  	public riccioNotificationsService:RiccioNotificationsService
  ) { 
  	this.memberData = new memberData()
    this.write_price = new write_price().data
  	this.emitClose = new EventEmitter<string>()
  	this.emitSuccess = new EventEmitter<string>()
  	this.mediaInfoData = {}
  	this.btnType = true
  }

  ngOnInit() {
  	this.fnGetMediaData()
  }

  ngOnChanges(changes:SimpleChanges){
    this.btnType = true
  	if(changes['type']){

  	}
  }


  /**
   * @author GR-03
   * @copyright 获取账号设置信息
   * @param     [param]
   * @return    [return]
   */
  public fnGetMediaData():void{

  	this.grRuanwenServices.getAdminMediaGetMeida().subscribe(res=>{
  		if(res.status===1){
  			this.mediaInfoData = {...res['data']}
  		}
  	},error=>{
  		throw new Error(error)
  	})

  }

  public fnEdit():void{

    this.btnType = false
  	this.grRuanwenServices.postAdminMemberEdit({
  		...this.memberData,
     'write_price':this.write_price,
  		'id':this.memberId
  	}).subscribe(res=>{
  		this.btnType = true
  		if(res.status===1){
  			this.riccioNotificationsService.setSubject({text:'编辑成功'})
  			this.emitSuccess.emit('success')
			this.closer()
  		}
  	},error=>{
  		throw new Error(error)
  	})

  }

  /**
   * @author GR-03
   * @copyright 添加
   * @param     [param]
   * @return    [return]
   */
  public fnAdd():void{

    if(this.handlePostData()==true){
      this.btnType = false
      this.grRuanwenServices.postAdminMemberAdd({
        ...this.memberData,
       'write_price':this.write_price
      }).subscribe(res=>{
        this.btnType = true
        if(res.status===1){
          this.riccioNotificationsService.setSubject({text:'添加成功'})
          this.emitSuccess.emit('success')
        this.closer()
        }
      },error=>{
        throw new Error(error)
      })
    }

  }

  public handlePostData():boolean{

    let bool: boolean = true

    switch ('') {
      case this.memberData['name']:
        bool = false
        this.riccioNotificationsService.setSubject({text:'请填写会员组名称',status:'danger'})
        break;
      
      case this.memberData['discount']:
        bool = false
        this.riccioNotificationsService.setSubject({text:'请填写折扣',status:'danger'})
        break;

      default:
        (()=>{
          if(this.write_price.filter(e=>e['price']=='').length>0){
            bool = false
            this.riccioNotificationsService.setSubject({text:'代写价格必须全部填写',status:'danger'})
          }
        })()
        break;
    }

    return bool

  }

  /**
   * @author GR-03
   * @copyright 处理是添加还是编辑的按钮
   * @param     [param]
   * @return    [return]
   */
  public fnEditOrAdd():void{
  	if(this.type==='add'){
  		this.fnAdd()
  	}else if(this.type==='edit'){
  		this.fnEdit()
  	}
  }

  /**
   * @author GR-03
   * @copyright 关闭
   * @param     [param]
   * @return    [return]
   */
  public closer():void{
  	this.emitClose.emit('close')
  }

}
