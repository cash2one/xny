import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RuanwenMainComponent } from './ruanwen-main.component';

import { ruanwenMainRoutes }		from './ruanwen-main.routes'

@NgModule({
  imports: [
    CommonModule,
    ruanwenMainRoutes
  ],
  exports:[
  	RuanwenMainComponent
  ],
  declarations: [RuanwenMainComponent]
})
export class RuanwenMainModule { }
