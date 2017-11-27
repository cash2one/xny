import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppsMyComponent } from './apps-my.component';

import { RiccioSpinnersModule }		from '../../../../Public/riccio-spinners/riccio-spinners.module';

@NgModule({
  imports: [
    CommonModule,
    RiccioSpinnersModule
  ],
  exports:[
  	AppsMyComponent
  ],
  declarations: [AppsMyComponent]
})
export class AppsMyModule { }
