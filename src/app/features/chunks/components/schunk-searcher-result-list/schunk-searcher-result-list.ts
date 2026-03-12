import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchunkSearcherResultDetail } from '../schunk-searcher-result-detail/schunk-searcher-result-detail';
import { SearchResultItem } from '../../interfaces/search-result-item';
import { SearchMode } from '../../interfaces/search-mode';

@Component({
  selector: 'app-schunk-searcher-result-list',
  standalone: true,
  imports: [CommonModule, SchunkSearcherResultDetail],
  templateUrl: './schunk-searcher-result-list.html',
  styleUrl: './schunk-searcher-result-list.css',
})
export class SchunkSearcherResultList {
  resultados = input.required<SearchResultItem[]>();
  isLoading = input.required<boolean>();
  error = input<string | null>(null);
  modo = input.required<SearchMode>();
}
