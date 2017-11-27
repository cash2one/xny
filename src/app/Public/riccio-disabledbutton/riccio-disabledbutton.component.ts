import { Component, OnInit,Input,OnChanges,Output, EventEmitter } from '@angular/core';

import { btnData }		from './btnData'

@Component({
  selector: 'riccio-button',
  templateUrl: './riccio-disabledbutton.component.html',
  styleUrls: ['./riccio-disabledbutton.component.scss']
})
export class RiccioDisabledbuttonComponent implements OnInit {

  @Input() public normal:string
  @Input() public disabled:string
  @Input() public open:boolean
  @Input() public status:string
  @Input() public bg:string

  @Output() emitStatus:EventEmitter<boolean>

  public btnData:btnData

  constructor() { 
    this.bg = ''
  	this.emitStatus = new EventEmitter<boolean>()
  	this.btnData = new btnData('按钮',false)
  }

  ngOnInit() {
  }

  ngOnChanges(){
  	this.open = this.open==true?true:false
  	this.status = this.status?this.status:'success'
  	this.changeBtn()
  }

  public changeBtn():void{
  	this.btnData = this.open==true
  	?new btnData(this.normal?this.normal:'你得传normal',false)
  	:new btnData(this.disabled?this.disabled:'你得传disabled',true)

  }

  public fnCallBack():void{
  	this.emitStatus.emit(true)
  }

}
