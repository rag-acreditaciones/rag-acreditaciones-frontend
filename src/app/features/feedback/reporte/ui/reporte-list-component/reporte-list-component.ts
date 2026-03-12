import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ReporteService } from '../../data-access/reporte-service';
import { Reporte } from '../../interfaces/reporte';

@Component({
  standalone: true,
  selector: 'app-reporte-list-component',
  imports: [CommonModule],
  templateUrl: './reporte-list-component.html',
  styleUrl: './reporte-list-component.css',
})
export class ReporteListComponent implements OnInit {
  private readonly reporteService = inject(ReporteService);

  readonly reportes = this.reporteService.reportes;
  readonly totalPages = this.reporteService.totalPages;
  readonly totalElements = this.reporteService.totalElements;
  readonly loading = this.reporteService.loading;
  readonly error = this.reporteService.error;

  readonly pageSize = 10;
  currentPage = 0;

  ngOnInit(): void {
    this.cargarPagina(0);
  }

  marcarComo(id: number, estado: 'REVISADO' | 'DESCARTADO'): void {
    this.reporteService.updateReporte(id, estado);
  }

  irAnterior(): void {
    if (!this.puedeIrAnterior()) {
      return;
    }

    this.cargarPagina(this.currentPage - 1);
  }

  irSiguiente(): void {
    if (!this.puedeIrSiguiente()) {
      return;
    }

    this.cargarPagina(this.currentPage + 1);
  }

  paginaActual(): number {
    return this.totalPages() === 0 ? 0 : this.currentPage + 1;
  }

  puedeIrAnterior(): boolean {
    return this.currentPage > 0 && !this.loading();
  }

  puedeIrSiguiente(): boolean {
    return this.currentPage + 1 < this.totalPages() && !this.loading();
  }

  trackById(_index: number, reporte: Reporte): number {
    return reporte.id;
  }

  private cargarPagina(page: number): void {
    this.currentPage = page;
    this.reporteService.readReportesWithPagination(page, this.pageSize);
  }
}
