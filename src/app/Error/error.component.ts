import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  public time:number

  constructor() {
  	this.time = 3
  }

  ngOnInit() {
  	sessionStorage.setItem('loading','false')
  	this.timeOut()
  }

  /**
   * 倒计时
   */

  public timeOut():void{

  	let clearTime = setInterval(()=>{


  		this.time = this.time--

  		if(this.time==0){
  			clearInterval(clearTime)

  		}


  	},1000)


  }

}
