import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                 from '@angular/forms';

import { RuanwenWritingArticlesService }      from './ruanwen-writing-articles.service'

import { RuanwenWritingArticlesComponent } from './ruanwen-writing-articles.component';

import { RiccioDisabledbuttonModule }    from '@gr-public/riccio-disabledbutton/riccio-disabledbutton.module'
import { RuanwenNgxueditorModule }    from '../ruanwen-ngxueditor/ruanwen-ngxueditor.module'

@NgModule({
  imports: [
    CommonModule,
    RiccioDisabledbuttonModule,
    FormsModule,
    RuanwenNgxueditorModule
  ],
  exports:[
  	RuanwenWritingArticlesComponent
  ],
  declarations: [RuanwenWritingArticlesComponent],
  providers:[
    RuanwenWritingArticlesService
  ]
})
export class RuanwenWritingArticlesModule { }
