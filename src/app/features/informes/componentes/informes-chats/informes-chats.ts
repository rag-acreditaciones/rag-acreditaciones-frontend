import { Component } from '@angular/core';
import { DoughnutChart } from "../doughnut-chart/doughnut-chart";
import { LineChart } from "../line-chart/line-chart";
import { chatsSeccionDemo } from '../../interfaces/chats-seccion-demo';
import { CantidadesPorEtiqueta, HorasPunta, ActividadDiaria } from '../../interfaces/informe.model';
import { horaPuntaDemo } from '../../interfaces/hora-punta-demo';
import { actividadDiariaDemo } from '../../interfaces/actividad-diaria-demo';

@Component({
  selector: 'app-informes-chats',
  imports: [DoughnutChart, LineChart],
  templateUrl: './informes-chats.html',
  styleUrl: './informes-chats.css',
})
export class InformesChats {
  chatsSeccion: CantidadesPorEtiqueta[] = chatsSeccionDemo;
  horaPunta: HorasPunta[] = horaPuntaDemo;
  actividadDiaria: ActividadDiaria[] = actividadDiariaDemo;

}
