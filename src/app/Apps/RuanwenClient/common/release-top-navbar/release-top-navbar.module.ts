import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReleaseTopNavbarComponent } from './release-top-navbar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[
  	ReleaseTopNavbarComponent
  ],
  declarations: [ReleaseTopNavbarComponent]
})
export class ReleaseTopNavbarModule { }
