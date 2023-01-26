import { Routes } from "@angular/router";
import { loginActivateGuard } from "./auth/guards/loginActivate.guard";
import { logoutActivateGuard } from "./auth/guards/logoutActivate.guard";

export const routes: Routes = [
  {
    path: 'restaurant',
    loadChildren: () =>
      import('./restaurants/restaurant.routes').then((m) => m.routes),
      canActivate: [loginActivateGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.routes').then((m) => m.routes),
      canActivate: [logoutActivateGuard],
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/user.routes').then((m) => m.routes),
      canActivate: [loginActivateGuard],
  },
  // Default route (empty) -> Redirect to welcome page
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  // Doesn't match any of the above
  { path: '**', redirectTo: 'auth/login'}
];
