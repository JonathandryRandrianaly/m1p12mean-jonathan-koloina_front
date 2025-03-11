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
  displayedColumns: string[] = ['name', 'id', 'status', 'actions'];
  searchKey: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  users : any[] = [];
  searchCriteria: any = {
    id: '',
    nom: '',
    email: '',
    genre: '',
    telephone: '',
    dateNaissance: '',
    etat: '',
    page: 1,
    limit: 10,
    sortedColumn : '',
    sortDirection : '',
  };
  sortedColumn: string = '';
  sortDirection: 'asc' | 'desc' | '' = '';
  constructor(private dialog: MatDialog, private router: Router, private apiService: ApiService) {

  }
  ngOnInit() {
    this.loadUsers();
  }

  sortData(column : string) {
    if (this.sortedColumn == column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    }
    else {
      this.sortedColumn = column;
      this.sortDirection = 'asc';
    }
  }

  isSorted(column: string, direction: 'asc' | 'desc') {
    return this.sortedColumn === column && this.sortDirection === direction;
  }
  loadUsers() {
    this.loader = true;
    this.apiService.getAll('api/users').then(
      (response) => {
        this.users = response;
        console.log(response);
        this.loader = false;
      },
      (error) => {
        this.loader = false;
        console.error('Erreur lors de loadUsers :', error);
      }
    );
  }

  applyFilter() {

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
        this.apiService.insert('api/addEmployees', result).then(
          (response) => {
            if (response.status >= 200 && response.status <= 202) {
              this.loadUsers();
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
