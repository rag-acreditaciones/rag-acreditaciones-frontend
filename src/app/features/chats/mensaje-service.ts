import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  MensajeDTO, PaginaResponse, MensajesListParams, PreguntaBody
} from './conversacion-model';

const API = `${environment.apiUrl}/api/v1`;

@Injectable({ providedIn: 'root' })
export class MensajeService {
  private readonly http = inject(HttpClient);

  private readonly _loadingMensajes  = signal(false);
  private readonly _loadingPregunta  = signal(false);

  readonly loadingMensajes  = this._loadingMensajes.asReadonly();
  readonly loadingPregunta  = this._loadingPregunta.asReadonly();

  // ── POST /api/v1/conversaciones/:id/preguntas ─────────────────────────────
  enviarPregunta(conversacionId: number, texto: string): Observable<MensajeDTO> {
    const body: PreguntaBody = { texto };
    this._loadingPregunta.set(true);
    return this.http.post<MensajeDTO>(
      `${API}/conversaciones/${conversacionId}/preguntas`, body
    ).pipe(
      finalize(() => this._loadingPregunta.set(false))
    );
  }

  // ── GET /api/v1/conversaciones/:id/mensajes ───────────────────────────────
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