import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule }                from '@angular/router';

import { RuanwenSecoundMenuComponent } from './ruanwen-secound-menu.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
  	RuanwenSecoundMenuComponent
  ],
  declarations: [RuanwenSecoundMenuComponent]
})
export class RuanwenSecoundMenuModule { }
