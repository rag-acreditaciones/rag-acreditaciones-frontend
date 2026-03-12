import { SearchMode } from './search-mode';

// Payload emitido por el formulario del buscador.
export interface SearchRequest {
  consulta: string;
  mode: SearchMode;
  topk: number;
}
