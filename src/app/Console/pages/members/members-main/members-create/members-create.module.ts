import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                 from '@angular/forms';

import { MembersCreateComponent }		from './members-create.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
  	MembersCreateComponent
  ],
  declarations: [
  	MembersCreateComponent
  ]
})
export class MembersCreateModule { }
