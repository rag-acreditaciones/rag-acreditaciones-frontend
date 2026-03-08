import { ChunkSummary } from './chunkSummary';

export interface Documento {
  id: number;
  chunks: ChunkSummary[];
  name: string;
}
