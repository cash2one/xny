import { Component, OnInit,Input,ElementRef,Output,EventEmitter,ViewChild,OnChanges } from '@angular/core';

@Component({
  selector: 'app-select-single',
  templateUrl: './select-single.component.html',
  styleUrls: ['./select-single.component.scss']
})
export class SelectSingleComponent implements OnInit {

  @ViewChild('itemLi') public itemLi:any
  @Input() public list:any
  @Input() public id:number
  @Output() public emitPboxData:EventEmitter<any>

  constructor() {
  	this.emitPboxData = new EventEmitter<any>()
  }

  ngOnInit() {
  }

  ngOnChanges(){
  }

  /**
   * @author GR-03
   * @copyright 发射pbox参数的数据给父级
   * @param     [param]
   * @return    [return]
   * @param     {any[]}      data    [description]
   * @param     {ElementRef} dataEle [description]
   */
  public fnOutputData(data:any[],dataEle:ElementRef):void{
  	let client = this.itemLi.nativeElement.getBoundingClientRect()
  	this.emitPboxData.emit({
  		'genre':'option',
  		'el':dataEle,
  		'data':data,
  		'type':this.id,
  		'position':{
  			'left':client.left,
  			'top':client.top+client.height+10,
  			'width':160
  		}
  	})
  }

}
