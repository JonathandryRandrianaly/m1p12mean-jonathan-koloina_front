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
import { ModeleInsertionComponent } from '../modele-dialog/modele-insertion/modele-insertion.component';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-modele-parametre',
  imports: [
    LoaderComponent,
    MatPaginator,
    MatSlideToggleModule,
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,FormsModule,
    MatTooltipModule
  ],
  templateUrl: './modele-parametre.component.html',
  styleUrl: './modele-parametre.component.css'
})
export class ModeleParametreComponent implements OnInit {

  loader : boolean = false;
  modeles : any[] = [];
  marques : any[] = [];
  energies : any[] = [];
  transmissions : any[] = [];
  motricites : any[] = [];
  etats = [
    { id: 10, libelle: 'Actif' },
    { id: -10, libelle: 'Inactif' }
  ];
  selectedEtats: { [key: string]: boolean } = {};
  selectedMarques: { [key: string]: boolean } = {};
  selectedEnergies: { [key: string]: boolean } = {};
  selectedTransmissions: { [key: string]: boolean } = {};
  selectedMotricites: { [key: string]: boolean } = {};
  searchCriteria: any = {
    nom: '',
    etat: '',
    page: 1,
    limit: 10,
    sortedColumn : '',
    sortDirection : '',
    etats: [],
    marques: [],
    energies: [],
    tranmissions: [],
    motricites: [],
    anneeMin: '',
    anneeMax: '',
  };
  sortedColumn: string = '';
  sortDirection: 'asc' | 'desc' | '' = '';
  currentPage: number = 1;
  totalPages: number = 0;
  totalElement: number = 0;
  showFilter: boolean = false;
  constructor(private dialog: MatDialog, private router: Router, private apiService: ApiService) {

  }
  ngOnInit() {
    this.loadMarques();
    this.loadEnergies();
    this.loadTransmissions();
    this.loadMotricites();
    this.loadModeles();
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
    this.loadModeles();
  }

  isSorted(column: string, direction: 'asc' | 'desc') {
    return this.sortedColumn === column && this.sortDirection === direction;
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1; 
    this.searchCriteria.limit = event.pageSize; 
    this.loadModeles();
  }

  loadMarques() {
    this.loader = true;
    this.apiService.getWithData(`api/marques`, {}).then(
      (response) => {
        this.marques = response;
        this.marques.forEach(marque => {
          this.selectedMarques[marque._id] = true;
        });
        this.loader = false;
      },
      (error) => {
        this.loader = false;
        console.error('Erreur lors de loadMarques :', error);
      }
    );
  }

  loadEnergies() {
    this.loader = true;
    this.apiService.getWithData(`api/energie-moteurs`, {}).then(
      (response) => {
        this.energies = response;
        this.energies.forEach(energie => {
          this.selectedEnergies[energie._id] = true;
        });
        this.loader = false;
      },
      (error) => {
        this.loader = false;
        console.error('Erreur lors de loadEnergies :', error);
      }
    );
  }

  loadTransmissions() {
    this.loader = true;
    this.apiService.getWithData(`api/transmissions`, {}).then(
      (response) => {
        this.transmissions = response;
        this.transmissions.forEach(transmission => {
          this.selectedTransmissions[transmission._id] = true;
        });
        this.loader = false;
      },
      (error) => {
        this.loader = false;
        console.error('Erreur lors de loadTransmissions :', error);
      }
    );
  }

  loadMotricites() {
    this.loader = true;
    this.apiService.getWithData(`api/motricites`, {}).then(
      (response) => {
        this.motricites = response;
        this.motricites.forEach(motricite => {
          this.selectedMotricites[motricite._id] = true;
        });
        this.loader = false;
      },
      (error) => {
        this.loader = false;
        console.error('Erreur lors de loadMotricite :', error);
      }
    );
  }

  loadModeles() {
    this.loader = true;
    this.searchCriteria.page = this.currentPage;
    this.searchCriteria.sortedColumn = this.sortedColumn;
    this.searchCriteria.sortDirection = this.sortDirection;
    this.apiService.getWithData('api/modeles/search',this.searchCriteria).then(
      (response) => {
        this.totalPages = Math.ceil(response['totalItems'] / this.searchCriteria.limit);
        this.totalElement = response['totalItems'];
        this.modeles = response['items'];
        this.loader = false;
      },
      (error) => {
        this.loader = false;
        console.error('Erreur lors de loadModeles :', error);
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

  updateMarques(): void {
    this.searchCriteria.marques = [];
    for (let marque in this.selectedMarques) {
      if (this.selectedMarques[marque]) {
        this.searchCriteria.marques.push(marque);
      }
    }
  }

  updateEnergies(): void {
    this.searchCriteria.energies = [];
    for (let energie in this.selectedEnergies) {
      if (this.selectedEnergies[energie]) {
        this.searchCriteria.energies.push(energie);
      }
    }
  }

  updateTransmissions(): void {
    this.searchCriteria.transmissions = [];
    for (let transmission in this.selectedTransmissions) {
      if (this.selectedTransmissions[transmission]) {
        this.searchCriteria.tranmissions.push(transmission);
      }
    }
  }

  updateMotricites(): void {
    this.searchCriteria.motricites = [];
    for (let motricite in this.selectedMotricites) {
      if (this.selectedMotricites[motricite]) {
        this.searchCriteria.motricites.push(motricite);
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
        this.loadModeles();
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
              this.loadModeles();
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
    this.loadModeles();
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
      marques: [],
      energies: [],
      tranmissions: [],
      motricites: [],
      anneeMin: '',
      anneeMax: '',
    };
    this.selectedEtats = {
      '10': true, 
      '-10': true 
    };
    this.loadModeles();
    this.showFilter = !this.showFilter;
  }
  

}
