import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-categorie-modele-insertion',
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
  templateUrl: './categorie-modele-insertion.component.html',
  styleUrl: './categorie-modele-insertion.component.css'
})
export class CategorieModeleInsertionComponent {
  loading: boolean = false;
  error: boolean = false;
  categorie_form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CategorieModeleInsertionComponent>
  ) {
    this.categorie_form = this.fb.group({
      nom: ['', Validators.required]
    });
  }


  onSubmit() {
    if (this.categorie_form.valid) {
      this.dialogRef.close(this.categorie_form.value);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
