import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'
import { RiccioBreadcrumbComponent } from './riccio-breadcrumb.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [RiccioBreadcrumbComponent],
  exports:[
    RiccioBreadcrumbComponent
  ]
})
export class RiccioBreadcrumbModule { }
