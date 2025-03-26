import {AfterViewInit, Component, OnInit} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ApiService} from '../../../services/api/api.service';

@Component({
  selector: 'app-personnel-client',
  imports: [CommonModule, FormsModule],
  templateUrl: './personnel-client.component.html',
  styleUrl: './personnel-client.component.css'
})
export class PersonnelClientComponent implements AfterViewInit{
  loader: boolean = false;
  nombrePersonnel: number = 0;
  nombreClient: number = 0;
  nombreTotalRdv: number = 0;
  nombreMoyenRdvJour: number = 0;
  nombreMoyenRdvMois: number = 0;
  categorieLabels: string[] = [];
  categorieChart: any;
  categorieData: number[] = [];
  colors: any[]= [];
  selectedMonth: string = ''; 
  selectedYear: string = '';
  mecanoChart: any;
  mecanoLabels: string[] = [];
  mecanoData: number[] = [];
  selectedMecanoMonth: string = ''; 
  selectedMecanoYear: string = '';

  constructor(private apiService: ApiService) {
   /* const currentYear = new Date().getFullYear();
    this.selectedMecanoYear= currentYear.toString();
    this.selectedYear=currentYear.toString();*/
    this.loadNombrePersonnel();
    this.loadNombreClient();
    this.loadNombreTotalRdv();
    this.loadNombreMoyenRdvJour();
    this.loadNombreMoyenRdvMois();
    this.loadEntretiensByCategorie();
    this.loadEntretiensByMecano();
  }

  ngAfterViewInit() {
    this.createCategorieChart();
    this.createMecanoChart();
    window.addEventListener('resize', this.onResize.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.onResize.bind(this));
    if (this.categorieChart) {
      this.categorieChart.destroy();
    }
    if(this.mecanoChart){
      this.mecanoChart.destroy();
    }
  }

  onResize() {
    if (this.categorieChart) {
      this.categorieChart.resize();
    }
    if(this.mecanoChart){
      this.mecanoChart.resize();
    }
  }

  generateRandomColor(): string {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
  }
  

  loadNombrePersonnel() {
    this.loader = true;
    this.apiService.getAll('api/statistique/nombre-personnel').then(
      (response) => {
        this.nombrePersonnel = response;
        this.loader = false;
      },
      (error) => {
        this.loader = false;
      }
    );
  }

  loadNombreClient() {
    this.loader = true;
    this.apiService.getAll('api/statistique/nombre-client').then(
      (response) => {
        this.nombreClient = response;
        this.loader = false;
      },
      (error) => {
        this.loader = false;
      }
    );
  }

  loadNombreTotalRdv() {
    this.loader = true;
    this.apiService.getAll('api/statistique/nombre-rdv').then(
      (response) => {
        this.nombreTotalRdv = response;
        this.loader = false;
      },
      (error) => {
        this.loader = false;
      }
    );
  }

  loadNombreMoyenRdvJour() {
    this.loader = true;
    this.apiService.getWithData('api/statistique/nombre-moyen-rdv',{type: 'jour'}).then(
      (response) => {
        this.nombreMoyenRdvJour = response;
        this.loader = false;
      },
      (error) => {
        this.loader = false;
      }
    );
  }

  loadNombreMoyenRdvMois() {
    this.loader = true;
    this.apiService.getWithData('api/statistique/nombre-moyen-rdv',{type: 'mois'}).then(
      (response) => {
        this.nombreMoyenRdvMois = response;
        this.loader = false;
      },
      (error) => {
        this.loader = false;
      }
    );
  }

  loadEntretiensByCategorie() {
    this.loader = true;
    this.apiService.getWithData('api/statistique/taux-interventions', {
        mois: this.selectedMonth,
        annee: this.selectedYear,
    }).then(
      (response: any[]) => {
        this.categorieLabels = response.map(item => item._id.categorie);
        this.categorieData = response.map(item => item.taux);
        this.colors = this.categorieLabels.map(() => this.generateRandomColor());
        this.loader = false;
        this.createCategorieChart();
      },
      (error) => {
        this.loader = false;
      }
    );
  }

  createCategorieChart() {
    if (this.categorieChart) {
      this.categorieChart.destroy();
    }

    this.categorieChart = new Chart('categorieChart', {
      type: 'pie',
      data: {
        labels: this.categorieLabels,
        datasets: [{
          label: 'Pourcentage (%)',
          data: this.categorieData,
          backgroundColor: this.colors,
          borderColor: this.colors.map(color => color.replace('rgb', 'rgba').replace(')', ', 1)')),
          hoverBackgroundColor: this.colors,
          hoverBorderColor: this.colors.map(color => color.replace('rgb', 'rgba').replace(')', ', 0.8)')),
          borderWidth: 1,
        }]
      },
    });
  }

  onMonthCategorieChange() {
    this.selectedYear = ''; 
    this.loadEntretiensByCategorie();
  }
  
  onYearCategorieChange() {
    this.selectedMonth = '';
    this.loadEntretiensByCategorie();
  }

  loadEntretiensByMecano() {
    this.loader = true;
    this.apiService.getWithData('api/statistique/interventions-employes', {
      mois: this.selectedMecanoMonth,
      annee: this.selectedMecanoYear,
    }).then(
      (response: any[]) => {
        this.mecanoLabels = response.map(item => item._id);
        this.mecanoData = response.map(item => item.count);
        this.loader = false;
        this.createMecanoChart();
      },
      (error) => {
        this.loader = false;
      }
    );
  }

  createMecanoChart() {
    if (this.mecanoChart) {
      this.mecanoChart.destroy();
    }

    this.mecanoChart = new Chart('mecanoChart', {
      type: 'bar',
      data: {
        labels: this.mecanoLabels,
        datasets: [{
          label: 'Interventions',
          data: this.mecanoData,
          backgroundColor: '#6d7280',
          borderColor: '#6d7280',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  
  onMonthMecanoChange() {
    this.selectedMecanoYear = ''; 
    this.loadEntretiensByMecano();
  }
  
  onYearMecanoChange() {
    this.selectedMecanoMonth = '';
    this.loadEntretiensByMecano();
  }

}
