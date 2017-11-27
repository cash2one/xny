import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule }                from '@angular/router';
import { FormsModule }                                  from '@angular/forms';
 
import { TasksTemplateComponent }  from './tasks-template.component'

import { NglModule }                   from 'ng-lightning/ng-lightning';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { DragulaModule }               from 'ng2-dragula';
import { TaskCatAddComponent } from './task-details/task-cat-add/task-cat-add.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    DragulaModule,
    NglModule.forRoot()
  ],
  exports:[
	TasksTemplateComponent,TaskDetailsComponent,TaskCatAddComponent
  ],
  declarations: [
  	TasksTemplateComponent,TaskEditComponent,TaskDetailsComponent, TaskCatAddComponent
  ]
})
export class TasksTemplateModule { }
