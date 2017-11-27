import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-secound-menu',
  templateUrl: './secound-menu.component.html',
  styleUrls: ['../../Console.component.scss','./secound-menu.component.scss']
})
export class SecoundMenuComponent implements OnInit {

  @Input() public menuList:any[]
  @Input() public title:string

  /**
   * 展开和收缩的标志位
   * @type {boolean}
   */
  public openCollapse:boolean

  hideArrow:boolean

  constructor() { 
  	this.openCollapse = true
  }

  ngOnInit() {
  }

  public fnHide(){
    this.openCollapse = !this.openCollapse
    // setTimeout(()=>{
      this.hideArrow = !this.hideArrow
    // },350)
  }

}
