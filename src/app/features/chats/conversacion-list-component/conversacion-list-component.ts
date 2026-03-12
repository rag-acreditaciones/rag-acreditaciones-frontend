import { Component, OnInit, Output, EventEmitter, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConversacionService } from '../conversacion-service';
import { ConversacionDTO, SeccionTematica } from '../conversacion-model';

@Component({
  selector: 'app-conversacion-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './conversacion-list-component.html',
  styleUrls: ['./conversacion-list-component.scss'],
})
export class ConversacionListComponent implements OnInit {

  @Output() conversacionSeleccionada = new EventEmitter<number>();

  // ── State signals ─────────────────────────────────────────────────────────
  private readonly _conversaciones = signal<ConversacionDTO[]>([]);
  readonly conversacionActivaId    = signal<number | null>(null);
  readonly tituloConversacionActiva = signal<string | null>(null);
  readonly textoBusqueda           = signal('');
  readonly mostrarSelector         = signal(false);
  readonly seccionSeleccionada     = signal<SeccionTematica>('GENERAL');

  readonly secciones: SeccionTematica[] = ['GENERAL', 'BD', 'PROGRAMACION', 'WEB'];

  // ── Computed ──────────────────────────────────────────────────────────────
  readonly conversacionesFiltradas = computed(() => {
    const texto = this.textoBusqueda().toLowerCase().trim();
    const lista = this._conversaciones();
    if (!texto) return lista;
    return lista.filter(c =>
      (c.titulo ?? 'Sin título').toLowerCase().includes(texto) ||
      c.seccionTematica.toLowerCase().includes(texto) ||
      c.ultimoMensaje?.contenido.toLowerCase().includes(texto)
    );
  });

  constructor(public conversacionSvc: ConversacionService) {}

  ngOnInit(): void {
    this.cargarConversaciones();
  }

  cargarConversaciones(): void {
    this.conversacionSvc.getConversaciones({ estado: 'ACTIVA', size: 50 }).subscribe({
      next: page => this._conversaciones.set(page.content),
      error: err  => console.error('Error al cargar conversaciones', err)
    });
  }

  seleccionar(id: number): void {
    this.conversacionActivaId.set(id);
    const titulo = this._conversaciones().find(c => c.id === id)?.titulo ?? 'Sin título';
    this.tituloConversacionActiva.set(titulo);
    this.conversacionSeleccionada.emit(id);
  }

  confirmarNueva(): void {
    this.conversacionSvc.crearConversacion(this.seccionSeleccionada()).subscribe({
      next: (conv) => {
        this.mostrarSelector.set(false);
        this.cargarConversaciones();
        this.seleccionar(conv.id);
      },
      error: (err) => console.error('Error al crear conversación', err)
    });
  }

  trackById(_: number, c: ConversacionDTO): number { return c.id; }
}