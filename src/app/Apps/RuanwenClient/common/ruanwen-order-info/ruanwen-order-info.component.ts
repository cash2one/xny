import { Component, OnInit,Input,OnChanges,SimpleChanges,ViewChild } from '@angular/core';

import { orderInfo }		from './orderInfo'

@Component({
  selector: 'app-ruanwen-order-info',
  templateUrl: './ruanwen-order-info.component.html',
  styleUrls: ['../../../../Public/theme/apps-common/common.scss','./ruanwen-order-info.component.scss']
})
export class RuanwenOrderInfoComponent implements OnInit {

  @ViewChild('contentEl') public contentEl:any
  @Input() public orderInfo:orderInfo

  constructor() { 
  	this.orderInfo = new orderInfo()
  }

  ngOnInit() {
  }

  ngOnChanges(changes:SimpleChanges){
    if(changes['orderInfo']){
      this.insertText()
    }
  }

  /**
   * @author GR-03
   * @copyright 注入文本信息识别标签
   * @param     [param]
   * @return    [return]
   */
  public insertText():void{
    let el = this.contentEl.nativeElement
    el.innerHTML = this.orderInfo['content']
  }

}
