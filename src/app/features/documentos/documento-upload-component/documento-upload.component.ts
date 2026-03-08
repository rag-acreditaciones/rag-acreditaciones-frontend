import { Component, ChangeDetectionStrategy, input, output, signal, computed, HostListener, ViewChild, ElementRef } from '@angular/core';
import { form, minLength, required } from '@angular/forms/signals';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { DocumentoService } from '../documento.service';

interface DatosDocumento {
  descripcion: string;
  seccionId: number | null;
  archivoSeleccionado: File | null;
}

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

  arrastrandoEncima = signal(false);
  cargandoSubida = signal(false);
  porcentajeProgreso = signal(0);
  mensajeError = signal<string | null>(null);

  modeloDocumento = signal<DatosDocumento>({
    descripcion: '',
    seccionId: null,
    archivoSeleccionado: null,
  });

  formulario = form(this.modeloDocumento, (modelo) => {
    minLength(modelo.descripcion, 10, { message: 'La descripcion debe tener al menos 10 caracteres' });
    required(modelo.seccionId, { message: 'Debes seleccionar una seccion' });
    required(modelo.archivoSeleccionado, { message: 'Debes seleccionar un archivo' });
  });

  formularioValido = computed(() => this.formulario().valid());

  descripcionControl = computed(() => this.formulario.descripcion());
  seccionIdControl = computed(() => this.formulario.seccionId());
  archivoControl = computed(() => this.formulario.archivoSeleccionado());

  constructor(
    private documentoService: DocumentoService,
    private http: HttpClient
  ) {}

  @HostListener('dragover', ['$event']) alArrastrar(evento: DragEvent) {
    evento.preventDefault();
    evento.stopPropagation();
    this.arrastrandoEncima.set(true);
  }

  @HostListener('dragleave') alSalirArrastrar() {
    this.arrastrandoEncima.set(false);
  }

  @HostListener('drop', ['$event']) alSoltar(evento: DragEvent) {
    evento.preventDefault();
    evento.stopPropagation();
    this.arrastrandoEncima.set(false);

    const archivos = evento.dataTransfer?.files;
    if (archivos?.[0]) {
      const datos = this.modeloDocumento();
      this.modeloDocumento.set({
        ...datos,
        archivoSeleccionado: archivos[0],
      });
    }
  }

  seleccionarArchivo() {
    this.inputArchivo?.nativeElement.click();
  }

  alSeleccionarArchivo(evento: Event) {
    const input = evento.target as HTMLInputElement;
    if (input.files?.[0]) {
      const datos = this.modeloDocumento();
      this.modeloDocumento.set({
        ...datos,
        archivoSeleccionado: input.files[0],
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
      seccionId: valor ? parseInt(valor, 10) : null,
    });
  }

  subirDocumento() {
    if (!this.formularioValido()) {
      return;
    }

    const datos = this.modeloDocumento();
    if (!datos.archivoSeleccionado || !datos.seccionId) {
      return;
    }

    this.cargandoSubida.set(true);
    this.mensajeError.set(null);
    this.porcentajeProgreso.set(0);

    const metadata = {
      seccionTematicaId: datos.seccionId,
      descripcion: datos.descripcion,
    };

    // Bloque a descomentar para activar subida al backend
    // (Descomentar cuando el endpoint esté implementado en el backend)
    /*
    this.documentoService.uploadDocumento(datos.archivoSeleccionado, metadata)
      .subscribe({
        next: (documento) => {
          this.cargandoSubida.set(false);
          this.porcentajeProgreso.set(100);
          this.documentoSubido.emit({
            id: documento.id,
            nombreFichero: documento.nombreFichero,
          });
          this.limpiarFormulario();
          setTimeout(() => {
            this.cerrarModal();
          }, 1000);
        },
        error: (error) => {
          this.cargandoSubida.set(false);
          this.porcentajeProgreso.set(0);
          const mensajeError = error?.error?.mensaje || 'Error al subir el documento';
          this.mensajeError.set(mensajeError);
        },
      });
    */

    // Mock para desarrollo (simula subida)
    this.simularSubida();
  }

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

  cerrarModal() {
    this.alCerrar.emit();
    this.limpiarFormulario();
  }

  private limpiarFormulario() {
    this.modeloDocumento.set({
      descripcion: '',
      seccionId: null,
      archivoSeleccionado: null,
    });
    this.porcentajeProgreso.set(0);
    this.mensajeError.set(null);
  }
}
