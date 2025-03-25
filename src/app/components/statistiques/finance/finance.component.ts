import {AfterViewInit, Component, OnInit} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

Chart.register(...registerables);

@Component({
  selector: 'app-finance',
  imports: [CommonModule, FormsModule],
  templateUrl: './finance.component.html',
  styleUrl: './finance.component.css'
})
export class FinanceComponent implements AfterViewInit {
  selectedPeriod: string = 'Annuel';
  chart: any;

  constructor() {}

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

  changeFilter(event: Event) {
    this.selectedPeriod = (event.target as HTMLSelectElement).value;
    this.createChart();
  }

  createChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    const labels: string[] = this.getLabelsForPeriod();
    const data: number[] = this.getDataForPeriod();

    this.chart = new Chart('revenueChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Chiffre d\'affaires',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
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

  // Méthode appelée lors du redimensionnement de la fenêtre
  onResize() {
    if (this.chart) {
      this.chart.resize(); // Redimensionner le graphique
    }
  }

  getLabelsForPeriod(): string[] {
    switch (this.selectedPeriod) {
      case 'Annuel':
        return ['2025', '2024'];
      case 'Mensuel':
        return ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'];
      case 'Journalier':
        return ['01', '02', '03', '04', '05', '06'];
      default:
        return [];
    }
  }

  getDataForPeriod(): number[] {
    switch (this.selectedPeriod) {
      case 'Annuel':
        return [120000, 115000];
      case 'Mensuel':
        return [12000, 15000, 11000, 18000, 20000, 22000];
      case 'Journalier':
        return [400, 500, 450, 600, 650, 700];
      default:
        return [];
    }
  }
}
