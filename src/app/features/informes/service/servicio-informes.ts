import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { 
  ActividadDiaria, 
  ActividadDiariaParams, 
  ActividadReciente, 
  CantidadesPorEtiqueta, 
  DocsEvolucionParams, 
  Evolucion, 
  HorasPunta, 
  InformeTotal, 
  RankingUsuariosParams, 
  UsuarioRanking 
} from '../interfaces/informe.model';

const API = `${environment.apiUrl}/api/v1/dashboard`;

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
  getDocumentosPorSeccion(): Observable<CantidadesPorEtiqueta[]> {
    return this.http.get<any[]>(`${API}/documentos/por-seccion`).pipe(
      map(data => data.map(d => ({ etiqueta: d.etiqueta, cantidad: d.count })))
    );
  }

  /** GET /api/v1/dashboard/documentos/por-estado — distribución docs por estado */
  getDocumentosPorEstado(): Observable<CantidadesPorEtiqueta[]> {
    return this.http.get<any[]>(`${API}/documentos/por-estado`).pipe(
      map(data => data.map(d => ({ etiqueta: d.etiqueta, cantidad: d.count })))
    );
  }

  /**
   * GET /api/v1/dashboard/documentos/evolucion
   * Evolución de subidas en el tiempo (line chart).
   */
  getDocumentosEvolucion(params: DocsEvolucionParams): Observable<Evolucion[]> {
    const httpParams = new HttpParams()
      .set('fechaDesde', params.fechaDesde)
      .set('fechaHasta', params.fechaHasta)
      .set('agrupacion', params.agrupacion ?? 'SEMANA');

    return this.http.get<Evolucion[]>(`${API}/documentos/evolucion`, {
      params: httpParams,
    });
  }

  // ── Chats ────────────────────────────────────────────────────────────────

  /** GET /api/v1/dashboard/chats/por-seccion — conversaciones por sección */
  getChatsPorSeccion(): Observable<CantidadesPorEtiqueta[]> {
    return this.http.get<any[]>(`${API}/chats/por-seccion`).pipe(
      map(data => data.map(d => ({ etiqueta: d.etiqueta, cantidad: d.count })))
    );
  }

  /**
   * GET /api/v1/dashboard/chats/actividad-diaria
   * Preguntas por día en un rango de fechas (line chart).
   */
  getActividadDiaria(params: ActividadDiariaParams): Observable<ActividadDiaria[]> {
    const httpParams = new HttpParams()
      .set('fechaDesde', params.fechaDesde)
      .set('fechaHasta', params.fechaHasta);

    return this.http.get<ActividadDiaria[]>(`${API}/chats/actividad-diaria`, {
      params: httpParams,
    });
  }

  /** GET /api/v1/dashboard/chats/horas-punta — distribución por hora del día */
  getHorasPunta(): Observable<HorasPunta[]> {
    return this.http.get<HorasPunta[]>(`${API}/chats/horas-punta`);
  }

  // ── Usuarios ─────────────────────────────────────────────────────────────

  /**
   * GET /api/v1/dashboard/usuarios/ranking
   * Top usuarios más activos. Por defecto limit=5, criterio=TOTAL.
   */
  getRankingUsuarios(params: RankingUsuariosParams = {}): Observable<UsuarioRanking[]> {
    const httpParams = new HttpParams()
      .set('limit', params.limit ?? 5)
      .set('criterio', params.criterio ?? 'TOTAL');

    return this.http.get<UsuarioRanking[]>(`${API}/usuarios/ranking`, {
      params: httpParams,
    });
  }

  /** GET /api/v1/dashboard/usuarios/por-rol — distribución usuarios por rol */
  getUsuariosPorRol(): Observable<CantidadesPorEtiqueta[]> {
    return this.http.get<any[]>(`${API}/usuarios/por-rol`).pipe(
      map(data => data.map(d => ({ etiqueta: d.etiqueta, cantidad: d.count })))
    );
  }

  // ── Actividad reciente ───────────────────────────────────────────────────

  /** GET /api/v1/dashboard/actividad-reciente — últimas 20 acciones */
  getActividadReciente(): Observable<ActividadReciente[]> {
    return this.http.get<ActividadReciente[]>(`${API}/actividad-reciente`);
  }
}

