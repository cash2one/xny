import { NgModule } from '@angular/core';
import { FormsModule }                 from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ReleaseScreenResourceService }		from './release-screen-resource.service'
import { ScreenTypeItemService }			from './screen-type-item/screen-type-item.service'

import { ReleaseScreenResourceComponent } from './release-screen-resource.component';
import { ScreenTypeItemComponent } from './screen-type-item/screen-type-item.component';
import { ScreenTypeSelectComponent } from './screen-type-select/screen-type-select.component';
import { ScreenTypeChooseComponent } from './screen-type-choose/screen-type-choose.component';
import { ScreenTypeHeaderComponent } from './screen-type-header/screen-type-header.component';
import { SelectSingleComponent } from './screen-type-select/select-single/select-single.component'

import { RiccioPboxModule }    from '@gr-public/riccio-pbox/riccio-pbox.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RiccioPboxModule
  ],
  exports:[
  	ReleaseScreenResourceComponent,
    ScreenTypeHeaderComponent
  ],
  declarations: [
    ReleaseScreenResourceComponent, 
    ScreenTypeItemComponent, 
    ScreenTypeSelectComponent, 
    ScreenTypeChooseComponent, 
    ScreenTypeHeaderComponent, 
    SelectSingleComponent
  ],
  providers:[
  	ReleaseScreenResourceService,
  	ScreenTypeItemService
  ]
})
export class ReleaseScreenResourceModule { }
