import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppsMainComponent } from './apps-main.component';

import { RiccioDisabledbuttonModule }		from '../../../../Public/riccioModule'
import { RiccioSpinnersModule }		from '../../../../Public/riccio-spinners/riccio-spinners.module';
import { RiccioSingleMembersModule }    from '.././../../../Public/riccio-single-members/riccio-single-members.module'
import { RiccioPaginationsModule }    from '../../../../Public/riccio-paginations/riccio-paginations.module'
import { RiccioPboxModule }      from '../../../../Public/riccio-pbox/riccio-pbox.module'
import { RiccioSelectMembersModule }    from '../../../../Public/riccio-select-members/riccio-select-members.module'

import { RuanwenAccountSetModule }    from '../../../common/RuanwenServices/ruanwen-account-set/ruanwen-account-set.module'
import { RuanwenMembersSetModule }    from '../../../common/RuanwenServices/ruanwen-members-set/ruanwen-members-set.module'

import { AppsInfoComponent } from './apps-info/apps-info.component'

import { RoleMainModule }		from '../../role/role-main/role-main.module';
import { AppsInfoMembersComponent } from './apps-info/apps-info-members/apps-info-members.component'

@NgModule({
  imports: [
    CommonModule,
    RoleMainModule,
    RiccioDisabledbuttonModule,
    RiccioPboxModule,
    RiccioSelectMembersModule,
    RiccioSpinnersModule,
    RiccioPaginationsModule,
    RiccioSingleMembersModule,
    RuanwenAccountSetModule,
    RuanwenMembersSetModule
  ],
  exports:[
  	AppsMainComponent
  ],
  declarations: [AppsMainComponent, AppsInfoComponent, AppsInfoMembersComponent]
})
export class AppsMainModule { }
