import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                from '@angular/forms';

import { RiccioPboxComponent } from './riccio-pbox.component';

import { RiccioPboxService }		from './riccio-pbox.service';
import { RiccioPboxDirective } from './riccio-pbox.directive'

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
  	RiccioPboxComponent,
    RiccioPboxDirective
  ],
  declarations: [
  	RiccioPboxComponent,
  	RiccioPboxDirective
  ],
  providers:[
  	RiccioPboxService
  ]
})
export class RiccioPboxModule { }
