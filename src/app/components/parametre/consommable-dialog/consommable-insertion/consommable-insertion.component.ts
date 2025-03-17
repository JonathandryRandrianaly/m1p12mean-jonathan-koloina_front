import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ApiService } from '../../../../services/api/api.service';

@Component({
  selector: 'app-consommable-insertion',
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
  templateUrl: './consommable-insertion.component.html',
  styleUrl: './consommable-insertion.component.css'
})
export class ConsommableInsertionComponent {
  loading: boolean = false;
  error: boolean = false;
  consommable_form: FormGroup;
  unites: any[]= [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<ConsommableInsertionComponent>
  ) 
  {
      this.loadUnites();
      this.consommable_form = this.fb.group({
        nom: ['', Validators.required],
        unite: ['', Validators.required],
        prix: [
          '', 
          [
            Validators.required,
            Validators.min(0)
          ]
        ]
      });
  }

  loadUnites() {
    const statut = 10;
    this.apiService.getWithData(`api/unites/statut/${statut}`, {}).then(
      (response) => {
        this.unites = response;
      },
      (error) => {
        console.error('Erreur lors de loadUnites :', error);
      }
    );
  }

  onSubmit() {
    if (this.consommable_form.valid) {
      this.dialogRef.close(this.consommable_form.value);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
