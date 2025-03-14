import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoaderComponent} from '../../templates/loader/loader.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatChipsModule} from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-demande-service-client',
  imports: [ReactiveFormsModule,FormsModule,LoaderComponent,
    MatPaginatorModule,CommonModule,MatButtonModule, MatMenuModule, MatIconModule
    ,MatTableModule,MatChipsModule,
    MatTooltipModule,MatFormFieldModule, MatInputModule, MatDatepickerModule
  ],
  templateUrl: './demande-service-client.component.html',
  styleUrl: './demande-service-client.component.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemandeServiceClientComponent {
  loader: boolean = false;
  selectedCategorieEntretien: string = '';
  selectedVehicule: string = '';
  services: any[] = [
    {
      name: "Révision et Entretien",
      description: "Vidange, changement de filtres, freins, etc.",
      price: "15000 Ariary",
      icon: "build" // 🛠️ Outils, entretien
    },
    {
      name: "Réparation Mécanique",
      description: "Moteur, transmission, suspension, etc.",
      price: "15000 Ariary",
      icon: "handyman" // 🔧 Clé à molette pour réparations mécaniques
    },
    {
      name: "Diagnostic et Contrôle",
      description: "Voyant moteur allumé, bruit suspect, etc.",
      price: "15000 Ariary",
      icon: "search" // 🔍 Icône de recherche pour diagnostic
    },
    {
      name: "Pneumatiques et Équilibrage",
      description: "Changement et équilibrage de pneus",
      price: "15000 Ariary",
      icon: "tire_repair" // 🛞 Icône pour pneus (Nouvelle icône Material 2023)
    },
    {
      name: "Climatisation et Électricité",
      description: "Recharge, détection de fuites, réparations",
      price: "15000 Ariary",
      icon: "ac_unit" // ❄️ Icône de climatisation
    },
    {
      name: "Autre",
      description: "Préciser un besoin spécifique",
      price: "15000 Ariary",
      icon: "more_horiz" // ⋯ Icône pour autres services
    }
  ];

  disabledDates: Date[] = [
    new Date(2025, 2, 15),
    new Date(2025, 2, 21),
    new Date(2025, 2, 16)
  ];

  vehicles: any[] = [
    {
      marque: "Toyota",
      categorie: "SUV",
      annee: 2022,
      immatriculation: "ABC-1234",
      icon: "directions_car" // 🚗 Icône pour voiture standard
    },
    {
      marque: "Peugeot",
      categorie: "Citadine",
      annee: 2018,
      immatriculation: "XYZ-5678",
      icon: "commute" // 🚖 Icône pour véhicule de ville
    },
    {
      marque: "Mercedes",
      categorie: "Berline",
      annee: 2020,
      immatriculation: "MER-4567",
      icon: "time_to_leave" // 🚙 Icône pour berline
    },
    {
      marque: "Ford",
      categorie: "Pick-up",
      annee: 2021,
      immatriculation: "FOR-7890",
      icon: "local_shipping" // 🚛 Icône pour véhicule utilitaire
    },
    {
      marque: "Yamaha",
      categorie: "Moto",
      annee: 2019,
      immatriculation: "MOT-1122",
      icon: "two_wheeler" // 🏍️ Icône pour moto
    }
  ];

  typeEntretiens: any[] = [
    {
      idTypeEntretien: 1,
      libelle: "Vidange",
      description: "Remplacement de l'huile moteur et du filtre à huile",
      categorie: "Révision et Entretien",
      idSpecialisation: 101,
      prix: "50 000 Ariary",
      icon: "build" // 🛠️ Icône pour l'entretien
    },
    {
      idTypeEntretien: 2,
      libelle: "Changement de freins",
      description: "Remplacement des plaquettes et disques de frein",
      categorie: "Réparation Mécanique",
      idSpecialisation: 102,
      prix: "80 000 Ariary",
      icon: "car_repair" // 🚗 Réparation véhicule
    },
    {
      idTypeEntretien: 3,
      libelle: "Diagnostic électronique",
      description: "Analyse des erreurs et diagnostic moteur",
      categorie: "Diagnostic et Contrôle",
      idSpecialisation: 103,
      prix: "60 000 Ariary",
      icon: "memory" // 💾 Pour électronique
    },
    {
      idTypeEntretien: 4,
      libelle: "Équilibrage des pneus",
      description: "Correction de l'équilibrage des roues",
      categorie: "Pneumatiques et Équilibrage",
      idSpecialisation: 104,
      prix: "40 000 Ariary",
      icon: "sync" // 🔄 Équilibrage
    },
    {
      idTypeEntretien: 5,
      libelle: "Recharge climatisation",
      description: "Recharge et contrôle des fuites de climatisation",
      categorie: "Climatisation et Électricité",
      idSpecialisation: 105,
      prix: "70 000 Ariary",
      icon: "ac_unit" // ❄️ Climatisation
    }
  ];

  steps = [
    { icon: 'work', tooltip: 'Étape 1: Choisir le service' },
    { icon: 'directions_car', tooltip: 'Étape 2: Choisir le véhicule' },
    { icon: 'build', tooltip: 'Étape 3: Choisir le type d\'entretien' },
    { icon: 'check_circle', tooltip: 'Étape 4: Confirmer service' }
  ];

  get currentStep(): number {
    if (!this.selectedCategorieEntretien) return 0;
    if (!this.selectedVehicule) return 1;
    if (!this.typeEntretiens.filter(entretien => entretien.selected)) return 2;
    return 3;
  }

  getStepTitle(): string {
    if (!this.selectedCategorieEntretien) return 'Veuillez sélectionner le type de service dont vous avez besoin :';
    if (!this.selectedVehicule) return 'Choisissez votre véhicule :';
    if (!this.typeEntretiens.filter(entretien => entretien.selected)) return 'Veuillez sélectionner les entretiens ou réparations souhaités :';
    return 'Confirmez votre panier';
  }

  dateFilter = (date: Date | null): boolean => {
    if (!date) return true;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) {
      return false;
    }
    for (let disabledDate of this.disabledDates) {
      const disabledDateWithoutTime = new Date(disabledDate.setHours(0, 0, 0, 0));
      if (date.getTime() === disabledDateWithoutTime.getTime()) {
        return false;
      }
    }
    return true;
  };

}
