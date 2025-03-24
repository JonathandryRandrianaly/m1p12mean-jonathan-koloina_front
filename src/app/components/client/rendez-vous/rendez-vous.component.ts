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
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenu, MatMenuItem, MatMenuModule} from "@angular/material/menu";
import {MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatChipsModule} from '@angular/material/chips';
import {MatTableModule} from '@angular/material/table';
import { AuthService } from '../../../services/auth/auth-service.service';

@Component({
  selector: 'app-rendez-vous',
  imports: [ReactiveFormsModule,FormsModule,LoaderComponent,
    MatPaginatorModule,CommonModule,MatButtonModule, MatMenuModule, MatIconModule
    ,MatTableModule,MatChipsModule,
    MatTooltipModule, MatSlideToggleModule
  ],
  templateUrl: './rendez-vous.component.html',
  styleUrl: './rendez-vous.component.css'
})
export class RendezVousComponent {
  loader : boolean = false;
  rdvs : any[] = [];
  userConnected: string|null = null;
  today: any;
  constructor(private dialog: MatDialog, private router: Router, private apiService: ApiService, private authService: AuthService) {

  }
  ngOnInit() {
    this.authService.getConnectedUser().then(user => {
      this.userConnected = user;
      this.loadRdv();
    });
    this.today = new Date().toISOString().split('T')[0];
  }

  loadRdv() {
    this.loader = true;
    this.apiService.getWithData(`api/entretiens/rdv/${this.userConnected}`, {}).then(
      (response) => {
        this.rdvs = response;
        this.loader = false;
      },
      (error) => {
        this.loader = false;
        console.error('Erreur lors de loadRDV :', error);
      }
    );
  }

  annulerRdv(detailEntretienId: any) {
    this.loader = true;
    this.apiService.insert('api/entretien/rdv/annuler',{detailEntretienId}).then(
      (response) => {
        this.loadRdv();
        this.loader = false;
      },
      (error) => {
        this.loader = false;
        console.error('Erreur lors de l\'annulation :', error);
      }
    );
  }
}
