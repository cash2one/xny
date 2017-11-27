import { Component, OnInit,ViewChild,Renderer } from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,NavigationEnd }  from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['../../Console.component.scss','./setting.component.scss']
})
export class SettingComponent implements OnInit {
	
  public RouterActive:string;

  constructor(
    public activatedRoute:ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.children[0].url.subscribe(res=>{
      this.RouterActive = res.length>0?res[0]['path']:'';
    })
  }

}
