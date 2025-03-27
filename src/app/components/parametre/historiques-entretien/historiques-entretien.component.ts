import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router, ActivatedRoute} from '@angular/router';
import {ApiService} from '../../../services/api/api.service';
import {LoaderComponent} from '../../templates/loader/loader.component';
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenu, MatMenuItem, MatMenuModule} from "@angular/material/menu";
import {MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatChipsModule} from '@angular/material/chips';
import {MatTableModule} from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ErrorMessageComponent} from '../../templates/dialog/error-message/error-message.component';
import {InfoMessageComponent} from '../../templates/dialog/info-message/info-message.component';

@Component({
  selector: 'app-historiques-entretien',
  imports: [ReactiveFormsModule,FormsModule,LoaderComponent,
    MatPaginatorModule,CommonModule,MatButtonModule, MatMenuModule, MatIconModule
    ,MatTableModule,MatChipsModule,
    MatTooltipModule, MatSlideToggleModule
  ],
  templateUrl: './historiques-entretien.component.html',
  styleUrl: './historiques-entretien.component.css'
})
export class HistoriquesEntretienComponent {
  loader : boolean = false;
  historiques : any[] = [];
  vehiculeId: any;
  vehicule: any;
  types: any[]= [];
  etats = [
    { id: -10, libelle: 'A faire' },
    { id: 0, libelle: 'En cours' },
    { id: 10, libelle: 'Attente de validation' },
    { id: 20, libelle: 'Valider' },
  ];
  selectedEtats: { [key: string]: boolean } = {};
  selectedTypes: { [key: string]: boolean } = {};
  searchCriteria: any = {
    vehiculeId: '',
    page: 1,
    limit: 5,
    typesEntretien: [],
    etats: [],
    dateMin: '',
    dateMax: '',
  };
  currentPage: number = 1;
  totalPages: number = 0;
  totalElement: number = 0;
  showFilter: boolean = false;
  constructor(private snackBar: MatSnackBar,private route: ActivatedRoute , private apiService: ApiService) {

  }
  ngOnInit() {
    this.vehiculeId = this.route.snapshot.paramMap.get('id');
    this.loadTypes();
    this.loadHistoriquesEntretien();
    this.selectedEtats = {
      '-10': true,
      '0': true ,
      '10': true ,
      '20': true ,
    };
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.searchCriteria.limit = event.pageSize;
    this.loadHistoriquesEntretien();
  }

  loadTypes() {
    this.loader = true;
    this.apiService.getWithData(`api/type-entretiens`, {}).then(
      (response) => {
        this.types = response;
        this.types.forEach(type => {
          this.selectedTypes[type._id] = true;
        });
        this.loader = false;
      },
      (error) => {
        this.showErrorMessage(error.response.data.message);
        this.loader = false;
      }
    );
  }

  loadHistoriquesEntretien() {
    this.loader = true;
    this.searchCriteria.vehiculeId= this.vehiculeId;
    this.searchCriteria.page = this.currentPage;
    this.apiService.getWithData(`api/entretiens/historiques/vehicule`, this.searchCriteria).then(
      (response) => {
        this.totalPages = Math.ceil(response['totalItems'] / this.searchCriteria.limit);
        this.totalElement = response['totalItems'];
        this.historiques = response['details'];
        this.vehicule = response['vehicule'];
        this.loader = false;
      },
      (error) => {
        this.showErrorMessage(error.response.data.message);
        this.loader = false;
      }
    );
  }

  updateEtats(): void {
    this.searchCriteria.etats = [];
    for (let etat in this.selectedEtats) {
      if (this.selectedEtats[etat]) {
        this.searchCriteria.etats.push(etat);
      }
    }
  }

  updateTypes(): void {
    this.searchCriteria.typesEntretien = [];
    for (let type in this.selectedTypes) {
      if (this.selectedTypes[type]) {
        this.searchCriteria.typesEntretien.push(type);
      }
    }
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  applyFilters() {
    this.loadHistoriquesEntretien();
    this.toggleFilter();
  }

  resetSearchCriteria() {
    this.searchCriteria = {
      vehiculeId: '',
      page: 1,
      limit: 5,
      typesEntretien: [],
      etats: [],
      dateMin: '',
      dateMax: '',
    };
    this.selectedEtats = {
      '-10': true,
      '0': true ,
      '10': true ,
      '20': true ,
    };
    Object.keys(this.selectedTypes).forEach(key => {
      this.selectedTypes[key] = true;
    });
    this.loadHistoriquesEntretien();
    this.showFilter = !this.showFilter;
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
