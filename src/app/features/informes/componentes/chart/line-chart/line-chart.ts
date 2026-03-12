import { Component, input, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions, Chart, registerables } from 'chart.js';
import { Evolucion, ActividadDiaria, HorasPunta, CantidadesPorEtiqueta } from '../../../interfaces/informe.model';

Chart.register(...registerables);

@Component({
  selector: 'app-line-chart',
  imports: [BaseChartDirective],
  templateUrl: './line-chart.html',
  styleUrl: './line-chart.css',
})
export class LineChart implements OnInit {
  datos  = input.required<Evolucion[] | ActividadDiaria[] | HorasPunta[]>({alias: 'data'});
  altura = input<number | null>(null, {alias: 'height'});

  lineData!: ChartData<'line'>;
  lineOptions!: ChartOptions<'line'>;

  private normalizar(datos: Evolucion[] | ActividadDiaria[] | HorasPunta[]): CantidadesPorEtiqueta[] {
    return datos.map((d: any) => {
      if ('periodo'  in d) return { etiqueta: d.periodo,       cantidad: d.count     };
      if ('fecha'    in d) return { etiqueta: d.fecha,         cantidad: d.preguntas };
      if ('hora'     in d) return { etiqueta: `${d.hora}:00`,  cantidad: d.preguntas };
      return { etiqueta: '', cantidad: 0 };
    });
  }

  ngOnInit(): void {
    this.buildChart();
  }

  ngOnChanges(): void {
    this.buildChart();
  }

  private buildChart(): void {
    const normalizados = this.normalizar(this.datos());

    this.lineOptions = {
      responsive: true,
      maintainAspectRatio: this.altura() === null,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: true }
      }
    };

    this.lineData = {
      labels: normalizados.map(d => d.etiqueta),
      datasets: [{
        label: 'Valores',
        data: normalizados.map(d => d.cantidad),
        borderColor: '#0c6c88',
        backgroundColor: 'rgba(8, 165, 190, 0.1)',
        fill: true,
        tension: 0.4,
      }]
    };
  }
}