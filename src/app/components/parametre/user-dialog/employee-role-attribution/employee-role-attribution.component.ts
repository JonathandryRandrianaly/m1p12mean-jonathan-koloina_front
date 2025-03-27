import {Component, Inject} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
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
import {MatTooltipModule} from '@angular/material/tooltip';
import {ErrorMessageComponent} from '../../../templates/dialog/error-message/error-message.component';
import {InfoMessageComponent} from '../../../templates/dialog/info-message/info-message.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-role-attribution',
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatTooltipModule
  ],
  templateUrl: './employee-role-attribution.component.html',
  styleUrl: './employee-role-attribution.component.css'
})
export class EmployeeRoleAttributionComponent {
  loading: boolean = false;
  error: boolean = false;
  roles: any[] = [];
  usr_form: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public user: any,
    private dialogRef: MatDialogRef<EmployeeRoleAttributionComponent>
  ) {
    this.usr_form = this.fb.group({
      userId: [this.user._id, Validators.required],
      roles: this.fb.array([])
    });

    this.loadRoles();
  }

  loadRoles() {
    const statut = 10;
    this.apiService.getWithData(`api/roles/statut/${statut}`, {}).then(
      (response) => {
        this.roles = response;
        this.setPreselectedRoles();
      },
      (error) => {
        this.showErrorMessage(error.response.data.message);
      }
    );
  }

  setPreselectedRoles() {
    const roleArray = this.usr_form.get('roles') as FormArray;
    roleArray.clear();

    const assignedRoleIds = this.user.roles.map((role: { _id: any; }) => role._id);
    assignedRoleIds.forEach((id: any) => {
      roleArray.push(new FormControl(id));
    });
  }

  onRoleChange(event: any, id: string) {
    const roleArray = this.usr_form.get('roles') as FormArray;
    if (event.target.checked) {
      roleArray.push(new FormControl(id));
    } else {
      const index = roleArray.controls.findIndex(x => x.value === id);
      if (index >= 0) {
        roleArray.removeAt(index);
      }
    }
  }

  isRoleAssigned(roleId: string): boolean {
    return this.user.roles?.some((role: any) => role._id === roleId) ?? false;
  }


  onSubmit() {
    if (this.usr_form.valid) {
      this.dialogRef.close(this.usr_form.value);
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
