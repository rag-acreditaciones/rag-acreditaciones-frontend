import { Component, OnInit, inject, signal, computed, ChangeDetectionStrategy, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DocumentoService } from '../documento.service';
import { Documento, DocumentoFiltros, SeccionTematica } from '../documento.model';
import { DocumentoUploadComponent } from '../documento-upload-component/documento-upload.component';

// Array de mentiras para probar la tabla
const DOCUMENTOS_MOCK: Documento[] = [
  {
    id: 1,
    nombreFichero: 'Manual_PEAC.pdf',
    descripcion: 'Manual de procedimientos',
    fechaSubida: '2024-02-12',
    tamano: 2097152,
    estado: 'PROCESADO',
    subidoPor: 'Prof. Lopez',
    seccionTematica: { id: 1, nombre: 'General', descripcion: '', color: '' },
    numChunks: 15,
  },
  {
    id: 2,
    nombreFichero: 'Guia_SQL.pdf',
    descripcion: 'Guía de SQL avanzado',
    fechaSubida: '2024-02-10',
    tamano: 1536000,
    estado: 'PROCESADO',
    subidoPor: 'Prof. Lopez',
    seccionTematica: { id: 2, nombre: 'BD', descripcion: '', color: '' },
    numChunks: 22,
  },
  {
    id: 3,
    nombreFichero: 'JavaScript_Moderno.pdf',
    descripcion: 'Conceptos modernos de JavaScript',
    fechaSubida: '2024-02-08',
    tamano: 3145728,
    estado: 'PROCESADO',
    subidoPor: 'Prof. Martinez',
    seccionTematica: { id: 3, nombre: 'Programacion', descripcion: '', color: '' },
    numChunks: 31,
  },
  {
    id: 4,
    nombreFichero: 'HTML_CSS_Responsive.pdf',
    descripcion: 'Diseño responsive con HTML5 y CSS3',
    fechaSubida: '2024-02-05',
    tamano: 2560000,
    estado: 'PROCESADO',
    subidoPor: 'Prof. Garcia',
    seccionTematica: { id: 4, nombre: 'Web', descripcion: '', color: '' },
    numChunks: 18,
  },
  {
    id: 5,
    nombreFichero: 'Angular_21.pdf',
    descripcion: 'Angular 21+ con Signals',
    fechaSubida: '2024-02-03',
    tamano: 1843200,
    estado: 'PROCESADO',
    subidoPor: 'Prof. Lopez',
    seccionTematica: { id: 4, nombre: 'Web', descripcion: '', color: '' },
    numChunks: 25,
  },
  {
    id: 6,
    nombreFichero: 'Introduccion_BD.pdf',
    descripcion: 'Introducción a bases de datos',
    fechaSubida: '2024-01-30',
    tamano: 1024000,
    estado: 'PROCESADO',
    subidoPor: 'Prof. Martinez',
    seccionTematica: { id: 2, nombre: 'BD', descripcion: '', color: '' },
    numChunks: 12,
  },
];

const SECCIONES_MOCK: SeccionTematica[] = [
  { id: 1, nombre: 'General', descripcion: 'Documentos generales', color: '#6c757d' },
  { id: 2, nombre: 'BD', descripcion: 'Base de datos', color: '#0c6c88' },
  { id: 3, nombre: 'Programacion', descripcion: 'Programación', color: '#08a5be' },
  { id: 4, nombre: 'Web', descripcion: 'Desarrollo web', color: '#03ecf5' },
];

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

  // signals de estado
  documentos = signal<Documento[]>(DOCUMENTOS_MOCK);
  secciones = signal<SeccionTematica[]>(SECCIONES_MOCK);
  cargando = signal(false);
  paginaActual = signal(0);
  filasPorPagina = signal(5);
  totalPaginas = signal(0);
  totalElementos = signal(0);
  modalAbierto = signal(false);

  // signals de filtros
  filtroNombre = signal('');
  filtroSeccion = signal<number | null>(null);
  filtroEstado = signal('');
  filtroFecha = signal('');

  // computed para obtener filtros activos
  filtrosActivos = computed<DocumentoFiltros>(() => ({
    nombre: this.filtroNombre() || undefined,
    seccionId: this.filtroSeccion() || undefined,
    estado: this.filtroEstado() as any || undefined,
    fechaDesde: this.filtroFecha() || undefined,
  }));

  constructor() {
    // efecto para cargar documentos cuando cambian filtros o paginacion
    // DESHABILITADO PARA USAR DATOS MOCK
    // effect(() => {
    //   this.cargarDocumentos();
    // });
  }

  ngOnInit() {
    // DESHABILITADO PARA USAR DATOS MOCK
    // this.cargarSecciones();
    // this.cargarDocumentos();
  }

  private cargarDocumentos() {
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
          this.documentos.set(respuesta.content);
          this.totalPaginas.set(respuesta.totalPages);
          this.totalElementos.set(respuesta.totalElements);
          this.cargando.set(false);
        },
        error: () => {
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

  cambiarFilasPorPagina(cantidad: number) {
    this.filasPorPagina.set(cantidad);
    this.paginaActual.set(0);
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
    // por ahora solo log, se completa en siguientes issues
    console.log('visualizar documento', id);
  }

  eliminarDocumento(id: number) {
    if (confirm('esta seguro de que quiere eliminar este documento?')) {
      this.documentoService.deleteDocumento(id)
        .pipe(takeUntilDestroyed(this.destruirRef))
        .subscribe({
          next: () => {
            this.cargarDocumentos();
          },
        });
    }
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

  obtenerNombreSeccion(id: number): string {
    return this.secciones().find(s => s.id === id)?.nombre || 'General';
  }

  modalSubirDocumento() {
    this.modalAbierto.set(true);
  }

  cerrarModal() {
    this.modalAbierto.set(false);
  }
}