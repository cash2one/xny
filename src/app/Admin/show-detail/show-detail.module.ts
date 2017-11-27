import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowDetailComponent } from './showDetail.component'
import { ShowDetailService } from './show-detail.service'

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[
  	ShowDetailComponent
  ],
  declarations: [
  	ShowDetailComponent
  ],
  providers:[
    ShowDetailService
  ]
})
export class ShowDetailModule { }