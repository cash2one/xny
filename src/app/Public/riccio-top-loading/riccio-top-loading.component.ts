import { Component, OnInit,OnDestroy } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription'

import { RiccioTopLoadingService }		from './riccio-top-loading.service'

@Component({
  selector: 'app-riccio-top-loading',
  templateUrl: './riccio-top-loading.component.html',
  styleUrls: ['./riccio-top-loading.component.scss']
})
export class RiccioTopLoadingComponent implements OnInit {

  public loadWidth:number

  public loadRX$:Subscription

  public timeout:any

  constructor(
  	private riccioTopLoadingService:RiccioTopLoadingService
  ) { 
  	this.loadWidth = 0

  	this.loadRX$ = this.riccioTopLoadingService.getSubject().subscribe(res=>{

  		if(res=='start'){

  			if(this.timeout) clearInterval(this.timeout)

  			this.timeout = setInterval(()=>{

  				this.loadWidth = this.loadWidth>70?(()=>{
  					clearInterval(this.timeout)
  					return 70
  				})():this.loadWidth++

  			},300)

  		}else if(res=='finish'){

  			this.loadWidth = 100

  			setTimeout(()=>{
  				this.loadWidth = 0
  			},300)

  		}

  	})

  }

  ngOnInit() {
  }

  ngOnDestroy(){
  	this.loadRX$.unsubscribe()
  }


}
