import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                 from '@angular/forms';

import { MyLoadingComponent }		from './my-loading.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports:[
  	MyLoadingComponent
  ],
  declarations: [
  	MyLoadingComponent
  ]
})
export class MyLoadingModule { }
