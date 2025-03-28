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
  selector: 'app-profil-update-info',
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './profil-update-info.component.html',
  styleUrl: './profil-update-info.component.css'
})
export class ProfilUpdateInfoComponent {
  loading: boolean = false;
  error: boolean = false;
  user_form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<ProfilUpdateInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public user: any,
  ) {
    this.user_form = this.fb.group({
      userId: [this.user._id, Validators.required],
      nom: [this.user.nom, Validators.required],
      dateNaissance: [this.formatDateForInput(this.user.dateNaissance), Validators.required],
      telephone: [this.user.telephone, Validators.required],
    });
  }

  formatDateForInput(dateString: string): string {
    return new Date(dateString).toISOString().split('T')[0];
  }

  onSubmit() {
    if (this.user_form.valid) {
      this.dialogRef.close(this.user_form.value);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
