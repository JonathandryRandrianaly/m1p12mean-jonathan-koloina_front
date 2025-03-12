import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-energie-moteur-insertion',
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
  templateUrl: './energie-moteur-insertion.component.html',
  styleUrl: './energie-moteur-insertion.component.css'
})
export class EnergieMoteurInsertionComponent {

  loading: boolean = false;
  error: boolean = false;
  energie_form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EnergieMoteurInsertionComponent>
  ) {
    this.energie_form = this.fb.group({
      nom: ['', Validators.required]
    });
  }


  onSubmit() {
    if (this.energie_form.valid) {
      this.dialogRef.close(this.energie_form.value);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
