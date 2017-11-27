import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                                  from '@angular/forms';

import { TaskAddComponent }		from './task-add.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
  	TaskAddComponent
  ],
  declarations: [
  	TaskAddComponent
  ]
})
export class TaskAddModule { }
