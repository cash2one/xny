import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingLogoComponent } from './setting-logo.component';

import { FileUploadModule } from 'ng2-file-upload';
import { RiccioModalModule }		from '../../../../Public/riccio-modal/riccio-modal.module'
	
@NgModule({
  imports: [
    CommonModule,
    RiccioModalModule,
    FileUploadModule
  ],
  declarations: [
  	SettingLogoComponent
  ]
})
export class SettingLogoModule { }