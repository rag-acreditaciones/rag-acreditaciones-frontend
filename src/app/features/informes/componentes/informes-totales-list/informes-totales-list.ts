import { Component } from '@angular/core';
import { InformesTotalesItem } from "../informes-totales-item/informes-totales-item";
import { InformeTotal } from '../../interfaces/informe.model';
import { informeTotalDemo } from '../../interfaces/informe-total-demo';

@Component({
  selector: 'app-informes-totales-list',
  imports: [InformesTotalesItem],
  templateUrl: './informes-totales-list.html',
  styleUrl: './informes-totales-list.css',
})
export class InformesTotalesList {
  informeTotal: InformeTotal = informeTotalDemo;
}
