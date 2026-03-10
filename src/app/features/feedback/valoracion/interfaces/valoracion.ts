export interface Valoracion {
  id: number;
  mensajeId: number;
  usuarioId: number;
  valoracion: 'POSITIVA' | 'NEGATIVA';
  comentario: string;
  fechaCreacion: Date;
}
