import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule }                from '@angular/router';

import { RiccioTopNavbarComponent } from './riccio-top-navbar.component';

import { RiccioTopNavbarService }  from './riccio-top-navbar.service'

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
  	RiccioTopNavbarComponent
  ],
  declarations: [
  	RiccioTopNavbarComponent
  ],
  providers:[
    RiccioTopNavbarService
  ]
})
export class RiccioTopNavbarModule { }
