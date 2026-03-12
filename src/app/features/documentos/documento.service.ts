import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Documento,
  DocumentoFiltros,
  DocumentoPreview,
  DocumentoUploadMetadata,
  PaginaResponse,
  SeccionTematica,
} from './documento.model';

const API = `${environment.apiUrl}/api/v1`;

export interface DocumentoListParams {
  filtros?: DocumentoFiltros;
  page?: number;
  size?: number;
  sort?: string;
}

@Injectable({ providedIn: 'root' })
export class DocumentoService {
  private readonly http = inject(HttpClient);

  /** GET /api/v1/documentos — listado paginado con filtros y ordenación */
  getDocumentos(params: DocumentoListParams = {}): Observable<PaginaResponse<Documento>> {
    let httpParams = new HttpParams()
      .set('page', params.page ?? 0)
      .set('size', params.size ?? 10)
      .set('sort', params.sort ?? 'fechaSubida,desc');

    const filtro = params.filtros ?? {};
    if (filtro.nombre)     httpParams = httpParams.append('nombre', filtro.nombre);
    if (filtro.seccionId)  httpParams = httpParams.append('seccionId', filtro.seccionId.toString());
    if (filtro.subidoPor)  httpParams = httpParams.append('subidoPor', filtro.subidoPor);
    if (filtro.estado)     httpParams = httpParams.append('estado', filtro.estado);
    if (filtro.fechaDesde) httpParams = httpParams.append('fechaDesde', filtro.fechaDesde);
    if (filtro.fechaHasta) httpParams = httpParams.append('fechaHasta', filtro.fechaHasta);

    return this.http.get<PaginaResponse<Documento>>(`${API}/documentos`, { params: httpParams });
  }

  /** POST /api/v1/documentos/upload — subida multipart (file + metadata JSON) */
  uploadDocumento(file: File, metadata: DocumentoUploadMetadata): Observable<Documento> {
    const form = new FormData();
    form.append('file', file);
    form.append('metadata', JSON.stringify(metadata));
    return this.http.post<Documento>(`${API}/documentos/upload`, form);
  }

  /** GET /api/v1/documentos/:id — detalle (solo metadatos) */
  getDocumento(id: number): Observable<Documento> {
    return this.http.get<Documento>(`${API}/documentos/${id}`);
  }

  /** GET /api/v1/documentos/:id/download — descarga del PDF original */
  downloadDocumento(id: number): Observable<Blob> {
    return this.http.get(`${API}/documentos/${id}/download`, { responseType: 'blob' });
  }

  /** GET /api/v1/documentos/:id/preview — base64 del PDF para iframe inline */
  previewDocumento(id: number): Observable<DocumentoPreview> {
    return this.http.get<DocumentoPreview>(`${API}/documentos/${id}/preview`);
  }

  /** DELETE /api/v1/documentos/:id — borrado lógico (estado → ELIMINADO) */
  deleteDocumento(id: number): Observable<void> {
    return this.http.delete<void>(`${API}/documentos/${id}`);
  }

  /** GET /api/v1/secciones-tematicas — listado completo para filtros */
  getSeccionesTematicas(): Observable<SeccionTematica[]> {
    return this.http.get<SeccionTematica[]>(`${API}/secciones-tematicas`);
  }
}
