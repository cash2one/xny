import { Component, OnInit,Input,OnChanges,SimpleChange } from '@angular/core';

@Component({
  selector: 'app-ruanwen-secound-menu',
  templateUrl: './ruanwen-secound-menu.component.html',
  styleUrls: ['../../../../Public/theme/apps-common/common.scss','./ruanwen-secound-menu.component.scss']
})
export class RuanwenSecoundMenuComponent implements OnInit {

  @Input() public menuList:any[]
  @Input() public title:string

  /**
   * 是否展开二级菜单的标志位
   * @type {boolean}
   */
  public openCollapse:boolean

  constructor() { 
  	this.menuList = []
    this.openCollapse = true
  }

  ngOnInit() {
  }

  ngOnChanges(change:SimpleChange){
  	if(change['menuList']){
  		// console.log(this.menuList)
  	}
  }


}
