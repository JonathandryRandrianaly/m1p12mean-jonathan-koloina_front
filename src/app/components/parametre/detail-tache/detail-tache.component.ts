import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router, ActivatedRoute} from '@angular/router';
import {ApiService} from '../../../services/api/api.service';
import {LoaderComponent} from '../../templates/loader/loader.component';
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenu, MatMenuItem, MatMenuModule} from "@angular/material/menu";
import {MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatChipsModule} from '@angular/material/chips';
import {MatTableModule} from '@angular/material/table';

interface Report {
  label: string;
  price?: number;
  fileUrl?: string;
}

export const dateRangeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const dateDebut = control.get('dateDebut')?.value;
  const dateFin = control.get('dateFin')?.value;
  
  let errors: ValidationErrors = {};

  if (!dateDebut && dateFin) {
    errors['dateDebutRequired'] = true;
    control.get('dateDebut')?.setErrors({ dateDebutRequired: true });
  } else {
    control.get('dateDebut')?.setErrors(null);
  }

  if (dateDebut && dateFin && new Date(dateFin) <= new Date(dateDebut)) {
    errors['dateRangeInvalid'] = true;
    control.get('dateFin')?.setErrors({ dateRangeInvalid: true });
  } else {
    control.get('dateFin')?.setErrors(null);
  }

  return Object.keys(errors).length > 0 ? errors : null;
};


@Component({
  selector: 'app-detail-tache',
  imports: [ReactiveFormsModule,FormsModule,LoaderComponent,
    MatPaginatorModule,CommonModule,MatButtonModule, MatMenuModule, MatIconModule
    ,MatTableModule,MatChipsModule,
    MatTooltipModule, MatSlideToggleModule
  ],
  templateUrl: './detail-tache.component.html',
  styleUrl: './detail-tache.component.css'
})
export class DetailTacheComponent implements OnInit{

  loader : boolean = false;
  detail : any;
  detailEntretienId: any;
  dateForm: FormGroup;
  constructor(private route: ActivatedRoute, private apiService: ApiService, private fb: FormBuilder) {
    this.dateForm = this.fb.group(
  {
    detailEntretienId: ['', Validators.required],
    dateDebut: [''],
    dateFin: ['']
  },
  { validator: dateRangeValidator } 
);

  }
  ngOnInit() {
    this.detailEntretienId = this.route.snapshot.paramMap.get('id');
    this.dateForm.patchValue({ detailEntretienId: this.detailEntretienId });
    this.getDetailsEntretien();
  }


  formatDateForInput(date: string): string {
    if (!date) return '';
  
    const parsedDate = new Date(date);
    return parsedDate.toISOString().slice(0, 16); 
  }  

  getDetailsEntretien() {
    this.loader = true;
    this.apiService.getAll('api/entretien/details/'+ this.detailEntretienId).then(
      (response) => {
        this.detail = response;
        if (this.detail.dateDebut) {
          this.dateForm.patchValue({ dateDebut: this.formatDateForInput(this.detail.dateDebut) });
        }
        if (this.detail.dateFin) {
          this.dateForm.patchValue({ dateFin: this.formatDateForInput(this.detail.dateFin) });
        }
        this.loader = false;
      },
      (error) => {
        this.loader = false;
        console.error('Erreur lors de getDetails :', error);
      }
    );
  }

  updateDateRapport() {
    this.loader = true;
    console.log(this.dateForm.value);
      this.apiService.insert('api/entretien/details/update-date', this.dateForm.value).then(
        (response) => {
          const success= response.data;
          if(success === true){
            alert('Ajout effectué');
            this.loader= false;
          }else{
            alert('Ajout impossible');
            this.loader= false;
          }
          this.getDetailsEntretien();
        },
        (error) => {
          this.loader = false;
          console.error('Erreur lors de l\'insertion :', error);
        }
      );
  }


}