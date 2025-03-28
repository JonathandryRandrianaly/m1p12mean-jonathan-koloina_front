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
import {MatSnackBar} from '@angular/material/snack-bar';
import {ErrorMessageComponent} from '../../templates/dialog/error-message/error-message.component';
import {InfoMessageComponent} from '../../templates/dialog/info-message/info-message.component';
import { ProfilUpdateInfoComponent } from '../profil-dialog/profil-update-info/profil-update-info.component';
import { ProfilUpdateMdpComponent } from '../profil-dialog/profil-update-mdp/profil-update-mdp.component';

@Component({
  selector: 'app-profil-parametre',
  imports: [ReactiveFormsModule,FormsModule,LoaderComponent,
    MatPaginatorModule,CommonModule,MatButtonModule, MatMenuModule, MatIconModule
    ,MatTableModule,MatChipsModule,
    MatTooltipModule, MatSlideToggleModule
  ],
  templateUrl: './profil-parametre.component.html',
  styleUrl: './profil-parametre.component.css'
})
export class ProfilParametreComponent implements OnInit{
  loader : boolean = false;
  user: any;
  userId: any;
  constructor(private snackBar: MatSnackBar,private dialog: MatDialog, private route: ActivatedRoute, private apiService: ApiService) {

  }
  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.getUser();
  }

  getUser() {
    this.loader = true;
    this.apiService.getAll('api/user/'+ this.userId).then(
      (response) => {
        this.user = response;
        this.loader = false;
      },
      (error) => {
        this.showErrorMessage(error.response.data.message);
        this.loader = false;
      }
    );
  }

  openUpdateInfo(user: any) {
    const dialogRef = this.dialog.open(ProfilUpdateInfoComponent, {
      width: '800px',
      data: user,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loader = true;
        this.apiService.insert('api/user/update', result).then(
          (response) => {
            this.showAlertMessage('Informations modifiées avec succès');
            this.loader = false;
          },
          (error) => {
            this.showErrorMessage(error.response.data.message);
            this.loader = false;
          }
        );
      }
    });
  }

  openUpdateMdp(user: any) {
    const dialogRef = this.dialog.open(ProfilUpdateMdpComponent, {
      width: '800px',
      data: user,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loader = true;
        this.apiService.insert('api/updatePassword', result).then(
          (response) => {
            this.showAlertMessage('Mot de passe modifié avec succès');
            this.loader = false;
          },
          (error) => {
            this.showErrorMessage(error.response.data.message);
            this.loader = false;
          }
        );
      }
    });
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
