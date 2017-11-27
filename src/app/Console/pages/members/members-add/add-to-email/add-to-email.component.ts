import { Component, OnInit,Output, EventEmitter} from '@angular/core';

import { GrMembersService }			from '../../../../services'

import { RiccioNotificationsService }  from '../../../../../Public/riccio-notifications/riccio-notifications.service'

import { EmailAddData }    from './EmailAddData'

@Component({
  selector: 'app-add-to-email',
  templateUrl: './add-to-email.component.html',
  styleUrls: ['../../../../Console.component.scss','../members-add.component.scss','./add-to-email.component.scss']
})
export class AddToEmailComponent implements OnInit {

  public FirstEmailData:any;
  public PostEmailAddData:any[];

  public TabSymbol:string;

  public batchValue:string;
  public batchDanger:boolean;

  public BtnData:any;

  @Output() callData:EventEmitter<string>

  constructor(
  	public grMembersService:GrMembersService,
  	public riccioNotificationsService:RiccioNotificationsService
  ) { 
    this.callData = new EventEmitter<string>()
  	this.FirstEmailData = {'email':'','name':'','danger':false};
  	this.PostEmailAddData = [];
  	this.TabSymbol = 'OneByOne';
  	this.batchValue = '';
    this.batchDanger = false;
    this.BtnData = new EmailAddData().BtnData;
  }

  ngOnInit() {
  }

  //点击添加更多
  public FnAddMore(i:number):void{
  	this.PostEmailAddData = [...this.PostEmailAddData,{'email':'','name':'','danger':false}]
  }

  //发出邀请按钮事件
  public FnPostEamil():void{
    let bool=true;
  	let obj = {};
  	if(this.TabSymbol==='OneByOne'){
  		Object.assign(obj,{
        'action':'mail_share',
  			'type':1,
  			'info':[this.FirstEmailData,...this.PostEmailAddData]
  		})

      obj['info'].map(e=>{

        e['danger'] = e['email'].trim()===""||!(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(e['email'].toString()))
        ?(()=>{
          return true
        })()
        :false;

        if(e['danger']===true) bool = false;

      })

  	}else if(this.TabSymbol==='batch'){
  		Object.assign(obj,{
        'action':'mail_share',
  			'type':2,
  			'info':this.batchValue
  		})

      this.batchDanger = obj['info'].trim()===""?(()=>{
        return true
      })():false

  	}

    if(bool===true){
      this.BtnData.name = "邀请中...";
      this.BtnData.disabled = true;

      this.grMembersService.postAdminMailRequest(obj).subscribe(res=>{
        this.BtnData = new EmailAddData().BtnData;
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
  public FnDelEmail(list:any,i:number):void{
  	this.PostEmailAddData.splice(i,1)
  }

  //弹窗提示哪些内容
  public SwitchShowNotifications(str:string):void{
    let obj = {};
    switch (str) {
      case "danger":
        Object.assign(obj,{
            text:'请填写正确的邮箱',
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
