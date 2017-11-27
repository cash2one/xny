import { Component, OnInit,Input,ViewChild,OnChanges,SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-order-write-info',
  templateUrl: './order-write-info.component.html',
  styleUrls: ['../../../../Public/theme/apps-common/common.scss','./order-write-info.component.scss']
})
export class OrderWriteInfoComponent implements OnInit {

  @ViewChild('contentEl') public contentEl:any
  @Input() public content:string

  constructor() { 
  }

  ngOnInit() {
  }

  ngOnChanges(changes:SimpleChanges){
  	if(changes['content']){
	  	this.insetContent()
  	}
  }

  public insetContent():void{
  	this.contentEl.nativeElement.innerHTML = this.content
  }

}
