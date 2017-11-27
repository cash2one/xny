import { Component, OnInit,Input,ViewChild,OnChanges,SimpleChanges } from '@angular/core';

import { ruanwenInfo }		from './ruanwenInfo'

@Component({
  selector: 'app-order-write-ruanwen-info',
  templateUrl: './order-write-ruanwen-info.component.html',
  styleUrls: ['../../../../Public/theme/apps-common/common.scss','./order-write-ruanwen-info.component.scss']
})
export class OrderWriteRuanwenInfoComponent implements OnInit {
 
  @Input() public info:any
  @ViewChild('contentEl') public contentEl:any

  constructor() { 
  }

  ngOnInit() {
  }

  ngOnChanges(changes:SimpleChanges){
    if(changes['info']){
      this.fnContent(this.info['content'])
    }
  }

  public fnContent(content:string):void{
  	this.contentEl.nativeElement.innerHTML = content
  }

}
