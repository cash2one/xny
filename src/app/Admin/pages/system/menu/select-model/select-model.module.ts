import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectModelComponent }		from './select-model.component'

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[
  	SelectModelComponent
  ],
  declarations: [
  	SelectModelComponent
  ]
})
export class SelectModelModule { }
