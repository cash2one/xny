import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                 from '@angular/forms';
import { RiccioModalComponent } from './riccio-modal.component';

import { RiccioModalService }			from './riccio-modal.service'

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
  	RiccioModalComponent
  ],
  declarations: [
  	RiccioModalComponent
  ],
  providers:[
    RiccioModalService
  ]
})
export class RiccioModalModule { }
