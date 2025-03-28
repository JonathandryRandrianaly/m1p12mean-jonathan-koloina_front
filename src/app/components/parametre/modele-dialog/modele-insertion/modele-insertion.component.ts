import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ApiService } from '../../../../services/api/api.service';
import { min } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ErrorMessageComponent} from '../../../templates/dialog/error-message/error-message.component';
import {InfoMessageComponent} from '../../../templates/dialog/info-message/info-message.component';

@Component({
  selector: 'app-modele-insertion',
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
  templateUrl: './modele-insertion.component.html',
  styleUrl: './modele-insertion.component.css'
})
export class ModeleInsertionComponent {
  loading: boolean = false;
  error: boolean = false;
  modele_form: FormGroup;
  marques: any[]= [];
  energies: any[]= [];
  transmissions: any[]= [];
  motricites: any[]= [];
  categories: any[]= [];

  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<ModeleInsertionComponent>
  )
  {
      const currentYear = new Date().getFullYear();
      this.loadMarques();
      this.loadEnergies();
      this.loadTransmissions();
      this.loadMotricites();
      this.loadCategories();
      this.modele_form = this.fb.group({
        nom: ['', Validators.required],
        marque: ['', Validators.required],
        energieMoteur: ['', Validators.required],
        transmission: ['', Validators.required],
        motricite: ['', Validators.required],
        anneeFabrication: [
          '',
          [
            Validators.required,
            Validators.min(1900),
            Validators.max(currentYear)
          ]
        ],
        categorie: ['', Validators.required],
      });
  }

  loadMarques() {
    const statut = 10;
    this.apiService.getWithData(`api/marques/statut/${statut}`, {}).then(
      (response) => {
        this.marques = response;
      },
      (error) => {
        this.showErrorMessage(error.response.data.message);
      }
    );
  }

  loadEnergies() {
    const statut = 10;
    this.apiService.getWithData(`api/energie-moteurs/statut/${statut}`, {}).then(
      (response) => {
        this.energies = response;
      },
      (error) => {
        this.showErrorMessage(error.response.data.message);
      }
    );
  }

  loadTransmissions() {
    const statut = 10;
    this.apiService.getWithData(`api/transmissions/statut/${statut}`, {}).then(
      (response) => {
        this.transmissions = response;
      },
      (error) => {
        this.showErrorMessage(error.response.data.message);
      }
    );
  }

  loadMotricites() {
    const statut = 10;
    this.apiService.getWithData(`api/motricites/statut/${statut}`, {}).then(
      (response) => {
        this.motricites = response;
      },
      (error) => {
        this.showErrorMessage(error.response.data.message);
      }
    );
  }

  loadCategories() {
    const statut = 10;
    this.apiService.getWithData(`api/categorie-modeles/statut/${statut}`, {}).then(
      (response) => {
        this.categories = response;
      },
      (error) => {
        this.showErrorMessage(error.response.data.message);
      }
    );
  }

  onSubmit() {
    if (this.modele_form.valid) {
      this.dialogRef.close(this.modele_form.value);
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
