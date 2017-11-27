import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                 from '@angular/forms';

import { RuanwenMembersSetComponent } from './ruanwen-members-set.component';

import { RiccioModalModule }	from '../../../../Public/riccio-modal/riccio-modal.module'
import { ServicesModule }		from '../services/services.module';
import { MembersEditAddComponent } from './members-edit-add/members-edit-add.component'
import { RiccioDisabledbuttonModule }	from '../../../../Public/riccio-disabledbutton/riccio-disabledbutton.module'
import { RiccioSpinnersModule }		from '../../../../Public/riccio-spinners/riccio-spinners.module'

import { RiccioPboxModule }		from '../../../../Public/riccio-pbox/riccio-pbox.module'

@NgModule({
  imports: [
    CommonModule,
    RiccioModalModule,
    RiccioPboxModule,
    FormsModule,
    RiccioDisabledbuttonModule,
    ServicesModule.forRoot(),
    RiccioSpinnersModule
  ],
  exports:[
  	RuanwenMembersSetComponent
  ],
  declarations: [RuanwenMembersSetComponent, MembersEditAddComponent]
})
export class RuanwenMembersSetModule { }
