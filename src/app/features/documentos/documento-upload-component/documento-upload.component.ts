import { Component, ChangeDetectionStrategy, input, output, signal, HostListener, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-documento-upload',
  standalone: true,
  templateUrl: './documento-upload.component.html',
  styleUrls: ['./documento-upload.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentoUploadComponent {
  @ViewChild('inputArchivo') inputArchivo!: ElementRef<HTMLInputElement>;

  modalAbierto = input<boolean>();
  alCerrar = output<void>();

  archivoSeleccionado = signal<File | null>(null);
  arrastrandoEncima = signal(false);

  @HostListener('dragover', ['$event']) alArrastrar(evento: DragEvent) {
    evento.preventDefault();
    evento.stopPropagation();
    this.arrastrandoEncima.set(true);
  }

  @HostListener('dragleave') alSalirArrastrar() {
    this.arrastrandoEncima.set(false);
  }

  // Aquí metemos la lógica del arrastrar y soltar con el efecto más visual
  @HostListener('drop', ['$event']) alSoltar(evento: DragEvent) {
    evento.preventDefault();
    evento.stopPropagation();
    this.arrastrandoEncima.set(false);

    const archivos = evento.dataTransfer?.files;
    if (archivos?.[0]) {
      this.archivoSeleccionado.set(archivos[0]);
    }
  }

  seleccionarArchivo() {
    this.inputArchivo?.nativeElement.click();
  }

  alSeleccionarArchivo(evento: Event) {
    const input = evento.target as HTMLInputElement;
    if (input.files?.[0]) {
      this.archivoSeleccionado.set(input.files[0]);
    }
  }

  cerrarModal() {
    this.alCerrar.emit();
  }
}
