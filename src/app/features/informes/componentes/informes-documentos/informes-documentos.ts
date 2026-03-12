import { Component, inject, signal } from '@angular/core';
import { LineChart } from "../chart/line-chart/line-chart";
import { DoughnutChart } from "../chart/doughnut-chart/doughnut-chart";
import { Evolucion, CantidadesPorEtiqueta } from '../../interfaces/informe.model';
import { evolucionDemoData, documentosSeccionDemoData, documentosEstadoDemoData } from '../../interfaces/informe-demo';
import { DashboardService } from '../../service/servicio-informes';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-informes-documentos',
  imports: [LineChart, DoughnutChart],
  templateUrl: './informes-documentos.html',
  styleUrl: './informes-documentos.css',
})
export class InformesDocumentos {
    private informesService = inject(DashboardService);
    private authService = inject(AuthService);

    documentosSeccion = signal<CantidadesPorEtiqueta[] | []>([]);
    documentosEstado = signal<CantidadesPorEtiqueta[] | []>([]);
    evolucion = signal<Evolucion[] | []>([]);

    ngOnInit(): void {
      if (this.authService.isLoggedIn()) {
        this.informesService.getDocumentosPorSeccion().pipe()
          .subscribe(data => this.documentosSeccion.set(data));
  
        this.informesService.getDocumentosPorEstado().pipe()
          .subscribe(data => this.documentosEstado.set(data));
        
        this.informesService.getDocumentosEvolucion({
          fechaDesde: '2026-01-01',
          fechaHasta: '2026-12-31',
          agrupacion: 'SEMANA'
        }).subscribe(data => this.evolucion.set(data));
      } else{
        this.documentosSeccion.set(documentosSeccionDemoData);
        this.documentosEstado.set(documentosEstadoDemoData);
        this.evolucion.set(evolucionDemoData);
      }
    }
}
