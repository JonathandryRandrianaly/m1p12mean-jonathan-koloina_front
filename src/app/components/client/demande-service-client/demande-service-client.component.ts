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
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDialog, MatDialogContent} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ApiService} from '../../../services/api/api.service';
import {AuthService} from '../../../services/auth/auth-service.service';

@Component({
  selector: 'app-demande-service-client',
  imports: [ReactiveFormsModule, FormsModule, LoaderComponent,
    MatPaginatorModule, CommonModule, MatButtonModule, MatMenuModule, MatIconModule
    , MatTableModule, MatChipsModule,
    MatTooltipModule, MatFormFieldModule, MatInputModule, MatDatepickerModule
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
  userConnected: string|null = null;

  services: any[] = [];

  disabledDates: Date[] = [
    new Date(2025, 2, 15),
    new Date(2025, 2, 21),
    new Date(2025, 2, 16)
  ];

  vehicles: any = [];
  currentStep : number = 0;

  typeEntretiens: any[] = [];

  steps = [
    { icon: 'directions_car', tooltip: 'Étape 1: Choisir le véhicule' },
    { icon: 'work', tooltip: 'Étape 2: Choisir le service' },
    { icon: 'build', tooltip: 'Étape 3: Choisir le type d\'entretien' },
    { icon: 'check_circle', tooltip: 'Étape 4: Confirmer service' }
  ];

  entretien_form: any;

  constructor(private fb: FormBuilder,private dialog: MatDialog, private router: Router, private apiService: ApiService
  ,private authService: AuthService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.authService.getConnectedUser().then(user => {
      this.userConnected = user;
      this.loadVehicules();
    });
    this.loadCategorieEntretien();
    this.loadDisabledDate();
    this.entretien_form = this.fb.group({
      vehicule: ['', Validators.required],
      categorieModele: ['', Validators.required],
      typeEntretien: this.fb.array([]),
      date: ['', Validators.required]
    });
  }

  navigate(nav : string){
    this.router.navigate([nav]);
  }

  onSubmit(): void {
      let date = new Date(this.entretien_form.value.date);
      let dateUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
      const formData = {
        date: dateUTC.toISOString(),
        vehiculeId: this.entretien_form.value.vehicule,
        typeEntretiens: this.entretien_form.value.typeEntretien
      };
      this.apiService.insert('api/entretien/demande-service',formData).then(
        (response) => {
        },
        (error) => {
          this.loader = false;
          console.error('Erreur lors de l\'insertion :', error);
        }
      );
      this.currentStep = 4;
  }

  selectVehicle(vehicle: any) {
    this.selectedVehicule = vehicle._id;
    this.entretien_form.patchValue({
      vehicule: vehicle._id,
      categorieModele: vehicle.modele.categorie
    });
  this.currentStep = 1;
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

  loadDisabledDate() {
    this.apiService.getAll('api/date-occupe').then(
      (response) => {
        if (response?.dateDisabled) {
          this.disabledDates = response.dateDisabled.map((d: { date: string }) => new Date(d.date));
        }
      },
      (error) => {
        console.error('Erreur lors du chargement des dates :', error);
      }
    );
  }

  selectCategorieEntretien(categorieId: string) {
    this.selectedCategorieEntretien = categorieId;
    this.loadTypeEntretien();
    this.currentStep = 2;
  }

  loadTypeEntretien() {
    this.apiService.getWithData('api/type-entretiens/categories', {
      categorieId: this.selectedCategorieEntretien,
      categorieModeleId: this.entretien_form.value.categorieModele,
    }).then(
      (response) => {
        this.typeEntretiens = response;
        this.loader = false;
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Erreur lors de loadTypeEntretien :', error);
      }
    );
  }

  loadVehicules() {
    this.loader = true;
    this.apiService.getWithData(`api/vehicules/${this.userConnected}`, {}).then(
      (response) => {
        this.loader = false;
        this.vehicles = response;
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Erreur lors de loadTypeEntretien :', error);
        this.loader = false;
      }
    );
  }

  getStepTitle(): string {
    if (this.currentStep==0) return 'Choisissez votre véhicule :';
    if (this.currentStep==1) return 'Veuillez sélectionner le type de service dont vous avez besoin :';
    if (this.currentStep==2) return 'Veuillez sélectionner les entretiens ou réparations souhaités :';
    if (this.currentStep==3) return 'Spécifiez la date du rendez-vous :';
    if (this.currentStep==4) return 'Confirmez le panier :';
    return '';
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

  get typeEntretien(): FormArray {
    return this.entretien_form.get('typeEntretien') as FormArray;
  }

  isChecked(entretienId: string): boolean {
    const formArray: FormArray = this.entretien_form.get('typeEntretien') as FormArray;
    return formArray.value.includes(entretienId);
  }

  onCardClick(entretienId: string): void {
    const formArray: FormArray = this.entretien_form.get('typeEntretien') as FormArray;
    if (!formArray.value.includes(entretienId)) {
      formArray.push(this.fb.control(entretienId));
    } else {
      const index = formArray.controls.findIndex(ctrl => ctrl.value === entretienId);
      if (index >= 0) {
        formArray.removeAt(index);
      }
    }
  }

  onCheckboxChange(event: any, entretienId: string): void {
    const checkbox = event.target as HTMLInputElement;
    const formArray: FormArray = this.entretien_form.get('typeEntretien') as FormArray;

    if (checkbox.checked) {
      if (!formArray.value.includes(entretienId)) {
        formArray.push(this.fb.control(entretienId));
      }
    } else {
      const index = formArray.controls.findIndex(ctrl => ctrl.value === entretienId);
      if (index >= 0) {
        formArray.removeAt(index);
      }
    }
  }

  changeStep(index: number): void {
    if(index<this.currentStep){
      this.currentStep = index;
    }
  }

  anotherService(){
    this.currentStep = 1;
    this.selectedCategorieEntretien='';
    this.typeEntretien.clear();
    this.entretien_form.reset({
      vehicule: this.entretien_form.value.vehicule,
      categorieModele: this.entretien_form.value.categorieModele,
      date: this.entretien_form.value.date,
      typeEntretien: []
    });
  }

  chooseVehicle(){
    this.currentStep = 0;
    this.selectedVehicule='';
    this.selectedCategorieEntretien='';
    this.typeEntretien.clear();
    this.entretien_form.reset({
      date: this.entretien_form.value.date,
      typeEntretien: []
    });
  }

  rendezvous(){
    this.router.navigate(['/rendez-vous']);
  }

}
