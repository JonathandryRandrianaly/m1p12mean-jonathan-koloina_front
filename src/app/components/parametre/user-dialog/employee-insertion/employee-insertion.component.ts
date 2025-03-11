import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {CommonModule, NgIf} from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';
import {Genre} from '../../../../models/Genre';

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
    MatTooltipModule
  ],
  templateUrl: './employee-insertion.component.html',
  styleUrl: './employee-insertion.component.css'
})
export class EmployeeInsertionComponent {
  loading: boolean = false;
  error: boolean = false;
  usr_form: FormGroup;
  genres: Genre[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EmployeeInsertionComponent>
  ) {
      this.loadGenre();
      this.usr_form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        idGenre: ['', Validators.required],
        nom: ['', Validators.required],
        dateNaissance: ['', Validators.required],
        telephone: ['', [Validators.required, Validators.pattern('^[0-9]{10,12}$')]]
      });
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

  onSubmit() {
    if (this.usr_form.valid) {
      this.dialogRef.close(this.usr_form.value);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
