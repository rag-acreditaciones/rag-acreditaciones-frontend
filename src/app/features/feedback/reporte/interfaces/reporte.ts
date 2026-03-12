export interface Reporte {
  id: number;
  mensajeId: number;
  usuarioId: number;
  usuarioEmail: string;
  motivo: string;
  descripcion: string;
  estado: 'PENDIENTE' | 'REVISADO' | 'DESCARTADO';
  fechaCreacion: Date;
}
