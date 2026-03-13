import { ChunkEstado } from './chunk-estado';
import { ChunkBusquedaDocumento } from './chunk-busqueda-documento';

// Item devuelto por endpoints de busqueda (textual o semantica).
export interface ChunkBuscarItem {
  id: number;
  orden: number;
  texto: string;
  numTokens: number | null;
  estado: ChunkEstado | null;
  similitud: number | null;
  posicionesBusquedaTextual: unknown[] | null;
  documento: ChunkBusquedaDocumento;
}

// Item crudo de chunk devuelto por documento/{docId}.
export interface ChunkDocumentoApiItem {
  id: number;
  orden: number;
  textoCompleto: string;
  numTokens: number | null;
  estado: ChunkEstado | null;
  documento: unknown;
}

// Estructura paginada de Spring para chunks por documento.
export interface ChunkDocumentoApiPage {
  content: ChunkDocumentoApiItem[];
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

// Detalle crudo de un chunk al consultar por id.
export interface ChunkApiItem {
  id: number;
  orden: number;
  textoCompleto: string;
  numTokens: number | null;
  estado: ChunkEstado | null;
  documento: unknown;
}

// Respuesta paginada de la busqueda textual /buscar.
export interface ChunkBuscarResponse {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
  content: ChunkBuscarItem[];
}

// Body esperado por /busqueda-semantica.
export interface BusquedaSemanticaBody {
  consulta: string;
  topK: number;
}
