import { Component, OnInit,Input,OnChanges,SimpleChange,Output,EventEmitter } from '@angular/core';

import { RiccioModalService }		from '@gr-public/riccio-modal/riccio-modal.service'

@Component({
  selector: 'app-activity-matter',
  templateUrl: './activity-matter.component.html',
  styleUrls: ['../../../../../../Public/theme/apps-common/common.scss','./activity-matter.component.scss']
})
export class ActivityMatterComponent implements OnInit {

  @Output() public emitType:EventEmitter<string>

  constructor(
  	public riccioModalService:RiccioModalService
  ) { 
  	this.emitType = new EventEmitter<string>()
  }

  ngOnInit() {
  }

  /**
   * @author GR-03
   * @copyright 点击确定按钮返回显示验证码弹窗
   * @param     [param]
   * @return    [return]
   */
  public fnEmitShowCode():void{
  	this.emitType.emit('code')
  	// this.closer()
  }

  public closer():void{
  	this.riccioModalService.setSubject({})
  }

}
