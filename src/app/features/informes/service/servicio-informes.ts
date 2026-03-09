import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { InformeTotal } from '../interfaces/informe.model';
const API = `${environment.apiUrl}/api/v1/dashboard`;

// ── DTOs ──────────────────────────────────────────────────────────────────────

export interface DistribucionDTO {
  /** Nombre del grupo (sección, estado, rol…) */
  label: string;
  count: number;
}

export interface EvolucionDTO {
  periodo: string; // "2025-01-15"
  count: number;
}

export type AgrupacionEvolucion = 'DIA' | 'SEMANA';

export interface ActividadDiariaDTO {
  fecha: string; // "2025-03-15"
  preguntas: number;
}

export interface HorasPuntaDTO {
  hora: number; // 0-23
  preguntas: number;
}

export type CriterioRanking = 'DOCS' | 'CHATS' | 'TOTAL';

export interface RankingUsuarioDTO {
  email: string;
  nombre: string;
  docsSubidos: number;
  conversaciones: number;
  total: number;
}

export interface ActividadRecienteDTO {
  usuario: string;
  accion: 'SUBIDA_DOCUMENTO' | 'PREGUNTA_RAG' | 'VALORACION' | 'REPORTE' | string;
  recurso: string;
  fecha: string;
}

export interface DocsEvolucionParams {
  fechaDesde: string;
  fechaHasta: string;
  agrupacion?: AgrupacionEvolucion;
}

export interface ActividadDiariaParams {
  fechaDesde: string;
  fechaHasta: string;
}

export interface RankingUsuariosParams {
  limit?: number;
  criterio?: CriterioRanking;
}

// ── Service ───────────────────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly http = inject(HttpClient);

  // ── Resumen global ───────────────────────────────────────────────────────

  /** GET /api/v1/dashboard/resumen — KPIs globales */
  getResumenGlobal(): Observable<InformeTotal> {
    return this.http.get<InformeTotal>(`${API}/resumen`);
  }

  // ── Documentos ───────────────────────────────────────────────────────────

  /** GET /api/v1/dashboard/documentos/por-seccion — distribución docs por sección */
  getDocumentosPorSeccion(): Observable<DistribucionDTO[]> {
    return this.http.get<DistribucionDTO[]>(`${API}/documentos/por-seccion`);
  }

  /** GET /api/v1/dashboard/documentos/por-estado — distribución docs por estado */
  getDocumentosPorEstado(): Observable<DistribucionDTO[]> {
    return this.http.get<DistribucionDTO[]>(`${API}/documentos/por-estado`);
  }

  /**
   * GET /api/v1/dashboard/documentos/evolucion
   * Evolución de subidas en el tiempo (line chart).
   */
  getDocumentosEvolucion(params: DocsEvolucionParams): Observable<EvolucionDTO[]> {
    const httpParams = new HttpParams()
      .set('fechaDesde', params.fechaDesde)
      .set('fechaHasta', params.fechaHasta)
      .set('agrupacion', params.agrupacion ?? 'SEMANA');

    return this.http.get<EvolucionDTO[]>(`${API}/documentos/evolucion`, {
      params: httpParams,
    });
  }

  // ── Chats ────────────────────────────────────────────────────────────────

  /** GET /api/v1/dashboard/chats/por-seccion — conversaciones por sección */
  getChatsPorSeccion(): Observable<DistribucionDTO[]> {
    return this.http.get<DistribucionDTO[]>(`${API}/chats/por-seccion`);
  }

  /**
   * GET /api/v1/dashboard/chats/actividad-diaria
   * Preguntas por día en un rango de fechas (line chart).
   */
  getActividadDiaria(params: ActividadDiariaParams): Observable<ActividadDiariaDTO[]> {
    const httpParams = new HttpParams()
      .set('fechaDesde', params.fechaDesde)
      .set('fechaHasta', params.fechaHasta);

    return this.http.get<ActividadDiariaDTO[]>(`${API}/chats/actividad-diaria`, {
      params: httpParams,
    });
  }

  /** GET /api/v1/dashboard/chats/horas-punta — distribución por hora del día */
  getHorasPunta(): Observable<HorasPuntaDTO[]> {
    return this.http.get<HorasPuntaDTO[]>(`${API}/chats/horas-punta`);
  }

  // ── Usuarios ─────────────────────────────────────────────────────────────

  /**
   * GET /api/v1/dashboard/usuarios/ranking
   * Top usuarios más activos. Por defecto limit=10, criterio=TOTAL.
   */
  getRankingUsuarios(params: RankingUsuariosParams = {}): Observable<RankingUsuarioDTO[]> {
    const httpParams = new HttpParams()
      .set('limit', params.limit ?? 10)
      .set('criterio', params.criterio ?? 'TOTAL');

    return this.http.get<RankingUsuarioDTO[]>(`${API}/usuarios/ranking`, {
      params: httpParams,
    });
  }

  /** GET /api/v1/dashboard/usuarios/por-rol — distribución usuarios por rol */
  getUsuariosPorRol(): Observable<DistribucionDTO[]> {
    return this.http.get<DistribucionDTO[]>(`${API}/usuarios/por-rol`);
  }

  // ── Actividad reciente ───────────────────────────────────────────────────

  /** GET /api/v1/dashboard/actividad-reciente — últimas 20 acciones */
  getActividadReciente(): Observable<ActividadRecienteDTO[]> {
    return this.http.get<ActividadRecienteDTO[]>(`${API}/actividad-reciente`);
  }
}

