import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: 'restaurant',
    loadChildren: () =>
      import('./restaurants/restaurant.routes').then((m) => m.routes),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.routes').then((m) => m.routes),
  },
  // Default route (empty) -> Redirect to welcome page
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  // Doesn't match any of the above
  { path: '**', redirectTo: 'auth/login'}
];
