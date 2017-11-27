import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                                  from '@angular/forms';

import { UserCenterAddComponent } from './user-center-add.component';

import { UserCenterAddService }		from './user-center-add.service'

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
  	UserCenterAddComponent
  ],
  declarations: [
  	UserCenterAddComponent
  ],
  providers:[
    UserCenterAddService
  ]
})
export class UserCenterAddModule { }
