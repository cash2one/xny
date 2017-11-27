import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule }                from '@angular/router';
import { FormsModule }                                  from '@angular/forms';
import { NglModule }                   from 'ng-lightning/ng-lightning';
import { DragulaModule }               from 'ng2-dragula';


import { TasksTemplateLabelComponent }  from './tasks-template-label.component';
import { TasksLabelAddComponent } from './tasks-label-add/tasks-label-add.component';
import { TasksLabelEditComponent } from './tasks-label-edit/tasks-label-edit.component';

@NgModule({
  imports: [
  	CommonModule,
    FormsModule,
    RouterModule,
    DragulaModule,
    NglModule.forRoot()
  ],
  exports:[
  	TasksTemplateLabelComponent,
    TasksLabelAddComponent
  ],

  declarations: [TasksTemplateLabelComponent, TasksLabelAddComponent, TasksLabelEditComponent]
})
export class TasksTemplateLabelModule { }
