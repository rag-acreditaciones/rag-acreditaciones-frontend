import { Component, input, output } from '@angular/core';
import { DdocInfo } from '../ddoc-info/ddoc-info';
import { ChunkEstado } from '../../interfaces/chunk-estado';

@Component({
  selector: 'app-dheader-docs',
  standalone: true,
  imports: [DdocInfo],
  templateUrl: './dheader-docs.html',
  styleUrl: './dheader-docs.css',
})
export class DheaderDocs {
  nombreDocumento = input.required<string>(); // Esto ni idea de donde sacarlo xd
  stats = input.required<{
    total: number;
    revisados: number;
    pendientes: number;
    descartados: number;
  }>();
  filtroEstado = input.required<ChunkEstado | 'TODOS'>();

  filtroEstadoChange = output<ChunkEstado | 'TODOS'>();
}
