import { SearchMode } from './search-mode';

export interface SearchRequest {
  consulta: string;
  mode: SearchMode;
  topk: number;
}
