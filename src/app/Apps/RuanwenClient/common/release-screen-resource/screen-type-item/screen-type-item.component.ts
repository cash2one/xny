import { Component, OnInit,Input,Output,EventEmitter,ViewChild,ElementRef,OnChanges,SimpleChanges,OnDestroy } from '@angular/core';
import { Subscription }  from 'rxjs/Subscription'

import { ScreenTypeItemService }		from './screen-type-item.service'  
import { ReleaseScreenResourceService }  from '../release-screen-resource.service'

@Component({
  selector: 'app-screen-type-item',
  templateUrl: './screen-type-item.component.html',
  styleUrls: ['./screen-type-item.component.scss']
})
export class ScreenTypeItemComponent implements OnInit {

  @Input() public itemList:any[]
  @Input() public itemTitle:string
  @Input() public itemId:number
  @Output() public emitData:EventEmitter<any>
  @Output() public emitChoose:EventEmitter<any>   //返回给choose的数据格式，包括类型标题和所选的类型
  @ViewChild('itemUl') public itemUl:ElementRef

  /**
   * 选中的类型添加active类
   * @type {string}
   */
  public activeType:string

  public more:boolean

  public noChooseRX$:Subscription

  constructor(
  	public screenTypeItemService:ScreenTypeItemService,
    public releaseScreenResourceService:ReleaseScreenResourceService
  ) { 
    this.activeType = '不限'
    this.emitData = new EventEmitter<any>()

    /**
     * 返回对象为{title:'',value:''}
     * @type {EventEmitter}
     */
  	this.emitChoose = new EventEmitter<any>()

    this.noChooseRX$ = this.releaseScreenResourceService.getNoChoose().subscribe(res=>{
      if(res['type']=='item'){
        if(this.itemTitle==res['data']){
          this.activeType = '不限' 
          this.fnOutputItemData('不限')
        } 
      }
    })
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.noChooseRX$.unsubscribe()
  }

  /**
   * @author GR-03
   * @copyright 点击筛选内容发射数据给上级
   * @param     [param]
   * @return    [return]
   * @param     {string}    name [description]
   */
  public fnOutputItemData(name:string):void{
  	let obj = {}
  	switch (this.itemId) {
  		case 0:
  			obj = {'media_type':name}
  			break;
  		
  	    case 1:
  			obj = {'media_portal':name}
  			break;

  		case 2:
  			obj = {'media_area':name}
  			break;

  		default:break;
  	}
  	this.emitData.emit(obj)
    this.emitChoose.emit({
      'title':this.itemTitle,
      'value':name,
      'type':Object.keys(obj)[0]
    })
  }

}
