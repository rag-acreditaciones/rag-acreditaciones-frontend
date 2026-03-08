import { Component } from '@angular/core';
import { SchunkSearcher } from '../schunk-searcher/schunk-searcher';
import { SchunkSearcherResultList } from '../schunk-searcher-result-list/schunk-searcher-result-list';

@Component({
  selector: 'app-schunk-searcher-screen',
  imports: [SchunkSearcher, SchunkSearcherResultList],
  templateUrl: './schunk-searcher-screen.html',
  styleUrl: './schunk-searcher-screen.css',
})
export class SchunkSearcherScreen {}
