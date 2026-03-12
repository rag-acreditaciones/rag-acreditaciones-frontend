import { CommonModule, DatePipe, PercentPipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { CalidadService } from '../../data-access/calidad-service';

Chart.register(...registerables);

type Periodo = 'ultima-semana' | 'ultimo-mes' | 'ultimo-trimestre';
type TablaTop = 'MEJOR' | 'PEOR';

@Component({
  selector: 'app-calidad-panel-component',
  imports: [CommonModule, FormsModule, PercentPipe],
  templateUrl: './calidad-panel-component.html',
  styleUrl: './calidad-panel-component.css',
})
export class CalidadPanelComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('gaugeCanvas') gaugeCanvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('barCanvas') barCanvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('lineCanvas') lineCanvasRef!: ElementRef<HTMLCanvasElement>;

  private readonly _calidadService = inject(CalidadService);

  resumen = this._calidadService.resumen;
  porSeccion = this._calidadService.porSeccion;
  topRespuestas = this._calidadService.topRespuestas;
  evolucion = this._calidadService.evolucion;
  loading = this._calidadService.loading;
  error = this._calidadService.error;

  tablaTop = signal<TablaTop>('MEJOR');
  selectedPeriodo: Periodo = 'ultima-semana';

  ratioGlobal = computed(() => this.resumen()?.ratioCalidad ?? 0);

  private gaugeChart: Chart | null = null;
  private barChart: Chart | null = null;
  private lineChart: Chart | null = null;

  ngOnInit(): void {
    this._calidadService.getResumen();
    this._calidadService.getCalidadPorSeccion();
    this._calidadService.getTopRespuestas('MEJOR', 10);
    this.loadEvolucion('ultima-semana');
  }

  ngAfterViewInit(): void {
    this.initGaugeChart();
    this.initBarChart();
    this.initLineChart();

    setInterval(() => {
      this.updateGaugeChart();
      this.updateBarChart();
      this.updateLineChart();
    }, 500);
  }

  ngOnDestroy(): void {
    this.gaugeChart?.destroy();
    this.barChart?.destroy();
    this.lineChart?.destroy();
  }

  setTablaTop(tipo: TablaTop): void {
    this.tablaTop.set(tipo);
    this._calidadService.getTopRespuestas(tipo, 10);
  }

  onPeriodoChange(periodo: Periodo): void {
    this.loadEvolucion(periodo);
  }

  private loadEvolucion(periodo: Periodo): void {
    const ahora = new Date();
    const hasta = this.toDateString(ahora);
    let desde: string;

    switch (periodo) {
      case 'ultima-semana':
        desde = this.toDateString(new Date(ahora.getTime() - 7 * 86400000));
        this._calidadService.getEvolucion(desde, hasta, 'DIA');
        break;
      case 'ultimo-mes':
        desde = this.toDateString(new Date(ahora.getTime() - 30 * 86400000));
        this._calidadService.getEvolucion(desde, hasta, 'SEMANA');
        break;
      case 'ultimo-trimestre':
        desde = this.toDateString(new Date(ahora.getTime() - 90 * 86400000));
        this._calidadService.getEvolucion(desde, hasta, 'MES');
        break;
    }
  }

  private toDateString(d: Date): string {
    return d.toISOString().split('T')[0];
  }

  truncate(text: string, maxLen: number): string {
    return text.length > maxLen ? text.substring(0, maxLen) + '…' : text;
  }

  private initGaugeChart(): void {
    if (!this.gaugeCanvasRef) return;
    const ctx = this.gaugeCanvasRef.nativeElement.getContext('2d')!;
    const ratio = this.ratioGlobal();

    this.gaugeChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [ratio * 100, (1 - ratio) * 100],
            backgroundColor: ['#4f8ef7', '#1e2028'],
            borderWidth: 0,
            borderRadius: 4,
          },
        ],
      },
      options: {
        circumference: 180,
        rotation: -90,
        responsive: false,
        cutout: '72%',
        animation: { duration: 800 },
        plugins: { tooltip: { enabled: false }, legend: { display: false } },
      },
    });
  }

  private updateGaugeChart(): void {
    if (!this.gaugeChart) return;
    const ratio = this.ratioGlobal();
    this.gaugeChart.data.datasets[0].data = [ratio * 100, (1 - ratio) * 100];
    this.gaugeChart.update('none');
  }

  private initBarChart(): void {
    if (!this.barCanvasRef) return;
    const ctx = this.barCanvasRef.nativeElement.getContext('2d')!;

    this.barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Ratio',
            data: [],
            backgroundColor: '#4f8ef7',
            borderRadius: 5,
            borderSkipped: false,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 600 },
        scales: {
          x: {
            min: 0,
            max: 100,
            ticks: { color: '#7c8190', font: { size: 10 }, callback: (v) => v + '%' },
            grid: { color: '#2a2d38' },
            border: { display: false },
          },
          y: {
            ticks: { color: '#e8eaf0', font: { size: 11 } },
            grid: { display: false },
            border: { display: false },
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.parsed.x!.toFixed(1)}%`,
            },
          },
        },
      },
    });
  }

  private updateBarChart(): void {
    if (!this.barChart) return;
    const secciones = this.porSeccion();
    if (!secciones.length) return;

    this.barChart.data.labels = secciones.map((s) => s.seccion);
    this.barChart.data.datasets[0].data = secciones.map((s) => s.ratio * 100);
    this.barChart.update('none');
  }

  private initLineChart(): void {
    if (!this.lineCanvasRef) return;
    const ctx = this.lineCanvasRef.nativeElement.getContext('2d')!;

    this.lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Ratio calidad',
            data: [],
            borderColor: '#4f8ef7',
            backgroundColor: 'rgba(79,142,247,0.08)',
            tension: 0.4,
            fill: true,
            pointRadius: 4,
            pointBackgroundColor: '#4f8ef7',
            borderWidth: 2,
          },
          {
            label: 'Positivas',
            data: [],
            borderColor: '#3ecf8e',
            backgroundColor: 'transparent',
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: '#3ecf8e',
            borderWidth: 1.5,
            borderDash: [4, 4],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 600 },
        scales: {
          x: {
            ticks: { color: '#7c8190', font: { size: 10 }, maxTicksLimit: 7 },
            grid: { color: '#2a2d38' },
            border: { display: false },
          },
          y: {
            min: 0,
            max: 100,
            ticks: { color: '#7c8190', font: { size: 10 }, callback: (v) => v + '%' },
            grid: { color: '#2a2d38' },
            border: { display: false },
          },
        },
        plugins: {
          legend: {
            display: true,
            labels: { color: '#7c8190', font: { size: 10 }, boxWidth: 12, usePointStyle: true },
          },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y!.toFixed(1)}%`,
            },
          },
        },
      },
    });
  }

  private updateLineChart(): void {
    if (!this.lineChart) return;
    const evolucion = this.evolucion();
    if (!evolucion.length) return;

    this.lineChart.data.labels = evolucion.map((e) =>
      new Date(e.fecha).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }),
    );
    this.lineChart.data.datasets[0].data = evolucion.map((e) => e.ratio * 100);
    this.lineChart.data.datasets[1].data = evolucion.map((e) =>
      e.positivas + e.negativas > 0 ? (e.positivas / (e.positivas + e.negativas)) * 100 : 0,
    );
    this.lineChart.update('none');
  }
}
