import { computed, inject, Injectable, signal } from '@angular/core';
import { TopRespuesta } from '../interfaces/top-respuesta';
import { CalidadResumen } from '../interfaces/calidad-resumen';
import { CalidadPorSeccion } from '../interfaces/calidad-por-seccion';
import { CalidadEvolucion } from '../interfaces/calidad-evolucion';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

interface CalidadState {
  resumen: CalidadResumen | null;
  porSeccion: CalidadPorSeccion[];
  topRespuestas: TopRespuesta[];
  evolucion: CalidadEvolucion[];
  loading: boolean;
  error: boolean;
}

@Injectable({ providedIn: 'root' })
export class CalidadService {
  private readonly _httpClient = inject(HttpClient);
  private readonly API_URL = environment.apiUrl;

  private _state = signal<CalidadState>({
    resumen: null,
    porSeccion: [],
    topRespuestas: [],
    evolucion: [],
    loading: false,
    error: false,
  });

  resumen = computed(() => this._state().resumen);
  porSeccion = computed(() => this._state().porSeccion);
  topRespuestas = computed(() => this._state().topRespuestas);
  evolucion = computed(() => this._state().evolucion);
  loading = computed(() => this._state().loading);
  error = computed(() => this._state().error);

  private setLoading(loading: boolean) {
    this._state.update((state) => ({ ...state, loading }));
  }

  private setError(error: boolean) {
    this._state.update((state) => ({ ...state, error }));
  }

  getResumen(): void {
    this.setLoading(true);
    this.setError(false);

    this._httpClient.get<CalidadResumen>(`${this.API_URL}/api/v1/calidad/resumen`).subscribe({
      next: (resumen) => {
        this._state.update((state) => ({ ...state, resumen, loading: false }));
      },
      error: () => {
        this.setError(true);
        this.setLoading(false);
      },
    });
  }

  getCalidadPorSeccion(): void {
    this.setLoading(true);
    this.setError(false);

    this._httpClient
      .get<CalidadPorSeccion[]>(`${this.API_URL}/api/v1/calidad/por-seccion`)
      .subscribe({
        next: (porSeccion) => {
          this._state.update((state) => ({ ...state, porSeccion, loading: false }));
        },
        error: () => {
          this.setError(true);
          this.setLoading(false);
        },
      });
  }

  getTopRespuestas(tipo: 'MEJOR' | 'PEOR' = 'MEJOR', limit = 10): void {
    this.setLoading(true);
    this.setError(false);

    this._httpClient
      .get<TopRespuesta[]>(`${this.API_URL}/api/v1/calidad/top-respuestas`, {
        params: { tipo, limit },
      })
      .subscribe({
        next: (topRespuestas) => {
          this._state.update((state) => ({ ...state, topRespuestas, loading: false }));
        },
        error: () => {
          this.setError(true);
          this.setLoading(false);
        },
      });
  }

  getEvolucion(
    fechaDesde: string,
    fechaHasta: string,
    agrupacion: 'DIA' | 'SEMANA' | 'MES' = 'MES',
  ): void {
    this.setLoading(true);
    this.setError(false);

    this._httpClient
      .get<CalidadEvolucion[]>(`${this.API_URL}/api/v1/calidad/evolucion`, {
        params: { fechaDesde, fechaHasta, agrupacion },
      })
      .subscribe({
        next: (evolucion) => {
          this._state.update((state) => ({ ...state, evolucion, loading: false }));
        },
        error: () => {
          this.setError(true);
          this.setLoading(false);
        },
      });
  }
}
