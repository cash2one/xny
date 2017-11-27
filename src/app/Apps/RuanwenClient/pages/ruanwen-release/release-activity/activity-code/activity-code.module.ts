import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                 from '@angular/forms';

import { RiccioDisabledbuttonModule }    from '@gr-public/riccio-disabledbutton/riccio-disabledbutton.module'

import { ActivityCodeComponent } from './activity-code.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RiccioDisabledbuttonModule
  ],
  exports:[
  	ActivityCodeComponent
  ],
  declarations: [
    ActivityCodeComponent
  ]
})
export class ActivityCodeModule { }
