import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dpagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dpagination.html',
  styleUrl: './dpagination.css',
})
export class Dpagination {
  // Me llega esto de la screen que lo recibee del back
  totalElements = input.required<number>();
  currentPage = input.required<number>();
  pageSize = input.required<number>();

  // Esto se lo envio a la screen para que luego pueda canviar los chunks
  pageChange = output<number>();
  sizeChange = output<number>();

  /* Si se quieren añadir opciones para seleccionar diferente cantidad de chunks
  mostrados aqui se ponen mas numeros y ya*/
  readonly opcionesTamano = [6];

  // Acordarme de que computed se recalcula cuando 2 signals cambian
  totalPaginas = computed(() => Math.ceil(this.totalElements() / this.pageSize()));

  paginas = computed(() => Array.from({ length: this.totalPaginas() }, (_, i) => i));

  cambiarPagina(pagina: number) {
    if (pagina !== this.currentPage()) {
      /*Aqui el emit es lo que hace que yo le envie la pagina al padre, entonces
      entiendo que output necesita del emit para hacer este "envio"*/
      this.pageChange.emit(pagina);
    }
  }

  // Esto lo pongo porque me lo pone en el enunciado yo creo que mejor solo 5
  /*
  cambiarTamano(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.sizeChange.emit(Number(select.value));
  }
    */
}
