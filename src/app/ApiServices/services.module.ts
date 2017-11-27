import { NgModule, ModuleWithProviders }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { GrAppInfoService }    from './grAppInfo/grAppInfo.service'
import { GrUeditorService }    from './grUeditor/grUeditor.service'
import { GrCompanyInfoService } from './grCompanyInfo/grCompanyInfo.service'
import { GrDateToolService } from './grDateTool/dateTool.service'
import { GrMembersService } from './grMembers/grMembers.service'

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
        GrAppInfoService,
        GrUeditorService,
        GrCompanyInfoService,
        GrDateToolService,
        GrMembersService
      ],
    };
  }

}