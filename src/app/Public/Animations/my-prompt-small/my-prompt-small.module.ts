import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                 from '@angular/forms';

import { MyPromptSmallComponent }		from './my-prompt-small.component'

import { MyPromptSmallService }    from './my-prompt-small.service'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports:[
  	MyPromptSmallComponent
  ],
  declarations: [
  	MyPromptSmallComponent
  ],
  providers:[
    MyPromptSmallService
  ]
})
export class MyPromptSmallModule { }
