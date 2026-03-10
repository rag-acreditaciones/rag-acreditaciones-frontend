import { Component } from '@angular/core';
import { LineChart } from "../line-chart/line-chart";
import { DoughnutChart } from "../doughnut-chart/doughnut-chart";
import { documentosEstadoDemo } from '../../interfaces/documentos-estado-demo';
import { documentosSeccionDemo } from '../../interfaces/documentos-seccion-demo';
import { evolucionDemo } from '../../interfaces/evolucion-demo';
import { Evolucion, CantidadesPorEtiqueta } from '../../interfaces/informe.model';

@Component({
  selector: 'app-informes-documentos',
  imports: [LineChart, DoughnutChart],
  templateUrl: './informes-documentos.html',
  styleUrl: './informes-documentos.css',
})
export class InformesDocumentos {
    evolucion: Evolucion[] = evolucionDemo;
    documentosSeccion: CantidadesPorEtiqueta[] = documentosSeccionDemo;
    documentosEstado: CantidadesPorEtiqueta[] = documentosEstadoDemo;
}
