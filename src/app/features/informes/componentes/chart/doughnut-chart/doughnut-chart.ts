import { Component, input, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions, Chart, registerables } from 'chart.js';
import { CantidadesPorEtiqueta } from '../../../interfaces/informe.model';

Chart.register(...registerables);

@Component({
  selector: 'app-doughnut-chart',
  imports: [BaseChartDirective],
  templateUrl: './doughnut-chart.html',
  styleUrl: './doughnut-chart.css',
})
export class DoughnutChart implements OnInit {
  datos = input.required<CantidadesPorEtiqueta[]>({alias: 'data'});

  // ── PIE CHART — Docs por sección ────────────────
  pieData!: ChartData<'doughnut'>;

  pieOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' }
    }
  };

  ngOnInit(): void {
    this.buildChart();
  }

  ngOnChanges(): void {
    this.buildChart();
  }
  
  private buildChart(): void {
    this.pieData = {
      labels: this.datos().map(d => d.etiqueta),
      datasets: [{
        data: this.datos().map(d => d.cantidad),
        backgroundColor: ['#0e3f57', '#0c6c88', '#08a5be', '#03ecf5'],
      }]
    };
  }
}