import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                 from '@angular/forms';

import { AddToMembersComponent } from './add-to-members/add-to-members.component';
import { AddToPhoneComponent } from './add-to-phone/add-to-phone.component';
import { AddToEmailComponent } from './add-to-email/add-to-email.component';
import { AddToLinkComponent } from './add-to-link/add-to-link.component';

import { MembersAddComponent }			from './members-add.component'

import { MembersSetDepartmentMainModule }		from '../members-set-department-main/members-set-department-main.module'
import { RiccioModalModule }      from '../../../../Public/riccio-modal/riccio-modal.module' 
import { RiccioPboxModule }      from '../../../../Public/riccio-pbox/riccio-pbox.module';

import { AddCodeSmsComponent } from './add-code-sms/add-code-sms.component';

@NgModule({
  imports: [
    CommonModule,
    MembersSetDepartmentMainModule,
    RiccioPboxModule,
    RiccioModalModule,
    FormsModule
  ],
  exports:[
  	MembersAddComponent
  ],
  declarations: [MembersAddComponent,AddToMembersComponent, AddToPhoneComponent, AddToEmailComponent, AddToLinkComponent, AddCodeSmsComponent]
})
export class MembersAddModule { }
