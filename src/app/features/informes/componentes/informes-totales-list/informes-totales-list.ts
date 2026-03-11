import { Component, inject, signal } from '@angular/core';
import { InformesTotalesItem } from "../informes-totales-item/informes-totales-item";
import { InformeTotal } from '../../interfaces/informe.model';
import { DashboardService } from '../../service/servicio-informes';
import { informeTotalDemoData } from '../../interfaces/informe-demo';

@Component({
  selector: 'app-informes-totales-list',
  imports: [InformesTotalesItem],
  templateUrl: './informes-totales-list.html',
  styleUrl: './informes-totales-list.css',
})
export class InformesTotalesList {
  private informesService = inject(DashboardService);

  informeTotal = signal<InformeTotal | null>(null);

  ngOnInit(): void {
    this.informesService.getResumenGlobal().subscribe({
      next: (data) => this.informeTotal.set(data),
      error: (err) => console.error('Error al cargar resumen:', err)
    });
  }
  
  informeTotalDemo: InformeTotal = informeTotalDemoData;
}
