import { Component, input, output } from '@angular/core';
import { DdocInfo } from '../ddoc-info/ddoc-info';

@Component({
  selector: 'app-dheader-docs',
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
  filtroEstado = input.required<string>();

  filtroEstadoChange = output<string>();
}
