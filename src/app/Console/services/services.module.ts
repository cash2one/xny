import { NgModule, ModuleWithProviders }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { GrMembersService }    from './grMembers/grMembers.service'
import { GrRoleService }      from './grRole/gr-role.service'
import { GrSettingService }    from './grSetting/grSetting.service'
import { GrConsolesService }    from './grConsoles/grConsoles.service'
import { GrAppsService }    from './grApps/grApps.services'
import { GrAccountService }    from './grAccount/grAccount.services'
import { GrAccountsService } from './grAccounts/grAccounts.service'
import { GrNofityService } from './grNotify/grNotify.service'
import { GrGongdanService }  from './grGongdan/grGongdan.service'      

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: []
})
export class ServicesModule {

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: ServicesModule,
      providers: [
        GrMembersService,
        GrRoleService,
        GrSettingService,
        GrConsolesService,
        GrAppsService,
        GrAccountService,
        GrAccountsService,
        GrNofityService,
        GrGongdanService
      ],
    };
  }

}