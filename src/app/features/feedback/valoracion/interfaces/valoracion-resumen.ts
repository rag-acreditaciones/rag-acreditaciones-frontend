import { Valoracion } from './valoracion';

export interface ValoracionResumen {
  totalPositivas: number;
  totalNegativas: number;
  ratio: number;
  detalles: Valoracion[];
}
