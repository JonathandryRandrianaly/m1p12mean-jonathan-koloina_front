import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ApiService } from '../../../../services/api/api.service';

@Component({
  selector: 'app-type-entretien-insertion',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatTooltipModule
  ],
  templateUrl: './type-entretien-insertion.component.html',
  styleUrl: './type-entretien-insertion.component.css'
})
export class TypeEntretienInsertionComponent {
  loading: boolean = false;
  error: boolean = false;
  type_form: FormGroup;
  categoriesEntretien: any[]= [];
  categoriesModele: any[]= [];
  specialisations: any[]= [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<TypeEntretienInsertionComponent>
  ) 
  {
      this.loadCategoriesEntretien();
      this.loadCategoriesModele();
      this.loadSpecialisations();
      this.type_form = this.fb.group({
        nom: ['', Validators.required],
        description: ['', Validators.required],
        categorieEntretien: ['', Validators.required],
        categorieModele: ['', Validators.required],
        specialisationsId: this.fb.array([]),
        prix: [
          '', 
          [
            Validators.required,
            Validators.min(0)
          ]
        ],
      });
  }

  onSpecialisationChange(event: any, id: string) {
    const specialisationArray = this.type_form.get('specialisationsId') as FormArray;
    if (event.target.checked) {
      specialisationArray.push(new FormControl(id));
    } else {
      const index = specialisationArray.controls.findIndex(x => x.value === id);
      if (index >= 0) {
        specialisationArray.removeAt(index);
      }
    }
  }

  loadCategoriesEntretien() {
    const statut = 10;
    this.apiService.getWithData(`api/categorie-entretiens/statut/${statut}`, {}).then(
      (response) => {
        this.categoriesEntretien = response;
      },
      (error) => {
        console.error('Erreur lors de loadCategoriesEntretien :', error);
      }
    );
  }

  loadCategoriesModele() {
    const statut = 10;
    this.apiService.getWithData(`api/categorie-modeles/statut/${statut}`, {}).then(
      (response) => {
        this.categoriesModele = response;
      },
      (error) => {
        console.error('Erreur lors de loadCategoriesModele :', error);
      }
    );
  }

  loadSpecialisations() {
    const statut = 10;
    this.apiService.getWithData(`api/specialisations/statut/${statut}`, {}).then(
      (response) => {
        this.specialisations = response;
      },
      (error) => {
        console.error('Erreur lors de loadSpecialisations :', error);
      }
    );
  }

  onSubmit() {
    if (this.type_form.valid) {
      this.dialogRef.close(this.type_form.value);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
