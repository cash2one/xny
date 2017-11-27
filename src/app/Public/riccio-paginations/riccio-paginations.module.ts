import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                 from '@angular/forms';

import { RiccioPaginationsComponent } from './riccio-paginations.component';

import { RiccioPaginationsService }		from './riccio-paginations.service'

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
  	RiccioPaginationsComponent
  ],
  declarations: [RiccioPaginationsComponent],
  providers:[
  	RiccioPaginationsService
  ]
})
export class RiccioPaginationsModule { }
