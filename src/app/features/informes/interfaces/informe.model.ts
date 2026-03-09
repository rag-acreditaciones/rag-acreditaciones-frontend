export interface InformeTotal {
    totalDocumentos: number,
    totalChunks: number,
    totalConversaciones: number,
    totalPreguntas: number,
    totalUsuarios: number,
    ratioCalidad: number
}

export interface CantidadesPorEtiqueta {
  etiqueta: string;
  cantidad: number;
}

export interface Tendencia {
  fecha: string; // "2025-03-15"
  preguntas: number;
}

// USUARIOS

export interface UsuarioRanking {
  usuarioId: number;
  nombre: string;
  numDocumentos: number;
  numConversaciones: number;
}

export type CriterioRanking = 'DOCS' | 'CHATS' | 'TOTAL';

export interface RankingUsuariosParams {
  limit?: number;
  criterio?: CriterioRanking;
}