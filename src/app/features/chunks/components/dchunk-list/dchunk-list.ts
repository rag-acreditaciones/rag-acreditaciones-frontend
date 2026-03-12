import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DchunkDetail } from '../dchunk-detail/dchunk-detail';
import { ChunkSummary } from '../../interfaces/chunkSummary';

@Component({
  selector: 'app-dchunk-list',
  standalone: true,
  imports: [CommonModule, DchunkDetail],
  templateUrl: './dchunk-list.html',
  styleUrl: './dchunk-list.css',
})
export class DchunkList {
  // Recibe los chunks de la página actual desde el componente padre.
  chunks = input.required<ChunkSummary[]>();

  // Notifica al padre cuando un chunk cambia de estado.
  chunkActualizado = output<ChunkSummary>();
}
