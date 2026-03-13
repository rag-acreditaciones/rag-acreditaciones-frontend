import { Component, inject, signal } from '@angular/core';
import { SchunkSearcher } from '../schunk-searcher/schunk-searcher';
import { SchunkSearcherResultList } from '../schunk-searcher-result-list/schunk-searcher-result-list';
import { ChunkService } from '../../services/chunkservice';
import { SearchRequest } from '../../interfaces/search-request';
import { SearchResultItem } from '../../interfaces/search-result-item';

@Component({
  selector: 'app-schunk-searcher-screen',
  standalone: true,
  imports: [SchunkSearcher, SchunkSearcherResultList],
  templateUrl: './schunk-searcher-screen.html',
  styleUrl: './schunk-searcher-screen.css',
})
export class SchunkSearcherScreen {
  private readonly chunkService = inject(ChunkService);

  isLoading = signal(false);
  error = signal<string | null>(null);
  resultados = signal<SearchResultItem[]>([]);
  ultimoModo = signal<'SEMANTICA' | 'TEXTUAL'>('SEMANTICA');

  onBuscar(request: SearchRequest) {
    this.isLoading.set(true);
    this.error.set(null);
    this.resultados.set([]);
    this.ultimoModo.set(request.mode);

    if (request.mode === 'TEXTUAL') {
      this.chunkService.searchChunksByText(request.consulta, { page: 0, size: 6 }).subscribe({
        next: (resp) => {
          this.resultados.set(
            resp.content.map((item) => ({
              id: item.id,
              numeroChunk: item.orden,
              texto: item.texto,
              tokens: item.numTokens ?? 0,
              estado: item.estado ?? undefined,
            })),
          );
          this.isLoading.set(false);
        },
        error: () => {
          this.error.set('No se pudo realizar la búsqueda textual');
          this.isLoading.set(false);
        },
      });
      return;
    }

    this.chunkService.searchChunksSemantica(request.consulta, request.topk).subscribe({
      next: (resp) => {
        this.resultados.set(
          resp.map((item) => ({
            id: item.id,
            numeroChunk: item.numero_chunk,
            texto: item.texto,
            tokens: item.tokens,
            score: item.score,
            documentoNombre: item.documento.nombreFichero,
          })),
        );
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('No se pudo realizar la búsqueda semántica');
        this.isLoading.set(false);
      },
    });
  }
}
