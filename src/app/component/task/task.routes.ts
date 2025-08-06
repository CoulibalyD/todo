import {Routes} from '@angular/router';
import {TaskComponent} from './task.component';
import {AuthGuard} from '../../auth/auth.guard';

export const taskRoutes: Routes = [
  { path: 'tasks', loadComponent: () => import('../task/task.component').then(m => m.TaskComponent),  canActivate: [AuthGuard] },
]
