// src/app/app.config.ts
// Application Configuration - Providers for the standalone Angular app
// Configures routing, animations, HTTP client, and Material modules

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http'; // HttpClient for API calls
import { MatNativeDateModule } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),                         // Angular Router
    provideAnimations(),                           // Angular Animations (required by Material)
    provideHttpClient(),                           // HttpClient for JSON Server API calls
    importProvidersFrom(MatNativeDateModule)        // Material date handling
  ]
};