import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                                  from '@angular/forms';

import { OrderWriteRuanwenInfoComponent } from './order-write-ruanwen-info.component';

import { RuanwenNgxueditorModule }		from '../ruanwen-ngxueditor/ruanwen-ngxueditor.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RuanwenNgxueditorModule
  ],
  exports:[
  	OrderWriteRuanwenInfoComponent
  ],
  declarations: [OrderWriteRuanwenInfoComponent]
})
export class OrderWriteRuanwenInfoModule { }
