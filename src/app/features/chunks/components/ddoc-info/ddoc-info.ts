import { Component, input, output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ChunkEstado } from '../../interfaces/chunk-estado';

@Component({
  selector: 'app-ddoc-info',
  standalone: true,
  imports: [],
  templateUrl: './ddoc-info.html',
  styleUrl: './ddoc-info.css',
})
export class DdocInfo {
  private readonly router = inject(Router);

  nombreDocumento = input.required<string>();
  stats = input.required<{
    total: number;
    revisados: number;
    pendientes: number;
    descartados: number;
  }>();
  filtroEstado = input.required<ChunkEstado | 'TODOS'>();

  filtroEstadoChange = output<ChunkEstado | 'TODOS'>();

  // Para escoger el tipo de chunk por estado
  onFiltroEstadoChange(event: Event) {
    const target = event.target as HTMLSelectElement | null;
    if (target) {
      this.filtroEstadoChange.emit((target.value as ChunkEstado | 'TODOS') || 'TODOS');
    }
  }

  irABuscador() {
    this.router.navigate(['/chunks/searcher']);
  }
}
