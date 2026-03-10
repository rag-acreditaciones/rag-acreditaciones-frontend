// ── Sección temática ──────────────────────────────────────────────────────────
export interface SeccionTematica {
  id: number;
  nombre: string;
  descripcion: string;
  color: string;
}

// ── Estados posibles de un documento ─────────────────────────────────────────
export type DocumentoEstado =
  | 'PENDIENTE'
  | 'PROCESANDO'
  | 'PROCESADO'
  | 'ERROR'
  | 'ELIMINADO';

// ── Documento (respuesta del backend - DocumentoResponseDTO) ──────────────────
export interface Documento {
  id: number;
  nombreFichero: string;
  descripcion: string;
  fechaSubida: string;
  sizeBytes: number;
  estado: DocumentoEstado;
  subidoPor: string;
  seccionTematicaId: number;
  seccionTematicaNombre: string;
  contentType: string;
  numChunks?: number;
}

// ── Preview del PDF (base64 para iframe inline - DocumentoDetailDTO del backend) ─
export interface DocumentoPreview {
  id: number;
  nombreFichero: string;
  base64Contenido: string;
  contentType: string;
  descripcion: string;
  fechaSubida: string;
  sizeBytes: number;
  estado: DocumentoEstado;
  subidoPor: string;
  seccionTematicaId: number;
  seccionTematicaNombre: string;
}

// ── Payload de subida (multipart) ─────────────────────────────────────────────
export interface DocumentoUploadMetadata {
  seccionTematicaId: number;
  descripcion: string;
}

// ── Filtros para el listado paginado ─────────────────────────────────────────
export interface DocumentoFiltros {
  nombre?: string;
  seccionId?: number;
  subidoPor?: string;
  fechaDesde?: string;
  fechaHasta?: string;
  estado?: DocumentoEstado;
}

// ── Respuesta paginada genérica (PaginaResponse del backend) ─────────────────
export interface PaginaResponse<T> {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
  content: T[];
  listaFiltros: { atributo: string; operacion: string; valor: unknown }[];
  listaOrdenaciones: string[];
}
