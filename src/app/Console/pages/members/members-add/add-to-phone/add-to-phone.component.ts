import { Component, OnInit,Output, EventEmitter } from '@angular/core';

import { GrMembersService }			from '../../../../services'

import { RiccioNotificationsService }			from '../../../../../Public/riccio-notifications/riccio-notifications.service'
import { RiccioModalService }    from '../../../../../Public/riccio-modal/riccio-modal.service'

import { PhoneAddData }			from './PhoneAddData'

@Component({
  selector: 'app-add-to-phone',
  templateUrl: './add-to-phone.component.html',
  styleUrls: ['../../../../Console.component.scss','../members-add.component.scss','./add-to-phone.component.scss']
})
export class AddToPhoneComponent implements OnInit {

 
  public FirstMobileData:any;
  public PostMobileAddData:any[];

  public TabSymbol:string;

  public batchValue:string;
  public batchDanger:boolean;

  public BtnData:any;

  @Output() callData:EventEmitter<string>

  constructor(
  	public grMembersService:GrMembersService,
    public riccioModalService:RiccioModalService,
  	public riccioNotificationsService:RiccioNotificationsService
  ) { 
    this.callData = new EventEmitter<string>()
    this.batchDanger = false;
  	this.FirstMobileData = {'mobile':'','name':'','danger':false};
  	this.BtnData = new PhoneAddData().BtnData;
  	this.PostMobileAddData = [];
  	this.TabSymbol = 'OneByOne';
  	this.batchValue = ''
  }

  ngOnInit() {
  }

  //点击添加更多
  public FnAddMore(i:number):void{
  	this.PostMobileAddData = [...this.PostMobileAddData,{'mobile':'','name':'','danger':false}]
  }

  //发出邀请按钮事件
  public FnPostMobile():void{

  	let obj = {};
    let bool = true;

  	if(this.TabSymbol==='OneByOne'){
  		Object.assign(obj,{
        'action':'sms_share',
  			'type':1,
  			'info':[this.FirstMobileData,...this.PostMobileAddData]
  		})

      obj['info'].map(e=>{

        e['danger']=e['mobile'].trim()==""||!(/^1[34578]\d{9}$/.test(e['mobile'].toString()))?(()=>{
          return true
        })():false;

        if(e['danger']==true) bool=false

      })

  	}else if(this.TabSymbol==='batch'){
  		Object.assign(obj,{
        'action':'sms_share',
  			'type':2,
  			'info':this.batchValue
  		})

      this.batchDanger = obj['info'].trim()===""?(()=>{
          bool=false;
          return true;
      })():false;

  	}

    if(bool===true){
      this.BtnData.name = '邀请中...';
      this.BtnData.disabled = true;
      this.grMembersService.postUserSmsShare(obj).subscribe(res=>{
        this.BtnData = new PhoneAddData().BtnData;
        if(res.status===1){
          this.SwitchShowNotifications('success')
        }
      },error=>{
        throw new Error(error);
      })
    }else if(bool===false){
      this.SwitchShowNotifications('danger')
    }


  }

  //删除某一条短信邀请
  public FnDelMobile(list:any,i:number):void{
  	this.PostMobileAddData.splice(i,1)
  }


  //弹窗提示哪些内容
  public SwitchShowNotifications(str:string):void{
    let obj = {};
    switch (str) {
      case "danger":
        Object.assign(obj,{
            text:'请输入正确的手机号',
            status:'danger',
            position:{
              right:'30',
              top:'30'
            }
        })
        break;
      case "success":
        Object.assign(obj,{
            text:'邀请成功',
            status:'success',
            position:{
              right:'30',
              top:'30'
            }
        })
        break;
      
      default:break;

    }

    this.riccioNotificationsService.setSubject(obj)

  }

  /**
   * @author GR-03
   * @copyright 关闭视图
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public close():void{
    this.callData.emit('close')
  }

}
