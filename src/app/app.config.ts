import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FormlyModule } from '@ngx-formly/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { MyCustomInputComponent } from './custom-input/my-custom-input.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideAnimations(),
    provideHttpClient(withFetch()),
    provideClientHydration(withEventReplay()),
    importProvidersFrom([
      FormlyModule.forRoot({
          types: [
            {
              name: 'custom-input',
              component: MyCustomInputComponent
            },
          ],
      }),
      FormlyMaterialModule
    ]), provideAnimationsAsync()
  ]
};

