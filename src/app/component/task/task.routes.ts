import {Routes} from '@angular/router';
import {TaskComponent} from './task.component';

export const taskRoutes: Routes = [
  { path: 'tasks', loadComponent: () => import('../task/task.component').then(m => m.TaskComponent) },
]
