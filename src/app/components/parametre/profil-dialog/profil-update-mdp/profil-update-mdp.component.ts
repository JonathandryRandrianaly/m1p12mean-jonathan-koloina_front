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
  selector: 'app-profil-update-mdp',
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './profil-update-mdp.component.html',
  styleUrl: './profil-update-mdp.component.css'
})
export class ProfilUpdateMdpComponent {
  loading: boolean = false;
  error: boolean = false;
  user_form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<ProfilUpdateMdpComponent>,
    @Inject(MAT_DIALOG_DATA) public user: any,
  ) {
    this.user_form = this.fb.group({
      userId: [this.user._id, Validators.required],
      password: [this.user.password, [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')?.value === formGroup.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  onSubmit() {
    if (this.user_form.valid) {
      const data = {
        userId: this.user._id,
        password: this.user_form.value.password
      }
      this.dialogRef.close(data);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
