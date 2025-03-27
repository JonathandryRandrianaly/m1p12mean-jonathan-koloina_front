import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, AbstractControl} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import { ApiService } from '../../../services/api/api.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ErrorMessageComponent} from '../../templates/dialog/error-message/error-message.component';
import {InfoMessageComponent} from '../../templates/dialog/info-message/info-message.component';

@Component({
  selector: 'app-detail-tache-consommable',
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './detail-tache-consommable.component.html',
  styleUrl: './detail-tache-consommable.component.css'
})
export class DetailTacheConsommableComponent {
  loader: boolean = false;
  error: boolean = false;
  stock_form: FormGroup;
  consommables: any[]= [];

  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<DetailTacheConsommableComponent>,
    @Inject(MAT_DIALOG_DATA) public detailEntretienId: any,
  )
  {
    const firstDayOfYear = new Date(new Date().getFullYear(), 0, 1);
    const formattedDate = firstDayOfYear.toISOString().split('T')[0];
    const today = new Date().toISOString().split('T')[0];
      this.stock_form = this.fb.group({
        detailEntretienId: [detailEntretienId, Validators.required],
        date: ['', [Validators.required, this.dateValidator]],
        dateDebut: [formattedDate, Validators.required],
        consommableId: ['', Validators.required],
        libelle: ['', Validators.required],
        type: ['sortie', Validators.required],
        quantite: [
          '',
          [
            Validators.required,
            Validators.min(0)
          ]
        ]
      });
      this.loadConsommables();
  }

  loadConsommables() {
    const statut = 10;
    this.apiService.getWithData(`api/consommables/statut/${statut}`, {}).then(
      (response) => {
        this.consommables = response;
      },
      (error) => {
        this.showErrorMessage(error.response.data.message);
      }
    );
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

  showErrorMessage(message: string) {
    this.snackBar.openFromComponent(ErrorMessageComponent, {
      data: { message },
      duration: 3000,
      panelClass: ['custom-snackbar-panel'],
    });
  }

  showAlertMessage(message: string) {
    this.snackBar.openFromComponent(InfoMessageComponent, {
      data: { message },
      duration: 3000,
      panelClass: ['custom-snackbar-panel'],
    });
  }
}
