import { Component, OnInit, inject, signal, computed, ChangeDetectionStrategy, DestroyRef, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DocumentoService } from '../documento.service';
import { Documento, DocumentoEstado, DocumentoFiltros, SeccionTematica } from '../documento.model';
import { DocumentoUploadComponent } from '../documento-upload-component/documento-upload.component';

@Component({
  selector: 'app-documento-list-tabla',
  standalone: true,
  imports: [CommonModule, FormsModule, DocumentoUploadComponent],
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
  documentoAEliminar = signal<number | null>(null);

  // signals de los filtros
  filtroNombre = signal('');
  filtroSeccion = signal<number | null>(null);
  filtroEstado = signal('');
  filtroFecha = signal('');

  // las sign computed para obtener filtros activados
  filtrosActivos = computed<DocumentoFiltros>(() => {
    const fecha = this.filtroFecha();
    return {
      nombre: this.filtroNombre() || undefined,
      seccionId: this.filtroSeccion() || undefined,
      estado: (this.filtroEstado() || undefined) as DocumentoEstado | undefined,
      fechaDesde: fecha ? `${fecha}T00:00:00` : undefined,
      fechaHasta: fecha ? `${fecha}T23:59:59` : undefined,
    };
  });

  constructor() {
    //para recargar documentos cuando cambian filtros o paginacion
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
    this.documentoService
      .getDocumentos({
        filtros: this.filtrosActivos(),
        page: this.paginaActual(),
        size: this.filasPorPagina(),
      })
      .pipe(takeUntilDestroyed(this.destruirRef))
      .subscribe({
        next: (respuesta) => {
          // Filtrar documentos ELIMINADOS (borrado pero sin borrar de la bd.. solo le cambia el estado a ELIMINADO)
          const documentosFiltrados = respuesta.content.filter(doc => doc.estado !== 'ELIMINADO');
          this.documentos.set(documentosFiltrados);
          this.totalPaginas.set(respuesta.totalPages);
          this.totalElementos.set(respuesta.totalElements);
          this.cargando.set(false);
        },
        error: (err) => {
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

  // reiniciar los filtros
  limpiarFiltros() {
    this.filtroNombre.set('');
    this.filtroSeccion.set(null);
    this.filtroEstado.set('');
    this.filtroFecha.set('');
    this.paginaActual.set(0);
  }

  //paginacion
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

  //las cosas del modal
  modalSubirDocumento() {
    this.modalAbierto.set(true);
  }

  cerrarModal() {
    this.modalAbierto.set(false);
  }

  alDocumentoSubido() {
    //para que recargue automaticamente cuando sube un docu
    this.paginaActual.set(0);
    this.cargarDocumentos();
  }

  // cambiar los filtros
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
  descargarDocumento(id: number, nombreFichero: string) {
    this.documentoService.downloadDocumento(id)
      .pipe(takeUntilDestroyed(this.destruirRef))
      .subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const enlace = document.createElement('a');
          enlace.href = url;
          enlace.download = nombreFichero;
          enlace.click();
          window.URL.revokeObjectURL(url);
        },
      });
  }

  visualizarDocumento(id: number) {
    this.router.navigate(['/documentos', id, 'visor']);
  }

  // Muestra confirmación en la propia fila en la tabla. Antes estaba con un MODAL muy chulo, pero daba muchos problemas...
  eliminarDocumento(id: number) {
    this.documentoAEliminar.set(id);
  }

  // Confirma y elimina el documento
  confirmarEliminar() {
    const id = this.documentoAEliminar();
    if (id) {
      this.documentoService.deleteDocumento(id)
        .pipe(takeUntilDestroyed(this.destruirRef))
        .subscribe({
          next: () => {
            this.documentoAEliminar.set(null);
            this.paginaActual.set(0);
            this.cargarDocumentos();
          },
        });
    }
  }

  // Cancelar la eliminación
  cancelarEliminar() {
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
