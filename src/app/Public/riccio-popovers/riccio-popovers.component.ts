import { Component, OnInit,OnDestroy,Renderer,ElementRef,ViewChild,Input } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations'
import { RiccioPopoversService }		from './riccio-popovers.service'

import { Subscription }  from 'rxjs/Subscription'

const flyTop = trigger('flyTop', [
	  state('in', style({transform: 'translate(-50%,0)'})),
	  transition('void => *', [
	       animate(400, keyframes([
	        style({opacity: 0.2, transform: 'translate(-50%,-50%)', offset: 0}),
	        // style({opacity: 0.9, transform: 'translateX(-15px)',  offset: 0.3}),
	        style({opacity: 1, transform: 'translate(-50%,0)',     offset: 1.0})
	      ]))
	  ]),
	  transition('* => void', [
	        animate(400, keyframes([
	        style({opacity: 1, transform: 'translate(-50%,0)',     offset: 0}),
	        // style({opacity: 0.9, transform: 'translateX(-15px)', offset: 0.5}),
	        style({opacity: 0, transform: 'translate(-50%,-50%)',  offset: 1.0})
	      ]))
	  ])
	])


@Component({
  selector: 'app-riccio-popovers',
  templateUrl: './riccio-popovers.component.html',
  styleUrls: ['./riccio-popovers.component.scss']
})
export class RiccioPopoversComponent implements OnInit {

  @ViewChild('popoversMain')  public popoversMain:ElementRef

  @Input() public aspect:string      //  left | right | top | bottom

  /**
   * 订阅popovers的可观察对象
   * @type {Subscription}
   */
  public popoversRX$:Subscription

  /**
   * 是否显示该组件的标志位
   * @type {boolean}
   */
  public isShow:boolean

  /**
   * 定位在宿主元素的上面
   * @type {any}
   */
  public position:any

  /**
   * 如果是top或者bottom就设置偏移量
   * @type {boolean}
   */
  public transform:boolean

  constructor(
  	public riccioPopoversService:RiccioPopoversService,
  	public el:ElementRef
  ) {
    this.transform = false
  	this.position = {
  		left:'',
  		top:''
  	}
  	this.isShow = false
    this.aspect = 'top'
  }

  ngOnInit() {
  	// this.eleMent()
  	this.getPopoversEmit()
  }

  ngOnDestroy(){
  	this.popoversRX$.unsubscribe()
  }

  /**
   * @author GR-03
   * @copyright 负责订阅popovers的数据流
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public getPopoversEmit():void{
  	this.popoversRX$ = this.riccioPopoversService.getSubject().subscribe(res=>{
      let client = res['client']

      if(this.aspect=='top'||this.aspect=='bottom') this.transform = true

	  	this.isShow = res['isShow']

      switch (this.aspect) {
        case "top":
          this.position = {
            left:client.left+(client.width/2),
            top:client.top-client.height-10
            // top:client.top-(client.height/2)
          }
          break;
        
        case "right":
          this.position = {
            left:client.left+client.width+10,
            top:client.top+(client.height/2)
          }
          break;

        case "bottom":
          this.position = {
            left:client.left+(client.width/2),
            top:client.top+client.height+10
          }
          break;

        case "left":
          this.position = {
            left:client.left-client.width-10,
            top:client.top-(client.height/2)
          }
          break;

        default:break;
      }

  	})
  }

}
