import { ChunkBusquedaDocumento } from './chunk-busqueda-documento';

// Resultado normalizado de busqueda semantica para la pantalla de resultados.
export interface ChunkSearchResult {
  id: number;
  score: number;
  documento: ChunkBusquedaDocumento;
  numero_chunk: number;
  tokens: number;
  texto: string;
}
