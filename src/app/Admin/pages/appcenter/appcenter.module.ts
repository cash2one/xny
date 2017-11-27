import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppcenterComponent } from './appcenter.component';

import { appcenterRoutes } from './appcenter.routes';
import { ModelAdminComponent } from './model-admin/model-admin.component';
import { ModelConsoleComponent } from './model-console/model-console.component';
import { ModelAppconfigComponent } from './model-appconfig/model-appconfig.component';
import { ModelProjectComponent } from './model-project/model-project.component';
import { ModelBsbyServiceComponent } from './model-bsbyService/model-bsbyService.component'
import { ModelBsbyClientComponent } from './model-bsbyClient/model-bsbyClient.component'
import { ModelRuanwenServiceComponent } from './model-ruanwenService/model-ruanwenService.component'
import { ModelRuanwenClientComponent } from './model-ruanwenClient/model-ruanwenClient.component'

import { AppcenterService } from './appcenter.service';
import { AppcenterDetailComponent } from './appcenter-detail/appcenter-detail.component'
// import { AddEditAppcenterService }      from './add-edit-appcenter/add-edit-appcenter.service'

import { AppcenterMainComponent } from './appcenter-main/appcenter-main.component'

import { RiccioModalModule } from '../../../Public/riccio-modal/riccio-modal.module'
import { RiccioPboxModule } from '../../../Public/riccio-pbox/riccio-pbox.module'
import { RiccioBreadcrumbModule } from '../../../Public/riccio-breadcrumb/riccio-breadcrumb.module'
import { DirectiveModule } from '../../../Public/directives/directive.module'

import { ConfigModule } from '../config/config.module'
import { ShowDetailModule } from '../../show-detail/show-detail.module'
import { MyLoadingModule } from '../../../Public/Animations/my-loading/my-loading.module'
import { RiccioPaginationsModule } from '../../../Public/riccio-paginations/riccio-paginations.module'
import { AddEditAppcenterModule } from './add-edit-appcenter/add-edit-appcenter.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    appcenterRoutes,
    RiccioModalModule,
    RiccioPboxModule,
    RiccioBreadcrumbModule,
    ShowDetailModule,
    MyLoadingModule,
    ConfigModule,
    RiccioPaginationsModule,
    AddEditAppcenterModule,
    DirectiveModule
  ],
  exports: [
    AppcenterComponent
  ],
  declarations: [
    AppcenterComponent,
    AppcenterMainComponent,
    ModelAdminComponent,
    ModelConsoleComponent,
    ModelAppconfigComponent,
    ModelProjectComponent,
    AppcenterDetailComponent,
    ModelBsbyServiceComponent,
    ModelBsbyClientComponent,
    ModelRuanwenServiceComponent,
    ModelRuanwenClientComponent
  ],
  providers: [
    AppcenterService,
  ]
})
export class AppcenterModule { }
