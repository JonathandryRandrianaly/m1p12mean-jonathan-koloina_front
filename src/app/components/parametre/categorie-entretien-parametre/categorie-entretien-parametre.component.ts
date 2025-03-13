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
import { CategorieEntretienInsertionComponent } from '../categorie-entretien-dialog/categorie-entretien-insertion/categorie-entretien-insertion.component';

@Component({
  selector: 'app-categorie-entretien-parametre',
  imports: [
    LoaderComponent,
    MatPaginator,
    MatSlideToggleModule,
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,FormsModule,
  ],
  templateUrl: './categorie-entretien-parametre.component.html',
  styleUrl: './categorie-entretien-parametre.component.css'
})
export class CategorieEntretienParametreComponent implements OnInit {
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
  constructor(private dialog: MatDialog, private router: Router, private apiService: ApiService) {

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
    this.apiService.getWithData('api/categorie-entretiens/search',this.searchCriteria).then(
      (response) => {
        this.totalPages = Math.ceil(response['totalItems'] / this.searchCriteria.limit);
        this.totalElement = response['totalItems'];
        this.categories = response['items'];
        this.loader = false;
      },
      (error) => {
        this.loader = false;
        console.error('Erreur lors de loadCategories :', error);
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
    this.apiService.insert('api/categorie-entretien/' + id, data).then(
      (response) => {
        this.loadCategories();
        this.loader = false;
      },
      (error) => {
        this.loader = false;
        console.error('Erreur lors de l\'insertion :', error);
      }
    );
  }
  

  openCategorieDialog() {
    const dialogRef = this.dialog.open(CategorieEntretienInsertionComponent, {
      width: '800px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loader = true;
        this.apiService.insert('api/categorie-entretien', result).then(
          (response) => {
            if (response.status >= 200 && response.status <= 202) {
              this.loadCategories();
            }
          },
          (error) => {
            this.loader = false;
            console.error('Erreur lors de l\'insertion :', error);
          }
        );
      }
    });
  }
}
