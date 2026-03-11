import { ChunkEstado } from './chunk-estado';

export interface SearchResultItem {
  id: number;
  numeroChunk: number;
  texto: string;
  tokens: number;
  estado?: ChunkEstado;
  score?: number;
  documentoNombre?: string;
}
