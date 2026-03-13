// Datos de documento incluidos en resultados de busqueda de chunks.
export interface ChunkBusquedaDocumento {
  nombreFichero: string;
  seccionId: number;
  subidoPor: string;
  fechaDesde: string | null;
  fechaHasta: string | null;
  estado: string;
}
