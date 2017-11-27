import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                 from '@angular/forms';

import { AddToUserComponent } from './add-to-user/add-to-user.component'

import { UserAddComponent }			from './user-admin-add.component'

import { RiccioPboxModule }      from '../../../../Public/riccio-pbox/riccio-pbox.module';
import {RiccioSingleMembersModule} from "../../../../Public/riccio-single-members/riccio-single-members.module";

@NgModule({
  imports: [
    CommonModule,
    RiccioPboxModule,
    FormsModule,
    RiccioSingleMembersModule
  ],
  exports:[
  	UserAddComponent
  ],
  declarations: [UserAddComponent,AddToUserComponent]
})
export class AdminUserAddModule { }
