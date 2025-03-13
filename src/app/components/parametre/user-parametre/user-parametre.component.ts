import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../models/User';
import {LoaderComponent} from '../../templates/loader/loader.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import {MatDialog} from '@angular/material/dialog';
import {EmployeeInsertionComponent} from '../user-dialog/employee-insertion/employee-insertion.component';
import {ApiService} from '../../../services/api/api.service';
import {Router} from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {environment} from '../../../../environments/environment';
import {
  EmployeeRoleAttributionComponent
} from '../user-dialog/employee-role-attribution/employee-role-attribution.component';
import {
  EmployeeSpecialisationAttributionComponent
} from '../user-dialog/employee-specialisation-attribution/employee-specialisation-attribution.component';
import {UserInfoComponent} from '../user-dialog/user-info/user-info.component';

@Component({
  selector: 'app-user-parametre',
  imports: [ReactiveFormsModule,FormsModule,LoaderComponent,
    MatPaginatorModule,CommonModule,MatButtonModule, MatMenuModule, MatIconModule
  ,MatTableModule,MatChipsModule],
  templateUrl: './user-parametre.component.html',
  styleUrl: './user-parametre.component.css'
})
export class UserParametreComponent implements OnInit {
  loader : boolean = false;
  environmentApi : string = environment.appUrl;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  users : any[] = [];
  roles : any[] = [];
  selectedRoles: { [key: string]: boolean } = {};
  selectedEtats: { [key: string]: boolean } =
    { '10': true, '-10': true, '0': true };
  searchCriteria: any = {
    nom: '',
    roles: [],
    etats: [],
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

  updateEtats(): void {
    this.searchCriteria.etats = [];
    for (let etat in this.selectedEtats) {
      if (this.selectedEtats[etat]) {
        this.searchCriteria.etats.push(etat);
      }
    }
    this.loadUsers();
  }

  openEmployerDialog() {
    const dialogRef = this.dialog.open(EmployeeInsertionComponent, {
      width: '800px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loader = true;
        result.roleLibelles = ['mecanicien'];
        result.lien = this.environmentApi+'/inscription-mecanicien';
        this.apiService.insert('api/addEmployees', result).then(
          (response) => {
              const dataSpecialisation = {
                user: response.data.userId,
                specialisations: result.specialisations,
              }
              this.apiService.insert('api/specialisations-personnel', dataSpecialisation).then(
                () => {
                    this.loadUsers();
                    this.loader = false;
                },
                (error) => {
                  this.loader = false;
                  console.error('Erreur lors de l\'insertion :', error);
                }
              );
          },
          (error) => {
            this.loader = false;
            console.error('Erreur lors de l\'insertion :', error);
          }
        );
      }
    });
  }

  openAttributionRoleDialog() {
    const dialogRef = this.dialog.open(EmployeeRoleAttributionComponent, {
      width: '800px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }

  openAttributionSpecialisationDialog(userId: string) {
    const dialogRef = this.dialog.open(EmployeeSpecialisationAttributionComponent, {
      width: '800px',
      data: userId,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loader = true;
        const dataSpecialisation = {
          user: result.userId,
          specialisations: result.specialisations,
        }
        this.apiService.insert('api/specialisations-personnel', dataSpecialisation).then(
          () => {
            this.loadUsers();
            this.loader = false;
          },
          (error) => {
            this.loader = false;
            console.error('Erreur lors de l\'insertion :', error);
          }
        );
      }
    });
  }

  openUserInfoDialog(user: any) {
    const dialogRef = this.dialog.open(UserInfoComponent, {
      width: '800px',
      data: user,
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }

  hasRole(user: any, roleName: string): boolean {
    return user.roles.some((role: any) => role.libelle === roleName);
  }
}
