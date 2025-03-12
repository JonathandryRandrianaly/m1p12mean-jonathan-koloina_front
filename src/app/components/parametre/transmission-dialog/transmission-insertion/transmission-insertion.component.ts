import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-transmission-insertion',
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
  templateUrl: './transmission-insertion.component.html',
  styleUrl: './transmission-insertion.component.css'
})
export class TransmissionInsertionComponent {

  loading: boolean = false;
  error: boolean = false;
  transmission_form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TransmissionInsertionComponent>
  ) {
    this.transmission_form = this.fb.group({
      nom: ['', Validators.required]
    });
  }


  onSubmit() {
    if (this.transmission_form.valid) {
      this.dialogRef.close(this.transmission_form.value);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
