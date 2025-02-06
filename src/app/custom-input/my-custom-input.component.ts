import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'custom-input',
  template: `
    <mat-form-field>
        <mat-label>Custom</mat-label>
        <input matInput [formControl]="formControl" [formlyAttributes]="field">
    </mat-form-field>
  `,
  imports: [ReactiveFormsModule, FormlyModule, FormlyMaterialModule, MatInputModule, MatFormFieldModule]
})
export class MyCustomInputComponent extends FieldType<FieldTypeConfig> {
}