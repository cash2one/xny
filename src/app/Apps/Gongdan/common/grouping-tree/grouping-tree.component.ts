import { Component,
         OnInit,
         Input,
         Output,
         EventEmitter,
         OnChanges,
         SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-grouping-tree',
  templateUrl: './grouping-tree.component.html',
  styleUrls: ['./grouping-tree.component.scss']
})
export class GroupingTreeComponent implements OnInit {
  
  @Input()
  public listData: any[] = []

  @Input() 
  public firstNumber: number = 0

  @Input()
  public secondNumber: number = 0

  @Output() 
  public emitGroupingData: EventEmitter<any> = new EventEmitter<any>()

  @Output() 
  public emitType: EventEmitter<any> = new EventEmitter<any>()

  public activeType: string | number = 0

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges( change: SimpleChanges ) {

  }

  /*
  点击返回选中的分组数据
   */
  public fnEmitGrouping( data: any ): void {

  	this.emitGroupingData.emit(data)

  }

  /*
  点击分组上面的两个列表分别返回点击事件
   */
  public fnEmitType( type: string ): void {

    this.emitType.emit(type)

  }

}
