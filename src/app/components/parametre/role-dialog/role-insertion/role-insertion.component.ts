import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-role-insertion',
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
  templateUrl: './role-insertion.component.html',
  styleUrl: './role-insertion.component.css'
})
export class RoleInsertionComponent {
  loading: boolean = false;
  error: boolean = false;
  role_form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RoleInsertionComponent>
  ) {
    this.role_form = this.fb.group({
      libelle: ['', Validators.required]
    });
  }


  onSubmit() {
    if (this.role_form.valid) {
      this.dialogRef.close(this.role_form.value);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
