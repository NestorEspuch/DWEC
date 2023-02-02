import { Routes } from '@angular/router';

export const PRODUCT_DETAIL_ROUTES: Routes = [
  {
    path: 'info',
    loadComponent: () =>
      import('./product-info/product-info.component').then(
        (m) => m.ProductInfoComponent
      ),
  },
  {
    path: 'comments',
    loadComponent: () =>
      import('./product-comments/product-comments.component').then(
        (m) => m.ProductCommentsComponent
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'info',
  },
];
