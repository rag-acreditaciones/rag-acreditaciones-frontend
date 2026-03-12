import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { inject } from '@angular/core';
import { ChunkSummary } from '../interfaces/chunkSummary';
import { ChunkSearchResult } from '../interfaces/chunkSearchResult';
import { PageResponse } from '../interfaces/pageResponse';
import { ChunksByDocumentoParams } from '../interfaces/chunks-by-documento-params';
import { ChunkEstado } from '../interfaces/chunk-estado';
import { ChunkStatsResponse } from '../interfaces/chunk-stats';
import { environment } from '../../../../environments/environment';

interface ChunkBuscarItem {
  id: number;
  orden: number;
  texto: string;
  numTokens: number | null;
  estado: ChunkEstado | null;
  similitud: number | null;
  posicionesBusquedaTextual: unknown[];
  documento: unknown;
}

interface ChunkDocumentoApiItem {
  id: number;
  orden: number;
  textoCompleto: string;
  estado: ChunkEstado | null;
  documento: unknown;
}

interface ChunkDocumentoApiPage {
  content: ChunkDocumentoApiItem[];
  page?: number;
  size?: number;
  totalElements?: number;
}

interface ChunkApiItem {
  id: number;
  orden: number;
  textoCompleto: string;
  estado: ChunkEstado | null;
  documento: unknown;
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
  // esto m'ha caniat el copiloto pa que funcione
  private readonly apiUrl = `${environment.apiUrl}/api/v1/chunks/`;
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

    return this.http
      .get<ChunkDocumentoApiItem[] | ChunkDocumentoApiPage>(`${this.apiUrl}documento/${docId}`, {
        params,
      })
      .pipe(
        map((response) => {
          const page = filtrosPaginacion.page ?? 0;
          const size = filtrosPaginacion.size ?? 10;
          const content = Array.isArray(response) ? response : (response.content ?? []);
          const totalElements = Array.isArray(response)
            ? content.length
            : (response.totalElements ?? content.length);
          const mappedContent = (
            Array.isArray(response) ? content.slice(page * size, page * size + size) : content
          ).map((chunk) => this.mapChunkDocumentoItem(chunk));

          return {
            content: mappedContent,
            page: Array.isArray(response) ? page : (response.page ?? page),
            size: Array.isArray(response) ? size : (response.size ?? size),
            totalElements,
          } satisfies PageResponse;
        }),
      );
  }

  // GET api/v1/chunks/{id}
  getChunkById(id: number) {
    /*cuando yo hago una peticion al backend en el servicio del front, 
    lo que yo estoy devolviendo en los metodos, por ejemplo getChunkById, 
    es la respuesta que me da el backend*/
    return this.http
      .get<ChunkApiItem>(`${this.apiUrl}${id}`)
      .pipe(map((chunk) => this.mapChunkApiItem(chunk)));
  }

  // PATCH api/v1/chunks/{id}/estado
  updateChunkEstado(id: number, estado: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}${id}/estado`, { estado });
  }

  // GET api/v1/chunks/documento/{docId}/stats
  getEstadisticasByDocumento(docId: number): Observable<ChunkStatsResponse> {
    return this.http.get<ChunkStatsResponse>(`${this.apiUrl}documento/${docId}/stats`);
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

    return this.http.get<ChunkBuscarItem[]>(`${this.apiUrl}buscar`, { params }).pipe(
      map((items) => ({
        number: 0,
        size: opciones.size ?? 10,
        totalElements: items.length,
        totalPages: Math.ceil(items.length / (opciones.size ?? 10)),
        content: items,
      })),
    );
  }

  // POST /api/v1/chunks/busqueda-semantica
  searchChunksSemantica(consulta: string, topk = 5): Observable<ChunkSearchResult[]> {
    const body: BusquedaSemanticaBody = { consulta, topk };

    return this.http.post<ChunkBuscarItem[]>(`${this.apiUrl}busqueda-semantica`, body).pipe(
      map((items) =>
        items.map((item) => ({
          id: item.id,
          numero_chunk: item.orden,
          texto: item.texto,
          tokens: item.numTokens ?? 0,
          score: item.similitud ?? 0,
          documento: item.documento,
        })),
      ),
    );
  }

  private mapChunkDocumentoItem(chunk: ChunkDocumentoApiItem): ChunkSummary {
    return {
      id: chunk.id,
      numero_chunk: chunk.orden,
      tokens: 0,
      estado: chunk.estado ?? 'PENDIENTE',
      texto: chunk.textoCompleto,
    };
  }

  private mapChunkApiItem(chunk: ChunkApiItem): ChunkSummary {
    return {
      id: chunk.id,
      numero_chunk: chunk.orden,
      tokens: 0,
      estado: chunk.estado ?? 'PENDIENTE',
      texto: chunk.textoCompleto,
    };
  }
}
