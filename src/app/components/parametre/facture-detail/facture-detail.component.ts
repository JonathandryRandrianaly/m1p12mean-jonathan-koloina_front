import {Component, OnInit} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {CommonModule, NgForOf} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../../../services/auth/auth-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../services/api/api.service';

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

  constructor(private route: ActivatedRoute, private dialog: MatDialog, private authService : AuthService,private router: Router, private apiService: ApiService) {

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
        console.log(this.detailFactures);
        this.loader = false;
      },
      (error) => {
        this.loader = false;
        console.error('Erreur lors du chargement des factures :', error);
      }
    );
  }

  loadFacture() {
    this.loader = true;
    this.apiService.getAll('api/factures/'+this.factureId).then(
      (response: any) => {
        this.facture = response;
        console.log(this.facture);
        this.loader = false;
      },
      (error) => {
        this.loader = false;
        console.error('Erreur lors du chargement des factures :', error);
      }
    );
  }

  payer(){
    this.apiService.insert('api/facture/paiement', {
      factureId: this.factureId,
      etatCode: Number(10),
      etatLibelle: 'Payer'
    }).then(response => {
      this.loadFacture();
    }).catch(error => {
      console.error('Erreur lors de la mise à jour du statut:', error);
    });
  }
  retour(){
    this.router.navigate(['/factures']);
  }
}
