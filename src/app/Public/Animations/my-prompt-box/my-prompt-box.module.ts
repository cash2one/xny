import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                 from '@angular/forms';

import { MyPromptBoxComponent }		from './my-prompt-box.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports:[
  	MyPromptBoxComponent
  ],
  declarations: [
  	MyPromptBoxComponent
  ]
})
export class MyPromptBoxModule { }
