import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-specialisation-insertion',
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
  templateUrl: './specialisation-insertion.component.html',
  styleUrl: './specialisation-insertion.component.css'
})
export class SpecialisationInsertionComponent {
  loading: boolean = false;
  error: boolean = false;
  specialisation_form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SpecialisationInsertionComponent>
  ) {
    this.specialisation_form = this.fb.group({
      nom: ['', Validators.required]
    });
  }


  onSubmit() {
    if (this.specialisation_form.valid) {
      this.dialogRef.close(this.specialisation_form.value);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
