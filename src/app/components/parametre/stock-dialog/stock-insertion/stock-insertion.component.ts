import {Component, Inject} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
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
  selector: 'app-stock-insertion',
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './stock-insertion.component.html',
  styleUrl: './stock-insertion.component.css'
})
export class StockInsertionComponent {
  loading: boolean = false;
  error: boolean = false;
  stock_form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<StockInsertionComponent>,
    @Inject(MAT_DIALOG_DATA) public consommable: any,
  ) 
  {
    const firstDayOfYear = new Date(new Date().getFullYear(), 0, 1);
    const formattedDate = firstDayOfYear.toISOString().split('T')[0];
    const today = new Date().toISOString().split('T')[0];
      this.stock_form = this.fb.group({
        date: ['', [Validators.required, this.dateValidator]],
        dateDebut: [formattedDate, Validators.required],
        consommableId: [consommable._id, Validators.required],
        libelle: ['', Validators.required],
        type: ['', Validators.required],
        quantite: [
          '', 
          [
            Validators.required,
            Validators.min(0)
          ]
        ]
      });
  }

  dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (!control.value) return null; 
    const selectedDate = new Date(control.value);
    const today = new Date();
  
    if (selectedDate > today) {
      return { dateInvalid: true }; 
    }
  
    return null; 
  }

  onSubmit() {
    if (this.stock_form.valid) {
      this.dialogRef.close(this.stock_form.value);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
