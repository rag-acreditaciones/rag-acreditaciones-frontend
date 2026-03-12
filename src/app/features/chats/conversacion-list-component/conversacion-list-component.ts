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
  private readonly _conversaciones      = signal<ConversacionDTO[]>([]);
  readonly conversacionActivaId         = signal<number | null>(null);
  readonly tituloConversacionActiva     = signal<string | null>(null);
  readonly textoBusqueda                = signal('');
  readonly mostrarSelector              = signal(false);
  readonly seccionSeleccionada          = signal<SeccionTematica>('GENERAL');
  readonly secciones: SeccionTematica[] = ['GENERAL', 'BD', 'PROGRAMACION', 'WEB'];
 
  // ── Delete confirmation ───────────────────────────────────────────────────
  readonly conversacionAEliminarId = signal<number | null>(null);
 
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
 
  // ── Delete ────────────────────────────────────────────────────────────────
 
  pedirConfirmacionEliminar(event: MouseEvent, id: number): void {
    event.stopPropagation(); // evita que también se dispare seleccionar()
    this.conversacionAEliminarId.set(id);
  }
 
  cancelarEliminar(): void {
    this.conversacionAEliminarId.set(null);
  }
 
  confirmarEliminar(): void {
    const id = this.conversacionAEliminarId();
    if (id === null) return;
 
    this.conversacionSvc.eliminarConversacion(id).subscribe({
      next: () => {
        // Si la eliminada era la activa, deseleccionamos
        if (this.conversacionActivaId() === id) {
          this.conversacionActivaId.set(null);
          this.tituloConversacionActiva.set(null);
          this.conversacionSeleccionada.emit(null!);
        }
        this.conversacionAEliminarId.set(null);
        this.cargarConversaciones();
      },
      error: (err) => console.error('Error al eliminar conversación', err)
    });
  }
 
  formatearFecha(fecha: string): string {
    const d    = new Date(fecha);
    const dia  = d.getDate().toString().padStart(2, '0');
    const mes  = (d.getMonth() + 1).toString().padStart(2, '0');
    const hora = d.getHours().toString().padStart(2, '0');
    const min  = d.getMinutes().toString().padStart(2, '0');
    return `${dia}/${mes} ${hora}:${min}`;
  }
 
  trackById(_: number, c: ConversacionDTO): number { return c.id; }
}