import { ChunkEstado } from './chunk-estado';

export interface ChunkSummary {
  id: number;
  numero_chunk: number;
  tokens: number;
  estado: ChunkEstado;
  pagina?: number;
  texto: string;
}
