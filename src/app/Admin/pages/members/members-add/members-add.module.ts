import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                 from '@angular/forms';

import { AddToMembersComponent } from './add-to-members/add-to-members.component'

import { MembersAddComponent }			from './members-add.component'

import { MembersSetDepartmentMainModule }		from '../members-set-department-main/members-set-department-main.module'
import { RiccioPboxModule }      from '../../../../Public/riccio-pbox/riccio-pbox.module';
import {RiccioSingleMembersModule} from "../../../../Public/riccio-single-members/riccio-single-members.module";

@NgModule({
  imports: [
    CommonModule,
    MembersSetDepartmentMainModule,
    RiccioPboxModule,
    FormsModule,
    RiccioSingleMembersModule
  ],
  exports:[
  	MembersAddComponent
  ],
  declarations: [MembersAddComponent,AddToMembersComponent]
})
export class MembersAddModule { }
