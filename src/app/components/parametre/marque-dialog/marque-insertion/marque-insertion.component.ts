import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-marque-insertion',
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
  templateUrl: './marque-insertion.component.html',
  styleUrl: './marque-insertion.component.css'
})
export class MarqueInsertionComponent {
  loading: boolean = false;
  error: boolean = false;
  marque_form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MarqueInsertionComponent>
  ) {
    this.marque_form = this.fb.group({
      nom: ['', Validators.required]
    });
  }


  onSubmit() {
    if (this.marque_form.valid) {
      this.dialogRef.close(this.marque_form.value);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }


}
