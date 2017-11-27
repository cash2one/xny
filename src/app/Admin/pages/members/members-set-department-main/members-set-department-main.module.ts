import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersSetDepartmentMainComponent } from './members-set-department-main.component';

import { RiccioTreeModule }		from '../../../../Public/riccio-tree/riccio-tree.module'

import { MembersSetDepartmentMainService }		from './members-set-department-main.service'

@NgModule({
  imports: [
    CommonModule,
    RiccioTreeModule
  ],
  exports:[
  	MembersSetDepartmentMainComponent
  ],
  declarations: [
  	MembersSetDepartmentMainComponent
  ],
  providers:[
  	MembersSetDepartmentMainService
  ]
})
export class MembersSetDepartmentMainModule { }
