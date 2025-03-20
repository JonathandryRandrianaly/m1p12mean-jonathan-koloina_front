import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-facture-liste',
  imports: [CommonModule, MatIcon],
  templateUrl: './facture-liste.component.html',
  styleUrl: './facture-liste.component.css'
})
export class FactureListeComponent implements OnInit {
  factures: any[] = [
    { numero: 'FAC123', date: '2025-03-19', montant: 150.0, status: 'Payée' },
    { numero: 'FAC124', date: '2025-03-18', montant: 200.0, status: 'Non payée' },
    { numero: 'FAC125', date: '2025-03-17', montant: 300.0, status: 'Payée' },
  ];

  constructor() {}

  ngOnInit(): void {}

  showDetails(facture: any) {
    // Logique pour afficher les détails de la facture
    console.log('Détails de la facture :', facture);
  }

}
