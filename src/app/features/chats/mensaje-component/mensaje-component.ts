import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MensajeDTO } from '../conversacion-model';

@Component({
  selector: 'app-mensaje',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './mensaje-component.html',
  styleUrls: ['./mensaje-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MensajeComponent {
  @Input({ required: true }) mensaje!: MensajeDTO;

  get esPregunta(): boolean {
    return this.mensaje.tipo === 'PREGUNTA';
  }
}
