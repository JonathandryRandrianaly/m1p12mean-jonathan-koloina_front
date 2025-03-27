import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
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
import { TypeEntretienInsertionComponent } from '../type-entretien-dialog/type-entretien-insertion/type-entretien-insertion.component';
import { TypeEntretienUpdateComponent } from '../type-entretien-dialog/type-entretien-update/type-entretien-update.component';
import { TypeEntretienDetailsComponent } from '../type-entretien-dialog/type-entretien-details/type-entretien-details.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ErrorMessageComponent} from '../../templates/dialog/error-message/error-message.component';
import {InfoMessageComponent} from '../../templates/dialog/info-message/info-message.component';

@Component({
  selector: 'app-type-entretien-parametre',
  imports: [ReactiveFormsModule,FormsModule,LoaderComponent,
    MatPaginatorModule,CommonModule,MatButtonModule, MatMenuModule, MatIconModule
    ,MatTableModule,MatChipsModule,
    MatTooltipModule, MatSlideToggleModule
  ],
  templateUrl: './type-entretien-parametre.component.html',
  styleUrl: './type-entretien-parametre.component.css'
})
export class TypeEntretienParametreComponent implements OnInit {
  loader : boolean = false;
  types : any[] = [];
  categoriesEntretien : any[] = [];
  categoriesModele : any[] = [];
  specialisations : any[] = [];
  etats = [
    { id: 10, libelle: 'Actif' },
    { id: -10, libelle: 'Inactif' }
  ];
  selectedEtats: { [key: string]: boolean } = {};
  selectedCategEntretiens: { [key: string]: boolean } = {};
  selectedCategModele: { [key: string]: boolean } = {};
  selectedSpecialisations: { [key: string]: boolean } = {};
  searchCriteria: any = {
    nom: '',
    etat: '',
    page: 1,
    limit: 10,
    sortedColumn : '',
    sortDirection : '',
    etats: [],
    categoriesEntretien: [],
    categoriesModele: [],
    specialisations: [],
    prixMin: '',
    prixMax: '',
  };
  sortedColumn: string = '';
  sortDirection: 'asc' | 'desc' | '' = '';
  currentPage: number = 1;
  totalPages: number = 0;
  totalElement: number = 0;
  showFilter: boolean = false;
  constructor(private snackBar: MatSnackBar,private dialog: MatDialog, private router: Router, private apiService: ApiService) {

  }
  ngOnInit() {
    this.loadCategoriesEntretien();
    this.loadCategoriesModele();
    this.loadSpecialisations();
    this.loadTypes();
    this.selectedEtats = {
      '10': true,
      '-10': true
    };
  }

  sortData(column : string) {
    if (this.sortedColumn == column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    }
    else {
      this.sortedColumn = column;
      this.sortDirection = 'asc';
    }
    this.loadTypes();
  }

  isSorted(column: string, direction: 'asc' | 'desc') {
    return this.sortedColumn === column && this.sortDirection === direction;
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.searchCriteria.limit = event.pageSize;
    this.loadTypes();
  }

  loadCategoriesEntretien() {
    this.loader = true;
    this.apiService.getWithData(`api/categorie-entretiens`, {}).then(
      (response) => {
        this.categoriesEntretien = response;
        this.categoriesEntretien.forEach(categorie => {
          this.selectedCategEntretiens[categorie._id] = true;
        });
        this.loader = false;
      },
      (error) => {
        this.showErrorMessage(error.response.data.message);
        this.loader = false;
      }
    );
  }

  loadCategoriesModele() {
    this.loader = true;
    this.apiService.getWithData(`api/categorie-modeles`, {}).then(
      (response) => {
        this.categoriesModele = response;
        this.categoriesModele.forEach(categorie => {
          this.selectedCategModele[categorie._id] = true;
        });
        this.loader = false;
      },
      (error) => {
        this.showErrorMessage(error.response.data.message);
        this.loader = false;
      }
    );
  }

  loadSpecialisations() {
    this.loader = true;
    this.apiService.getWithData(`api/specialisations`, {}).then(
      (response) => {
        this.specialisations = response;
        this.specialisations.forEach(spe => {
          this.selectedSpecialisations[spe._id] = true;
        });
        this.loader = false;
      },
      (error) => {
        this.showErrorMessage(error.response.data.message);
        this.loader = false;
      }
    );
  }

