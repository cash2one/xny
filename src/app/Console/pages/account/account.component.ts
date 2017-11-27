import { Component, OnInit,ViewChild,ElementRef,OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,NavigationEnd }  from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['../../Console.component.scss','./account.component.scss']
})
export class AccountComponent implements OnInit {
 
  public RouterActive:string;
 
  constructor(
  	public activatedRoute:ActivatedRoute
  ) {
    // this.activatedRoute.parent.parent.data.subscribe(res=>{
    //   let Menu = res.Menu.json()
    //   // console.log(Menu)
    // })

  }
  ngOnInit() {
    this.activatedRoute.children[0].url.subscribe(res=>{
      this.RouterActive = res.length>0?res[0]['path']:'';
    })
  }

}
