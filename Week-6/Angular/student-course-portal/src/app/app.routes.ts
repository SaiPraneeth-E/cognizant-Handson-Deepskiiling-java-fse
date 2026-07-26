import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then(m => m.Home)
  },
  {
    path: 'courses',
    loadComponent: () => import('./pages/course-list/course-list').then(m => m.CourseList)
  },
  {
    path: 'courses/:id',
    loadComponent: () => import('./pages/course-detail/course-detail').then(m => m.CourseDetail)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/student-profile/student-profile').then(m => m.StudentProfile),
    canActivate: [authGuard]
  },
  {
    path: 'enroll',
    loadComponent: () => import('./pages/enrollment-form/enrollment-form').then(m => m.EnrollmentForm)
  },
  {
    path: 'enroll-reactive',
    loadComponent: () => import('./pages/reactive-enrollment-form/reactive-enrollment-form').then(m => m.ReactiveEnrollmentForm)
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound)
  }
];
