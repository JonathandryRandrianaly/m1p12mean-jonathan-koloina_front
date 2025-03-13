import {Component, OnInit} from '@angular/core';
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
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {CommonModule, NgIf} from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';
import {Genre} from '../../../../models/Genre';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {ApiService} from '../../../../services/api/api.service';

@Component({
  selector: 'app-employee-insertion',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatTooltipModule,
    MatSelectModule,
    MatCheckboxModule,
    MatStepperModule
  ],
  templateUrl: './employee-insertion.component.html',
  styleUrl: './employee-insertion.component.css'
})
export class EmployeeInsertionComponent {
  loading: boolean = false;
  error: boolean = false;
  usr_form: FormGroup;
  genres: Genre[] = [];
  specialisations: any[] = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<EmployeeInsertionComponent>
  ) {
      this.loadGenre();
      this.loadSpecialisations();
      this.usr_form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        idGenre: ['', Validators.required],
        nom: ['', Validators.required],
        dateNaissance: ['', Validators.required],
        telephone: ['', [Validators.required, Validators.pattern('^[0-9]{10,12}$')]],
        specialisations: this.fb.array([])
      });
  }

  onSpecialisationChange(event: any, id: string) {
    const specialisationArray = this.usr_form.get('specialisations') as FormArray;
    if (event.target.checked) {
      specialisationArray.push(new FormControl(id));
    } else {
      const index = specialisationArray.controls.findIndex(x => x.value === id);
      if (index >= 0) {
        specialisationArray.removeAt(index);
      }
    }
  }

  loadGenre(){
    this.genres = [
      {
        idGenre: 0,
        libelle: 'Homme'
      },
      {
        idGenre: 0,
        libelle: 'Femme'
      }
    ]
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
    if (this.usr_form.valid) {
      this.dialogRef.close(this.usr_form.value);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  protected readonly Array = Array;
}
