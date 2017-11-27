import { Component, OnInit,OnDestroy } from '@angular/core'
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations'
import { Subscription }  from 'rxjs/Subscription'

import { RiccioNotificationsService }			from './riccio-notifications.service'

import { Notifications }					from './riccio-notificationsData'

const rightIn = trigger('rightIn', [
	  state('in', style({transform: 'translateX(0)'})),
	  transition('void => *', [
	       animate(500, keyframes([
	        style({opacity: 0.8, transform: 'translateX(100%)', offset: 0}),
	        style({opacity: 0.9, transform: 'translateX(-15px)',  offset: 0.3}),
	        style({opacity: 1, transform: 'translateX(0)',     offset: 0.7})
	      ]))
	  ]),
	  transition('* => void', [
	        animate(500, keyframes([
	        style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
	        style({opacity: 0.9, transform: 'translateX(-15px)', offset: 0.5}),
	        style({opacity: 0, transform: 'translateX(100%)',  offset: 1.0})
	      ]))
	  ])
	])

@Component({
  selector: 'app-riccio-notifications',
  templateUrl: './riccio-notifications.component.html',
  styleUrls: ['./riccio-notifications.component.scss'],
  animations:[
	  rightIn
  ]
})
export class RiccioNotificationsComponent implements OnInit {

  public showViewArr:any[]
  public data:Notifications = new Notifications()
  public TimeOut:any

  public rxNotifications$:Subscription  // 订阅事件

  public rxCancelRX$:Subscription

  constructor(
  	public riccioNotificationsService:RiccioNotificationsService
  ) { 
  	this.showViewArr = []
  }

  ngOnInit() {

    this.init()

    this.rxCancelRX$ = this.riccioNotificationsService.getCancel().subscribe(res=>{
      if(res===true){
        this.rxNotifications$.unsubscribe()
        this.init()
      }
    })

  }

  ngOnDestroy(){

    this.rxNotifications$.unsubscribe()
    this.rxCancelRX$.unsubscribe()

  }

  //延迟消失的方法
  public TimeOutHide():void{
  	if(this.showViewArr.length>0){
  		this.TimeOut = setTimeout(()=>{
		  	if(this.TimeOut) clearTimeout(this.TimeOut)
  			this.showViewArr.shift()
  			this.TimeOutHide()
  		},2500)
  	}
  }


  //点击关闭的方法
  public FnClose():void{
  	
  }

  /**
   * @author GR-03
   * @copyright 初始化订阅
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public init(){
    this.rxNotifications$ = this.riccioNotificationsService.getSubject().subscribe(res=>{
      let obj = new Notifications()
      obj['text'] = res['text']?res['text']:obj['text'] 
      obj['status'] = res['status']?res['status']:obj['status'] 
      obj['position'] = res['position']?res['position']:obj['position'] 
      this.showViewArr.push(obj)
      this.TimeOutHide()

    })
  }


}
