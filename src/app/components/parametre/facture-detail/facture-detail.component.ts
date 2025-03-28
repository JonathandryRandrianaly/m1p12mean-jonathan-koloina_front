import {Component, OnInit} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {CommonModule, NgForOf} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../../../services/auth/auth-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../services/api/api.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ErrorMessageComponent} from '../../templates/dialog/error-message/error-message.component';
import {InfoMessageComponent} from '../../templates/dialog/info-message/info-message.component';

@Component({
  selector: 'app-facture-detail',
  imports: [
    CommonModule
  ],
  templateUrl: './facture-detail.component.html',
  styleUrl: './facture-detail.component.css'
})
export class FactureDetailComponent implements OnInit {
  userConnected: string|null = null;
  loader: boolean = false;
  factureId: string = '';
  detailFactures: any[] = [];
  facture: any;

  constructor(private snackBar: MatSnackBar,private route: ActivatedRoute, private dialog: MatDialog, private authService : AuthService,private router: Router, private apiService: ApiService) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.factureId = params['id'];
        this.loadFacture();
        this.loadFactureDetail();
      }
    });
  }

  loadFactureDetail() {
    this.loader = true;
    this.apiService.getAll('api/factures/details/'+this.factureId).then(
      (response: any) => {
        this.detailFactures = response;
        this.loader = false;
      },
      (error) => {
        this.showErrorMessage(error.response.data.message);
        this.loader = false;
      }
    );
  }

  loadFacture() {
    this.loader = true;
    this.apiService.getAll('api/factures/'+this.factureId).then(
      (response: any) => {
        this.facture = response;
        this.loader = false;
      },
      (error) => {
        this.showErrorMessage(error.response.data.message);
        this.loader = false;
      }
    );
  }

  payer(){
    this.apiService.insert('api/facture/paiement', {
      factureId: this.factureId,
      etatCode: Number(10),
      etatLibelle: 'Payer'
    }).then(response => {
      this.showAlertMessage('Paiement effectué avec succès');
      this.loadFacture();
    }).catch(error => {
      this.showErrorMessage(error.response.data.message);
    });
  }
  retour(){
    this.router.navigate(['/factures']);
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
