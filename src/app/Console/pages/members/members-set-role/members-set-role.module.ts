import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                 from '@angular/forms';

import { MembersSetRoleComponent } from './members-set-role.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
  	MembersSetRoleComponent
  ],
  declarations: [
  	MembersSetRoleComponent
  ]
})
export class MembersSetRoleModule { }
