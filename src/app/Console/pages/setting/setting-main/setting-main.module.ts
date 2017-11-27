import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                 from '@angular/forms';

import { SettingMainComponent } from './setting-main.component';
import { EditNameSettingComponent } from './edit-name-setting/edit-name-setting.component';
import { EditAreaSettingComponent } from './edit-area-setting/edit-area-setting.component';
import { EditTransferSettingModule }			from './edit-transfer-setting/edit-transfer-setting.module'

import { RiccioModalModule }		from '../../../../Public/riccio-modal/riccio-modal.module'
import { RiccioPboxModule }      from '../../../../Public/riccio-pbox/riccio-pbox.module';
import { RiccioPopoversModule }		from '../../../../Public/riccio-popovers/riccio-popovers.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RiccioPboxModule,
    RiccioPopoversModule,
    EditTransferSettingModule,
    RiccioModalModule
  ],
  declarations: [SettingMainComponent, EditNameSettingComponent, EditAreaSettingComponent]
})
export class SettingMainModule { }
