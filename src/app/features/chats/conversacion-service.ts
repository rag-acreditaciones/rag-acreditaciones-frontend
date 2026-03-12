import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ConversacionDTO, ConversacionDetailDTO, ConversacionCreateBody,
  PreguntaBody, MensajeDTO, PaginaResponse,
  ConversacionListParams, MensajesListParams, SeccionTematica
} from './conversacion-model';

const API = `${environment.apiUrl}/api/v1`;

@Injectable({ providedIn: 'root' })
export class ConversacionService {
  private readonly http = inject(HttpClient);

  private readonly _loadingConversaciones = signal(false);
  private readonly _loadingDetalle        = signal(false);
  private readonly _loadingMensajes       = signal(false);
  private readonly _loadingPregunta       = signal(false);
  private readonly _loadingAccion         = signal(false);

  readonly loadingConversaciones = this._loadingConversaciones.asReadonly();
  readonly loadingDetalle        = this._loadingDetalle.asReadonly();
  readonly loadingMensajes       = this._loadingMensajes.asReadonly();
  readonly loadingPregunta       = this._loadingPregunta.asReadonly();
  readonly loadingAccion         = this._loadingAccion.asReadonly();

  readonly loading = computed(() =>
    this._loadingConversaciones() ||
    this._loadingDetalle()        ||
    this._loadingMensajes()       ||
    this._loadingPregunta()       ||
    this._loadingAccion()
  );

  crearConversacion(seccionTematica: SeccionTematica): Observable<ConversacionDetailDTO> {
    const body: ConversacionCreateBody = { seccionTematica };
    this._loadingAccion.set(true);
    return this.http.post<ConversacionDetailDTO>(`${API}/conversaciones`, body).pipe(
      finalize(() => this._loadingAccion.set(false))
    );
  }

  getConversaciones(params: ConversacionListParams = {}): Observable<PaginaResponse<ConversacionDTO>> {
    let httpParams = new HttpParams()
      .set('page', params.page ?? 0)
      .set('size', params.size ?? 10)
      .set('sort', params.sort ?? 'fechaCreacion,desc');

    if (params.seccion) httpParams = httpParams.set('seccion', params.seccion);
    if (params.estado)  httpParams = httpParams.set('estado',  params.estado);

    this._loadingConversaciones.set(true);
    return this.http.get<PaginaResponse<ConversacionDTO>>(`${API}/conversaciones`, { params: httpParams }).pipe(
      finalize(() => this._loadingConversaciones.set(false))
    );
  }

  getConversacion(id: number): Observable<ConversacionDetailDTO> {
    this._loadingDetalle.set(true);
    return this.http.get<ConversacionDetailDTO>(`${API}/conversaciones/${id}`).pipe(
      finalize(() => this._loadingDetalle.set(false))
    );
  }

  eliminarConversacion(id: number): Observable<void> {
    this._loadingAccion.set(true);
    return this.http.delete<void>(`${API}/conversaciones/${id}`).pipe(
      finalize(() => this._loadingAccion.set(false))
    );
  }

  archivarConversacion(id: number): Observable<ConversacionDetailDTO> {
    this._loadingAccion.set(true);
    return this.http.patch<ConversacionDetailDTO>(`${API}/conversaciones/${id}/archivar`, {}).pipe(
      finalize(() => this._loadingAccion.set(false))
    );
  }

  enviarPregunta(conversacionId: number, texto: string): Observable<MensajeDTO> {
    const body: PreguntaBody = { texto };
    this._loadingPregunta.set(true);
    return this.http.post<MensajeDTO>(`${API}/conversaciones/${conversacionId}/preguntas`, body).pipe(
      finalize(() => this._loadingPregunta.set(false))
    );
  }

  getMensajes(conversacionId: number, params: MensajesListParams = {}): Observable<PaginaResponse<MensajeDTO>> {
    const httpParams = new HttpParams()
      .set('page', params.page ?? 0)
      .set('size', params.size ?? 20);

    this._loadingMensajes.set(true);
    return this.http.get<PaginaResponse<MensajeDTO>>(
      `${API}/conversaciones/${conversacionId}/mensajes`,
      { params: httpParams }
    ).pipe(
      finalize(() => this._loadingMensajes.set(false))
    );
  }
}