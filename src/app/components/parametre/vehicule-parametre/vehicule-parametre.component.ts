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
import { ModeleInsertionComponent } from '../modele-dialog/modele-insertion/modele-insertion.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenu, MatMenuItem, MatMenuModule} from "@angular/material/menu";
import {MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatChipsModule} from '@angular/material/chips';
import {MatTableModule} from '@angular/material/table';
import { VehiculeInsertionComponent } from '../vehicule-dialog/vehicule-insertion/vehicule-insertion.component';
import { AuthService } from '../../../services/auth/auth-service.service';

@Component({
  selector: 'app-vehicule-parametre',
  imports: [ReactiveFormsModule,FormsModule,LoaderComponent,
    MatPaginatorModule,CommonModule,MatButtonModule, MatMenuModule, MatIconModule
    ,MatTableModule,MatChipsModule,
    MatTooltipModule, MatSlideToggleModule
  ],
  templateUrl: './vehicule-parametre.component.html',
  styleUrl: './vehicule-parametre.component.css'
})
export class VehiculeParametreComponent {
  loader : boolean = false;
  vehicules : any[] = [];
  modeles : any[] = [];
  etats = [
    { id: 10, libelle: 'Actif' },
    { id: -10, libelle: 'Inactif' }
  ];
  selectedEtats: { [key: string]: boolean } = {};
  selectedModeles: { [key: string]: boolean } = {};
  searchCriteria: any = {
    immatriculation: '',
    etat: '',
    proprietaire: '',
    proprietaireId: '',
    page: 1,
    limit: 10,
    sortedColumn : '',
    sortDirection : '',
    etats: [],
    modeles: []
  };
  sortedColumn: string = '';
  sortDirection: 'asc' | 'desc' | '' = '';
  currentPage: number = 1;
  totalPages: number = 0;
  totalElement: number = 0;
  showFilter: boolean = false;
  decodedToken: any;
  isManager!: Promise<boolean>;
  constructor(private dialog: MatDialog, private router: Router, private apiService: ApiService, private authService: AuthService) {

  }
  ngOnInit() {
    this.getDecodedToken();
    this.isManager= this.authService.hasRole('manager');
    this.isManager.then(isManager => {
      if (!isManager) {
        this.searchCriteria.proprietaireId = this.decodedToken.userId;
      }
      this.loadVehicules();
    });
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
    this.loadVehicules();
  }

  isSorted(column: string, direction: 'asc' | 'desc') {
    return this.sortedColumn === column && this.sortDirection === direction;
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1; 
    this.searchCriteria.limit = event.pageSize; 
    this.loadVehicules();
  }

  getDecodedToken(){
    this.authService.decodeToken().then(
      (response) => {
        this.decodedToken= response;
      },
      (error) => {
        console.error('Erreur recup token :', error);
      }
    );
  }

  loadModeles() {
    this.loader = true;
    this.apiService.getWithData(`api/modeles`, {}).then(
      (response) => {
        this.modeles = response;
        this.modeles.forEach(modele => {
          this.selectedModeles[modele._id] = true;
        });
        this.loader = false;
      },
      (error) => {
        this.loader = false;
        console.error('Erreur lors de loadModeles :', error);
      }
    );
  }


  loadVehicules() {
    this.loader = true;
    this.searchCriteria.page = this.currentPage;
    this.searchCriteria.sortedColumn = this.sortedColumn;
    this.searchCriteria.sortDirection = this.sortDirection;
    this.apiService.getWithData('api/vehicules/search',this.searchCriteria).then(
      (response) => {
        this.totalPages = Math.ceil(response['totalItems'] / this.searchCriteria.limit);
        this.totalElement = response['totalItems'];
        this.vehicules = response['items'];
        this.loader = false;
      },
      (error) => {
        this.loader = false;
        console.error('Erreur lors de loadVehicules :', error);
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

  updateModeles(): void {
    this.searchCriteria.modeles = [];
    for (let modele in this.selectedModeles) {
      if (this.selectedModeles[modele]) {
        this.searchCriteria.modeles.push(modele);
      }
    }
  }

  changeStatut(id: string, isChecked: boolean) {
    this.loader = true;
    const data = {
      userId: id,
      statut: isChecked ? 10 : -10  
    };
    this.apiService.insert('api/vehicule/' + id, data).then(
      (response) => {
        this.loadVehicules();
        this.loader = false;
      },
      (error) => {
        this.loader = false;
        console.error('Erreur lors de l\'insertion :', error);
      }
    );
  }
  

  openVehiculeInsertionDialog() {
    const dialogRef = this.dialog.open(VehiculeInsertionComponent, {
      width: '800px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loader = true;
        result.proprietaire = this.decodedToken.userId;
        this.apiService.insert('api/vehicule', result).then(
          (response) => {
            if (!response.data.success) {
              this.loader = false;
            }else{
                this.loadVehicules();
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
    this.loadVehicules();
    this.toggleFilter(); 
  }

  resetSearchCriteria() {
    this.searchCriteria = {
      immatriculation: '',
      etat: '',
      proprietaire: '',
      proprietaireId: '',
      page: 1,
      limit: 10,
      sortedColumn : '',
      sortDirection : '',
      etats: [],
      modeles: []
    };
    this.selectedEtats = {
      '10': true, 
      '-10': true 
    };
    Object.keys(this.selectedModeles).forEach(key => {
      this.selectedModeles[key] = true;
    });
    this.loadVehicules();
    this.showFilter = !this.showFilter;
  }

}
