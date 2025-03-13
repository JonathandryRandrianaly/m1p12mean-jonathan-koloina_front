import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatChip} from '@angular/material/chips';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoaderComponent} from '../../../templates/loader/loader.component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-user-info',
  imports: [
    ReactiveFormsModule,FormsModule,CommonModule,
    MatDialogModule,
    MatChip
  ],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {
  constructor(
    public dialogRef: MatDialogRef<UserInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public user: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
