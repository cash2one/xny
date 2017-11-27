import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AccountProfileComponent } from './account-profile.component';
import { RiccioDisabledbuttonModule } from '../../../../Public/riccio-disabledbutton/riccio-disabledbutton.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RiccioDisabledbuttonModule
  ],
  declarations: [AccountProfileComponent]
})
export class AccountProfileModule { }
