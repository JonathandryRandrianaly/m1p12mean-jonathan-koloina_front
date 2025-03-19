import {Component, Inject} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {ApiService} from '../../../services/api/api.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';
import {
  MatCell, MatCellDef, MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatCheckbox} from '@angular/material/checkbox';

@Component({
  selector: 'app-detail-tache-fichier',
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
  templateUrl: './detail-tache-fichier.component.html',
  styleUrl: './detail-tache-fichier.component.css'
})
export class DetailTacheFichierComponent {
  loading: boolean = false;
  error: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DetailTacheFichierComponent>,
    @Inject(MAT_DIALOG_DATA) public task: any,
    private apiService: ApiService
  ) {

  }



  onSubmit() {

  }

  closeDialog() {
    this.dialogRef.close();
  }

}
