import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { MyCustomInputComponent } from './custom-input/my-custom-input.component';

export function minLengthValidationMessage(error: any, field: FormlyFieldConfig) {
  return `Debe tener al menos ${field.props?.minLength} caracteres`;
}

export function maxLengthValidationMessage(error: any, field: FormlyFieldConfig) {
  return `El valor debe ser menor a ${field.props?.maxLength} caracteres`;
}

export function minValidationMessage(error: any, field: FormlyFieldConfig) {
  return `El valor debe ser mayor a ${field.props?.min}`;
}

export function maxValidationMessage(error: any, field: FormlyFieldConfig) {
  return `El valor debe ser menor a ${field.props?.max}`;
}

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
          validationMessages: [
            { name: 'required', message: 'El campo es requerido capo!' },
            { name: 'minLength', message: minLengthValidationMessage },
            { name: 'maxLength', message: maxLengthValidationMessage },
            { name: 'min', message: minValidationMessage },
            { name: 'max', message: maxValidationMessage },
          ],
      }),
      FormlyMaterialModule
    ]), provideAnimationsAsync()
  ]
};

