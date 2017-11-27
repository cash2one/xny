import { Component, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';

import { GrConfigService } from '../../../services'
import { PersonalService } from '../../../../Public/Personal/personal.service'
import { GrMenuListService } from '../../../services'

@Component({
  selector: 'app-config-main',
  templateUrl: './config-main.component.html',
  styleUrls: [
    '../../../Admin.component.scss',
    './config-main.component.scss',
    // './config-main.component.new.scss',
    '../../page.common.scss'
  ]
})
export class ConfigMainComponent implements OnInit {

  public MenuDataOnly: any;
  public MenuRight: Array<any>;

  constructor(
    public grConfigService: GrConfigService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public grMenuListService: GrMenuListService,
    public personalService: PersonalService
  ) {
    this.MenuDataOnly = {
      title: '',
      data: {}
    };
    this.MenuRight = [];

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res => {
      let url = this.router.url.split('/').slice(2, this.router.url.split('/').length - 1).join('/');
      let RouteMenu = this.grMenuListService.FnActiveRouterMenu(url);
      console.log(url,RouteMenu)
      Object.assign(this.MenuDataOnly, {
        title: RouteMenu.name,
        data: RouteMenu
      })
      

      this.MenuRight = this.MenuDataOnly.data['chilren'] ? [...this.MenuDataOnly.data['chilren'].filter(e => e['is_left'] == 2)] : [];
    }, error => {
      console.log(error)
    })
  }

}
