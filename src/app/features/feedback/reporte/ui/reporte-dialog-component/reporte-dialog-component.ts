import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReporteService } from '../../data-access/reporte-service';

@Component({
  standalone: true,
  selector: 'app-reporte-dialog-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './reporte-dialog-component.html',
  styleUrl: './reporte-dialog-component.css',
})
export class ReporteDialogComponent {
  @Input({ required: true }) mensajeId!: number;

  private readonly reporteService = inject(ReporteService);

  readonly loading = this.reporteService.loading;
  readonly motivos = [
    'CONTENIDO_INCORRECTO',
    'RESPUESTA_INCOMPLETA',
    'NO_RELACIONADO',
    'OTRO',
  ] as const;

  motivo = '';
  descripcion = '';

  enviarReporte(): void {
    const descripcion = this.descripcion.trim();

    if (!this.motivo || !descripcion) {
      return;
    }

    this.reporteService.createReporte({
      mensajeId: this.mensajeId,
      motivo: this.motivo,
      descripcion,
    });

    this.motivo = '';
    this.descripcion = '';
  }
}
