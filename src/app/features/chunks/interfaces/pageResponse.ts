import { ChunkSummary } from './chunkSummary';

export interface PageResponse {
  content: ChunkSummary[];
  page: number;
  size: number;
  totalElements: number;
}
