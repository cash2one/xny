import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiccioBrowseComponent } from './riccio-browse.component';

import { RiccioBrowseService }		from './riccio-browse.service'

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[
  	RiccioBrowseComponent
  ],
  declarations: [RiccioBrowseComponent],
  providers:[
  	RiccioBrowseService
  ]
})
export class RiccioBrowseModule { }
