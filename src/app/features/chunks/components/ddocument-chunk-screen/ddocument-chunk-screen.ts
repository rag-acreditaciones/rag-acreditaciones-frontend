import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DheaderDocs } from '../dheader-docs/dheader-docs';
import { DchunkList } from '../dchunk-list/dchunk-list';
import { Dpagination } from '../dpagination/dpagination';
import { ChunkService } from '../../services/chunkservice';
import { ChunkSummary } from '../../interfaces/chunkSummary';
import { PageResponse } from '../../interfaces/pageResponse';

@Component({
  selector: 'app-ddocument-chunk-screen',
  imports: [DheaderDocs, DchunkList, Dpagination],
  templateUrl: './ddocument-chunk-screen.html',
  styleUrl: './ddocument-chunk-screen.css',
})
export class DdocumentChunkScreen implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly chunkService = inject(ChunkService);

  private docId = 0;

  pageResponse = signal<PageResponse | null>(null);
  currentPage = signal(0);
  pageSize = signal(5);
  error = signal('');

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
    this.cargarChunks();
  }

  cargarChunks() {
    this.chunkService
      .getChunksByDocumento(this.docId, { page: this.currentPage(), size: this.pageSize() })
      .subscribe({
        next: (resp) => this.pageResponse.set(resp),
        error: () => this.error.set('No se pudieron cargar los chunks'),
      });
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.cargarChunks();
  }

  onSizeChange(size: number) {
    this.pageSize.set(size);
    this.currentPage.set(0);
    this.cargarChunks();
  }

  onChunkActualizado(chunk: ChunkSummary) {
    this.pageResponse.update((pr) =>
      pr ? { ...pr, content: pr.content.map((c) => (c.id === chunk.id ? chunk : c)) } : pr,
    );
  }
}
