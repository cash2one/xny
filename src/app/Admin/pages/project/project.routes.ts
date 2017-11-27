import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,RouterModule } 	from '@angular/router';

import { ProjectComponent }				from './project.component';
import { TasksTemplateComponent }       from './tasks-template/tasks-template.component';
import { TaskDetailsComponent  }		from './tasks-template/task-details/task-details.component';
import { TasksTemplateLabelComponent }  from './tasks-template-label/tasks-template-label.component';

const ProjectRoutes=[
	{
	    path: '',
	    component: ProjectComponent,
	    children:[
		    { path: '', redirectTo: 'taglist', pathMatch: 'full' },
			{
				path: 'taglist',
				component: TasksTemplateLabelComponent,
			},
			{
				path: 'list',
				component: TasksTemplateComponent,
				children:[
					{
						path:':id',
						component: TaskDetailsComponent
					}
				]
			}
	    ]
	}
];

export const projectRoutes = RouterModule.forChild(ProjectRoutes);
