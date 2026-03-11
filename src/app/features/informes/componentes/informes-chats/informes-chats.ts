import { Component } from '@angular/core';
import { DoughnutChart } from "../chart/doughnut-chart/doughnut-chart";
import { LineChart } from "../chart/line-chart/line-chart";
import { CantidadesPorEtiqueta, HorasPunta, ActividadDiaria } from '../../interfaces/informe.model';
import { chatsSeccionDemoData, horaPuntaDemoData, actividadDiariaDemoData } from '../../interfaces/informe-demo';

@Component({
  selector: 'app-informes-chats',
  imports: [DoughnutChart, LineChart],
  templateUrl: './informes-chats.html',
  styleUrl: './informes-chats.css',
})
export class InformesChats {
  chatsSeccion: CantidadesPorEtiqueta[] = chatsSeccionDemoData;
  horaPunta: HorasPunta[] = horaPuntaDemoData;
  actividadDiaria: ActividadDiaria[] = actividadDiariaDemoData;

}
