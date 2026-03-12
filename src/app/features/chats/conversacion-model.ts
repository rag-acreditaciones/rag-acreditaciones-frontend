// ─────────────────────────────────────────────────────────────────────────────
//  ENUMS / TIPOS
// ─────────────────────────────────────────────────────────────────────────────
 
/** Secciones válidas definidas en el backend */
export type SeccionTematica = 'GENERAL' | 'BD' | 'PROGRAMACION' | 'WEB';
 
export type EstadoConversacion = 'ACTIVA' | 'ARCHIVADA';
 
export type TipoMensaje = 'PREGUNTA' | 'RESPUESTA';
 
// ─────────────────────────────────────────────────────────────────────────────
//  MENSAJE
// ─────────────────────────────────────────────────────────────────────────────
 
export interface MensajeDTO {
  id: number;
  conversacionId: number;
  tipo: TipoMensaje;
  contenido: string;
  chunksUtilizados?: string[];
  fecha: string; // ISO-8601
}
 
// ─────────────────────────────────────────────────────────────────────────────
//  CONVERSACIÓN
// ─────────────────────────────────────────────────────────────────────────────
 
/** GET /conversaciones — ítem de lista con último mensaje */
export interface ConversacionDTO {
  id: number;
  titulo: string | null; // null hasta el primer mensaje
  seccionTematica: SeccionTematica;
  estado: EstadoConversacion;
  fechaCreacion: string; // ISO-8601
  ultimoMensaje: MensajeDTO | null;
}
 
/** GET /conversaciones/:id — detalle con todos los mensajes */
export interface ConversacionDetailDTO extends ConversacionDTO {
  mensajes: MensajeDTO[];
}
 
// ─────────────────────────────────────────────────────────────────────────────
//  REQUESTS (bodies enviados al backend)
// ─────────────────────────────────────────────────────────────────────────────
 
/**
 * POST /conversaciones
 * El controller solo espera { "seccionTematica": "BD" }.
 * El usuario lo resuelve el backend via Principal.
 */
export interface ConversacionCreateBody {
  seccionTematica: SeccionTematica;
}
 
/**
 * POST /conversaciones/:id/preguntas
 * El controller espera { "texto": "..." }  ← campo 'texto', no 'contenido'
 */
export interface PreguntaBody {
  texto: string;
}
 
// ─────────────────────────────────────────────────────────────────────────────
//  RESPONSES (respuestas del backend)
// ─────────────────────────────────────────────────────────────────────────────
 
/** Respuesta del endpoint de preguntas (par pregunta + respuesta + metadata RAG) */
export interface PreguntaResponseDTO {
  pregunta: MensajeDTO;
  respuesta: MensajeDTO;
  chunksUsados: string[]; // nombre exacto del controller
  tiempoMs: number;       // nombre exacto del controller
  modelo: string;
}
 
// ─────────────────────────────────────────────────────────────────────────────
//  PAGINACIÓN
// ─────────────────────────────────────────────────────────────────────────────
 
/** Wrapper genérico de paginación de Spring (Page<T>) */
export interface PaginaResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number; // página actual, 0-based
  first: boolean;
  last: boolean;
  empty: boolean;
}
 
// ─────────────────────────────────────────────────────────────────────────────
//  PARÁMETROS DE CONSULTA (usados en el service)
// ─────────────────────────────────────────────────────────────────────────────
 
export interface ConversacionListParams {
  seccion?: SeccionTematica; // @RequestParam 'seccion' del controller
  estado?: EstadoConversacion;
  page?: number;
  size?: number;
  sort?: string; // Ej.: 'fechaCreacion,desc'
}
 
export interface MensajesListParams {
  page?: number;
  size?: number;
}