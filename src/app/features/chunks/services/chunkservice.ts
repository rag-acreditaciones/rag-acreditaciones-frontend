import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { inject } from '@angular/core';
import { ChunkSummary } from '../interfaces/chunkSummary';
import { ChunkSearchResult } from '../interfaces/chunkSearchResult';
import { PageResponse } from '../interfaces/pageResponse';
import { ChunksByDocumentoParams } from '../interfaces/chunks-by-documento-params';
import { ChunkEstado } from '../interfaces/chunk-estado';

interface ChunkBuscarItem {
  id: number;
  orden: number;
  truncado100chars: string;
  numTokens: number;
  estado: ChunkEstado;
}

interface ChunkBuscarResponse {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
  content: ChunkBuscarItem[];
}

interface BusquedaSemanticaBody {
  consulta: string;
  topk: number;
}

@Injectable({
  providedIn: 'root',
})
export class ChunkService {
  private readonly apiUrl = '/api/v1/chunks/';
  private readonly http = inject(HttpClient);

  // GET /api/v1/chunks/documento/{docId}?FILTROS
  getChunksByDocumento(
    docId: number,
    filtrosPaginacion: ChunksByDocumentoParams = {},
  ): Observable<PageResponse> {
    /* HttpParams es una forma de introducir parametros en las peticiones al 
    servidor, diferenciar entre la respuesta que es PageResponse y los filtros
    que se envian*/
    let params = new HttpParams();

    if (filtrosPaginacion.estado) {
      params = params.set('estado', filtrosPaginacion.estado);
    }
    if (filtrosPaginacion.page !== undefined) {
      params = params.set('page', filtrosPaginacion.page);
    }
    if (filtrosPaginacion.size !== undefined) {
      params = params.set('size', filtrosPaginacion.size);
    }
    if (filtrosPaginacion.sort) {
      params = params.set('sort', filtrosPaginacion.sort);
    }

    return this.http.get<PageResponse>(`${this.apiUrl}documento/${docId}`, {
      params,
    });
  }

  // GET api/v1/chunks/{id}
  getChunkById(id: number) {
    /*cuando yo hago una peticion al backend en el servicio del front, 
    lo que yo estoy devolviendo en los metodos, por ejemplo getChunkById, 
    es la respuesta que me da el backend*/
    return this.http.get<ChunkSummary>(`${this.apiUrl}${id}`);
  }

  // PATCH api/v1/chunks/{id}/estado
  updateChunkEstado(id: number, estado: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}${id}/estado`, { estado });
  }

  // GET api/v1/chunks/documento/{docId}/stats
  getEstadisticasByDocumento(docId: number) {
    /*Este metodo es para las tarjetas que vienen con estadisticas, no lo tengo muy claro */
    return this.http.get<ChunkSearchResult>(`${this.apiUrl}documento/${docId}/stats`);
  }

  // GET /api/v1/chunks/buscar?texto=...&page=...&size=...
  searchChunksByText(
    texto: string,
    opciones: { page?: number; size?: number; seccionId?: number } = {},
  ): Observable<ChunkBuscarResponse> {
    let params = new HttpParams().set('texto', texto);

    if (opciones.page !== undefined) {
      params = params.set('page', opciones.page);
    }
    if (opciones.size !== undefined) {
      params = params.set('size', opciones.size);
    }
    if (opciones.seccionId !== undefined) {
      params = params.set('seccionId', opciones.seccionId);
    }

    return this.http.get<ChunkBuscarResponse>(`${this.apiUrl}buscar`, { params });
  }

  // POST /api/v1/chunks/busqueda-semantica
  searchChunksSemantica(consulta: string, topk = 5): Observable<ChunkSearchResult[]> {
    const body: BusquedaSemanticaBody = { consulta, topk };

    return this.http
      .post<
        ChunkSearchResult[] | { content: ChunkSearchResult[] }
      >(`${this.apiUrl}busqueda-semantica`, body)
      .pipe(map((resp) => (Array.isArray(resp) ? resp : (resp.content ?? []))));
  }
}
