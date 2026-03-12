import { computed, inject, Injectable, signal } from '@angular/core';
import { Valoracion } from '../interfaces/valoracion';
import { ValoracionResumen } from '../interfaces/valoracion-resumen';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

interface ValoracionState {
  valoraciones: Valoracion[];
  resumen: ValoracionResumen | null;
  loading: boolean;
  error: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ValoracionService {
  private readonly _httpClient = inject(HttpClient);
  private readonly API_URL = environment.apiUrl;

  private _state = signal<ValoracionState>({
    valoraciones: [],
    resumen: null,
    loading: false,
    error: false,
  });

  valoraciones = computed(() => this._state().valoraciones);
  resumen = computed(() => this._state().resumen);
  loading = computed(() => this._state().loading);
  error = computed(() => this._state().error);

  private setValoraciones(valoraciones: Valoracion[]) {
    this._state.update((state) => ({
      ...state,
      valoraciones,
    }));
  }

  private addValoracion(valoracion: Valoracion) {
    this._state.update((state) => ({
      ...state,
      valoraciones: [...state.valoraciones, valoracion],
    }));
  }

  private removeValoracion(id: number) {
    this._state.update((state) => ({
      ...state,
      valoraciones: state.valoraciones.filter((valoracion) => valoracion.id !== id),
    }));
  }

  private setLoading(loading: boolean) {
    this._state.update((state) => ({
      ...state,
      loading,
    }));
  }

  private setError(error: boolean) {
    this._state.update((state) => ({
      ...state,
      error,
    }));
  }

  getValoraciones(mensajeId: number): void {
    this.setLoading(true);
    this.setError(false);

    this._httpClient
      .get<Valoracion[]>(`${this.API_URL}/api/v1/valoraciones/mensaje/${mensajeId}`)
      .subscribe({
        next: (valoraciones) => {
          this.setValoraciones(valoraciones);
          this.setLoading(false);
        },
        error: () => {
          this.setError(true);
          this.setLoading(false);
        },
      });
  }

  createValoracion(valoracion: Omit<Valoracion, 'id' | 'usuarioId' | 'fechaCreacion'>): void {
    this.setLoading(true);
    this.setError(false);

    this._httpClient.post<Valoracion>(`${this.API_URL}/api/v1/valoraciones`, valoracion).subscribe({
      next: (nuevaValoracion) => {
        this.addValoracion(nuevaValoracion);
        this.setLoading(false);
      },
      error: () => {
        this.setError(true);
        this.setLoading(false);
      },
    });
  }

  deleteValoracion(valoracionId: number): void {
    this.setLoading(true);
    this.setError(false);

    this._httpClient.delete<void>(`${this.API_URL}/api/v1/valoraciones/${valoracionId}`).subscribe({
      next: () => {
        this.removeValoracion(valoracionId);
        this.setLoading(false);
      },
      error: () => {
        this.setError(true);
        this.setLoading(false);
      },
    });
  }

  getResumenValoraciones(convId: number): void {
    this.setLoading(true);
    this.setError(false);

    this._httpClient
      .get<ValoracionResumen>(`${this.API_URL}/api/v1/valoraciones/conversacion/${convId}`)
      .subscribe({
        next: (resumen) => {
          this._state.update((state) => ({ ...state, resumen, loading: false }));
        },
        error: () => {
          this.setError(true);
          this.setLoading(false);
        },
      });
  }
}
