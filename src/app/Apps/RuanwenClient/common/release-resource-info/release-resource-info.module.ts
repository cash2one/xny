import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReleaseResourceInfoComponent } from './release-resource-info.component';


@NgModule({
  imports: [
    CommonModule
  ],
  exports:[
  	ReleaseResourceInfoComponent
  ],
  declarations: [ReleaseResourceInfoComponent]
})
export class ReleaseResourceInfoModule { }
