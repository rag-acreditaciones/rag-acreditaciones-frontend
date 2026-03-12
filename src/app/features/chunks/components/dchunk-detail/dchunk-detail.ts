import { Component, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { ChunkService } from '../../services/chunkservice';
import { ChunkEstado } from '../../interfaces/chunk-estado';
import { ChunkSummary } from '../../interfaces/chunkSummary';

@Component({
  selector: 'app-dchunk-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dchunk-detail.html',
  styleUrl: './dchunk-detail.css',
})
export class DchunkDetail {
  private readonly chunkService = inject(ChunkService);

  isUpdatingEstado = signal(false);
  updateEstadoOK = signal<string | null>(null);
  updateEstadoError = signal<string | null>(null);
  expanded = signal(false);

  textoPrevio(texto: string): string {
    const palabras = texto.trim().split(/\s+/);
    if (palabras.length <= 20) return texto;
    return palabras.slice(0, 20).join(' ') + '...';
  }

  // Cada tarjeta recibe solo un chunk desde la lista padre.
  chunk = input.required<ChunkSummary>();

  // Cuando el backend confirma el cambio, avisamos al padre para que actualice la lista.
  chunkActualizado = output<ChunkSummary>();

  onAccept(chunk: ChunkSummary) {
    // REVISADO al backend.
    this.updateStatus(chunk, 'REVISADO');
  }

  onDeny(chunk: ChunkSummary) {
    // DESCARTADO al backend.
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
          /*No modifico directamente el input.
          Creo una copia actualizada y se la envio al padre.*/
          this.chunkActualizado.emit({
            ...chunk,
            estado: nuevoEstado,
          });
          this.updateEstadoOK.set(`Estado actualizado a ${nuevoEstado}`);
        },
        error: () => {
          this.updateEstadoError.set('No se pudo actualizar el estado del chunk');
        },
      });
  }
}
