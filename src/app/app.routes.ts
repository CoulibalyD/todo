import { Routes } from '@angular/router';
import {authRoutes} from './auth/auth.routes';
import {taskRoutes} from './component/task/task.routes';
import {AuthGuard} from './auth/auth.guard';

export const routes: Routes = [
  ...authRoutes,
  ...taskRoutes,
  { path: '', redirectTo: '/home', pathMatch: 'full'  },
  { path: 'profil', loadComponent: () => import('../app/component/profile/profile.component').then(m => m.ProfileComponent) , canActivate:[AuthGuard] },
  { path: 'home', loadComponent: () => import('../app/component/home/home.component').then(m => m.HomeComponent) },
  { path: '', loadComponent: () => import('../app/component/home/home.component').then(m => m.HomeComponent) },
  { path: '**', loadComponent: () => import('../app/component/home/home.component').then(m => m.HomeComponent)  },
];
