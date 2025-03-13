import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-unite-insertion',
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
  templateUrl: './unite-insertion.component.html',
  styleUrl: './unite-insertion.component.css'
})
export class UniteInsertionComponent {
  loading: boolean = false;
  error: boolean = false;
  unite_form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UniteInsertionComponent>
  ) {
    this.unite_form = this.fb.group({
      nom: ['', Validators.required]
    });
  }


  onSubmit() {
    if (this.unite_form.valid) {
      this.dialogRef.close(this.unite_form.value);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
