import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                 from '@angular/forms';
import { SettingComponent } from './setting.component';

import { SettingMainModule }    from './setting-main/setting-main.module'
import { SettingLogoModule }    from './setting-logo/setting-logo.module' 
import { SettingCertificationModule }    from './setting-certification/setting-certification.module'

import { settingRoutes }		from './setting.routes'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SettingLogoModule,
    SettingMainModule,
    settingRoutes,
    SettingCertificationModule
  ],
  exports:[
  	SettingComponent
  ],
  declarations: [
  	SettingComponent
  ]
})
export class SettingModule { }
