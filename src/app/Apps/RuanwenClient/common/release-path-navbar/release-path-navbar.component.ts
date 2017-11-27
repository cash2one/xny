import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-release-path-navbar',
  templateUrl: './release-path-navbar.component.html',
  styleUrls: ['./release-path-navbar.component.scss']
})
export class ReleasePathNavbarComponent implements OnInit {

  @Input() public activeRouter:string
  @Input() public itemData:any[]

  constructor(
  ) { 

  }

  ngOnInit() {
  }

}
