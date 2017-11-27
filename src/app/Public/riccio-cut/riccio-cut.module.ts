import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { ImageCropperModule } from 'ng2-img-cropper'

import { RiccioCutComponent } from './riccio-cut.component';

import { RiccioCutService }	from './riccio-cut.service'

@NgModule({
  imports: [
    CommonModule,
    ImageCropperModule
  ],
  exports:[
  	RiccioCutComponent
  ],
  declarations: [
    RiccioCutComponent
  ],
  providers:[
  	RiccioCutService
  ]
})
export class RiccioCutModule { }
