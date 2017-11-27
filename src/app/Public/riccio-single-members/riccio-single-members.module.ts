import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                from '@angular/forms';

import { RiccioSingleMembersComponent } from './riccio-single-members.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
  	RiccioSingleMembersComponent
  ],
  declarations: [RiccioSingleMembersComponent]
})
export class RiccioSingleMembersModule { }
