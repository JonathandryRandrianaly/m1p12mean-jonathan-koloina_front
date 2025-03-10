import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ApiService} from '../../../services/api/api.service';
import {Marque} from '../../../models/Marque';
import {LoaderComponent} from '../../templates/loader/loader.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MarqueInsertionComponent} from '../marque-dialog/marque-insertion/marque-insertion.component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-marque-parametre',
  imports: [
    LoaderComponent,
    MatPaginator,
    MatSlideToggleModule,
    CommonModule
  ],
  templateUrl: './marque-parametre.component.html',
  styleUrl: './marque-parametre.component.css'
})
export class MarqueParametreComponent implements OnInit {
  loader : boolean = false;
  marques : Marque[] = [];
  searchCriteria: any = {
    id: '',
    nom: '',
    etat: '',
    page: 1,
    limit: 10,
    sortedColumn : '',
    sortDirection : '',
  };
  constructor(private dialog: MatDialog, private router: Router, private apiService: ApiService) {

  }
  ngOnInit() {
    this.loadMarques();
  }

  loadMarques() {
    this.loader = true;
    this.apiService.getAll('api/marques').then(
      (response) => {
        this.marques = response;
        this.loader = false;
      },
      (error) => {
        this.loader = false;
        console.error('Erreur lors de loadMarques :', error);
      }
    );
  }

  openMarqueDialog() {
    const dialogRef = this.dialog.open(MarqueInsertionComponent, {
      width: '800px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loader = true;
        this.apiService.insert('api/marque', result).then(
          (response) => {
            if (response.status >= 200 && response.status <= 202) {
              this.loadMarques();
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
