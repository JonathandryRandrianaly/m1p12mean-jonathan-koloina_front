import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ApiService} from '../../../services/api/api.service';
import {LoaderComponent} from '../../templates/loader/loader.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { CategorieModeleInsertionComponent } from '../categorie-modele-dialog/categorie-modele-insertion/categorie-modele-insertion.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ErrorMessageComponent} from '../../templates/dialog/error-message/error-message.component';
import {InfoMessageComponent} from '../../templates/dialog/info-message/info-message.component';

@Component({
  selector: 'app-categorie-modele-parametre',
  imports: [
    LoaderComponent,
    MatPaginator,
    MatSlideToggleModule,
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,FormsModule,
  ],
  templateUrl: './categorie-modele-parametre.component.html',
  styleUrl: './categorie-modele-parametre.component.css'
})
export class CategorieModeleParametreComponent {
  loader : boolean = false;
  categories : any[] = [];
  etats = [
    { id: 10, libelle: 'Actif' },
    { id: -10, libelle: 'Inactif' }
  ];
  selectedEtats: { [key: string]: boolean } = {};
  searchCriteria: any = {
    nom: '',
    etat: '',
    page: 1,
    limit: 10,
    sortedColumn : '',
    sortDirection : '',
    etats: [],
  };
  sortedColumn: string = '';
  sortDirection: 'asc' | 'desc' | '' = '';
  currentPage: number = 1;
  totalPages: number = 0;
  totalElement: number = 0;
  constructor(private snackBar: MatSnackBar,private dialog: MatDialog, private router: Router, private apiService: ApiService) {

  }
  ngOnInit() {
    this.loadCategories();
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
    this.loadCategories();
  }

  isSorted(column: string, direction: 'asc' | 'desc') {
    return this.sortedColumn === column && this.sortDirection === direction;
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.searchCriteria.limit = event.pageSize;
    this.loadCategories();
  }

  loadCategories() {
    this.loader = true;
    this.searchCriteria.page = this.currentPage;
    this.searchCriteria.sortedColumn = this.sortedColumn;
    this.searchCriteria.sortDirection = this.sortDirection;
    this.apiService.getWithData('api/categorie-modeles/search',this.searchCriteria).then(
      (response) => {
        this.totalPages = Math.ceil(response['totalItems'] / this.searchCriteria.limit);
        this.totalElement = response['totalItems'];
        this.categories = response['items'];
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
    this.loadCategories();
  }

  changeStatut(id: string, isChecked: boolean) {
    this.loader = true;
    const data = {
      userId: id,
      statut: isChecked ? 10 : -10
    };
    this.apiService.insert('api/categorie-modele/' + id, data).then(
      (response) => {
        this.loadCategories();
        this.loader = false;
      },
      (error) => {
        this.showErrorMessage(error.response.data.message);
        this.loader = false;
      }
    );
  }


  openCategorieDialog() {
    const dialogRef = this.dialog.open(CategorieModeleInsertionComponent, {
      width: '800px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loader = true;
        this.apiService.insert('api/categorie-modele', result).then(
          (response) => {
            if (response.status >= 200 && response.status <= 202) {
              this.showAlertMessage('Catégorie créée avec succès');
              this.loadCategories();
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
