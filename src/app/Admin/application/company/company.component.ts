import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GrCompanyService } from '../../services'

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  //路由监听
  routeObj:any
  constructor(
    public grCompanyService: GrCompanyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.routeObj = this.route.params.subscribe(v => {
      console.log(v)
    })
  }

}
