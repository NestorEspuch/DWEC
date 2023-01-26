import { Routes } from '@angular/router';
import { leavePageGuard } from '../guards/leave-page-guard.guard';
import { restaurantResolver } from './resolvers/restaurant-resolver.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./restaurants-page/restaurants-page.component').then(
        (m) => m.RestaurantsPageComponent
      ),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./restaurant-form/restaurant-form.component').then(
        (m) => m.RestaurantFormComponent
      ),
    canDeactivate: [leavePageGuard],
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./restaurant-form/restaurant-form.component').then(
        (m) => m.RestaurantFormComponent
      ),
    resolve: { restaurant: restaurantResolver },
    canDeactivate: [leavePageGuard],
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./restaurant-details/restaurant-details.component').then(
        (m) => m.RestaurantDetailsComponent
      ),
    resolve: { restaurant: restaurantResolver },
  },
];
