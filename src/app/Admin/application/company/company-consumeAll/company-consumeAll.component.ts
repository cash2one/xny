import { Component, OnInit, ViewChild, ViewContainerRef, ElementRef,OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { animations } from '../../../../Public/Animations/index'
 
@Component({
  selector: 'app-company-consumeAll',
  templateUrl: './company-consumeAll.component.html',
  styleUrls: [
    '../../../Admin.component.scss',
    '../../../pages/page.common.scss',
    './company-consumeAll.component.scss'
  ],

  animations: [
    animations.flyTop
  ]
})
export class CompanyConsumeAllComponent implements OnInit,OnDestroy {

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {
  }

  ngOnInit() {
  }

  ngOnDestroy(){
  }
}
