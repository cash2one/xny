import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CoreModule } from '../core.module'

import { SearchInputComponent } from './search-input.component'

@NgModule({
  imports: [
    CommonModule,
    CoreModule
  ],
  exports:[
  	SearchInputComponent
  ],
  declarations: [
  	SearchInputComponent
  ]
})
export class SearchInputModule { }