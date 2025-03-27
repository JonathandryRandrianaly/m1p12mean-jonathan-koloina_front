import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatChip} from '@angular/material/chips';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoaderComponent} from '../../../templates/loader/loader.component';
import {CommonModule} from '@angular/common';
import { ApiService } from '../../../../services/api/api.service';

@Component({
  selector: 'app-vehicule-details',
  imports: [
    ReactiveFormsModule,FormsModule,CommonModule,
    MatDialogModule,
    MatChip,LoaderComponent
  ],
  templateUrl: './vehicule-details.component.html',
  styleUrl: './vehicule-details.component.css'
})
export class VehiculeDetailsComponent {

  loader : boolean = false;
  vehicule: any;

  constructor(
    public dialogRef: MatDialogRef<VehiculeDetailsComponent>,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public vehiculeId: any,
  ) {
    this.loadDetails();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  loadDetails() {
    this.loader = true;
    this.apiService.getWithData(`api/vehicule/`+this.vehiculeId, {vehiculeId: this.vehiculeId}).then(
      (response) => {
        this.vehicule = response;
        this.loader = false;
      },
      (error) => {
        this.loader = false;
      }
    );
  }
}
