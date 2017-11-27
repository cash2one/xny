import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { TasksTemplateLabelComponent } from './tasks-template-label/tasks-template-label.component';
import { TaskDetailsComponent } from './tasks-template/task-details/task-details.component';

import { TasksTemplateModule } from './tasks-template/tasks-template.module';
import { TasksTemplateLabelModule } from './tasks-template-label/tasks-template-label.module';

import { projectRoutes } from './project.routes';
import { ProjectComponent } from './project.component';


@NgModule({
  imports: [
    CommonModule,
    TasksTemplateModule,
    TasksTemplateLabelModule,
    FormsModule,
    projectRoutes
  ],
  exports: [
    ProjectComponent
  ],
  declarations: [
    ProjectComponent
  ]
})
export class ProjectModule { }
