import { Component, OnInit, inject, signal, computed, ChangeDetectionStrategy, DestroyRef, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DocumentoService } from '../documento.service';
import { Documento, DocumentoEstado, DocumentoFiltros, SeccionTematica } from '../documento.model';
import { DocumentoUploadComponent } from '../documento-upload-component/documento-upload.component';
import { ConfirmationModalComponent } from '../confirmation-modal.component';

@Component({
  selector: 'app-documento-list-tabla',
  standalone: true,
  imports: [CommonModule, FormsModule, DocumentoUploadComponent, ConfirmationModalComponent],
  templateUrl: './documento-list-tabla.component.html',
  styleUrls: ['./documento-list-tabla.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentoListTablaComponent implements OnInit {
  private readonly documentoService = inject(DocumentoService);
  private readonly destruirRef = inject(DestroyRef);
  private readonly router = inject(Router);

  // signals de estado
  documentos = signal<Documento[]>([]);
  secciones = signal<SeccionTematica[]>([]);
  cargando = signal(false);
  paginaActual = signal(0);
  filasPorPagina = signal(5);
  totalPaginas = signal(0);
  totalElementos = signal(0);
  modalAbierto = signal(false);
  modalConfirmacionVisible = signal(false);
  documentoAEliminar = signal<number | null>(null);

  // signals de filtros
  filtroNombre = signal('');
  filtroSeccion = signal<number | null>(null);
  filtroEstado = signal('');
  filtroFecha = signal('');

  // computed para obtener filtros activos
  filtrosActivos = computed<DocumentoFiltros>(() => ({
    nombre: this.filtroNombre() || undefined,
    seccionId: this.filtroSeccion() || undefined,
    estado: (this.filtroEstado() || undefined) as DocumentoEstado | undefined,
    fechaDesde: this.filtroFecha() || undefined,
  }));

  constructor() {
    // efecto para cargar documentos cuando cambian filtros o paginacion
    effect(() => {
      this.cargarDocumentos();
    });
  }

  ngOnInit() {
    this.cargarSecciones();
    this.cargarDocumentos();
  }

  cargarDocumentos(): void {
    this.cargando.set(true);
    console.log('Cargando documentos con filtros:', this.filtrosActivos());
    this.documentoService
      .getDocumentos({
        filtros: this.filtrosActivos(),
        page: this.paginaActual(),
        size: this.filasPorPagina(),
      })
      .pipe(takeUntilDestroyed(this.destruirRef))
      .subscribe({
        next: (respuesta) => {
          console.log('Documentos recibidos:', respuesta.content);
          // Filtrar documentos ELIMINADOS (borrado lógico)
          const documentosFiltrados = respuesta.content.filter(doc => doc.estado !== 'ELIMINADO');
          console.log('Documentos después de filtrar ELIMINADOS:', documentosFiltrados);
          this.documentos.set(documentosFiltrados);
          this.totalPaginas.set(respuesta.totalPages);
          this.totalElementos.set(respuesta.totalElements);
          this.cargando.set(false);
        },
        error: (err) => {
          console.error('Error cargando documentos:', err);
          this.cargando.set(false);
        },
      });
  }

  private cargarSecciones() {
    this.documentoService.getSeccionesTematicas()
      .pipe(takeUntilDestroyed(this.destruirRef))
      .subscribe({
        next: (secciones) => {
          this.secciones.set(secciones);
        },
      });
  }

  // acciones de filtros
  limpiarFiltros() {
    this.filtroNombre.set('');
    this.filtroSeccion.set(null);
    this.filtroEstado.set('');
    this.filtroFecha.set('');
    this.paginaActual.set(0);
  }

  // acciones de paginacion
  irAPagina(pagina: number) {
    this.paginaActual.set(pagina);
  }

  paginaAnterior() {
    if (this.paginaActual() > 0) {
      this.paginaActual.update((p) => p - 1);
    }
  }

  paginaSiguiente() {
    if (this.paginaActual() < this.totalPaginas() - 1) {
      this.paginaActual.update((p) => p + 1);
    }
  }

  cambiarFilasPorPagina(cantidad: string | number) {
    const num = typeof cantidad === 'string' ? parseInt(cantidad, 10) : cantidad;
    this.filasPorPagina.set(num);
    this.paginaActual.set(0);
  }

  // acciones del modal
  modalSubirDocumento() {
    this.modalAbierto.set(true);
  }

  cerrarModal() {
    this.modalAbierto.set(false);
  }

  alDocumentoSubido() {
    // Reload automático después de subir documento
    this.paginaActual.set(0);
    this.cargarDocumentos();
  }

  // métodos para cambiar filtros
  cambiarFiltroNombre(valor: string) {
    this.filtroNombre.set(valor);
  }

  cambiarFiltroSeccion(valor: string) {
    this.filtroSeccion.set(valor ? parseInt(valor, 10) : null);
  }

  cambiarFiltroEstado(valor: string) {
    this.filtroEstado.set(valor);
  }

  cambiarFiltroFecha(valor: string) {
    this.filtroFecha.set(valor);
  }

  // acciones de tabla
  descargarDocumento(id: number) {
    this.documentoService.downloadDocumento(id)
      .pipe(takeUntilDestroyed(this.destruirRef))
      .subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const enlace = document.createElement('a');
          enlace.href = url;
          enlace.download = `documento-${id}.pdf`;
          enlace.click();
          window.URL.revokeObjectURL(url);
        },
      });
  }

  visualizarDocumento(id: number) {
    this.router.navigate(['/documentos', id, 'visor']);
  }

  eliminarDocumento(id: number) {
    console.log('🗑️ CLICK en Eliminar, ID:', id);
    this.documentoAEliminar.set(id);
    this.modalConfirmacionVisible.set(true);
    console.log('Modal visible:', this.modalConfirmacionVisible());
  }

  confirmarEliminar() {
    const id = this.documentoAEliminar();
    console.log('✅ CONFIRM RECIBIDO - Intentando eliminar documento:', id);
    if (id) {
      this.documentoService.deleteDocumento(id)
        .pipe(takeUntilDestroyed(this.destruirRef))
        .subscribe({
          next: () => {
            console.log('✅ Documento eliminado exitosamente, recargando lista...');
            this.modalConfirmacionVisible.set(false);
            this.documentoAEliminar.set(null);
            // Recargar documentos de inmediato
            this.paginaActual.set(0);
            this.cargarDocumentos();
          },
          error: (err) => {
            console.error('❌ Error al eliminar documento:', err);
            this.modalConfirmacionVisible.set(false);
          },
        });
    }
  }

  cancelarEliminar() {
    console.log('❌ CANCEL RECIBIDO - Cerrando modal sin eliminar');
    this.modalConfirmacionVisible.set(false);
    this.documentoAEliminar.set(null);
  }

  // computed para obtener array de paginas disponibles
  paginasDisponibles = computed(() => {
    const total = this.totalPaginas();
    const actual = this.paginaActual();
    const arr = [];

    if (total <= 5) {
      for (let i = 0; i < total; i++) arr.push(i);
    } else {
      if (actual > 1) arr.push(0);
      if (actual > 2) arr.push(-1); // puntitos
      const inicio = Math.max(1, actual - 1);
      const fin = Math.min(total - 2, actual + 1);
      for (let i = inicio; i <= fin; i++) arr.push(i);
      if (actual < total - 3) arr.push(-1); // puntitos
      if (actual < total - 2) arr.push(total - 1);
    }
    return arr;
  });

  // computed para obtener el rango de registros mostrados
  registroInicio = computed(() => this.paginaActual() * this.filasPorPagina() + 1);
  registroFin = computed(() =>
    Math.min((this.paginaActual() + 1) * this.filasPorPagina(), this.totalElementos())
  );
}