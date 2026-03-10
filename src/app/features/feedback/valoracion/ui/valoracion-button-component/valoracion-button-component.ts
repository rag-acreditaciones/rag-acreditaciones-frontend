import { CommonModule } from '@angular/common';
import { Component, Input, computed, inject, OnInit } from '@angular/core';
import { ValoracionService } from '../../data-access/valoracion-service';
import { Valoracion } from '../../interfaces/valoracion';

@Component({
  standalone: true,
  selector: 'app-valoracion-button-component',
  imports: [CommonModule],
  templateUrl: './valoracion-button-component.html',
  styleUrl: './valoracion-button-component.css',
})
export class ValoracionButtonComponent implements OnInit {
  @Input({ required: true }) mensajeId!: number;

  private readonly valoracionService = inject(ValoracionService);

  readonly loading = this.valoracionService.loading;
  readonly valoraciones = this.valoracionService.valoraciones;

  readonly valoracionSeleccionada = computed<Valoracion['valoracion'] | null>(() => {
    const lista = this.valoraciones();

    if (lista.length === 0) {
      return null;
    }

    return lista[lista.length - 1].valoracion;
  });

  ngOnInit(): void {
    this.valoracionService.getValoraciones(this.mensajeId);
  }

  valorar(valoracion: Valoracion['valoracion']): void {
    if (this.valoracionSeleccionada() === valoracion) {
      return;
    }

    this.valoracionService.createValoracion({
      mensajeId: this.mensajeId,
      valoracion,
      comentario: '',
    });
  }
}
