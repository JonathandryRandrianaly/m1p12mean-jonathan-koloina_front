import {AfterViewInit, Component, OnInit} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ApiService} from '../../../services/api/api.service';

Chart.register(...registerables);

@Component({
  selector: 'app-finance',
  imports: [CommonModule, FormsModule],
  templateUrl: './finance.component.html',
  styleUrl: './finance.component.css'
})
export class FinanceComponent implements AfterViewInit {
  loader: boolean = false;
  selectedPeriod: string = '0'; // Par défaut, Annuel
  selectedYear: number = new Date().getFullYear();
  exisitingYear: number[] = [];
  chart: any;
  labels: string[] = [];
  data: number[] = [];
  months: string[] = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];

  constructor(private apiService: ApiService) {
    this.loadExisitingYear();
    this.loadData();
  }

  ngAfterViewInit() {
    this.createChart();
    window.addEventListener('resize', this.onResize.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.onResize.bind(this));
    if (this.chart) {
      this.chart.destroy();
    }
  }

  // 🔹 Charger les années existantes
  loadExisitingYear() {
    this.loader = true;
    this.apiService.getAll('api/facture/distinct-year').then(
      (response) => {
        this.exisitingYear = response;
        this.loader = false;
      },
      (error) => {
        this.loader = false;
      }
    );
  }

  loadData() {
    this.loader = true;
    this.apiService.getWithData('api/statistique/finance/evo-ca', {
      type: Number(this.selectedPeriod),
      detailType: this.selectedYear
    }).then(
      (response: any[]) => {
        if(this.selectedPeriod == '0') {
          this.labels = response.map(item => item.periode);
          this.data = response.map(item => item.chiffreAffaires);
        }else{
          this.labels = this.getLabelsForPeriod(response);
          this.data = this.getDataForPeriod(response);
        }
        this.loader = false;
        this.createChart();
      },
      (error) => {
        this.loader = false;
      }
    );
  }

  changeFilter(event: Event) {
    this.selectedPeriod = (event.target as HTMLSelectElement).value;
    if (this.selectedPeriod === '1') {
      this.selectedYear = this.exisitingYear[0] || new Date().getFullYear();
    }
    this.loadData();
  }

  createChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('revenueChart', {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Chiffre d\'affaires',
          data: this.data,
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

  onResize() {
    if (this.chart) {
      this.chart.resize();
    }
  }
  getLabelsForPeriod(response: any[]): string[] {
    return this.months;
  }

  getDataForPeriod(response: any[]): number[] {
    let monthsData = new Array(12).fill(0);
    response.forEach((item) => {
      const monthIndex = item.periode - 1;
      monthsData[monthIndex] = item.chiffreAffaires;
    });

    return monthsData;
  }
}
