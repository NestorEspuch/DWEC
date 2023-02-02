import { Routes } from '@angular/router';
import { loginActivateGuard } from './guards/login-activate.guard';
import { logoutActivateGuard } from './guards/logout-activate.guard';
export const APP_ROUTES: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/routes').then((m) => m.AUTH_ROUTES),
    canActivate: [logoutActivateGuard],
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/routes').then((m) => m.PRODUCTS_ROUTES),
    canActivate: [loginActivateGuard],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/auth/login',
  },
];
