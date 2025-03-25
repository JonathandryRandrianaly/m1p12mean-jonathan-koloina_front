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

  constructor(private apiService: ApiService) {
    this.loadNombrePersonnel();
    this.loadNombreClient();
    this.loadNombreTotalRdv();
    this.loadNombreMoyenRdvJour();
    this.loadNombreMoyenRdvMois();
    this.loadEntretiensByCategorie();
  }

  ngAfterViewInit() {
    this.createCategorieChart();
    window.addEventListener('resize', this.onResize.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.onResize.bind(this));
    if (this.categorieChart) {
      this.categorieChart.destroy();
    }
  }

  onResize() {
    if (this.categorieChart) {
      this.categorieChart.resize();
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

  onFilterChange() {
    if(this.selectedMonth){
      let value: any;
      value= this.selectedMonth.split('-');
      this.selectedMonth = value[1];
      this.selectedYear = value[0];
    }
    this.loadEntretiensByCategorie();
  }

}
