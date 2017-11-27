import { OnDestroy,Component, OnInit,Renderer } from '@angular/core'
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations'

import { RiccioPopUpRightService }			from './riccio-pop-up-right.service'

// import { animations }			from '../Animations/index'

let animations = {
  leftIn : trigger('leftIn', [
	  state('in', style({width: '*'})),
	  transition('void => *', [
	       animate(200, keyframes([
	        style({width:'0', offset: 0}),
	        style({width:'*', offset: 1.0})
	      ]))
	  ]),
	  transition('* => void', [
	        animate(200, keyframes([
	        style({width:'*', offset: 0}),
	        style({width:'0', offset: 1.0})
	      ]))
	  ])
	])
}

@Component({
  selector: 'app-riccio-pop-up-right',
  templateUrl: './riccio-pop-up-right.component.html',
  styleUrls: ['./riccio-pop-up-right.component.scss'],
  animations:[
    animations.leftIn
  ]
})
export class RiccioPopUpRightComponent implements OnInit {

  public data:Array<any>;
  public viewText:any[];
  public isShow:boolean;
  public style:any

  public length:string|number;

  public RXSubject:any;

  constructor(
    private renderer:Renderer,
  	public riccioPopUpRightService:RiccioPopUpRightService
  ) {
    this.length = 0;
    this.data = [];
  	this.isShow = false;
  	this.RXSubject = this.riccioPopUpRightService.getSubject().subscribe(res=>{

      this.isShow = Object.keys(res).length===0?false:(()=>{

        this.data = res['data']?[...res['data']]:[];
        this.viewText = res['viewText']?[...res['viewText']]:[];
        this.style = res['style']?res['style']:{};

        return this.SwitchCheck(this.data)

      })()

    })

  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.RXSubject.unsubscribe();
  }

  // 判断当前的列表是否有被选中的某一条，有则显示滑块
  public SwitchCheck(list:any):boolean{
    let bool = false;
    list.forEach(e=>{
      if(e.isCheck===true) {
        this.length = list.filter(el=>el['isCheck']===true).length
        return bool = true;
      }
    })

    return bool
  }

  //弹出数据流
  public FnEmitData(list:any,e:MouseEvent):void{
    let obj = {
      'data':this.data.filter(e=>e['isCheck']===true),
      'type':list,
      'event':e
    }

    this.riccioPopUpRightService.setEmit(obj)
  }

  //关闭滑块同时取消所有勾选
  public Close():void{

    let obj = {
      'data':[],
      'type':0
    }

    this.isShow = !this.isShow;

    this.riccioPopUpRightService.setEmit(obj)

  }

}
