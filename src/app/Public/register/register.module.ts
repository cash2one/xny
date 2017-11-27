import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                 from '@angular/forms';
import { MyPromptBoxModule }			from '../Animations/my-prompt-box/my-prompt-box.module'

import { RegisterComponent } from './register.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MyPromptBoxModule
  ],
  exports:[
  	RegisterComponent
  ],
  declarations: [
  	RegisterComponent
  ]
})
export class RegisterModule { }
