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
import {
  EnergieMoteurInsertionComponent
} from '../energie-moteur-dialog/energie-moteur-insertion/energie-moteur-insertion.component';
import {DetailTacheFichierComponent} from '../detail-tache-fichier/detail-tache-fichier.component';
import { DetailTacheConsommableComponent } from '../detail-tache-consommable/detail-tache-consommable.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ErrorMessageComponent} from '../../templates/dialog/error-message/error-message.component';
import {InfoMessageComponent} from '../../templates/dialog/info-message/info-message.component';

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
  rapportForm: FormGroup;
  justificatifs: File[] = [];

  constructor(private snackBar: MatSnackBar,private dialog: MatDialog,private route: ActivatedRoute, private apiService: ApiService, private fb: FormBuilder) {
      this.dateForm = this.fb.group(
      {
        detailEntretienId: ['', Validators.required],
        dateDebut: [''],
        dateFin: ['']
      },
      { validator: dateRangeValidator }
    );
    this.rapportForm = this.fb.group({
      detailEntretienId: ['', Validators.required],
      libelle: ['', Validators.required],
      prix: [null, [Validators.min(0)]],
      justificatifs: [null]
    });
  }
  ngOnInit() {
    this.detailEntretienId = this.route.snapshot.paramMap.get('id');
    this.dateForm.patchValue({ detailEntretienId: this.detailEntretienId });
    this.rapportForm.patchValue({ detailEntretienId: this.detailEntretienId });
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
        this.showErrorMessage(error.response.data.message);
        this.loader = false;
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
            this.showAlertMessage("Ajout effectué");
            this.loader= false;
          }else{
            this.showErrorMessage("Ajout impossible");
            this.loader= false;
          }
          this.getDetailsEntretien();
        },
        (error) => {
          this.showErrorMessage(error.response.data.message);
          this.loader = false;
        }
      );
  }

  onFileChange(event: any) {
    const files: FileList = event.target.files;
    if (files) {
      this.justificatifs = Array.from(files);
    }
  }

  addRapport() {
    this.loader = true;

    const formData = new FormData();
    formData.append('detailEntretienId', this.rapportForm.value.detailEntretienId);
    formData.append('libelle', this.rapportForm.value.libelle);
    formData.append('prix', this.rapportForm.value.prix);
    this.justificatifs.forEach((file) => {
      formData.append('justificatifs', file);
    });

      this.apiService.import('api/entretien/rapport', formData).then(
        (response) => {
          const success= response.data;
          if(success === true){
            this.showAlertMessage("Ajout effectué");
            this.loader= false;
          }
          this.rapportForm = this.fb.group({
            detailEntretienId: ['', Validators.required],
            libelle: ['', Validators.required],
            prix: [null, [Validators.min(0)]],
            justificatifs: [null]
          });
         this.getDetailsEntretien();
        },
        (error) => {
          this.showErrorMessage(error.response.data.message);
          this.loader = false;
        }
      );
  }

  removeRapport(rapportId: any) {
      this.apiService.insert('api/entretien/rapport/remove/'+rapportId, {rapportId:rapportId}).then(
        (response) => {
            this.getDetailsEntretien();
        },
        (error) => {
          this.showErrorMessage(error.response.data.message);
        }
      );
  }

  openJustificatif(rapport: any, detailId: any) {
    const data= {
      rapport: rapport,
      detailId: detailId
    }
    const dialogRef = this.dialog.open(DetailTacheFichierComponent, {
      width: '800px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result==true) {
        this.getDetailsEntretien();
      }
    });
  }

  openStockDialog() {
    const dialogRef = this.dialog.open(DetailTacheConsommableComponent, {
      width: '800px',
      data: this.detailEntretienId,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loader = true;
        this.apiService.insert('api/entretien/consommable/stock', result).then(
          (response) => {
            if (response.data.success == true) {
              this.showAlertMessage('Ajout effectué');
              this.getDetailsEntretien();
            }else{
              this.showErrorMessage("Mouvement impossible");
              this.loader=false;
            }
          },
          (error) => {
            this.showErrorMessage(error.response.data.message);
            this.loader = false;
          }
        );
      }
    });
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
