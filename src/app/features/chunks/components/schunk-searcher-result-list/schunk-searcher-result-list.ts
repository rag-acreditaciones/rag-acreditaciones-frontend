import { Component } from '@angular/core';
import { SchunkSearcherResultDetail } from '../schunk-searcher-result-detail/schunk-searcher-result-detail';

@Component({
  selector: 'app-schunk-searcher-result-list',
  imports: [SchunkSearcherResultDetail],
  templateUrl: './schunk-searcher-result-list.html',
  styleUrl: './schunk-searcher-result-list.css',
})
export class SchunkSearcherResultList {}
