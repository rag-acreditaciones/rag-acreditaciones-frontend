import { Component, input } from '@angular/core';
import { SearchResultItem } from '../../interfaces/search-result-item';
import { SearchMode } from '../../interfaces/search-mode';

@Component({
  selector: 'app-schunk-searcher-result-detail',
  imports: [],
  templateUrl: './schunk-searcher-result-detail.html',
  styleUrl: './schunk-searcher-result-detail.css',
})
export class SchunkSearcherResultDetail {
  resultado = input.required<SearchResultItem>();
  modo = input.required<SearchMode>();

  textoScore(score?: number): string {
    if (score === undefined || score === null) {
      return '-';
    }

    return score.toFixed(2);
  }
}
