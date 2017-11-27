import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderWriteInfoComponent } from './order-write-info.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[
  	OrderWriteInfoComponent
  ],
  declarations: [OrderWriteInfoComponent]
})
export class OrderWriteInfoModule { }
