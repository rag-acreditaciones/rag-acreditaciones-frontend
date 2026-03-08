import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';

@Component({
  selector: 'app-documento-upload',
  standalone: true,
  templateUrl: './documento-upload.component.html',
  styleUrls: ['./documento-upload.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentoUploadComponent {
  modalAbierto = input<boolean>();
  alCerrar = output<void>();

  cerrarModal() {
    this.alCerrar.emit();
  }
}
