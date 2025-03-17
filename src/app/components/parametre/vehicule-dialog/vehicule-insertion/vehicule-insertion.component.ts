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
  selector: 'app-vehicule-insertion',
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
  templateUrl: './vehicule-insertion.component.html',
  styleUrl: './vehicule-insertion.component.css'
})
export class VehiculeInsertionComponent {
  loading: boolean = false;
  error: boolean = false;
  vehicule_form: FormGroup;
  modeles: any[]= [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<VehiculeInsertionComponent>
  ) 
  {
      this.loadModeles();
      this.vehicule_form = this.fb.group({
        modele: ['', Validators.required],
        immatriculation: ['', Validators.required]
      });
  }

  loadModeles() {
    const statut = 10;
    this.apiService.getWithData(`api/modeles/statut/${statut}`, {}).then(
      (response) => {
        this.modeles = response;
      },
      (error) => {
        console.error('Erreur lors de loadModeles :', error);
      }
    );
  }

  onSubmit() {
    if (this.vehicule_form.valid) {
      this.dialogRef.close(this.vehicule_form.value);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
