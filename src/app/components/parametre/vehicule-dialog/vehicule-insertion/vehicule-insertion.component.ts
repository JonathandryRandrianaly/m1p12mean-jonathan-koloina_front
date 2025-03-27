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
import {ErrorMessageComponent} from '../../../templates/dialog/error-message/error-message.component';
import {InfoMessageComponent} from '../../../templates/dialog/info-message/info-message.component';
import {MatSnackBar} from '@angular/material/snack-bar';

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
    private snackBar: MatSnackBar,
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
        this.showErrorMessage(error.response.data.message);
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

  showErrorMessage(message: string) {
    this.snackBar.openFromComponent(ErrorMessageComponent, {
      data: { message },
      duration: 3000,
      panelClass: ['custom-snackbar-panel'],
    });
  }

  showAlertMessage(message: string) {
    this.snackBar.openFromComponent(InfoMessageComponent, {
      data: { message },
      duration: 3000,
      panelClass: ['custom-snackbar-panel'],
    });
  }
}
