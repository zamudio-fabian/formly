import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { CommonModule } from '@angular/common';
import { FormlyMaterialModule } from '@ngx-formly/material';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, MatCardModule, MatIconModule, MatButtonModule, CommonModule, FormlyModule, FormlyMaterialModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'dinamic-form';

  form = new FormGroup({});
  model: any = { };
  formularios: any[] = [
    {
      id: "v1",
      name: "Formulario base V1"
    },
    {
      id: "v2",
      name: "Formulario base mod V2"
    },
    {
      id: "v3",
      name: "Formulario input custom"
    },
    {
      id: "v4",
      name: "Formulario style custom"
    }
  ];
  selectedForm = this.formularios[0].id;
  envios: any[] = [];
  fields: FormlyFieldConfig[] = [];
  envioId: any = null;

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    this.loadJsonData(this.selectedForm);
  }

  loadJsonData(formulario: string): void {
    this.http.get(`/assets/json/${formulario}.json`).subscribe((response: any) => {
      this.fields =  response.data as FormlyFieldConfig[];
      this.resetForm();
    });
  }

  onSubmit() {
    if (this.form.valid) {
      let form = new FormGroup({});
      form.disable();
      if(this.envioId){
        this.envios[this.envios.findIndex(e => e.id === this.envioId)] = {
          id: this.envioId,
          tarea: this.formularios.find(f => f.id === this.selectedForm),
          fields: JSON.parse(JSON.stringify(this.fields)), // Copia profunda
          model: JSON.parse(JSON.stringify(this.model)), // Copia profunda
          form
        };
      }else {
        this.envios.unshift({
          id: this.envios.length + 1,
          tarea: this.formularios.find(f => f.id === this.selectedForm),
          fields: JSON.parse(JSON.stringify(this.fields)), // Copia profunda
          model: JSON.parse(JSON.stringify(this.model)), // Copia profunda
          form
        });
      }
      this.resetForm();
    }
  }

  editForm(envio: any) {
    this.envioId = envio.id;
    this.fields = envio.fields;
    this.model = envio.model;
  }

  cancelEdit() {
    this.resetForm();
  }

  private resetForm() {
    this.envioId = null;
      this.model = {};
      this.form = new FormGroup({});
  }
}