  loadSpecialisationsActives() {
    const statut = 10;
    this.apiService.getWithData(`api/specialisations/statut/${statut}`, {}).then(
      (response) => {
        this.specialisations = response;
      },
      (error) => {
        this.showErrorMessage(error.response.data.message);
      }
    );
  }


  loadTypes() {
    this.loader = true;
    this.searchCriteria.page = this.currentPage;
    this.searchCriteria.sortedColumn = this.sortedColumn;
    this.searchCriteria.sortDirection = this.sortDirection;
    this.apiService.getWithData('api/type-entretiens/search',this.searchCriteria).then(
      (response) => {
        this.totalPages = Math.ceil(response['totalItems'] / this.searchCriteria.limit);
        this.totalElement = response['totalItems'];
        this.types = response['items'];
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

  updateCategoriesEntretien(): void {
    this.searchCriteria.categoriesEntretien = [];
    for (let categ in this.selectedCategEntretiens) {
      if (this.selectedCategEntretiens[categ]) {
        this.searchCriteria.categoriesEntretien.push(categ);
      }
    }
  }

  updateCategoriesModele(): void {
    this.searchCriteria.categoriesModele = [];
    for (let categ in this.selectedCategModele) {
      if (this.selectedCategModele[categ]) {
        this.searchCriteria.categoriesModele.push(categ);
      }
    }
  }

  updateSpecialisations(): void {
    this.searchCriteria.specialisations = [];
    for (let spe in this.selectedSpecialisations) {
      if (this.selectedSpecialisations[spe]) {
        this.searchCriteria.specialisations.push(spe);
      }
    }
  }

  changeStatut(id: string, isChecked: boolean) {
    this.loader = true;
    const data = {
      userId: id,
      statut: isChecked ? 10 : -10
    };
    this.apiService.insert('api/type-entretien/' + id, data).then(
      (response) => {
        this.loadTypes();
        this.loader = false;
      },
      (error) => {
        this.showErrorMessage(error.response.data.message);
        this.loader = false;
      }
    );
  }


  openTypeEntretienInsertionDialog() {
    const dialogRef = this.dialog.open(TypeEntretienInsertionComponent, {
      width: '800px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loader = true;
        this.apiService.insert('api/type-entretien', result).then(
          (response) => {
            if (!response.data.success) {
              this.showErrorMessage("Ce type d'entretien existe déjà !");
              this.loader = false;
            }else{
                this.loadTypes();
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

  openTypeEntretienUpdateDialog(user: any) {
    const dialogRef = this.dialog.open(TypeEntretienUpdateComponent, {
      width: '800px',
      data: user,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loader = true;
        this.apiService.insert('api/type-entretien/update', result).then(
          (response) => {
            this.loadTypes();
            this.loader = false;
          },
          (error) => {
            this.showErrorMessage(error.response.data.message);
            this.loader = false;
          }
        );
      }
    });
  }

  openDetailsDialog(type: any) {
    const dialogRef = this.dialog.open(TypeEntretienDetailsComponent, {
      width: '800px',
      data: type,
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  applyFilters() {
    this.loadTypes();
    this.toggleFilter();
  }

  resetSearchCriteria() {
    this.searchCriteria = {
      nom: '',
      etat: '',
      page: 1,
      limit: 10,
      sortedColumn: '',
      sortDirection: '',
      etats: [],
      categoriesEntretien: [],
      categoriesModele: [],
      specialisations: [],
      prixMin: '',
      prixMax: '',
    };
    this.selectedEtats = {
      '10': true,
      '-10': true
    };
    Object.keys(this.selectedCategEntretiens).forEach(key => {
      this.selectedCategEntretiens[key] = true;
    });
    Object.keys(this.selectedCategModele).forEach(key => {
      this.selectedCategModele[key] = true;
    });
    Object.keys(this.selectedSpecialisations).forEach(key => {
      this.selectedSpecialisations[key] = true;
    });
    this.loadTypes();
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
