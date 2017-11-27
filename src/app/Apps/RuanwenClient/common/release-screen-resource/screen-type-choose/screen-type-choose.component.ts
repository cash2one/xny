import { Component, OnInit,Input,OnChanges,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-screen-type-choose',
  templateUrl: './screen-type-choose.component.html',
  styleUrls: ['./screen-type-choose.component.scss']
})
export class ScreenTypeChooseComponent implements OnInit {
  
  @Input() public title:string
  @Input() public value:string
  @Output() public emitUnChooseData:EventEmitter<any>

  /**
   * 已经选择过的数组列表
   * @type {any[]}
   */
  public chooseList:any[]

  public 

  constructor() {
    this.emitUnChooseData = new EventEmitter<any>()
  	this.chooseList = []
  }

  ngOnInit() {
  }

  ngOnChanges(){
  	this.unRepeat(this.title,this.value)
  }

  /**
   * @author GR-03
   * @copyright 数组去重操作
   * @param     [param]
   * @return    [return]
   * @param     {string}    title [description]
   * @param     {string}    value [description]
   */
  public unRepeat(title:string,value:string):void{
  	if(this.title!=undefined){
  		this.chooseList = this.chooseList.filter(e=>e['title']!=title)
  	  	this.chooseList.push({
  			'title':title,
  			'value':value
  		})
  	}

    this.chooseList = this.chooseList.filter(e=>e['value']!='不限')

  }

  /**
   * @author GR-03
   * @copyright 取消已经筛选过的条件数据
   * @param     [param]
   * @return    [return]
   * @param     {any}       list [description]
   */
  public fnDeleteChoose(list:any):void{
    this.chooseList = this.chooseList.filter(e=>e['title']!=list['title'])
    this.emitUnChooseData.emit({
      'title':list.title,
      'value':list.value
    })
  }

}
