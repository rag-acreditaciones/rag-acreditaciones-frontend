import { Component, input, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions, Chart, registerables } from 'chart.js';
import { CantidadesPorEtiqueta } from '../../../interfaces/informe.model';
Chart.register(...registerables);

@Component({
  selector: 'app-bar-chart',
  imports: [BaseChartDirective],
  templateUrl: './bar-chart.html',
  styleUrl: './bar-chart.css',
})
export class BarChart implements OnInit {
  datos  = input.required<CantidadesPorEtiqueta[]>({ alias: 'data' });
  altura = input<number | null>(null, { alias: 'height' });

  barData!: ChartData<'bar'>;
  barOptions!: ChartOptions<'bar'>;

  ngOnInit(): void {
    this.buildChart();
  }

  ngOnChanges(): void {
    this.buildChart();
  }

  private buildChart(): void {
    this.barOptions = {
      responsive: true,
      maintainAspectRatio: this.altura() === null,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: true }
      }
    };

    this.barData = {
      labels: this.datos().map(d => d.etiqueta),
      datasets: [{
        label: 'Valores',
        data: this.datos().map(d => d.cantidad),
        backgroundColor: '#08a5be',
        borderColor: '#0c6c88',
        borderWidth: 1,
        borderRadius: 4,
      }]
    };
  }
}