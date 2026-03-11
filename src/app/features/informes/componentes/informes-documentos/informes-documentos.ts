import { Component, inject, signal } from '@angular/core';
import { LineChart } from "../chart/line-chart/line-chart";
import { DoughnutChart } from "../chart/doughnut-chart/doughnut-chart";
import { Evolucion, CantidadesPorEtiqueta } from '../../interfaces/informe.model';
import { evolucionDemoData, documentosSeccionDemoData, documentosEstadoDemoData } from '../../interfaces/informe-demo';
import { DashboardService } from '../../service/servicio-informes';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-informes-documentos',
  imports: [LineChart, DoughnutChart],
  templateUrl: './informes-documentos.html',
  styleUrl: './informes-documentos.css',
})
export class InformesDocumentos {
    private informesService = inject(DashboardService);

    documentosSeccion = signal<CantidadesPorEtiqueta[] | []>([]);
    documentosEstado = signal<CantidadesPorEtiqueta[] | []>([]);
    evolucion = signal<Evolucion[] | []>([]);

    ngOnInit(): void {
      this.informesService.getDocumentosPorSeccion().pipe()
        .subscribe(data => this.documentosSeccion.set(data));

      this.informesService.getDocumentosPorEstado().pipe()
        .subscribe(data => this.documentosEstado.set(data));
      
      this.informesService.getDocumentosEvolucion({
        fechaDesde: '2026-01-01',
        fechaHasta: '2026-12-31',
        agrupacion: 'SEMANA'
      }).subscribe(data => this.evolucion.set(data));
    }

    documentosSeccionDemo: CantidadesPorEtiqueta[] = documentosSeccionDemoData;
    documentosEstadoDemo: CantidadesPorEtiqueta[] = documentosEstadoDemoData;
    evolucionDemo: Evolucion[] = evolucionDemoData;

}
