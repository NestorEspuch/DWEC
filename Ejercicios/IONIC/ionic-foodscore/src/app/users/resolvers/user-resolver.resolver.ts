import { inject } from "@angular/core";
import { ResolveFn, Router } from "@angular/router";
import { catchError, EMPTY } from "rxjs";
import { User } from "../interfaces/user";
import { UsersService } from "../services/user-service.service";

export const userResolver: ResolveFn<User> = (route) => {
  return inject(UsersService)
    .getUser(+route.params['id'])
    .pipe(
      catchError(() => {
        inject(Router).navigate(['/login']);
        return EMPTY;
      })
    );
};
