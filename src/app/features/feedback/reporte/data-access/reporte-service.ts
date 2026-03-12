import { computed, inject, Injectable, signal } from '@angular/core';
import { Reporte } from '../interfaces/reporte';
import { PaginaResponse } from '../interfaces/pagina-response';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

interface ReporteState {
  reportes: Reporte[];
  totalPages: number;
  totalElements: number;
  loading: boolean;
  error: boolean;
}

@Injectable({ providedIn: 'root' })
export class ReporteService {
  private readonly _httpClient = inject(HttpClient);
  private readonly API_URL = environment.apiUrl;

  private _state = signal<ReporteState>({
    reportes: [],
    totalPages: 0,
    totalElements: 0,
    loading: false,
    error: false,
  });

  reportes = computed(() => this._state().reportes);
  totalPages = computed(() => this._state().totalPages);
  totalElements = computed(() => this._state().totalElements);
  loading = computed(() => this._state().loading);
  error = computed(() => this._state().error);

  private setReportes(pagina: PaginaResponse<Reporte>) {
    this._state.update((state) => ({
      ...state,
      reportes: pagina.content,
      totalPages: pagina.totalPages,
      totalElements: pagina.totalElements,
    }));
  }

  private addReporte(reporte: Reporte) {
    this._state.update((state) => ({
      ...state,
      reportes: [...state.reportes, reporte],
    }));
  }

  private updateReporteState(reporteActualizado: Reporte) {
    this._state.update((state) => ({
      ...state,
      reportes: state.reportes.map((r) =>
        r.id === reporteActualizado.id ? reporteActualizado : r,
      ),
    }));
  }

  private setLoading(loading: boolean) {
    this._state.update((state) => ({ ...state, loading }));
  }

  private setError(error: boolean) {
    this._state.update((state) => ({ ...state, error }));
  }

  createReporte(
    reporte: Omit<Reporte, 'id' | 'usuarioId' | 'usuarioEmail' | 'estado' | 'fechaCreacion'>,
  ): void {
    this.setLoading(true);
    this.setError(false);

    this._httpClient.post<Reporte>(`${this.API_URL}/api/v1/reportes`, reporte).subscribe({
      next: (nuevoReporte) => {
        this.addReporte(nuevoReporte);
        this.setLoading(false);
      },
      error: () => {
        this.setError(true);
        this.setLoading(false);
      },
    });
  }

  readReportesWithPagination(
    page = 0,
    size = 10,
    estado?: string,
    motivo?: string,
    sort = 'fechaCreacion,desc',
  ): void {
    this.setLoading(true);
    this.setError(false);

    let params: Record<string, string | number> = { page, size, sort };
    if (estado) params['estado'] = estado;
    if (motivo) params['motivo'] = motivo;

    this._httpClient
      .get<PaginaResponse<Reporte>>(`${this.API_URL}/api/v1/reportes`, { params })
      .subscribe({
        next: (pagina) => {
          this.setReportes(pagina);
          this.setLoading(false);
        },
        error: () => {
          this.setError(true);
          this.setLoading(false);
        },
      });
  }

  updateReporte(id: number, estado: 'REVISADO' | 'DESCARTADO'): void {
    this.setLoading(true);
    this.setError(false);

    this._httpClient
      .patch<Reporte>(`${this.API_URL}/api/v1/reportes/${id}/estado`, estado)
      .subscribe({
        next: (reporteActualizado) => {
          this.updateReporteState(reporteActualizado);
          this.setLoading(false);
        },
        error: () => {
          this.setError(true);
          this.setLoading(false);
        },
      });
  }
}
