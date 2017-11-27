import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                 from '@angular/forms';

import { RiccioTreeModule }		from '../../../../Public/riccio-tree/riccio-tree.module'
import { MembersSetDepartmentComponent }		from './members-set-department.component'

@NgModule({
  imports: [
    CommonModule,
    RiccioTreeModule,
    FormsModule
  ],
  exports:[
  	MembersSetDepartmentComponent
  ],
  declarations: [
  	MembersSetDepartmentComponent
  ]
})
export class MembersSetDepartmentModule { }
