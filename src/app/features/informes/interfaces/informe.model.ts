export interface InformeTotal {
    totalDocumentos: number,
    totalChunks: number,
    totalConversaciones: number,
    totalPreguntas: number,
    totalUsuarios: number,
    ratioCalidad: number
}

// DOCUMENTOS

export interface CantidadesPorEtiqueta {
  etiqueta: string;
  cantidad: number;
}

export type AgrupacionEvolucion = 'DIA' | 'SEMANA';

export interface DocsEvolucionParams {
  fechaDesde: string;
  fechaHasta: string;
  agrupacion?: AgrupacionEvolucion;
}

// CHATS

export interface ActividadDiariaParams {
  fechaDesde: string;
  fechaHasta: string;
}

export interface HorasPunta {
  hora: number; // 0-23
  preguntas: number;
}

export interface Tendencia {
  fecha: string; // "2025-03-15"
  preguntas: number;
}

// USUARIOS

export interface UsuarioRanking {
  email: string;
  nombre: string;
  docsSubidos: number;
  conversaciones: number;
  total: number;
}

export type CriterioRanking = 'DOCS' | 'CHATS' | 'TOTAL';

export interface RankingUsuariosParams {
  limit?: number;
  criterio?: CriterioRanking;
}

// ACTIVIDAD RECIENTE 

export interface ActividadReciente {
  usuario: string;
  accion: 'SUBIDA_DOCUMENTO' | 'PREGUNTA_RAG' | 'VALORACION' | 'REPORTE' | string;
  recurso: string;
  fecha: string;
}


export interface Evolucion {
  periodo: string; // "2025-01-15"
  count: number;
}

export interface ActividadDiaria {
  fecha: string; // "2025-03-15"
  preguntas: number;
}