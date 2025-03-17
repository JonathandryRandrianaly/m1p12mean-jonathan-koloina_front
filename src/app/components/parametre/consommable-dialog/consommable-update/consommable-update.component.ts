import {Component, Inject} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ApiService} from '../../../../services/api/api.service';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-consommable-update',
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './consommable-update.component.html',
  styleUrl: './consommable-update.component.css'
})
export class ConsommableUpdateComponent {
  loading: boolean = false;
  error: boolean = false;
  consommable_form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<ConsommableUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public consommable: any,
  ) {
    this.consommable_form = this.fb.group({
      consommableId: [this.consommable._id, Validators.required],
      prix: [this.consommable.prix, Validators.required],
    });
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
