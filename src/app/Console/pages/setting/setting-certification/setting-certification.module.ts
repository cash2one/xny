import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                 from '@angular/forms';

import { SettingCertificationComponent } from './setting-certification.component';

import { FileUploadModule } from 'ng2-file-upload';

import { RiccioDisabledbuttonModule }		from '../../../../Public/riccio-disabledbutton/riccio-disabledbutton.module'
import { RiccioBrowseModule }		from '../../../../Public/riccio-browse/riccio-browse.module'
import { RiccioLoadingModule }		from '../../../../Public/riccio-loading/riccio-loading.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RiccioDisabledbuttonModule,
    RiccioBrowseModule,
    RiccioLoadingModule,
    FileUploadModule
  ],
  declarations: [SettingCertificationComponent]
})
export class SettingCertificationModule { }
