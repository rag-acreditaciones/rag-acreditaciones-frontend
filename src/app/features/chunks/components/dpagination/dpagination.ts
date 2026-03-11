import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-dpagination',
  imports: [],
  templateUrl: './dpagination.html',
  styleUrl: './dpagination.css',
})
export class Dpagination {
  totalElements = input.required<number>();
  currentPage = input.required<number>();
  pageSize = input.required<number>();

  // Esto se lo envio a la screen para que luego pueda canviar los chunks
  pageChange = output<number>();
  sizeChange = output<number>();

  readonly opcionesTamano = [5, 10, 20];

  // Acordarme de que computed se recalcula cuando 2 signals cambian
  totalPaginas = computed(() => Math.ceil(this.totalElements() / this.pageSize()));

  paginas = computed(() => Array.from({ length: this.totalPaginas() }, (_, i) => i));

  cambiarPagina(pagina: number) {
    if (pagina !== this.currentPage()) {
      this.pageChange.emit(pagina);
    }
  }

  cambiarTamano(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.sizeChange.emit(Number(select.value));
  }
}
