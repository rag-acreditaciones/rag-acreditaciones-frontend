import { Component, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { ChunkService } from '../../services/chunkservice';
import { ChunkEstado } from '../../interfaces/chunk-estado';
import { ChunkSummary } from '../../interfaces/chunkSummary';
import { Documento } from '../../interfaces/documento';

@Component({
  selector: 'app-dchunk-detail',
  imports: [],
  templateUrl: './dchunk-detail.html',
  styleUrl: './dchunk-detail.css',
})
export class DchunkDetail {
  private readonly chunkService = inject(ChunkService);

  documento: Documento | null = {
    id: 1,
    name: 'BOE Num. 21',
    chunks: [],
  };
  isUpdatingEstado = signal(false);
  updateEstadoOK = signal<string | null>(null);
  updateEstadoError = signal<string | null>(null);

  getChunks(documento: Documento): ChunkSummary[] {
    return documento.chunks;
  }

  onAccept(chunk: ChunkSummary) {
    // Click en "confirmar" => enviamos estado REVISADO al backend.
    this.updateStatus(chunk, 'REVISADO');
  }

  onDeny(chunk: ChunkSummary) {
    // Click en "denegar" => enviamos estado DESCARTADO al backend.
    this.updateStatus(chunk, 'DESCARTADO');
  }

  updateStatus(chunk: ChunkSummary, nuevoEstado: Exclude<ChunkEstado, 'PENDIENTE'>) {
    // Evita peticiones invalidas: sin chunk o con una actualizacion ya en curso.
    if (this.isUpdatingEstado()) {
      return;
    }

    /*Para que el usuario no le de muchas veces al botón luego en la template
    tengo que poner [disabled]=isUpdating*/
    this.isUpdatingEstado.set(true);
    this.updateEstadoOK.set(null);
    this.updateEstadoError.set(null);

    this.chunkService
      .updateChunkEstado(chunk.id, nuevoEstado)
      // finalize siempre se ejecuta: exito o error.
      .pipe(finalize(() => this.isUpdatingEstado.set(false)))
      .subscribe({
        next: () => {
          // Sincroniza estado del item clicado si backend confirma el cambio.
          chunk.estado = nuevoEstado;
          this.updateEstadoOK.set(`Estado actualizado a ${nuevoEstado}`);
        },
        error: () => {
          this.updateEstadoError.set('No se pudo actualizar el estado del chunk');
        },
      });
  }
}
