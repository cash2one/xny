import { Component, OnInit,Input ,EventEmitter,Output} from '@angular/core';

import { PersonalService }        from '../../../Public/Personal/personal.service'

@Component({
  selector: 'app-select-year',
  templateUrl: './select-year.component.html',
  styleUrls: ['./select-year.component.css']
})
export class SelectYearComponent implements OnInit {

	@Input() selectYearData
	@Output() callYearName:EventEmitter<any> = new EventEmitter<any>()

	public yearNames:any[] = [];
  public NoweYear:number

  constructor(
    public personalService:PersonalService
    ) { }

  ngOnInit() {

    this.NoweYear = (new Date()).getFullYear()-8;

  	this.createYear()

  }



  // 根据当前年份生成上下十年的方法
  public createYear(){

    let Year = this.NoweYear

  	this.yearNames = Array.from({length:20},(y,e)=>Object.assign({"id":e,"name":y = Year +=1 }) );

  }

  // 选择上一个范围内的年份
  public FnAddYear(){

    this.NoweYear -= 20;

    this.NoweYear>=1969
    ?this.createYear()
    :this.NoweYear += 20

    

  }

  // 选择下一个范围内的年份
  public FnLessYear(){

    this.NoweYear += 20;
    this.createYear()

  }


  // 选中所选年限的方法同时传递给父组件
  public FnCheckYear(value){
  	this.callYearName.emit(value)
  }






}
