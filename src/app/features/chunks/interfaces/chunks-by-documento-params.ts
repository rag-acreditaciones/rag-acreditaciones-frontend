import { ChunkEstado } from './chunk-estado';

// Filtros y paginacion enviados a /documento/{docId}.
export interface ChunksByDocumentoParams {
  estado?: ChunkEstado;
  page?: number;
  size?: number;
  sort?: string;
}
