import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MyPromptSmallModule } from '../my-prompt-small/my-prompt-small.module'
// import { AddToModule } from '../../../Admin/pages/system/menu/add-to/add-to.module'
import { UserCenterAddModule } from '../../../Admin/pages/user/user-center-add/user-center-add.module'
// import { AddEditAppcenterModule } from '../../../Admin/pages/appcenter/add-edit-appcenter/add-edit-appcenter.module'
import { TaskAddModule } from '../../../Admin/pages/project/tasks-template/task-add/task-add.module'
import { AddoncenterAddModule } from '../../../Admin/pages/addoncenter/addoncenter-add/addoncenter-add.module'

import { AddEditCompanyModule } from '../../../Admin/application/company/add-edit-company/add-edit-company.module'

import { MyElasticLayerComponent } from './my-elastic-layer.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MyPromptSmallModule,
    // AddToModule,
    UserCenterAddModule,
    TaskAddModule,
    AddoncenterAddModule,
    // AddEditAppcenterModule,
    AddEditCompanyModule
  ],
  exports: [
    MyElasticLayerComponent
  ],
  declarations: [
    MyElasticLayerComponent
  ]
})
export class MyElasticLayerModule { }
