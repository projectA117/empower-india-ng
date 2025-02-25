import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { LoaderInterceptor } from 'src/interceptors/loader.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
  ],
};
