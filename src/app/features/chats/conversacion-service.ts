import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { 
  ConversacionDTO, ConversacionDetailDTO, ConversacionCreateBody,
  PreguntaBody, PreguntaResponseDTO, MensajeDTO, PaginaResponse,
  ConversacionListParams, MensajesListParams, SeccionTematica, EstadoConversacion
} from './conversacion-model';

const API = `${environment.apiUrl}/api/v1`;

 
// ─────────────────────────────────────────────────────────────────────────────
//  SERVICE
// ─────────────────────────────────────────────────────────────────────────────
 
@Injectable({ providedIn: 'root' })
export class ConversacionService {
  private readonly http = inject(HttpClient);
 
  // ── POST /api/v1/conversaciones ───────────────────────────────────────────
  /**
   * Crea una conversación para el usuario autenticado.
   * El backend resuelve el usuario via Principal; no se envía usuarioId.
   * El título será null hasta que se envíe el primer mensaje.
   */
  crearConversacion(seccionTematica: SeccionTematica): Observable<ConversacionDTO> {
    const body: ConversacionCreateBody = { seccionTematica };
    return this.http.post<ConversacionDTO>(`${API}/conversaciones`, body);
  }
 
  // ── GET /api/v1/conversaciones ────────────────────────────────────────────
  /**
   * Lista conversaciones paginadas del usuario autenticado.
   * No se pasa usuarioId: el backend lo extrae del Principal.
   */
  getConversaciones(params: ConversacionListParams = {}): Observable<PaginaResponse<ConversacionDTO>> {
    let httpParams = new HttpParams()
      .set('page', params.page ?? 0)
      .set('size', params.size ?? 10)
      .set('sort', params.sort ?? 'fechaCreacion,desc');
 
    if (params.seccion) httpParams = httpParams.set('seccion', params.seccion);
    if (params.estado)  httpParams = httpParams.set('estado',  params.estado);
 
    return this.http.get<PaginaResponse<ConversacionDTO>>(`${API}/conversaciones`, { params: httpParams });
  }
 
  // ── GET /api/v1/conversaciones/:id ────────────────────────────────────────
  /**
   * Detalle de una conversación con todos sus mensajes.
   * El backend verifica que pertenece al usuario autenticado.
   */
  getConversacion(id: number): Observable<ConversacionDetailDTO> {
    return this.http.get<ConversacionDetailDTO>(`${API}/conversaciones/${id}`);
  }
 
  // ── DELETE /api/v1/conversaciones/:id ─────────────────────────────────────
  /** Elimina la conversación. No se envía usuarioId; lo resuelve el Principal. */
  eliminarConversacion(id: number): Observable<void> {
    return this.http.delete<void>(`${API}/conversaciones/${id}`);
  }
 
  // ── PATCH /api/v1/conversaciones/:id/archivar ─────────────────────────────
  /**
   * Cambia el estado a ARCHIVADA.
   * Una conversación archivada no admite nuevas preguntas.
   */
  archivarConversacion(id: number): Observable<ConversacionDTO> {
    return this.http.patch<ConversacionDTO>(`${API}/conversaciones/${id}/archivar`, {});
  }
 
  // ── POST /api/v1/conversaciones/:id/preguntas ─────────────────────────────
  /**
   * Envía una pregunta al RAG.
   * Body: { "texto": "..." }  ← campo 'texto', NO 'contenido'
   *
   * El backend:
   *  1. Guarda el Mensaje PREGUNTA
   *  2. Llama a ChatRagService (caja negra)
   *  3. Guarda el Mensaje RESPUESTA con los chunks usados
   *  4. Si es el primer mensaje, genera el título automático (≤ 50 chars)
   */
  enviarPregunta(conversacionId: number, texto: string): Observable<PreguntaResponseDTO> {
    const body: PreguntaBody = { texto };
    return this.http.post<PreguntaResponseDTO>(`${API}/conversaciones/${conversacionId}/preguntas`, body);
  }
 
  // ── GET /api/v1/conversaciones/:id/mensajes ───────────────────────────────
  /**
   * Mensajes paginados de una conversación, ordenados cronológicamente.
   * Útil para cargar el historial en bloques sin traer toda la conversación.
   */
  getMensajes(conversacionId: number, params: MensajesListParams = {}): Observable<PaginaResponse<MensajeDTO>> {
    const httpParams = new HttpParams()
      .set('page', params.page ?? 0)
      .set('size', params.size ?? 20);
 
    return this.http.get<PaginaResponse<MensajeDTO>>(
      `${API}/conversaciones/${conversacionId}/mensajes`,
      { params: httpParams },
    );
  }
}