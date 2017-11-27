import { Component, OnInit,EventEmitter,Output,Input } from '@angular/core';

@Component({
  selector: 'app-select-month',
  templateUrl: './select-month.component.html',
  styleUrls: ['./select-month.component.scss']
})
export class SelectMonthComponent implements OnInit {

	@Input() selectMonthData
	@Output() callMonthName:EventEmitter<any> = new EventEmitter<any>()

	public monthNames:any = [
		{id:1,name:"一月"},
		{id:2,name:"二月"},
		{id:3,name:"三月"},
		{id:4,name:"四月"},
		{id:5,name:"五月"},
		{id:6,name:"六月"},
		{id:7,name:"七月"},
		{id:8,name:"八月"},
		{id:9,name:"九月"},
		{id:10,name:"十月"},
		{id:11,name:"十一月"},
		{id:12,name:"十二月"}
	]

  constructor() { }

  ngOnInit() {
  	
  }

  public FnSelectName(list){
  	this.callMonthName.emit(list)
  }

}
