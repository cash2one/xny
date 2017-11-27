import { OnDestroy,
         OnInit,
         Component,
         Input,
         Output,
         ElementRef,
         Renderer,
         EventEmitter,
         HostListener,
         ViewChild,
         ContentChild,
         OnChanges,
         SimpleChanges } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { RiccioModalService }		from './riccio-modal.service'

import { RiccioMoadlData }			from './riccio-modalData'

const flyIn = trigger('flyInOut', [
	  state('in', style({transform: 'inherit'})),
	  transition('void => *', [
	       animate(700, keyframes([
	        style({opacity: 0, transform: 'translateY(-100%)', offset: 0}),
	        style({opacity: 0.7, transform: 'translateY(25px)',  offset: 0.3}),
	        style({opacity: 1, transform: 'inherit',     offset: 0.7})
	      ]))
	  ]),
	  transition('* => void', [
	        animate(500, keyframes([
	        style({opacity: 1, transform: 'inherit',     offset: 0}),
	        style({opacity: 1, transform: 'translateY(25px)', offset: 0.5}),
	        style({opacity: 0, transform: 'translateY(-100%)',  offset: 1.0})
	      ]))
	  ])
	])

@Component({
  selector: 'app-riccio-modal',
  templateUrl: './riccio-modal.component.html',
  styleUrls: ['./riccio-modal.component.scss'],
  animations:[
  	flyIn
  ]
})
export class RiccioModalComponent implements OnInit {
  
  @Input() public noClose:boolean

  public data:RiccioMoadlData;
  public open:boolean;

  public RXSubject:any;

  public CloseSbj:any

  constructor(
  	public riccioModalService:RiccioModalService
  ) {
    this.noClose = false
  	this.open = false;
  	this.data = new RiccioMoadlData();
    this.GetSubject();
    this.listenClose()
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.RXSubject.unsubscribe();
    this.CloseSbj.unsubscribe();
  }

  //接受发射过来的数据流
  public GetSubject():void{
    this.RXSubject = this.riccioModalService.getSubject().subscribe(res=>{

      this.open = Object.keys(res).length===0?false:(()=>{

         this.data = new RiccioMoadlData();
         Object.assign(this.data,res);

         return true;
      })()

    })
  }

  //监听关闭实践
  public listenClose():void{
    this.CloseSbj = this.riccioModalService.closeObj.subscribe(res=>{
      this.Close()
    })
  }

  //关闭事件
  public Close(type:string = 'inside'):void{
    this.riccioModalService.setEmit({
      'data':this.data['data'],
      'type':'close'
    });

    if(type==='inside'){
      this.riccioModalService.setSubject({});
    }else if(type==='outside'){
      if(this.noClose===false){
        this.riccioModalService.setSubject({});
      }
    }
    
  }

  //弹出数据
  public FnEmitData():void{
  	this.riccioModalService.setEmit(this.data);
    this.riccioModalService.setSubject({});
  }


}
