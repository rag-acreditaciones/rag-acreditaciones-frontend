import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchRequest } from '../../interfaces/search-request';
import { SearchMode } from '../../interfaces/search-mode';

@Component({
  selector: 'app-schunk-searcher',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './schunk-searcher.html',
  styleUrl: './schunk-searcher.css',
})
export class SchunkSearcher {
  consulta = signal('');
  mode = signal<SearchMode>('SEMANTICA');
  topk = signal(5);

  buscar = output<SearchRequest>();

  onSubmit() {
    const consulta = this.consulta().trim();
    if (!consulta) {
      return;
    }

    this.buscar.emit({
      consulta,
      mode: this.mode(),
      topk: this.topk(),
    });
  }
}
