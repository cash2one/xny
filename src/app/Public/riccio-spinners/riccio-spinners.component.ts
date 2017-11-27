import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-riccio-spinners',
  templateUrl: './riccio-spinners.component.html',
  styleUrls: ['./riccio-spinners.component.scss']
})
export class RiccioSpinnersComponent implements OnInit {
  
  /*
  没有数据时候的文本提示
   */
  @Input() public emptyText:string

  /*
  有三个字段  show | empty | hide   分别对应，显示 ｜ 是否显示数据为空的时候的文本提示 ｜ 隐藏
   */
  @Input() public type:string

  /*
  当需要显示数据为空时候的文本提示时附带图标的字体
   */
  @Input() public iconfont?:string

  /*
  当需要显示数据为空时候的文本提示时附带图片显示
   */
  @Input() public picture?:string

  constructor() {
  	/*
  	默认不显示文本提示
  	 */
  	this.emptyText = ''
  	/*
  	默认隐藏
  	 */
  	this.type = 'hide'
  	/*
  	默认字体
  	 */
  	this.iconfont = ''
    /*
    默认图片
     */
    this.picture = ''
  }

  ngOnInit() {
  }

}
