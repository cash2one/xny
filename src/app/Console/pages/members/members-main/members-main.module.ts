import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                 from '@angular/forms';

import { MembersCreateModule }    from './members-create/members-create.module'
import { MembersAddModule }      from '../members-add/members-add.module'
import { MembersDetailsComponent } from '../members-details/members-details.component'
import { MembersSetDepartmentModule }    from '../members-set-department/members-set-department.module'
import { MembersSetAdminModule }    from '../members-set-admin/members-set-admin.module'
import { MembersDepartmentModule }    from '../members-department/members-department.module'
import { MembersDisableModule }    from '../members-disable/members-disable.module'
import { MembersMainComponent } from './members-main.component';
import { MembersSetRoleModule }    from '../members-set-role/members-set-role.module'
import { MembersSetDepartmentMainModule }    from '../members-set-department-main/members-set-department-main.module'
import { MembersNoadminitemsComponent } from './members-noadminitems/members-noadminitems.component';
import { MembersNodepartmentitemsComponent } from './members-nodepartmentitems/members-nodepartmentitems.component';
import { MembersEditComponent } from './members-edit/members-edit.component';

import { RiccioSpinnersModule }        from '../../../../Public/riccio-spinners/riccio-spinners.module'
import { RiccioPaginationsModule }    from '../../../../Public/riccio-paginations/riccio-paginations.module'
import { RiccioPopUpRightModule }      from '../../../../Public/riccio-pop-up-right/riccio-pop-up-right.module';
import { RiccioTreeModule }      from '../../../../Public/riccio-tree/riccio-tree.module';
import { RiccioPboxModule }      from '../../../../Public/riccio-pbox/riccio-pbox.module';
import { RiccioModalModule }    from '../../../../Public/riccio-modal/riccio-modal.module';
import { RiccioSelectMembersModule }    from '../../../../Public/riccio-select-members/riccio-select-members.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RiccioTreeModule,
    RiccioPboxModule,
    RiccioPopUpRightModule,
    RiccioModalModule,
    RiccioPaginationsModule,
    RiccioSpinnersModule,
    RiccioSelectMembersModule,
    MembersDisableModule,
    MembersDepartmentModule,
    MembersSetAdminModule,
	  MembersSetDepartmentModule,
	  MembersAddModule,
    MembersSetDepartmentMainModule,
    MembersCreateModule,
    MembersSetRoleModule
  ],
  exports:[
  	MembersMainComponent
  ],
  declarations: [
  	MembersDetailsComponent,
  	MembersMainComponent,
  	MembersNoadminitemsComponent,
  	MembersNodepartmentitemsComponent,
  	MembersEditComponent
  ]
})
export class MembersMainModule { }
