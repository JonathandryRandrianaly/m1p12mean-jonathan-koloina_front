import {Component, Inject} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Genre} from '../../../../models/Genre';
import {ApiService} from '../../../../services/api/api.service';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-employee-specialisation-attribution',
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatTooltip,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './employee-specialisation-attribution.component.html',
  styleUrl: './employee-specialisation-attribution.component.css'
})
export class EmployeeSpecialisationAttributionComponent {
  loading: boolean = false;
  error: boolean = false;
  usr_form: FormGroup;
  specialisations: any[] = [];
  specialisationUsers: any[] = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<EmployeeSpecialisationAttributionComponent>,
    @Inject(MAT_DIALOG_DATA) public userId: any,
  ) {
    this.loadSpecialisations();
    this.loadSpecialisationUser();
    this.usr_form = this.fb.group({
      userId: [this.userId, Validators.required],
      specialisations: this.fb.array([])
    });
  }

  onSpecialisationChange(event: any, id: string) {
    const specialisationArray = this.usr_form.get('specialisations') as FormArray;
    if (event.target.checked) {
      specialisationArray.push(new FormControl(id));
    } else {
      const index = specialisationArray.controls.findIndex(x => x.value === id);
      if (index >= 0) {
        specialisationArray.removeAt(index);
      }
    }
  }

  loadSpecialisations() {
    const statut = 10;
    this.apiService.getWithData(`api/specialisations/statut/${statut}`, {}).then(
      (response) => {
        this.specialisations = response;
      },
      (error) => {
        console.error('Erreur lors de loadSpecialisations :', error);
      }
    );
  }

  setPreselectedSpecialisations() {
    const specialisationArray = this.usr_form.get('specialisations') as FormArray;
    specialisationArray.clear();
    const assignedSpecialisationIds = this.specialisationUsers.map(s => s.specialisation._id);
    assignedSpecialisationIds.forEach(id => {
      specialisationArray.push(new FormControl(id));
    });
  }

  loadSpecialisationUser() {
    this.apiService.getWithData(`api/specialisation-personnel/${this.userId}`, {}).then(
      (response) => {
        this.specialisationUsers = response;
        this.setPreselectedSpecialisations();
      },
      (error) => {
        console.error('Erreur lors de loadSpecialisations :', error);
      }
    );
  }

  onSubmit() {
    if (this.usr_form.valid) {
      this.dialogRef.close(this.usr_form.value);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
