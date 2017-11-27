import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AddoncenterComponent } from './addoncenter.component';
import { AddoncenterMainComponent } from './addoncenter-main/addoncenter-main.component';

import { addoncenterRoutes } from './addoncenter.routes';
import { AddoncenterDetialComponent } from './addoncenter-detial/addoncenter-detial.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    addoncenterRoutes
  ],
  exports:[
  	AddoncenterComponent
  ],
  declarations: [AddoncenterComponent, AddoncenterMainComponent, AddoncenterDetialComponent]
})
export class AddoncenterModule { }
