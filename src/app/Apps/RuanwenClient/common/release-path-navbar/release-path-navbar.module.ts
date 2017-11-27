import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReleasePathNavbarComponent } from './release-path-navbar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[
  	ReleasePathNavbarComponent
  ],
  declarations: [ReleasePathNavbarComponent]
})
export class ReleasePathNavbarModule { }
