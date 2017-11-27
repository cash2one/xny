import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiccioTopLoadingComponent } from './riccio-top-loading.component';

import { RiccioTopLoadingService }		from './riccio-top-loading.service'

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[
  	RiccioTopLoadingComponent
  ],
  declarations: [RiccioTopLoadingComponent],
  providers:[
  	RiccioTopLoadingService
  ]
})
export class RiccioTopLoadingModule { }
