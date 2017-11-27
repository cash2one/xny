import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

import { RiccioPboxService } from '../../riccio-pbox/riccio-pbox.service'

const accordion = trigger('accordion', [
  state('in', style({ height: '*' })),
  state('out', style({ height: 0 })),
  transition('in => out', [
    style({ height: '*' }),
    animate(250, style({ height: 0 }))
  ]),
  transition('out => in', [
    style({ height: 0 }),
    animate(250, style({ height: "*" }))
  ])
])

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss'],
  animations: [accordion]
})
export class TreeViewComponent implements OnInit {

  @Input() public treeChildren: Array<any>;
  @Input() public childrenName: string;
  @Input() public titleName: string;
  @Input() public open: boolean;
  @Input() public pbox: boolean;
  @Input() public pboxOptions: any[];
  @Input() public pboxPosition: any;
  @Input() public icon: string;
  @Input() public disabledId: string | number;
  @Input() public hasChildrenNoChoose:boolean 
  @Output() public parentData: EventEmitter<any>;
  @Output() pboxActive:EventEmitter<any>

  constructor(
    public riccioPboxService: RiccioPboxService
  ) {
    this.parentData = new EventEmitter<any>();
    this.pboxActive = new EventEmitter<any>()

  }

  ngOnInit() {
    //初始化给所有的数据添加该字段用以动画效果
    // console.log(this.treeChildren)
    // Array.from(this.treeChildren,e=>e['isCheck']=this.open)
  }

  ngOnDestroy() {
  }


  //接受递归的子级数据
  public FnObtain(event: any): void {
    if(this.hasChildrenNoChoose == true ) {

      if(Array.isArray(event[this.childrenName]) == true && event[this.childrenName].length>0) {
        event['isCheck'] = !event['isCheck']
      }else if(Array.isArray(event[this.childrenName]) == true && event[this.childrenName].length == 0) {
        this.parentData.emit(event)
      }

    }else if(this.hasChildrenNoChoose == false) {
      this.parentData.emit(event)
    }
  }

  public fnPbox(data:any){
    this.pboxActive.emit(data)
  }

  //点击下拉框显示pbox组件同时传递数据给pbox
  public FnShowPbox(event: MouseEvent, list: any, dataEl:any): void {

    this.fnPbox(list)

    setTimeout(() => {
      let obj = {
        type: 'tree',
        el:dataEl,
        data: this.pboxOptions,
        position: {
          left: this.pboxPosition.left == false ? event.clientX - event.offsetX : this.pboxPosition.left,
          top: event.clientY
        }
      }
      this.riccioPboxService.setSubject(obj)
    },)

  }

  /*
  处理点击后下拉的操作
   */
  public handleDropDown(list: any) : void {
    if(this.hasChildrenNoChoose == false) {
      list['isCheck'] = !list['isCheck']
    }
  }

}
