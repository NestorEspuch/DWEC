import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { provideFacebookId } from './app/auth/login/facebook-login/fb-login.config';
import { provideGoogleId } from './app/auth/login/google-login/google-login.config';
import { authInterceptor, baseUrlInterceptor } from './app/interceptors/base-url-interceptor.interceptor';
import { provideArcgisToken } from './app/maps/arcgis-maps.config';
import { routes } from './app/routes';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([baseUrlInterceptor, authInterceptor])),
    provideArcgisToken(
      'AAPK995b0f2b076a44a7a7521baf6e1a131dKUWODcTBOrS4PyKo5gzw5fW4oejNtboOOAGWqdkTcOoRkwmtoJaivtCeUQ1PSA-g'
    ),
    provideGoogleId(
      '746820501392-nc4pet9ffnm8gq8hg005re9e6ho65nua.apps.googleusercontent.com'
    ),
    provideFacebookId('511174834435807', 'v15.0'),
  ],
}).catch((err) => console.error(err));
