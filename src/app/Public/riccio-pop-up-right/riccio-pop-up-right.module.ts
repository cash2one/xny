import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiccioPopUpRightComponent } from './riccio-pop-up-right.component';

import { RiccioPopUpRightService }			from './riccio-pop-up-right.service'

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[
  	RiccioPopUpRightComponent
  ],
  declarations: [
  	RiccioPopUpRightComponent
  ],
  providers:[
  	RiccioPopUpRightService
  ]
})
export class RiccioPopUpRightModule { }
