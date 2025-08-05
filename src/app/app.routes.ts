import { Routes } from '@angular/router';
import {authRoutes} from './auth/auth.routes';
import {taskRoutes} from './component/task/task.routes';

export const routes: Routes = [
  ...authRoutes,
  ...taskRoutes,
 // { path: '', redirectTo: '/home', pathMatch: 'full' , component: TaskComponent },
  { path: 'profil', loadComponent: () => import('../app/component/profile/profile.component').then(m => m.ProfileComponent) },
  { path: 'home', loadComponent: () => import('../app/component/home/home.component').then(m => m.HomeComponent) },
  { path: '', loadComponent: () => import('../app/component/home/home.component').then(m => m.HomeComponent) },
];
