import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                 from '@angular/forms';

import { MyPromptBoxModule }    from '../Animations/my-prompt-box/my-prompt-box.module'

import { LoginComponent }		from './Login.component'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MyPromptBoxModule
  ],
  exports:[
  	LoginComponent
  ],
  declarations: [
  	LoginComponent
  ]
})
export class LoginModule { }
