import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';

import { AccountProfileModule }		from './account-profile/account-profile.module'

import { accountRoutes }		from './account.routes'

@NgModule({
  imports: [
    CommonModule,
    AccountProfileModule,
    accountRoutes
  ],
  declarations: [AccountComponent]
})
export class AccountModule { }
