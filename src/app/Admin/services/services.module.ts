import { NgModule, ModuleWithProviders }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { GrLoginService }		from './grLogin/grLogin.service'
import { GrMenuListService }		from './grLogin/grMenuList.service';
import { GrRoleService }    from './grRole/grRole.service';
import { GrTasksListService }    from './grTasks/grTasksList.service';
import { GrTagListService }    from './grTasks/grTagList.service';
import { GrUserService }    from './grUser/grUser.service';
import { GrTaskTagListService } from'./grTasks/gr-task-tag-list.service';
import { GrAppcenterService }    from './grAppcenter/grAppcenter.service'
import { GrConfigService }    from './grConfig/grConfig.service'
import { GrAddoncenterService }    from './grAddoncenter/grAddoncenter.service';
import { GrCompanyService }    from './grCompany/grCompany.service';
import { GrMembersService } from './grMembers/grMembers.service';
import { GrMoreService } from "./grMore/gr-more.service";
import { GrAssistService }    from './grAssist/grAssist.service';

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
      	GrLoginService,
      	GrMenuListService,
        GrRoleService,
        GrTasksListService,
        GrTagListService,
        GrUserService,
        GrAppcenterService,
        GrTaskTagListService,
        GrAssistService,
        GrConfigService,
        GrAddoncenterService,
        GrCompanyService,
        GrMembersService,
        GrMoreService
      ],
    };
  }

}
