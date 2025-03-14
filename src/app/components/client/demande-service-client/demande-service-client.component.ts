import {FormArray, FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LoaderComponent} from '../../templates/loader/loader.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatChipsModule} from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDialog, MatDialogContent} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ApiService} from '../../../services/api/api.service';

@Component({
  selector: 'app-demande-service-client',
  imports: [ReactiveFormsModule, FormsModule, LoaderComponent,
    MatPaginatorModule, CommonModule, MatButtonModule, MatMenuModule, MatIconModule
    , MatTableModule, MatChipsModule,
    MatTooltipModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatDialogContent
  ],
  templateUrl: './demande-service-client.component.html',
  styleUrl: './demande-service-client.component.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemandeServiceClientComponent implements OnInit {
  loader : boolean = false;
  selectedCategorieEntretien: string = '';
  selectedVehicule: string = '';

  services: any[] = [];

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

  typeEntretiens: any[] = [];

  steps = [
    { icon: 'directions_car', tooltip: 'Étape 1: Choisir le véhicule' },
    { icon: 'work', tooltip: 'Étape 2: Choisir le service' },
    { icon: 'build', tooltip: 'Étape 3: Choisir le type d\'entretien' },
    { icon: 'check_circle', tooltip: 'Étape 4: Confirmer service' }
  ];

  entretien_form: any;

  constructor(private fb: FormBuilder,private dialog: MatDialog, private router: Router, private apiService: ApiService) {

  }

  ngOnInit() {
    this.loadCategorieEntretien();
    this.entretien_form = this.fb.group({
      vehicule: ['', Validators.required],
      categorieModele: ['', Validators.required],
      typeEntretien: this.fb.array([]),
      date: ['', Validators.required]
    });
  }

  onSubmit(): void {
      console.log('Form Submitted:', this.entretien_form.value);
  }
  loadCategorieEntretien() {
    const statut = 10;
    this.apiService.getWithData(`api/categorie-entretiens/statut/${statut}`, {}).then(
      (response) => {
        this.services = response;
      },
      (error) => {
        console.error('Erreur lors de loadSpecialisations :', error);
      }
    );
  }

  selectCategorieEntretien(categorieId: string) {
    this.selectedCategorieEntretien = categorieId;
    this.loadTypeEntretien();
  }

  loadTypeEntretien() {
    if(this.selectedCategorieEntretien != '') {
      this.apiService.getWithData(`api/type-entretiens/categorie/${this.selectedCategorieEntretien}`, {}).then(
        (response) => {
          this.typeEntretiens = response;
          console.log(this.typeEntretiens);
        },
        (error) => {
          console.error('Erreur lors de loadTypeEntretien :', error);
        }
      );
    }
  }

  get currentStep(): number {
    if (!this.selectedVehicule) return 0;
    if (!this.selectedCategorieEntretien) return 1;
    if (this.typeEntretien.controls.filter(entretien => entretien.value)) return 2;
    return 3;
  }

  getStepTitle(): string {
    if (!this.selectedCategorieEntretien) return 'Veuillez sélectionner le type de service dont vous avez besoin :';
    if (!this.selectedVehicule) return 'Choisissez votre véhicule :';
    if (!this.typeEntretien.controls.filter(entretien => entretien.value)) return 'Veuillez sélectionner les entretiens ou réparations souhaités :';
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
  // Helper method to get typeEntretien FormArray
  get typeEntretien(): FormArray {
    return this.entretien_form.get('typeEntretien') as FormArray;
  }

  // Handle checkbox change for type entretien selection
  onCheckboxChange(event: any, entretienId: string): void {
    if (event.target.checked) {
      this.typeEntretien.push(this.fb.control(entretienId));
    } else {
      const index = this.typeEntretien.controls.findIndex(x => x.value === entretienId);
      if (index >= 0) {
        this.typeEntretien.removeAt(index);
      }
    }
  }

}
