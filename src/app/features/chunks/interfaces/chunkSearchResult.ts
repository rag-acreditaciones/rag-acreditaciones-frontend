export interface ChunkSearchResultDocumento {
  nombre: string;
  seccionId: number;
  subidoPor: string;
  fechaDesde: string | null;
  fechaHasta: string | null;
  estado: string;
}

export interface ChunkSearchResult {
  id: number;
  score: number;
  documento: ChunkSearchResultDocumento;
  numero_chunk: number;
  tokens: number;
  texto: string;
}
