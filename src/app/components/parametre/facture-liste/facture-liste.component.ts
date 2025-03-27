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
import {MatTooltip} from '@angular/material/tooltip';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ErrorMessageComponent} from '../../templates/dialog/error-message/error-message.component';
import {InfoMessageComponent} from '../../templates/dialog/info-message/info-message.component';

@Component({
  selector: 'app-facture-liste',
  imports: [CommonModule, MatIcon, FormsModule, LoaderComponent, MatPaginator, MatTooltip],
  templateUrl: './facture-liste.component.html',
  styleUrl: './facture-liste.component.css'
})
export class FactureListeComponent implements OnInit {
  loader : boolean = false;
  factures : any[] = [];
  clients : any[] = [];
  isClient: boolean|null = null;
  etats = [
    { id: 10, libelle: 'Payé' },
    { id: -10, libelle: 'Non payé' }
  ];
  selectedEtats: { [key: string]: boolean } = {};
  searchCriteria: any = {
    id: '',
    date: '',
    client: '',
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

  constructor(private snackBar: MatSnackBar,private dialog: MatDialog, private authService : AuthService,private router: Router, private apiService: ApiService) {

  }

  ngOnInit() {
    this.authService.getConnectedUser().then(user => {
      this.userConnected = user;
      this.loadClient();
      this.loadFactures();
      this.selectedEtats = {
        '10': true,
        '-10': true
      };
    });
  }

  loadClient(){
    this.loader = true;
    this.apiService.getAll('api/users').then(
      (response: any) => {
        this.clients = response;
        this.loader = false;
      },
      (error) => {
        this.showErrorMessage(error.response.data.message);
        this.loader = false;
      }
    );
  }

  async loadFactures() {
    this.loader = true;
    if(this.isClient===null){
      this.isClient = await this.authService.hasRole('client');
    }
    if (this.isClient) {
      if(this.userConnected){
        this.searchCriteria.client = this.userConnected;
      }
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
        this.totalElement = response.totalItems;
        this.totalPages = Math.ceil(this.totalElement / this.searchCriteria.limit);
        this.loader = false;
      },
      (error) => {
        this.showErrorMessage(error.response.data.message);
        this.loader = false;
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
    this.router.navigate(['/factures/'+facture._id]);
  }


  updateEtats(): void {
    this.searchCriteria.etats = [];
    for (let etat in this.selectedEtats) {
      if (this.selectedEtats[etat]) {
        this.searchCriteria.etats.push(etat);
      }
    }
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
