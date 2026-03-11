import { Component, input, output, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ddoc-info',
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
  filtroEstado = input.required<string>();

  filtroEstadoChange = output<string>();

  // Para escoger el tipo de chunk por estado
  onFiltroEstadoChange(event: Event) {
    const target = event.target as HTMLSelectElement | null;
    if (target) {
      this.filtroEstadoChange.emit(target.value);
    }
  }

  irABuscador() {
    this.router.navigate(['/chunks/searcher']);
  }
}
