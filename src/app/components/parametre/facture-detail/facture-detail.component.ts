import { Component } from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {CommonModule, NgForOf} from '@angular/common';

@Component({
  selector: 'app-facture-detail',
  imports: [
    CommonModule
  ],
  templateUrl: './facture-detail.component.html',
  styleUrl: './facture-detail.component.css'
})
export class FactureDetailComponent {
  // Données du client et du véhicule
  client = {
    name: 'Jean Dupont',
    vehicle: 'Peugeot 308 - 2020'
  };

  // Date de la facture (peut être dynamique ou récupérée d'une API)
  factureDate = new Date();

  // État de la facture (payer ou non)
  isPaid = false;

  // Liste des services
  services = [
    { name: 'Changement de pneus', detail: 'Changement des 4 pneus', total: 50 * 4 },
    { name: 'Réparation freinage', detail: 'Réparation du système de freinage', total: 150 },
    { name: 'Vidange huile', detail: 'Vidange complète du moteur', total: 40 }
  ];

  // Calcul du total des services
  get totalServices() {
    return this.services.reduce((acc, service) => acc + service.total, 0);
  }

  // Méthode pour payer la facture
  payInvoice() {
    this.isPaid = true;
    alert('La facture a été payée !');
  }
}
