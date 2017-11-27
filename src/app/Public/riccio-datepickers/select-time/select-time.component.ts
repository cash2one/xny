import { Component, OnInit,EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-select-time',
  templateUrl: './select-time.component.html',
  styleUrls: ['../../theme/common/common.scss','./select-time.component.scss']
})
export class SelectTimeComponent implements OnInit {

	@Output() callTimeData:EventEmitter<any> = new EventEmitter<any>()

	public TimerDate:any = {
		HH:"00",
		MM:"00",
    bool:false,
    TimeShow:false
	}

	public date:Date = new Date()

  constructor() { }

  ngOnInit() {

  	// 默认显示当前的时间

    let NewDate = this.date.getMinutes()

  	this.TimerDate.HH = this.date.getHours();

    this.TimerDate.MM = NewDate<10
                        ?"0"+NewDate
                        :NewDate

  }

  // 动态检测增加时间的显示方式
  public FnAddHH(){

	let numDate = parseInt(this.TimerDate.HH)

	this.TimerDate.HH =	numDate>=23
			  			?"00"
			  			:numDate<9
			  			?"0"+(numDate+1)
			  			:numDate+1
  }

  // 动态检测减少时间的显示方式
  public FnLessHH(){

	let numDate = parseInt(this.TimerDate.HH)

	this.TimerDate.HH =	numDate<=0
			  			?23
			  			:numDate<=10
			  			?"0"+(numDate-1)
			  			:numDate-1
  }



  // 增加时间的方法
  public FnAddTime(value:any){

  	if(value.target.parentNode.parentNode.nodeName==="TD"&&value.target.parentNode.parentNode.className==="uib-increment hours"){

  		if(!isNaN(this.TimerDate.HH)){

  			this.FnAddHH()

  		}

  	}
  	else if(value.target.parentNode.parentNode.nodeName==="TD"&&value.target.parentNode.parentNode.className==="uib-increment minutes"){

  		if(!isNaN(this.TimerDate.MM)){

			this.TimerDate.MM = parseInt(this.TimerDate.MM)+10;

  			let numDate = parseInt(this.TimerDate.MM)

		  	this.TimerDate.MM =	numDate>=59
					  			?(()=>{
					  				this.FnAddHH()
					  				return "0"+numDate.toString().split("")[numDate.toString().split("").length-1];
					  			})()
					  			:numDate<9
					  			?"0"+(numDate)
					  			:numDate


  		}

  	}

  }

  // 减少时间的方法
  public FnLessTime(value:any){

  	if(value.target.parentNode.parentNode.nodeName==="TD"&&value.target.parentNode.parentNode.className==="uib-decrement hours"){

  		if(!isNaN(this.TimerDate.HH)){
  			this.FnLessHH()
  		}

  	}
  	else if(value.target.parentNode.parentNode.nodeName==="TD"&&value.target.parentNode.parentNode.className==="uib-decrement minutes"){

  		if(!isNaN(this.TimerDate.MM)){

  			let endTime = parseInt(this.TimerDate.MM).toString().split("")[parseInt(this.TimerDate.MM).toString().split("").length-1]

			this.TimerDate.MM = parseInt(this.TimerDate.MM)-10;

  			let numDate = parseInt(this.TimerDate.MM)

		  	this.TimerDate.MM =	numDate<0
					  			?(()=>{
					  				this.FnLessHH()
					  				return "5"+endTime;
					  			})()
					  			:numDate<9
					  			?"0"+(numDate)
					  			:numDate
  		}

  	}


  }


  // 点击确定按钮传递时间给子组件
  public FnDetermine(){
    this.TimerDate.bool = false;
  	this.callTimeData.emit(this.TimerDate)
  }

  // 清楚按钮点击时关闭组件并清楚时间
  public FnCloseTime(){
    this.TimerDate.bool = true;
    this.callTimeData.emit({
      ...this.TimerDate,
      'close':true
    })
  }

  // 失去焦点之后验证是否输入的是数字
  public FnBlurText(value){

    if(value.target.placeholder==="HH"){

      isNaN(this.TimerDate.HH)
      ?this.TimerDate.HH = "00"
      :(()=>{

        let HH = parseInt(this.TimerDate.HH)

        if(HH>=24||HH<0){
          this.TimerDate.HH = "00"
        }

      })()

    }
    else if(value.target.placeholder==="MM"){
      isNaN(this.TimerDate.MM)
      ?this.TimerDate.MM = "00"
      :(()=>{

        let MM = parseInt(this.TimerDate.MM)

        if(MM>=60||MM<0){
          this.TimerDate.MM = "00"
        }

      })()
    }

  }



}
