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
  selector: 'app-type-entretien-update',
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './type-entretien-update.component.html',
  styleUrl: './type-entretien-update.component.css'
})
export class TypeEntretienUpdateComponent {

  loading: boolean = false;
  error: boolean = false;
  type_form: FormGroup;
  specialisations: any[] = [];
  specialisationsType: any[] = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<TypeEntretienUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public type: any,
  ) {
    this.loadSpecialisations();
    this.type_form = this.fb.group({
      typeId: [this.type._id, Validators.required],
      description: [this.type.description, Validators.required],
      prix: [this.type.prix, Validators.required],
      specialisationsId: this.fb.array([])
    });
    this.setPreselectedSpecialisations();
  }

  onSpecialisationChange(event: any, id: string) {
    const specialisationArray = this.type_form.get('specialisationsId') as FormArray;
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
    this.specialisationsType= this.type.specialisations;
    const specialisationArray = this.type_form.get('specialisationsId') as FormArray;
    specialisationArray.clear();
    const assignedSpecialisationIds = this.specialisationsType.map(s => s._id);
    assignedSpecialisationIds.forEach(id => {
      specialisationArray.push(new FormControl(id));
    });
  }
  

  onSubmit() {
    if (this.type_form.valid) {
      this.dialogRef.close(this.type_form.value);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
