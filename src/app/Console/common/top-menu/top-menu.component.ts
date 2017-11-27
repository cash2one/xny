import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['../../Console.component.scss','./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {

  @Input() public menuList:any[]
  @Input() public menuTitle:string
  @Input() public menuIcon:string

  constructor() { }

  ngOnInit() {
  }

}
