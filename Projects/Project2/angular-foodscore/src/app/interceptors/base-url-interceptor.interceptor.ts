import { HttpInterceptorFn } from '@angular/common/http';
import { isDevMode } from '@angular/core';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  let serverUrl: string;
  if (isDevMode()) {
    // App in development mode
    serverUrl = 'http://arturober.com:5010'; // Development server url
  } else {
    // App in production mode
    serverUrl = 'http://arturober.com:5010'; // Production server url
  }
  const reqClone = req.clone({
    url: `${serverUrl}/${req.url}`,
  });
  return next(reqClone);
};

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  if (token) {
    // Clone the request to add the new header.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token),
    });
    // Pass on the cloned request instead of the original request.
    return next(authReq);
  }
  return next(req);
};
