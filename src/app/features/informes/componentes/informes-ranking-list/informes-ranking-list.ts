import { Component, input } from '@angular/core';
import { UsuarioRanking } from '../../interfaces/informe.model';
import { InformesRankingItem } from "../informes-ranking-item/informes-ranking-item";
import { rankingUsuariosDemoData } from '../../interfaces/informe-demo';

@Component({
  selector: 'app-informes-ranking-list',
  imports: [InformesRankingItem],
  templateUrl: './informes-ranking-list.html',
  styleUrl: './informes-ranking-list.css',
})
export class InformesRankingList {
    ranking = input.required<any>({alias: 'ranking-user'});
}
