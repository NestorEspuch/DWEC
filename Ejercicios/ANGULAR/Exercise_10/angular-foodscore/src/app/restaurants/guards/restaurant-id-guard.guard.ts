import { inject } from "@angular/core";
import { CanActivateFn, ActivatedRouteSnapshot, Router } from "@angular/router";

export const resturantIdGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
) => {
  const id = +route.params['id'];
  console.log("Id recibida " + id);
  if (isNaN(id) || id < 1) {
    return inject(Router).createUrlTree(['/products']);
  }
  return true;
};
