import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                from '@angular/forms';
import { RiccioNotificationsComponent } from './riccio-notifications.component';

import { RiccioNotificationsService }		from './riccio-notifications.service'

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
  	RiccioNotificationsComponent
  ],
  declarations: [
  	RiccioNotificationsComponent
  ],
  providers:[
  	RiccioNotificationsService
  ]
})
export class RiccioNotificationsModule { }
