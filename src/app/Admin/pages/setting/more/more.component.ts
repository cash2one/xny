import { Component, OnInit } from '@angular/core';
import {BreadCrumbData} from "../../../../Public/riccio-breadcrumb/riccio-breadcrumb.data";

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss']
})
export class MoreComponent implements OnInit {
  public breadData:BreadCrumbData[];
  constructor() {
    this.breadData = [
      {name:'更多'}
    ]
  }

  ngOnInit() {
  }

}
