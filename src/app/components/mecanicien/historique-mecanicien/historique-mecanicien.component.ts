import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoaderComponent} from "../../templates/loader/loader.component";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuModule} from "@angular/material/menu";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ApiService} from '../../../services/api/api.service';
import {EmployeeInsertionComponent} from '../../parametre/user-dialog/employee-insertion/employee-insertion.component';
import {MatTableModule} from '@angular/material/table';
import {MatChipsModule} from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-historique-mecanicien',
    imports: [ReactiveFormsModule,FormsModule,LoaderComponent,
      MatPaginatorModule,CommonModule,MatButtonModule, MatMenuModule, MatIconModule
      ,MatTableModule,MatChipsModule,
      MatTooltipModule
    ],
  templateUrl: './historique-mecanicien.component.html',
  styleUrl: './historique-mecanicien.component.css'
})
export class HistoriqueMecanicienComponent implements OnInit {
  loader : boolean = false;
  displayedColumns: string[] = ['name', 'id', 'status', 'actions'];
  searchKey: string = '';
  showFilter: boolean = false;
  @ViewChild('filterCard', { static: false }) filterCard: ElementRef | null = null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  users : any[] = [];
  roles : any[] = [];
  selectedRoles: { [key: string]: boolean } = {};
  searchCriteria: any = {
    nom: '',
    roles: [],
    etat: '',
    page: 1,
    limit: 10,
    sortedColumn : '',
    sortDirection : '',
  };
  sortedColumn: string = '';
  sortDirection: 'asc' | 'desc' | '' = '';
  currentPage: number = 1;
  totalPages: number = 0;
  totalElement: number = 0;
  constructor(private dialog: MatDialog, private router: Router, private apiService: ApiService) {

  }
  ngOnInit() {
    this.loadUsers();
    this.loadRoles();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.showFilter && this.filterCard) {
      const filterElement = this.filterCard.nativeElement;
      if (filterElement && !filterElement.contains(event.target)) {
        this.showFilter = false;
      }
    }
  }

  sortData(column : string) {
    if (this.sortedColumn == column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    }
    else {
      this.sortedColumn = column;
      this.sortDirection = 'asc';
    }
    this.loadUsers();
  }

  changeStatus(id: string) {
    this.loader = true;
    const data = {
      userId: id
    }
    this.apiService.insert('api/user/'+id, data).then(
      (response) => {
        this.loadUsers();
        this.loader = false;
      },
      (error) => {
        this.loader = false;
        console.error('Erreur lors de l\'insertion :', error);
      }
    );
  }

  isSorted(column: string, direction: 'asc' | 'desc') {
    return this.sortedColumn === column && this.sortDirection === direction;
  }
  loadUsers() {
    this.loader = true;
    this.searchCriteria.page = this.currentPage;
    this.searchCriteria.sortedColumn = this.sortedColumn;
    this.searchCriteria.sortDirection = this.sortDirection;
    this.apiService.getWithData('api/users/search',this.searchCriteria).then(
      (response) => {
        this.totalPages = Math.ceil(response['totalItems'] / this.searchCriteria.limit);
        this.totalElement = response['totalItems'];
        this.users = response['items'];
        this.loader = false;
      },
      (error) => {
        this.loader = false;
        console.error('Erreur lors de loadUsers :', error);
      }
    );
  }
  loadRoles() {
    this.loader = true;
    this.apiService.getAll('api/roles').then(
      (response) => {
        this.roles = response;
        this.roles.forEach(role => {
          this.selectedRoles[role._id] = true;
        });
        this.loader = false;
      },
      (error) => {
        this.loader = false;
        console.error('Erreur lors de loadUsers :', error);
      }
    );
  }

  updateRoles(): void {
    this.searchCriteria.roles = [];
    for (let role in this.selectedRoles) {
      if (this.selectedRoles[role]) {
        this.searchCriteria.roles.push(role);
      }
    }
    this.loadUsers();
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  applyFilters() {
    // Appliquez ici la logique pour filtrer les utilisateurs en fonction des critères
    this.loadUsers();
    this.toggleFilter(); // Fermer le filtre après application
  }

}
