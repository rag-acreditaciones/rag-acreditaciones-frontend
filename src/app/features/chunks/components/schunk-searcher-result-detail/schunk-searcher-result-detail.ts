import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultItem } from '../../interfaces/search-result-item';
import { SearchMode } from '../../interfaces/search-mode';

@Component({
  selector: 'app-schunk-searcher-result-detail',
  standalone: true,
  imports: [CommonModule],
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
