import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'custom-input',
  template: `
      <img src="https://preview.redd.it/k4o9e5e0zlu51.jpg?auto=webp&s=ee71a7f8d30d5c5954b78d2d2de3edd423e96e40" alt="Angular" width="300">
    <mat-form-field style="width: 100%">
        <mat-label>Que lenguaje tiene una secta propia? (la respuesta es python)</mat-label>
        <input matInput [formControl]="formControl" [formlyAttributes]="field">
    </mat-form-field>
  `,
  imports: [ReactiveFormsModule, FormlyModule, FormlyMaterialModule, MatInputModule, MatFormFieldModule]
})
export class MyCustomInputComponent extends FieldType<FieldTypeConfig> {
}