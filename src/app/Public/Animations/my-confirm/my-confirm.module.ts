import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyConfirmComponent }			from './my-confirm.component'

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[
  	MyConfirmComponent
  ],
  declarations: [
  	MyConfirmComponent
  ]
})
export class MyConfirmModule { }
