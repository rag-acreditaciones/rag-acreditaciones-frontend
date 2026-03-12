import { Component, input } from '@angular/core';

@Component({
  selector: '[app-informes-ranking-item]',
  imports: [],
  templateUrl: './informes-ranking-item.html',
  styleUrl: './informes-ranking-item.css',
})
export class InformesRankingItem {
    usuario = input.required<any>({alias: 'user'});
}
