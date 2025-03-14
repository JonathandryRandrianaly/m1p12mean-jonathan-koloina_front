import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatChip} from '@angular/material/chips';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoaderComponent} from '../../../templates/loader/loader.component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-type-entretien-details',
  imports: [
    ReactiveFormsModule,FormsModule,CommonModule,
    MatDialogModule,
    MatChip
  ],
  templateUrl: './type-entretien-details.component.html',
  styleUrl: './type-entretien-details.component.css'
})
export class TypeEntretienDetailsComponent {
  constructor(
    public dialogRef: MatDialogRef<TypeEntretienDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public type: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
