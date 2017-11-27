import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CoreModule } from '../core.module'
import { ServicesModule } from '../../../../ApiServices/services.module'

import { SceneComponent } from './scene.component'
import { SceneService } from './scene.service'

import { SearchInputModule } from '../search-input/search-input.module'
import { RiccioSpinnersModule } from '@gr-public/riccio-spinners/riccio-spinners.module'
import { RiccioPopDatePickerModule } from '@gr-public/riccio-pop-datePicker/riccio-pop-datePicker.module'
import { RiccioSingleMembersModule } from '@gr-public/riccio-single-members/riccio-single-members.module'

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    ServicesModule,
    SearchInputModule,
    RiccioSpinnersModule,
    RiccioPopDatePickerModule,
    RiccioSingleMembersModule
  ],
  exports:[
    SceneComponent
  ],
  declarations: [
    SceneComponent
  ],
  providers:[
    SceneService
  ]
})
export class SceneModule { }