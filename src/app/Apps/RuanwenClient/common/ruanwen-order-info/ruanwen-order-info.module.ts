import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RuanwenOrderInfoComponent } from './ruanwen-order-info.component';

import { RuanwenNgxueditorModule }		from '../ruanwen-ngxueditor/ruanwen-ngxueditor.module'

@NgModule({
  imports: [
    CommonModule,
    RuanwenNgxueditorModule
  ],
  exports:[
  	RuanwenOrderInfoComponent
  ],
  declarations: [RuanwenOrderInfoComponent]
})
export class RuanwenOrderInfoModule { }
