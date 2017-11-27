import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                 from '@angular/forms';
import { RuanwenAccountSetComponent } from './ruanwen-account-set.component';

import { RiccioDisabledbuttonModule }		from '../../../../Public/riccio-disabledbutton/riccio-disabledbutton.module'
import { ServicesModule }		from '../services/services.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RiccioDisabledbuttonModule,
    ServicesModule.forRoot()
  ],
  exports:[
  	RuanwenAccountSetComponent
  ],
  declarations: [RuanwenAccountSetComponent]
})
export class RuanwenAccountSetModule { }
