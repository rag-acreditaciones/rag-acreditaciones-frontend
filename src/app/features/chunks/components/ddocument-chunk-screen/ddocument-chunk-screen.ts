import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DheaderDocs } from '../dheader-docs/dheader-docs';
import { DchunkList } from '../dchunk-list/dchunk-list';
import { Dpagination } from '../dpagination/dpagination';
import { ChunkService } from '../../services/chunkservice';
import { ChunkSummary } from '../../interfaces/chunkSummary';
import { ChunkEstado } from '../../interfaces/chunk-estado';
import { PageResponse } from '../../interfaces/pageResponse';
import { ChunkStats, ChunkStatsResponse } from '../../interfaces/chunk-stats';

@Component({
  selector: 'app-ddocument-chunk-screen',
  standalone: true,
  imports: [CommonModule, DheaderDocs, DchunkList, Dpagination],
  templateUrl: './ddocument-chunk-screen.html',
  styleUrl: './ddocument-chunk-screen.css',
})
export class DdocumentChunkScreen implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly chunkService = inject(ChunkService);

  private docId = 0;
  nombreDocumento = signal('');

  pageResponse = signal<PageResponse | null>(null);
  chunkStats = signal<ChunkStats>({ total: 0, revisados: 0, pendientes: 0, descartados: 0 });
  currentPage = signal(0);
  pageSize = signal(6);
  error = signal('');
  filtroEstado = signal<ChunkEstado | 'TODOS'>('TODOS');

  ngOnInit() {
    /* Permite acceso a la ruta de un componente, luego la voy a usar para poder
    sacar parametros de la ruta, me va a facilitar obtener el id del documento
    para poder obtener los chunks */
    const docIdRaw = this.route.snapshot.paramMap.get('docId');
    this.docId = Number(docIdRaw);
    if (!docIdRaw || Number.isNaN(this.docId)) {
      this.error.set('ID de documento no válido');
      return;
    }
    //como tengo que cargar estadisticas y chunks, on init se carga a la vez
    this.cargarEstadisticas();
    this.cargarChunks();
  }

  private cargarEstadisticas() {
    this.chunkService.getEstadisticasByDocumento(this.docId).subscribe({
      next: (statsResponse) => {
        this.aplicarEstadisticas(statsResponse);
      },
      error: () => {
        // Fallback mínimo: si falla /stats, al menos reflejar lo que venga en la página actual.
        this.nombreDocumento.set(`Documento_${this.docId}.pdf`);
      },
    });
  }

  private aplicarEstadisticas(statsResponse: ChunkStatsResponse) {
    this.nombreDocumento.set(statsResponse.documento.nombreFichero);
    this.chunkStats.set({
      total: statsResponse.numeroChunks,
      revisados: statsResponse.numeroChunksRevisado,
      pendientes: statsResponse.numeroChunksPendiente,
      descartados: statsResponse.numeroChunksDescartado,
    });
  }

  // REVISAR
  cargarChunks() {
    const filtros: any = {
      page: this.currentPage(),
      size: this.pageSize(),
      sort: 'ordenChunk,asc',
    };
    if (this.filtroEstado() !== 'TODOS') {
      filtros.estado = this.filtroEstado();
    }

    this.chunkService.getChunksByDocumento(this.docId, filtros).subscribe({
      next: (resp) => {
        this.pageResponse.set(resp);

        if (this.chunkStats().total === 0 && resp.totalElements > 0) {
          this.chunkStats.set({
            total: resp.totalElements,
            revisados: resp.content.filter((chunk) => chunk.estado === 'REVISADO').length,
            pendientes: resp.content.filter((chunk) => chunk.estado === 'PENDIENTE').length,
            descartados: resp.content.filter((chunk) => chunk.estado === 'DESCARTADO').length,
          });
        }
      },
      error: () => this.error.set('No se pudieron cargar los chunks'),
    });
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.cargarChunks();
  }
  /*
  onSizeChange(size: number) {
    this.pageSize.set(size);
    this.currentPage.set(0);
    this.cargarChunks();
  }
*/
  onFiltroEstadoChange(estado: ChunkEstado | 'TODOS') {
    this.filtroEstado.set(estado);
    this.currentPage.set(0);
    this.cargarChunks();
  }

  onChunkActualizado(chunk: ChunkSummary) {
    this.pageResponse.update((pr) =>
      pr ? { ...pr, content: pr.content.map((c) => (c.id === chunk.id ? chunk : c)) } : pr,
    );
  }
}
