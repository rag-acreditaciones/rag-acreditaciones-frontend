import { Component } from '@angular/core';
import { rankingUsuariosDemo } from '../../interfaces/ranking-usuarios-demo';
import { UsuarioRanking } from '../../interfaces/informe.model';
import { InformesRankingItem } from "../informes-ranking-item/informes-ranking-item";

@Component({
  selector: 'app-informes-ranking-list',
  imports: [InformesRankingItem],
  templateUrl: './informes-ranking-list.html',
  styleUrl: './informes-ranking-list.css',
})
export class InformesRankingList {
    ranking: UsuarioRanking[] = rankingUsuariosDemo;
}
