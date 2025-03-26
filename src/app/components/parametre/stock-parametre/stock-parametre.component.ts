import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router, ActivatedRoute} from '@angular/router';
import {ApiService} from '../../../services/api/api.service';
import {LoaderComponent} from '../../templates/loader/loader.component';
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenu, MatMenuItem, MatMenuModule} from "@angular/material/menu";
import {MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatChipsModule} from '@angular/material/chips';
import {MatTableModule} from '@angular/material/table';
import { StockInsertionComponent } from '../stock-dialog/stock-insertion/stock-insertion.component';

@Component({
  selector: 'app-stock-parametre',
  imports: [ReactiveFormsModule,FormsModule,LoaderComponent,
    MatPaginatorModule,CommonModule,MatButtonModule, MatMenuModule, MatIconModule
    ,MatTableModule,MatChipsModule,
    MatTooltipModule, MatSlideToggleModule
  ],
  templateUrl: './stock-parametre.component.html',
  styleUrl: './stock-parametre.component.css'
})
export class StockParametreComponent implements OnInit {
  loader : boolean = false;
  stocks : any[] = [];
  searchCriteria: any = {
    page: 1,
    limit: 10,
    consommableId: '',
    dateMin : '',
    dateMax : ''
  };
  currentPage: number = 1;
  totalPages: number = 0;
  totalElement: number = 0;
  consommableId: any;
  consommable: any;
  constructor(private dialog: MatDialog, private route: ActivatedRoute, private apiService: ApiService) {

  }
  ngOnInit() {
    this.consommableId = this.route.snapshot.paramMap.get('id');
    const firstDayOfYear = new Date(new Date().getFullYear(), 0, 1);
    const formattedDateMin = firstDayOfYear.toISOString().split('T')[0];
    const currentDate = new Date();
    const formattedDateMax = currentDate.toISOString().split('T')[0];
    this.searchCriteria.dateMin= formattedDateMin;
    this.searchCriteria.dateMax= formattedDateMax;
    this.getConsommable();
    this.loadHistoriquesMouvements();
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1; 
    this.searchCriteria.limit = event.pageSize; 
    this.loadHistoriquesMouvements();
  }

  getConsommable() {
    this.loader = true;
    this.apiService.getAll('api/consommable/'+ this.consommableId).then(
      (response) => {
        this.consommable = response;
        this.loader = false;
      },
      (error) => {
        this.loader = false;
        console.error('Erreur lors de getConsommable :', error);
      }
    );
  }

  loadHistoriquesMouvements() {
    this.loader = true;
    this.searchCriteria.page = this.currentPage;
    this.searchCriteria.consommableId= this.consommableId;
    this.apiService.getWithData('api/stock/mouvements',this.searchCriteria).then(
      (response) => {
        this.totalPages = Math.ceil(response['totalItems'] / this.searchCriteria.limit);
        this.totalElement = response['totalItems'];
        this.stocks = response['items'];
        this.loader = false;
      },
      (error) => {
        this.loader = false;
        console.error('Erreur lors de loadStocks :', error);
      }
    );
  }  

  openStockDialog(consommable: any) {
    const dialogRef = this.dialog.open(StockInsertionComponent, {
      width: '800px',
      data: consommable,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loader = true;
        this.apiService.insert('api/stock', result).then(
          (response) => {
            if (response.data.success == true) {
              this.loadHistoriquesMouvements();
            }else{
              this.loader=false;
              alert('⚠️ Mouvement impossible');
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
