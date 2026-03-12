import { ChunkSummary } from './chunkSummary';

// Pagina de resultados usada por la pantalla principal de chunks.
export interface PageResponse {
  content: ChunkSummary[];
  page: number;
  size: number;
  totalElements: number;
}
