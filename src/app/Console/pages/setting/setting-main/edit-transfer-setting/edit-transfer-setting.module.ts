import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                 from '@angular/forms';

import { EditTransferSettingComponent }		from './edit-transfer-setting.component'

import { EditTransferSettingService }		from './edit-transfer-setting.service'

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
  	EditTransferSettingComponent
  ],
  declarations: [
  	EditTransferSettingComponent
  ],
  providers:[
  	EditTransferSettingService
  ]
})
export class EditTransferSettingModule { }
