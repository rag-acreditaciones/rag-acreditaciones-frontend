import { Component, ChangeDetectionStrategy, input, output, signal, computed, HostListener, ViewChild, ElementRef } from '@angular/core';
import { form, minLength, required } from '@angular/forms/signals';
import { CommonModule } from '@angular/common';
import { DocumentoService } from '../documento.service';
import { DatosDocumento, DOCUMENTO_CONFIG } from './documento-upload.types';
import { SeccionTematica } from '../documento.model';

@Component({
  selector: 'app-documento-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './documento-upload.component.html',
  styleUrls: ['./documento-upload.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentoUploadComponent {
  @ViewChild('inputArchivo') inputArchivo!: ElementRef<HTMLInputElement>;

  modalAbierto = input<boolean>();
  alCerrar = output<void>();
  documentoSubido = output<{ id: number; nombreFichero: string }>();
  secciones = input<SeccionTematica[]>([]);

  arrastrandoEncima = signal(false);
  cargandoSubida = signal(false);
  porcentajeProgreso = signal(0);
  mensajeError = signal<string | null>(null);

  modeloDocumento = signal<DatosDocumento>({
    descripcion: '',
    seccionTematicaId: null,
    archivoSeleccionado: null,
  });

  formulario = form(this.modeloDocumento, (modelo) => {
    minLength(modelo.descripcion, DOCUMENTO_CONFIG.validacion.descripcionMinChars, { message: `La descripcion debe tener al menos ${DOCUMENTO_CONFIG.validacion.descripcionMinChars} caracteres` });
    required(modelo.seccionTematicaId, { message: 'Debes seleccionar una seccion' });
    required(modelo.archivoSeleccionado, { message: 'Debes seleccionar un archivo' });
  });

  formularioValido = computed(() => this.formulario().valid());

  descripcionControl = computed(() => this.formulario.descripcion());
  seccionTematicaIdControl = computed(() => this.formulario.seccionTematicaId());
  archivoControl = computed(() => this.formulario.archivoSeleccionado());

  constructor(
    private documentoService: DocumentoService
  ) {}

  @HostListener('dragover', ['$event']) alArrastrar(evento: DragEvent) {
    evento.preventDefault();
    evento.stopPropagation();
    this.arrastrandoEncima.set(true);
  }

  @HostListener('dragleave') alSalirArrastrar() {
    this.arrastrandoEncima.set(false);
  }

  //evento de soltar archivo en el hueco del drag-drop
  @HostListener('drop', ['$event']) alSoltar(evento: DragEvent) {
    evento.preventDefault();
    evento.stopPropagation();
    this.arrastrandoEncima.set(false);

    const archivos = evento.dataTransfer?.files;
    if (archivos?.[0]) {
      const archivo = archivos[0];
      const errorValidacion = this.validarArchivo(archivo);

      if (errorValidacion) {
        this.mensajeError.set(errorValidacion);
        return;
      }

      this.mensajeError.set(null);
      const datos = this.modeloDocumento();
      this.modeloDocumento.set({
        ...datos,
        archivoSeleccionado: archivo,
      });
    }
  }

  seleccionarArchivo() {
    this.inputArchivo?.nativeElement.click();
  }

  //apartado de la seleccion de archivo
  alSeleccionarArchivo(evento: Event) {
    const input = evento.target as HTMLInputElement;
    if (input.files?.[0]) {
      const archivo = input.files[0];
      const errorValidacion = this.validarArchivo(archivo);

      if (errorValidacion) {
        this.mensajeError.set(errorValidacion);
        input.value = '';
        return;
      }

      this.mensajeError.set(null);
      const datos = this.modeloDocumento();
      this.modeloDocumento.set({
        ...datos,
        archivoSeleccionado: archivo,
      });
    }
  }

  alCambiarDescripcion(evento: Event) {
    const input = evento.target as HTMLTextAreaElement;
    const datos = this.modeloDocumento();
    this.modeloDocumento.set({
      ...datos,
      descripcion: input.value,
    });
  }

  alCambiarSeccion(evento: Event) {
    const select = evento.target as HTMLSelectElement;
    const valor = select.value;
    const datos = this.modeloDocumento();
    this.modeloDocumento.set({
      ...datos,
      seccionTematicaId: valor ? parseInt(valor, 10) : null,
    });
  }

  //Valida que el archivo sea PDF y no supere 50MB
  private validarArchivo(archivo: File): string | null {
    // Validar tipo de archivo
    if (archivo.type !== DOCUMENTO_CONFIG.validacion.tipo) {
      return 'El archivo debe ser un PDF. Tipo detectado: ' + (archivo.type || 'desconocido');
    }

    //Validar extensión
    if (!archivo.name.toLowerCase().endsWith('.pdf')) {
      return 'El nombre del archivo debe terminar en .pdf';
    }

    //tamaño
    if (archivo.size > DOCUMENTO_CONFIG.validacion.tamaño.maxBytes) {
      const tamañoMB = (archivo.size / 1024 / 1024).toFixed(2);
      return `El archivo es muy grande (${tamañoMB}MB). Máximo permitido: ${DOCUMENTO_CONFIG.validacion.tamaño.maxMB}MB`;
    }

    return null;
  }

  // Inicia el proceso de subida del documento
  subirDocumento() {
    if (!this.formularioValido()) {
      return;
    }

    const datos = this.modeloDocumento();
    if (!datos.archivoSeleccionado || !datos.seccionTematicaId) {
      return;
    }

    this.cargandoSubida.set(true);
    this.mensajeError.set(null);
    this.porcentajeProgreso.set(0);

    // Simular progreso lineal hasta 90%
    let progreso = 0;
    const intervaloProgreso = setInterval(() => {
      progreso += Math.random() * 25;
      if (progreso > 90) progreso = 90;
      this.porcentajeProgreso.set(Math.floor(progreso));
    }, 200);

    const metadata = {
      seccionTematicaId: datos.seccionTematicaId,
      descripcion: datos.descripcion,
    };

    this.documentoService.uploadDocumento(datos.archivoSeleccionado, metadata)
      .subscribe({
        next: (documento) => {
          clearInterval(intervaloProgreso);
          this.porcentajeProgreso.set(100);
          this.documentoSubido.emit({
            id: documento.id,
            nombreFichero: documento.nombreFichero,
          });
          setTimeout(() => {
            this.cargandoSubida.set(false);
            this.limpiarFormulario();
            this.cerrarModal();
          }, 500);
        },
        error: (error) => {
          clearInterval(intervaloProgreso);
          this.cargandoSubida.set(false);
          this.porcentajeProgreso.set(0);
          const mensajeError = error?.error?.mensaje || 'Error al subir el documento';
          this.mensajeError.set(mensajeError);
        },
      });
  }

  // Método simularSubida comentado (se usaba para desarrollo sin backend)
  /*
  private simularSubida() {
    let progreso = 0;
    const intervalo = setInterval(() => {
      progreso += Math.random() * 30;
      if (progreso >= 100) {
        progreso = 100;
        clearInterval(intervalo);
        this.cargandoSubida.set(false);
        this.porcentajeProgreso.set(100);

        const datos = this.modeloDocumento();
        this.documentoSubido.emit({
          id: Math.floor(Math.random() * 1000),
          nombreFichero: datos.archivoSeleccionado?.name || 'documento.pdf',
        });

        setTimeout(() => {
          this.limpiarFormulario();
          this.cerrarModal();
        }, 1000);
      } else {
        this.porcentajeProgreso.set(Math.floor(progreso));
      }
    }, 500);
  }
  */

  // Cierra el modal y notifica al componente padre
  cerrarModal() {
    this.alCerrar.emit();
    this.limpiarFormulario();
  }

  private limpiarFormulario() {
    this.modeloDocumento.set({
      descripcion: '',
      seccionTematicaId: null,
      archivoSeleccionado: null,
    });
    this.porcentajeProgreso.set(0);
    this.mensajeError.set(null);
  }
}
