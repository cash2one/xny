import { Component, OnInit, Input, OnChanges,SimpleChanges  } from '@angular/core';

import { GrMembersService }		from '../../../../services'
import { RiccioNotificationsService }  from '../../../../../Public/riccio-notifications/riccio-notifications.service'
import { RiccioModalService }		from '../../../../../Public/riccio-modal/riccio-modal.service'

@Component({
  selector: 'app-add-code-sms',
  templateUrl: './add-code-sms.component.html',
  styleUrls: ['../../../../../Public/theme/apps-common/common.scss','./add-code-sms.component.scss']
})
export class AddCodeSmsComponent implements OnInit {
   
  @Input() public codeUserId: number
  @Input() public userPhone: string | number

  public code: string   //验证吗

  constructor(
  	private grMembersService: GrMembersService,
  	private riccioNotificationsService: RiccioNotificationsService,
  	private riccioModalService: RiccioModalService
  ) { 
  	this.code = ''
  }

  ngOnInit() {
  }

  ngOnChanges( changes: SimpleChanges ) {
  }	

  /*
  点击验证函数
   */
  public fnVerifyCode() : void {

  	this.grMembersService.getUserSmscheck({
  		'user_id': this.codeUserId,
  		'code': this.code
  	}).subscribe(res=> {

  		if(res.status === 1) {
  			this.riccioModalService.setSubject({})
  			this.riccioNotificationsService.setSubject({'text': '验证成功',})
  		}

  	},error=> {
  		throw new Error(error)
  	})

  }

}

