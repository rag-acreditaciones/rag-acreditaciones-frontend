export interface ChunkStats {
  total: number;
  revisados: number;
  pendientes: number;
  descartados: number;
}

export interface ChunkStatsResponse {
  documento: {
    id: number;
    nombreFichero: string;
    contentType: string;
    sizeBytes: number;
    descripcion: string;
    seccionTematicaId: number;
    seccionTematicaNombre: string;
    subidoPor: string;
    estado: string;
    fechaSubida: string;
  };
  numeroChunks: number;
  numeroChunksPendiente: number;
  numeroChunksRevisado: number;
  numeroChunksDescartado: number;
  longitudMedia: number;
  longitudMax: number;
  longitudMin: number;
  totalTokens: number;
}
