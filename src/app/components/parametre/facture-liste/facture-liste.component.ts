import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ApiService} from '../../../services/api/api.service';
import {AuthService} from '../../../services/auth/auth-service.service';
import {FormsModule} from '@angular/forms';
import {LoaderComponent} from '../../templates/loader/loader.component';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {ModeleInsertionComponent} from '../modele-dialog/modele-insertion/modele-insertion.component';

@Component({
  selector: 'app-facture-liste',
  imports: [CommonModule, MatIcon, FormsModule, LoaderComponent, MatPaginator],
  templateUrl: './facture-liste.component.html',
  styleUrl: './facture-liste.component.css'
})
export class FactureListeComponent implements OnInit {
  loader : boolean = false;
  factures : any[] = [];
  clients : any[] = [];
  etats = [
    { id: 10, libelle: 'Payé' },
    { id: -10, libelle: 'Non payé' }
  ];
  selectedEtats: { [key: string]: boolean } = {};
  searchCriteria: any = {
    id: '',
    date: '',
    page: 1,
    limit: 10,
    sortedColumn : '',
    sortDirection : '',
    etats: []
  };
  sortedColumn: string = '';
  sortDirection: 'asc' | 'desc' | '' = '';
  currentPage: number = 1;
  totalPages: number = 0;
  totalElement: number = 0;
  showFilter: boolean = false;
  userConnected: string|null = null;

  constructor(private dialog: MatDialog, private authService : AuthService,private router: Router, private apiService: ApiService) {

  }

  ngOnInit() {
    this.authService.getConnectedUser().then(user => {
      this.userConnected = user;
      this.loadFactures();
      this.selectedEtats = {
        '10': true,
        '-10': true
      };
    });
  }

  loadFactures() {
    this.loader = true;
    if(this.userConnected){
      this.searchCriteria.client = this.userConnected;
    }
    const params = {
      ...this.searchCriteria,
      etats: Object.keys(this.selectedEtats).filter(key => this.selectedEtats[key]),
      sortedColumn: this.sortedColumn,
      sortDirection: this.sortDirection,
      page: this.currentPage
    };

    this.apiService.getWithData('api/factures/search', params).then(
      (response: any) => {
        this.factures = response.items;
        console.log(this.factures);
        this.totalElement = response.totalItems;
        this.totalPages = Math.ceil(this.totalElement / this.searchCriteria.limit);
        this.loader = false;
      },
      (error) => {
        this.loader = false;
        console.error('Erreur lors du chargement des factures :', error);
      }
    );
  }
  sortData(column : string) {
    if (this.sortedColumn == column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    }
    else {
      this.sortedColumn = column;
      this.sortDirection = 'asc';
    }
    this.loadFactures();
  }

  isSorted(column: string, direction: 'asc' | 'desc') {
    return this.sortedColumn === column && this.sortDirection === direction;
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.searchCriteria.limit = event.pageSize;
    this.loadFactures();
  }

  showDetails(facture: any) {
    console.log('Détails de la facture :', facture);
  }


  updateEtats(): void {
    this.searchCriteria.etats = [];
    for (let etat in this.selectedEtats) {
      if (this.selectedEtats[etat]) {
        this.searchCriteria.etats.push(etat);
      }
    }
  }
  changeStatut(id: string, isChecked: boolean) {
    this.loader = true;
    const data = {
      userId: id,
      statut: isChecked ? 10 : -10
    };
    this.apiService.insert('api/modele/' + id, data).then(
      (response) => {
        this.loadFactures();
        this.loader = false;
      },
      (error) => {
        this.loader = false;
        console.error('Erreur lors de l\'insertion :', error);
      }
    );
  }


  openModeleDialog() {
    const dialogRef = this.dialog.open(ModeleInsertionComponent, {
      width: '800px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('ato');
        this.loader = true;
        this.apiService.insert('api/modele', result).then(
          (response) => {
            if (response.status >= 200 && response.status <= 202) {
              this.loadFactures();
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

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  applyFilters() {
    this.loadFactures();
    this.toggleFilter();
  }

  resetSearchCriteria() {
    this.searchCriteria = {
      id: '',
      date: '',
      page: 1,
      limit: 10,
      sortedColumn: '',
      sortDirection: '',
      etats: []
    };
    this.selectedEtats = {
      '10': true,
      '-10': true
    };
    this.loadFactures();
    this.showFilter = !this.showFilter;
  }

}
