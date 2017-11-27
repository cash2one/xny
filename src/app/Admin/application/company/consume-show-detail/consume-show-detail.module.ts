import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsumeShowDetailComponent } from './consume-show-detail.component'
import { ConsumeShowDetailService } from './consume-show-detail.service'

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[
  	ConsumeShowDetailComponent
  ],
  declarations: [
  	ConsumeShowDetailComponent
  ],
  providers:[
    ConsumeShowDetailService
  ]
})
export class ConsumeShowDetailModule { }