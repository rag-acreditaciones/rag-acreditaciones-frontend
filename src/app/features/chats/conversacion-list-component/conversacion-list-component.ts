import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ConversacionService } from '../conversacion-service';
import { ConversacionDTO } from '../conversacion-model';

@Component({
  selector: 'app-conversacion-list',
  imports: [CommonModule],
  templateUrl: './conversacion-list-component.html',
  styleUrls: ['./conversacion-list-component.scss'],
})
export class ConversacionListComponent implements OnInit {

  @Output() conversacionSeleccionada = new EventEmitter<number>();
  @Output() nuevaConversacion = new EventEmitter<void>();

  conversaciones$!: Observable<any>;
  conversacionActivaId: number | null = null;

  constructor(private conversacionSvc: ConversacionService) {}

  ngOnInit(): void {
    this.conversaciones$ = this.conversacionSvc.getConversaciones({ estado: 'ACTIVA', size: 50 });
  }

  seleccionar(id: number): void {
    this.conversacionActivaId = id;
    this.conversacionSeleccionada.emit(id);
  }

  onNueva(): void {
    this.nuevaConversacion.emit();
  }

  trackById(_: number, c: ConversacionDTO): number { return c.id; }
}