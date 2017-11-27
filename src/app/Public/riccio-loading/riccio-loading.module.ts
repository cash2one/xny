import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiccioLoadingComponent } from './riccio-loading.component'
import { RiccioLoadingService } from './riccio-loading.service'

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[
  	RiccioLoadingComponent
  ],
  declarations: [
  	RiccioLoadingComponent
  ],
  providers:[
    RiccioLoadingService
  ]
})
export class RiccioLoadingModule { }
