import { Injectable, inject, signal, computed, effect } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap, finalize } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ConversacionDTO, ConversacionDetailDTO, ConversacionCreateBody,
  PreguntaBody, PreguntaResponseDTO, MensajeDTO, PaginaResponse,
  ConversacionListParams, MensajesListParams, SeccionTematica
} from './conversacion-model';

const API = `${environment.apiUrl}/api/v1`;

@Injectable({ providedIn: 'root' })
export class ConversacionService {
  private readonly http = inject(HttpClient);

  // ── Loading signals ───────────────────────────────────────────────────────
  private readonly _loadingConversaciones  = signal(false);
  private readonly _loadingDetalle         = signal(false);
  private readonly _loadingMensajes        = signal(false);
  private readonly _loadingPregunta        = signal(false);
  private readonly _loadingAccion          = signal(false); // archivar / eliminar

  readonly loadingConversaciones  = this._loadingConversaciones.asReadonly();
  readonly loadingDetalle         = this._loadingDetalle.asReadonly();
  readonly loadingMensajes        = this._loadingMensajes.asReadonly();
  readonly loadingPregunta        = this._loadingPregunta.asReadonly();
  readonly loadingAccion          = this._loadingAccion.asReadonly();

  /** true si cualquier operación está en curso */
  readonly loading = computed(() =>
    this._loadingConversaciones() ||
    this._loadingDetalle()        ||
    this._loadingMensajes()       ||
    this._loadingPregunta()       ||
    this._loadingAccion()
  );

  // ── POST /api/v1/conversaciones ───────────────────────────────────────────
  /**
   * Crea una conversación para el usuario autenticado.
   * El backend resuelve el usuario via Principal.
   * Body: { seccionTematica }
   * Responde: ConversacionDetailDTO (201 Created)
   */
  crearConversacion(seccionTematica: SeccionTematica): Observable<ConversacionDetailDTO> {
    const body: ConversacionCreateBody = { seccionTematica };
    this._loadingAccion.set(true);
    return this.http.post<ConversacionDetailDTO>(`${API}/conversaciones`, body).pipe(
      finalize(() => this._loadingAccion.set(false))
    );
  }

  // ── GET /api/v1/conversaciones ────────────────────────────────────────────
  /**
   * Lista conversaciones paginadas del usuario autenticado.
   * Params opcionales: seccion, estado, page, size, sort
   * Responde: Page<ConversacionResponseDTO>
   */
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

  // ── GET /api/v1/conversaciones/:id ────────────────────────────────────────
  /**
   * Detalle de una conversación con todos sus mensajes.
   * Responde: ConversacionDetailDTO
   */
  getConversacion(id: number): Observable<ConversacionDetailDTO> {
    this._loadingDetalle.set(true);
    return this.http.get<ConversacionDetailDTO>(`${API}/conversaciones/${id}`).pipe(
      finalize(() => this._loadingDetalle.set(false))
    );
  }

  // ── DELETE /api/v1/conversaciones/:id ─────────────────────────────────────
  /**
   * Elimina la conversación.
   * Responde: 204 No Content si OK, 404 si no existe.
   */
  eliminarConversacion(id: number): Observable<void> {
    this._loadingAccion.set(true);
    return this.http.delete<void>(`${API}/conversaciones/${id}`).pipe(
      finalize(() => this._loadingAccion.set(false))
    );
  }

  // ── PATCH /api/v1/conversaciones/:id/archivar ─────────────────────────────
  /**
   * Cambia el estado a ARCHIVADA.
   * Responde: ConversacionDetailDTO actualizado, o 404.
   */
  archivarConversacion(id: number): Observable<ConversacionDetailDTO> {
    this._loadingAccion.set(true);
    return this.http.patch<ConversacionDetailDTO>(`${API}/conversaciones/${id}/archivar`, {}).pipe(
      finalize(() => this._loadingAccion.set(false))
    );
  }

  // ── POST /api/v1/conversaciones/:id/preguntas ─────────────────────────────
  /**
   * Envía una pregunta al RAG.
   * Body: { "texto": "..." }  ← el controller lee body.get("texto")
   * Responde: MensajeDTO con la respuesta generada y los chunks usados.
   */
  enviarPregunta(conversacionId: number, texto: string): Observable<MensajeDTO> {
    const body: PreguntaBody = { texto };
    this._loadingPregunta.set(true);
    return this.http.post<MensajeDTO>(`${API}/conversaciones/${conversacionId}/preguntas`, body).pipe(
      finalize(() => this._loadingPregunta.set(false))
    );
  }

  // ── GET /api/v1/conversaciones/:id/mensajes ───────────────────────────────
  /**
   * Mensajes paginados de una conversación, ordenados cronológicamente.
   * Responde: Page<MensajeDTO>
   */
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

  constructor(private conversacionService: ConversacionService) {
  effect(() => console.log('loading:', this.conversacionService.loading()));
}

ngOnInit() {
  this.conversacionService.getConversaciones().subscribe({
    next: data => console.log('respuesta:', data),
    error: err => console.error('error:', err)
  });
}
}