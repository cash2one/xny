import { Component, OnInit,Output,EventEmitter,DoCheck,Input,ViewChild } from '@angular/core';

import { PersonalService }        from '../../Public/Personal/personal.service'

import { animations }            from '../Animations/index'

@Component({
  selector: 'app-datepickers',
  templateUrl: './datepickers.component.html',
  styleUrls: ['./datepickers.component.css'],
  animations:[
    animations.smallBig
  ]
})
export class DatepickersComponent implements OnInit {
  
  @ViewChild('ngdate')   ngdate
  @Input() datepickers:any
  @Output() callDatepickersData:EventEmitter<any> = new EventEmitter<any>()

  public date:any;

  public selectMonthData:any = {
    isShow:false,
    data:{
      name:""
    }
  }

  public selectYearData:any = {
    isShow:false,
    data:{
      name:""
    }
  }

  // 往父级传递数据
  public symbolDate:any = {
   symbol:"",
   date:"",
   isShow:true,
   TimeShow:false
  }

  constructor(
    public personalService:PersonalService
    ) { }

  ngOnInit() {
    

    // 显示组件时默认将今年的年份的值赋给selectYearData数据
    let NoweDate = (new Date()).getFullYear();

    this.selectYearData.data.name = NoweDate


  }

  //选中的时间方法
  public FnChechDate(value:any){


    if((value.target.tagName==="SPAN"&&value.target.className==="slds-day")
        ||(value.target.tagName==="A"&&value.target.className==="slds-show--inline-block slds-p-bottom--x-small")){

       this.symbolDate.symbol = this.datepickers.symbol;
       this.symbolDate.date = this.date

      
    }
    

    if(value.target.tagName==="H2"&&value.target.className==="slds-align-middle"){

      this.selectMonthData.isShow = !this.selectMonthData.isShow;
      this.selectMonthData.data.name = this.ngdate.monthLabel

    }
    else{

      this.selectMonthData.isShow = false;

    }

    // 当点击今天按钮之后改变所选年份的值
    if((value.target.tagName==="A"&&value.target.textContent==="今天")){


      this.selectYearData.data.name = this.date.getFullYear()


    }

    // 用于关闭年份选择框组件的显示
    this.selectYearData.isShow = false;

  }


  //接收select-month组件的数据
  public FnGetMonthData(value){
    let myDate = new Date()
    myDate.setMonth(value.id-1)
    this.ngdate.dateChange.emit(myDate)
    this.selectMonthData.isShow = !this.selectMonthData.isShow

  }


  //接收select-time组件的数据
  public FnGetTimeData(value){

    if(value.TimeShow===true) this.symbolDate.TimeShow = true

    if(value.bool!==true){
        let NoweDate = new Date();

        if(typeof this.date ==="undefined"){

          NoweDate.setHours(value.HH);
          NoweDate.setMinutes(value.MM);

        }
        else{

          NoweDate.setFullYear(this.ngdate.current.year)
          NoweDate.setMonth(this.ngdate.current.month)
          NoweDate.setDate(this.ngdate.current.day)
          NoweDate.setHours(value.HH)
          NoweDate.setMinutes(value.MM)

        }


          this.symbolDate.symbol = this.datepickers.symbol;
          this.symbolDate.date = NoweDate;
          this.symbolDate.isShow = false;

          this.callDatepickersData.emit(this.symbolDate)
    }
    else if(value.bool===true){

          this.symbolDate.symbol = this.datepickers.symbol;
          this.symbolDate.date = "";
          this.symbolDate.isShow = false;

          this.callDatepickersData.emit(this.symbolDate)
    }

  }


  // 选中的年份的方法
  public FnSelectYear(){
    this.selectYearData.isShow = !this.selectYearData.isShow;
  }


  // 接收select-year组件的方法
  public FnGetYearData(value){

    let myDate = new Date()
    myDate.setFullYear(value.name)
    this.ngdate.dateChange.emit(myDate)
    this.selectYearData.data.name = myDate.getFullYear()
    this.selectYearData.isShow = !this.selectYearData.isShow



  }


}
