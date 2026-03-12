import { ChunkEstado } from './chunk-estado';

export interface ChunksByDocumentoParams {
  estado?: ChunkEstado;
  page?: number;
  size?: number;
  sort?: string;
}
