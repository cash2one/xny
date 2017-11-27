import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { IndexComponent } from './index.component'
import { IndexRoutes } from './index.routes'

@NgModule({
  imports: [
    CommonModule,
    IndexRoutes
  ],
  declarations: [IndexComponent],
  exports:[
      IndexComponent
  ]
})
export class IndexModule { }
