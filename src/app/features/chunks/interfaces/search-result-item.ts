import { ChunkEstado } from './chunk-estado';

// Resultado adaptado para renderizar tarjetas/lista del buscador.
export interface SearchResultItem {
  id: number;
  numeroChunk: number;
  texto: string;
  tokens: number;
  estado?: ChunkEstado;
  score?: number;
  documentoNombre?: string;
}
