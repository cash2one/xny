import { Component, OnInit,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-screen-type-header',
  templateUrl: './screen-type-header.component.html',
  styleUrls: ['../../../../../Public/theme/apps-common/common.scss','./screen-type-header.component.scss']
})
export class ScreenTypeHeaderComponent implements OnInit {

  @Output() emitTag:EventEmitter<number>
  @Output() emitSearch:EventEmitter<string>

  /**
   * tag切换标志位
   * @type {string}
   */
  public active:string

  constructor() {
  	this.active = '全部资源'
    this.emitTag = new EventEmitter<number>()
  	this.emitSearch = new EventEmitter<string>()
  }

  ngOnInit() {
  }

  /**
   * @author GR-03
   * @copyright 发射数据状态回去
   * @param     [param]
   * @return    [return]
   * @param     {number}    num [description]
   */
  public fnEmitTag(num:number):void{
  	this.emitTag.emit(num)
  }

  /**
   * @author GR-03
   * @copyright 点击的搜索事件
   * @param     [param]
   * @return    [return]
   * @param     {string}    search [description]
   */
  public fnEmitSearchValue(search:string):void{
    this.emitSearch.emit(search)
  }

}
