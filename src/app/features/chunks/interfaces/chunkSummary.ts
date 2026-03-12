import { ChunkEstado } from './chunk-estado';

// Modelo de chunk simplificado que consume la UI del listado/detalle.
export interface ChunkSummary {
  id: number;
  numero_chunk: number;
  tokens: number;
  estado: ChunkEstado;
  pagina?: number;
  texto: string;
}
