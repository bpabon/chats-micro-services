import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAngularSvgIcon } from 'angular-svg-icon';
import { provideAnimations } from '@angular/platform-browser/animations';
import { jwtInterceptor } from './core/interceptor/jwt.interceptor';
import { provideServerRendering } from '@angular/platform-server';
// // import { initializeApp } from './app-init';
// import { LoadingService } from './core/services/loading.service';
// import { ThemeService } from './core/services/theme.service';

export const appConfig: ApplicationConfig = {
  providers: [
     provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
     provideClientHydration(withEventReplay()),
     provideAngularSvgIcon(),
     provideServerRendering(),
     provideAnimations(),
     provideHttpClient(
      withFetch(),
      withInterceptors([jwtInterceptor])
    ),
    // provideAppInitializer(async () => {
    //   // const loadingService = inject(LoadingService);
    //   const themeService = inject(ThemeService);
    //   await themeService.loadTheme();
    //   // loadingService.show();
    //   await new Promise(resolve => resolve);
    // }),
  ]
};
