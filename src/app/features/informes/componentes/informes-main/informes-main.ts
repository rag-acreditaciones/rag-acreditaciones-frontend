import { Component, signal } from '@angular/core';
import { InformesTotalesList } from "../informes-totales-list/informes-totales-list";
import { InformesDocumentos } from "../informes-documentos/informes-documentos";
import { InformesChats } from "../informes-chats/informes-chats";
import { InformesRankingList } from "../informes-ranking-list/informes-ranking-list";
import { InformesRecienteList } from "../informes-reciente-list/informes-reciente-list";

@Component({
  selector: 'app-informes-main',
  imports: [InformesTotalesList, InformesDocumentos, InformesChats, InformesRankingList, InformesRecienteList],
  templateUrl: './informes-main.html',
  styleUrl: './informes-main.css',
})
export class InformesMain {
    vista = signal<'documentos' | 'chats'>('documentos');
    
}
