import { Component, input } from '@angular/core';
import { SchunkSearcherResultDetail } from '../schunk-searcher-result-detail/schunk-searcher-result-detail';
import { SearchResultItem } from '../../interfaces/search-result-item';
import { SearchMode } from '../../interfaces/search-mode';

@Component({
  selector: 'app-schunk-searcher-result-list',
  imports: [SchunkSearcherResultDetail],
  templateUrl: './schunk-searcher-result-list.html',
  styleUrl: './schunk-searcher-result-list.css',
})
export class SchunkSearcherResultList {
  resultados = input.required<SearchResultItem[]>();
  isLoading = input.required<boolean>();
  error = input<string | null>(null);
  modo = input.required<SearchMode>();
}
