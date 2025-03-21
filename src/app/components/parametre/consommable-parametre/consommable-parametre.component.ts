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
import { ConsommableInsertionComponent } from '../consommable-dialog/consommable-insertion/consommable-insertion.component';

@Component({
  selector: 'app-consommable-parametre',
  imports: [
    LoaderComponent,
    MatPaginator,
    MatSlideToggleModule,
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,FormsModule,
  ],
  templateUrl: './consommable-parametre.component.html',
  styleUrl: './consommable-parametre.component.css'
})
export class ConsommableParametreComponent implements OnInit {

  loader : boolean = false;
  consommables : any[] = [];
  unites : any[] = [];
  etats = [
    { id: 10, libelle: 'Actif' },
    { id: -10, libelle: 'Inactif' }
  ];
  selectedEtats: { [key: string]: boolean } = {};
  selectedUnites: { [key: string]: boolean } = {};
  searchCriteria: any = {
    nom: '',
    etat: '',
    page: 1,
    limit: 10,
    sortedColumn : '',
    sortDirection : '',
    etats: [],
    unites: [],
  };
  sortedColumn: string = '';
  sortDirection: 'asc' | 'desc' | '' = '';
  currentPage: number = 1;
  totalPages: number = 0;
  totalElement: number = 0;
  constructor(private dialog: MatDialog, private router: Router, private apiService: ApiService) {

  }
  ngOnInit() {
    this.loadUnites();
    this.loadConsommables();
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
    this.loadConsommables();
  }

  isSorted(column: string, direction: 'asc' | 'desc') {
    return this.sortedColumn === column && this.sortDirection === direction;
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1; 
    this.searchCriteria.limit = event.pageSize; 
    this.loadConsommables();
  }

  loadUnites() {
    this.loader = true;
    this.apiService.getWithData(`api/unites`, {}).then(
      (response) => {
        this.unites = response;
        this.unites.forEach(unite => {
          this.selectedUnites[unite._id] = true;
        });
        this.loader = false;
      },
      (error) => {
        this.loader = false;
        console.error('Erreur lors de loadUnites :', error);
      }
    );
  }

  loadConsommables() {
    this.loader = true;
    this.searchCriteria.page = this.currentPage;
    this.searchCriteria.sortedColumn = this.sortedColumn;
    this.searchCriteria.sortDirection = this.sortDirection;
    this.apiService.getWithData('api/consommables/search',this.searchCriteria).then(
      (response) => {
        this.totalPages = Math.ceil(response['totalItems'] / this.searchCriteria.limit);
        this.totalElement = response['totalItems'];
        this.consommables = response['items'];
        this.loader = false;
      },
      (error) => {
        this.loader = false;
        console.error('Erreur lors de loadConsommables :', error);
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
    this.loadConsommables();
  }

  updateUnites(): void {
    this.searchCriteria.unites = [];
    for (let unite in this.selectedUnites) {
      if (this.selectedUnites[unite]) {
        this.searchCriteria.unites.push(unite);
      }
    }
    this.loadConsommables();
  }

  changeStatut(id: string, isChecked: boolean) {
    this.loader = true;
    const data = {
      userId: id,
      statut: isChecked ? 10 : -10  
    };
    this.apiService.insert('api/consommable/' + id, data).then(
      (response) => {
        this.loadConsommables();
        this.loader = false;
      },
      (error) => {
        this.loader = false;
        console.error('Erreur lors de l\'insertion :', error);
      }
    );
  }
  

  openConsommableDialog() {
    const dialogRef = this.dialog.open(ConsommableInsertionComponent, {
      width: '800px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loader = true;
        this.apiService.insert('api/consommable', result).then(
          (response) => {
            if (response.status >= 200 && response.status <= 202) {
              this.loadConsommables();
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
